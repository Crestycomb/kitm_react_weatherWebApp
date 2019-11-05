import React, { Component } from 'react';
import styles from './header.css';
function Header() {

    return (

        <header className="container-fluid">

            <div className="row">
                <div className="col-3 pl-2">
                    <h2 className="text-uppercase">Weather</h2>
                </div>
                <div className="col">
                    <SearchForm/>
                </div>
            </div>

        </header>
    );
}

class SearchForm extends Component {

    searchPlace(e){
        e.preventDefault();
    }

    render() {
        return (
            <form className="form-inline" ref="locationForm" onSubmit={this.searchPlace}>
                <div className="form-group">
                    <label for="location">

                        <input type="text" id="location" placeholder="Enter a city" ref="fruitName"
                               className="form-control"/>
                        <button type="submit" className="btn btn-primary">search</button>
                    </label>
                </div>

            </form>
        )
    }
};

export default Header;