import React from 'react';
import Comparsion from '../Line/Comparsion.jsx'

class histTrend extends React.Component{
    constructor(){
        super();
        this.state = {
            name: 'S&P 500',
            highArr78: [],
        };
        this.display();
    }

    display = () => {
        let newUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_weekly&symbol=iVV&apikey=KJEQ4OXGXSCLWKKV";
        fetch(newUrl)
            .then(response => response.json())
            .then(data => this.setState({
                object: data["Weekly Time Series"],
            },function(){
                this.updateArray();
            }))
            .catch(error => console.log(error));
    }
    updateArray=()=>{
        const timeArr78 = [];
        const openArr78 = [];
        const highArr78 = [];
        const timeArr89 = [];
        const openArr89 = [];
        const highArr89 = [];
        Object.keys(this.state.object).forEach(key => {
            if(key.includes("2007") || key.includes("2008")){
                timeArr78.push(key);
                openArr78.push(this.state.object[key]["1. open"]);
                highArr78.push(this.state.object[key]["2. high"]);
            }
            if(key.includes("2008") || key.includes("2009")){
                timeArr89.push(key);
                openArr89.push(this.state.object[key]["1. open"]);
                highArr89.push(this.state.object[key]["2. high"]);
            }
        });
        timeArr78.reverse();openArr78.reverse();highArr78.reverse();
        timeArr89.reverse();openArr89.reverse();highArr89.reverse();
        //console.log(timeArr);
        this.setState({
            timeArr78: timeArr78, openArr78: openArr78, highArr78: highArr78,
            timeArr89: timeArr89, openArr89: openArr89, highArr89: highArr89,
        });
    }

    render(){
        return(
            <div>
                <Comparsion
                      name = {this.state.name}
                      timeArr89 = {this.state.timeArr78}
                      highArr89 = {this.state.highArr89}
                      />
            </div>
        )
    }
}

export default histTrend;