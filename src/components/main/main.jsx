import React, {Component} from 'react';
import styles from './main.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'


class Main extends Component {
    render() {
        return (
            <>

                {/*create router*/}

                {this.renderWeekDayCards(this.props.sortedData)}

                {/*renders all the small cards*/}
                <main className="container-fluid">
                    {/* this.renderWeatherCardListTemp(this.props.data.forecastTimestamps) */}
                </main>
            </>
        )
    }


    renderSingleDayCard(weekday, date) {
        return (

            <div className="float-left w-25 bg-secondary p-2">
                {weekday} {date.slice(5, 10)}
            </div>

        )
    }

    renderWeekDayCards(sortedData) {
        return (
            <>
                {
                    sortedData.map((day) => {
                            return this.renderSingleDayCard(day.weekday, day.date)
                        }
                    )
                }
            </>
        )
    }


    // renders the whole list of cards
    renderWeatherCardListTemp(forecasts) {
        return (
            <div className="row">
                {
                    forecasts.map((forecast) =>
                        <>{this.renderWeatherCardTemp(forecast)}</>
                    )
                }
            </div>
        );
    }

    // renders a single weather card
    renderWeatherCardTemp(forecast) {
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