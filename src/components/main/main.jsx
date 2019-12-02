import React, {Component} from 'react';
import styles from './main.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'


class Main extends Component {
    render() {
        return (
            <>


                <p>ayy lmao</p>
                {/*renders all the small cards*/}
                <main className="container-fluid">
                    {this.renderWeatherCardList(this.props.data.forecastTimestamps)}
                </main>
            </>
        )
    }

    // renders the whole list of cards
    renderWeatherCardList(forecasts) {
        return (
            <div className="row">
                {
                    forecasts.map((forecast) =>
                        <>{this.renderWeatherCard(forecast)}</>
                    )
                }
            </div>
        );
    }

    // renders a single weather card
    renderWeatherCard(forecast) {
        return (
            <div className="col-1 bg-info p-1 m-2">
                <p>time: {forecast.forecastTimeUtc}</p>
                <p>temp: {forecast.airTemperature}</p>
                <p>precip: {forecast.totalPrecipitation}</p>
                <p>direction: {forecast.windDirection}</p>

            </div>
        );
    }
}

export default Main;