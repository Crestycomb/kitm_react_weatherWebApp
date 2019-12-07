import React from "react";


class Nameform extends React.Component {
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

export default Nameform;