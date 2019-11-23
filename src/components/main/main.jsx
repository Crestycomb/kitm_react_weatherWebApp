import React, {Component} from 'react';
import styles from './main.css';

class Main extends Component {
    render() {
        return (
            <>
                <p>ayy lmao</p>
                {/*renders all the small cards*/}
                {this.renderWeatherCardList(this.props.data.forecastTimestamps)}

            </>
        )
    }

    // renders the whole list of cards
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

    // renders a single weather card
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