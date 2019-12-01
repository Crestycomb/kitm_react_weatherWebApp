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

            .catch(() => this.setState({hasErrors: true}));
    }

    //  sorts through data from API based on date
    sortThroughData = data => {
        console.log("sort data start");

        console.log(data);
        //  takes the first forecast time and sets it to 'today'
        let today = data.forecastCreationTimeUtc.slice(0, 10);
        console.log("today is: " + today);

        //  goes through each forecast and places it into a new object
        let singleDateForecasts = [
            data,

        ];


        /*
        for (const forecastIndex in data.forecastTimestamps) {


            console.log(forecastIndex);
            console.log(data.forecastTimestamps[forecastIndex]);


            if (forecastIndex == 0) {
                console.log("this should run the first loop...");
                singleDateForecasts[0].date = today;
                singleDateForecasts[0].forecast = data.forecastTimestamps[0];
            } else {
                //  if the dates dont match up, create a new iteration of the array
                if (singleDateForecasts[singleDateForecasts.length - 1].date !== singleDateForecasts[singleDateForecasts.length - 2].date) {
                    //singleDateForecasts[singleDateForecasts.length].date = data.forecastTimestamps[forecastIndex].forecastTimeUtc.slice(0, 10);
                }
            }
            console.log(singleDateForecasts[singleDateForecasts.length-1].date)

            console.log("");
        }
        */

        console.log("sort data end");
    };

    render() {
        return (
            <div className="container-fluid bg-light    ">
                <NameForm callbackFromParent={this.myCallback}/>

                <h5>{this.state.defaultLocation}</h5>

                {this.state && this.state.data &&
                <>
                    <Main data={this.state.data}/>
                    {this.sortThroughData(this.state.data)}
                </>
                }
            </div>
        );
    }

    myCallback = (dataToParent) => {
        let currentLocation = dataToParent + '/';

        let endpoint = this.cors + this.startPoint + this.places + currentLocation + this.forecasts + this.forecastType;

        const request = async () => {
            const response = await fetch(endpoint);
            const json = await response.json();
            console.log(json);
            await this.setState({data: json})
        };
        request();
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