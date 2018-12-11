import React, {Component} from 'react';
import axios from 'axios'

const Prediction = (props) => {
    this.state ={
        percentDiff: "",
        today: "",
        tmrPredict: "",
    }
    fetch("https://cors-anywhere.herokuapp.com/afternoon-reef-20637.herokuapp.com/prediction/" + this.state.input, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response => response.json())
        .then(data => this.setState({
            percentDiff: data["percentage_difference"],
            today: data["today"],
            tmrPredict: data["tommorrow_predicted"]
        }
        ))
        .catch(error => console.log(error));
        console.log(this.state.percentDiff)

    return(
        <div>
            <p onClick = {this.defaultDisplay()}>{this.state.percentDiff}</p>
            {console.log(this.state.percentDiff)}
        </div>
    )
}