import React, {Component} from 'react';
import Header from '../header/header';
import Main from '../main/main';
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import styles from './app.css';


class App extends Component {
    cors = "https://cors-anywhere.herokuapp.com/";
    startPoint = "https://api.meteo.lt/v1/";
    places = "places/";
    forecasts = "forecasts/";
    forecastType = "long-term/";
    defaultLocation = "kaunas/";

    constructor() {
        super();

        this.state = {
            hasErrors: null,
        };
    }

    componentDidMount() {
        let endpoint = this.cors + this.startPoint + this.places + this.defaultLocation + this.forecasts + this.forecastType;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => this.setState({data: res}))
            .then(res => this.setState({sortedData: this.sortThroughData(this.state.data)}))
            .catch(() => this.setState({hasErrors: true}));
    }


    //  sorts through data from API based on date
    sortThroughData = data => {
        //  takes the first forecast time and sets it to 'today'
        let today = data.forecastCreationTimeUtc.slice(0, 10);
        console.log("today is: " + today);

        //  goes through each forecast and places it into a new object
        var forecastsSorted = [];


        for (const i in data.forecastTimestamps) {

            // if its the first iteration of the loop, simply push the first set of
            // data from data.forecastTimestamps into the array
            if (i == 0) {
                forecastsSorted.push(
                    {
                        date: data.forecastTimestamps[0].forecastTimeUtc.slice(0, 10),
                        weekday: "Today",
                        forecasts: [data.forecastTimestamps[0]]
                    });
                // if its not the first time:
            } else {
                // then check if the last forecasts date in our sorted array is
                // the same to the next one in data.forecastTimestamps
                if (forecastsSorted[forecastsSorted.length - 1].date === data.forecastTimestamps[i].forecastTimeUtc.slice(0, 10)) {
                    // then add another forecast into our sorted arrays forecast object
                    forecastsSorted[forecastsSorted.length - 1].forecasts.push(data.forecastTimestamps[i])
                    // else push in a new element in the sortedForecasts array
                } else {
                    forecastsSorted.push(
                        {
                            date: data.forecastTimestamps[i].forecastTimeUtc.slice(0, 10),
                            weekday: this.getDayOfWeek(data.forecastTimestamps[i].forecastTimeUtc.slice(0, 10)),
                            forecasts: [data.forecastTimestamps[i]]
                        }
                    )
                }
            }
        }

        console.log("result: ");
        console.log(forecastsSorted);
        return forecastsSorted;
    };

    // copypasta
    getDayOfWeek = date => {
        let dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    };

    myCallback = (dataToParent) => {
        let currentLocation = dataToParent + '/';

        let endpoint = this.cors + this.startPoint + this.places + currentLocation + this.forecasts + this.forecastType;

        const request = async () => {
            const response = await fetch(endpoint);
            const json = await response.json();
            console.log(json);
            await this.setState({data: json});
            this.setState({sortedData: this.sortThroughData(this.state.data)})
            
        };
        request();
    };

    render() {
        return (
            <div className="container-fluid bg-light    ">
                <NameForm callbackFromParent={this.myCallback}/>

                <h5>{this.state.defaultLocation}</h5>

                {this.state && this.state.data &&
                <>
                    <Main data={this.state.data}/>

                </>
                }
            </div>
        );
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.setState(
            {
                newValue: this.state.value,
            }, () =>
                this.props.callbackFromParent(this.state.newValue), // here is where you put the callback
        );
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}


export default App;