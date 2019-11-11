import React, {Component} from 'react';
import styles from './main.css';

function Main() {
    return (

        <div className="container-fluid">
            <div className="container">
                <div className="row align-self-end">
                    <ApiStuff/>
                </div>
            </div>
        </div>
    );
}

function Square(props) {
    return (
        <div className="col">

        </div>
    );
}

class ApiStuff extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            hasErrors: null,
            isLoaded: false,
            planets: {}
        };
    }

    cors = "https://cors-anywhere.herokuapp.com/";
    startPoint = "https://api.meteo.lt/v1/";
    places = "places/"
    currentLocation = "vilnius/";
    forecasts = "forecasts/";
    forecastType = "long-term/";

    /*



        stuff to change the forecast place would go here
    */
/*
    working example
    componentDidMount() {
        fetch("https://swapi.co/api/planets/4/")
            .then(res => res.json())
            .then(res => this.setState({ planets: res }))
            .catch(() => this.setState({ hasErrors: true }));


    }
*/


    // not really working...
    componentDidMount() {
        let endpoint = this.cors + this.startPoint + this.places + this.currentLocation + this.forecasts + this.forecastType;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => this.setState({ data: res }))
            .catch(() => this.setState({ hasErrors: true }));
    }



/*
    componentDidMount() {
        let endpoint = this.cors + this.startPoint + this.places + this.currentLocation + this.forecasts + this.forecastType;
        fetch(endpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
*/

    renderWeatherCard(i) {
        return <Square


        />;
    }

    render() {
        return (

            <div className="col">
                <p>{this.state.planets.name}</p>
                <p>{this.state.data.forecastType}</p>
            </div>

        )
    }
}

export default Main;