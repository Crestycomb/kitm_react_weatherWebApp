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
        super()
        this.state = {
            data: null
        };
    }


    startPoint = "https://cors-anywhere.herokuapp.com/https://api.meteo.lt/v1/";
    places = "places/"
    currentLocation = "vilnius/";
    forecasts = "forecasts/";
    forecastType = "long-term/";

    /*



        stuff to change the forecast place would go here
    */


    componentDidMount() {
        let endpoint = this.startPoint + this.places + this.currentLocation + this.forecasts + this.forecastType
        fetch(endpoint)
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));

        console.log(this.state.data);

    }

    renderWeatherCard(i) {
        return <Square


        />;
    }

    render() {
        return (

            <div className="col">
                <p>fdkfoads</p>
            </div>

        )
    }
}

export default Main;