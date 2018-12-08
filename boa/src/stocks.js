import React, {Component} from 'react';
import LineExample from './Line/LineExample'
class Stocks extends Component{
    constructor(){
        super();
        this.state = {
            name: [],
            object: [],
            timeArr: [],
            openArr: [],
            highArr: [],
            lowArr: [],  
            closeArr: [],
            volumeArr: [],
            url: null
            // "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMD&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV",
        }
    }
    updateObeject=()=>{
        fetch(this.state.url)
            .then(response => response.json())
            .then(data => this.setState({
                name: data["Meta Data"]["2. Symbol"],
                object: data["Time Series (5min)"],
            },function(){
                this.updateArray();
            }))
    }
    updateArray=()=>{
        const timeArr = [];
        const openArr = [];
        const highArr = [];
        const lowArr = [];
        const closeArr = [];
        const volumeArr = [];
        Object.keys(this.state.object).forEach(key => {
            timeArr.push(key);
            openArr.push(this.state.object[key]["1. open"]);
            highArr.push(this.state.object[key]["2. high"]);
            lowArr.push(this.state.object[key]["3. low"]);
            closeArr.push(this.state.object[key]["4. close"]);
            volumeArr.push(this.state.object[key]["5. volume"]);
        });
        timeArr.reverse(); openArr.reverse(); highArr.reverse(); lowArr.reverse(); closeArr.reverse(); volumeArr.reverse();
        // console.log(timeArr);
        this.setState({
            timeArr: timeArr,
            openArr: openArr,
            highArr: highArr,
            lowArr: lowArr,
            closeArr: closeArr,
            volumeArr: volumeArr,
        },function () {
            // console.log(this.state.object);
        });
    }

    display = () => {
        let input = document.getElementById("nameInput").value;
        console.log(input);
        let newUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + input + "&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV";
        this.setState({url: newUrl}, function () {
            console.log(this.state.url);
            this.updateObeject();
            console.log(this.state.object);
        });
        console.log(this.state.object);
        console.log(this.state.timeArr);
    }



    render(){
        return(
            <div>
                <p>Hello</p>
                <button onClick = {this.display}>Submit</button>
                <input type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                <LineExample
                 name = {this.state.name}
                 time = {this.state.timeArr}
                 high = {this.state.highArr}
                 low = {this.state.lowArr}
                 close = {this.state.closeArr}
                 volume = {this.state.volumeArr}/>
            </div>
        );
    }
}

export default Stocks;