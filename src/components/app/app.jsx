import React, {Component} from 'react';
import Header from '../header/header';
import Main from '../main/main';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import styles from './app.css';


class App extends Component {
    cors = "https://cors-anywhere.herokuapp.com/";
    startPoint = "https://api.meteo.lt/v1/";
    places = "places/";
    forecasts = "forecasts/";
    forecastType = "long-term/";

    constructor() {
        super();

        this.state = {
            currentLocation: "kaunas/",
            hasErrors: null,
        };
    }

    componentDidMount() {
        let endpoint = this.cors + this.startPoint + this.places + this.state.currentLocation + this.forecasts + this.forecastType;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => this.setState({data: res}))
            .catch(() => this.setState({hasErrors: true}));
    }

    renderWeatherCardList(forecasts) {
        return (
            <div>
                {
                    forecasts.map((forecast) =>
                        <>{this.renderWeatherCard(forecast)}</>
                    )
                }
            </div>
        );
    }

    renderWeatherCard(forecast) {
        return (
            <div className="bg-info w-25 float-left p-2 m-4">
                <p>time: {forecast.forecastTimeUtc}</p>
                <p>temp: {forecast.airTemperature}</p>
                <p>precip: {forecast.totalPrecipitation}</p>
                <p>direction: {forecast.windDirection}</p>

            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid bg-light    ">
                <h5>CURRENT loc</h5>


                <SearchForm/>

                {this.state && this.state.data &&
                <>
                    <Main data={this.state.data}/>
                </>
                }

            </div>
        );
    }
}

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            input: 0,
            currencyValue: "f",
        };
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-inline">

                <label>
                    Currency
                    <input type="text" value={this.state.input} onChange={this.handleNumberChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

    handleNumberChange = function (e) {
        this.setState({currencyValue: e.target.value});
    };

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.currencyValue);
        event.preventDefault();
    }


};

export default App;