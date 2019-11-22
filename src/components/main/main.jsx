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
            currentLocation: "kaunas/",
            hasErrors: null,
            isLoaded: false,
            randomP: <h2> thingy</h2>

        };
    }

    cors = "https://cors-anywhere.herokuapp.com/";
    startPoint = "https://api.meteo.lt/v1/";
    places = "places/";

    forecasts = "forecasts/";
    forecastType = "long-term/";

    /*
        stuff to change the forecast place would go here
    */


    componentDidMount() {
        let endpoint = this.cors + this.startPoint + this.places + this.state.currentLocation + this.forecasts + this.forecastType;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => this.setState({data: res}))
            .then(randomP => this.setState({randomP: this.state.data.place.code}))
            .catch(() => this.setState({hasErrors: true}));
    }


    render() {
        return (


            <div className="col">

                <p>ayy lmao</p>

                {/*checks if data is fetched. only renders if it is.*/}
                {this.state && this.state.data &&
                <>


                    {this.renderWeatherCard(this.state.data.forecastTimestamps[1])}

                    {/*renders all the small cards*/}
                    {this.renderWeatherCardList(this.state.data.forecastTimestamps)}

                    <p className="clearfix">.</p>
                    <p>{this.state.data.forecastType}</p>
                    <p>{this.state.data.place.code}</p>
                    <p>{this.state.data.place.coordinates.latitude}</p>
                    <p>{this.state.data.forecastTimestamps[1].windSpeed}</p>
                </>
                }
            </div>
        )
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
}

export default Main;