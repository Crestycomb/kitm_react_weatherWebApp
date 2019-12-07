import React, {Component} from 'react';
import styles from './main.scss';
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


class Main extends Component {
    constructor() {
        super();

        this.state = {
            dummyData: [
                {
                    weekday: "today",
                    forecasts: [
                        {
                            airTemperature: 0,

                        }
                    ]
                },
                {
                    weekday: "tomorrow",
                    forecasts: [
                        {
                            airTemperature: 0,

                        }
                    ]
                },
            ]
        };
    }

    render() {
        return (
            <main className="container-fluid">
                <FontAwesomeIcon icon="coffee" />
                {/*create router*/}
                <Router>
                    <div className="row">
                        {this.renderWeekDayCards(this.props.sortedData)}
                    </div>
                    <Switch>
                        {this.generateRoutes(this.props.sortedData)}
                    </Switch>
                </Router>
            </main>
        )
    }

    generateRoutes(sortedData) {
        return (
            <>
                {
                    sortedData.map((day) => {
                            return <Route exact path={'/' + day.date}>
                                <div className="container-fluid"> {this.renderSortedWeekday(day)} <span
                                    className="font-weight-bold">{day.date}</span></div>
                            </Route>
                        }
                    )
                }
            </>
        )
    }

    renderSortedWeekday(day) {
        return (
            <div className="row">
                {
                    day.forecasts.map((forecast) => {
                        return <div className="col bg-secondary m-1">
                            <p><span className="font-weight-bold">{forecast.forecastTimeUtc.slice(10,13)}</span>{ forecast.forecastTimeUtc.slice(14,16)}</p>
                            <p>{forecast.airTemperature}°</p>
                            <p>precip: {forecast.totalPrecipitation}</p>
                            <p>direction: {forecast.windDirection}</p>
                        </div>
                    })
                }
            </div>
        )
    }

    renderWeekDayCards(sortedData) {
        return (
            <>
                {
                    sortedData.map((day) => {
                            return <WeatherDay
                                weekday={day.weekday} date={day.date}/>
                        }
                    )
                }
            </>
        )
    }
}

class WeatherDay extends React.Component {

    renderSingleDayCard(weekday, date) {
        return (

            <>
                {weekday} {date.slice(5, 10)}
            </>

        )
    }


    render() {
        return (
            <div className="col bg-secondary p-2 m-1">
                <Link to={"/" + this.props.date}>
                    {this.renderSingleDayCard(this.props.weekday, this.props.date)}
                </Link>
            </div>
        );
    }
}

export default Main;