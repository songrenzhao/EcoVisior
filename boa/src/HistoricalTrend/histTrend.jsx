import React from 'react';
import Comparsion from '../Line/Comparsion.jsx'

class histTrend extends React.Component{
    constructor(){
        super();
        this.state = {
            name: 'S&P 500',
            highArr78: [],
        };
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
        const timeArr0910 = [];
        const openArr0910 = [];
        const highArr0910 = [];
        const timeArr1011 = [];
        const openArr1011 = [];
        const highArr1011 = [];
        const timeArr1112 = [];
        const openArr1112 = [];
        const highArr1112 = [];
        const timeArr1213 = [];
        const openArr1213 = [];
        const highArr1213 = [];
        const timeArr1314 = [];
        const openArr1314 = [];
        const highArr1314 = [];
        const timeArr1415 = [];
        const openArr1415 = [];
        const highArr1415 = [];
        const timeArr1516 = [];
        const openArr1516 = [];
        const highArr1516 = [];
        const timeArr1617 = [];
        const openArr1617 = [];
        const highArr1617 = [];
        const timeArr1718 = [];
        const openArr1718 = [];
        const highArr1718 = [];
        
        
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
            if(key.includes("2009") || key.includes("2010")){
                timeArr0910.push(key);
                openArr0910.push(this.state.object[key]["1. open"]);
                highArr0910.push(this.state.object[key]["2. high"]);
            }
            // if(key.includes("2010") || key.includes("2011")){
            //     timeArr1011.push(key);
            //     openArr1011.push(this.state.object[key]["1. open"]);
            //     highArr1011.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2011") || key.includes("2012")){
            //     timeArr1112.push(key);
            //     openArr1112.push(this.state.object[key]["1. open"]);
            //     highArr1112.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2012") || key.includes("2013")){
            //     timeArr1213.push(key);
            //     openArr1213.push(this.state.object[key]["1. open"]);
            //     highArr1213.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2013") || key.includes("2014")){
            //     timeArr1314.push(key);
            //     openArr1314.push(this.state.object[key]["1. open"]);
            //     highArr1314.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2014") || key.includes("2015")){
            //     timeArr1415.push(key);
            //     openArr1415.push(this.state.object[key]["1. open"]);
            //     highArr1415.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2015") || key.includes("2016")){
            //     timeArr1516.push(key);
            //     openArr1516.push(this.state.object[key]["1. open"]);
            //     highArr1516.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2016") || key.includes("2017")){
            //     timeArr1617.push(key);
            //     openArr1617.push(this.state.object[key]["1. open"]);
            //     highArr1617.push(this.state.object[key]["2. high"]);
            // }
            // if(key.includes("2017") || key.includes("2018")){
            //     timeArr1718.push(key);
            //     openArr1718.push(this.state.object[key]["1. open"]);
            //     highArr1718.push(this.state.object[key]["2. high"]);
            // }
        });
        timeArr78.reverse();openArr78.reverse();highArr78.reverse();
        timeArr89.reverse();openArr89.reverse();highArr89.reverse();
        timeArr0910.reverse();openArr0910.reverse();highArr0910.reverse();
        // timeArr1011.reverse();openArr1011.reverse();highArr1011.reverse();
        // timeArr1112.reverse();openArr1112.reverse();highArr1112.reverse();
        // timeArr1213.reverse();openArr1213.reverse();highArr1213.reverse();
        // timeArr1314.reverse();openArr1314.reverse();highArr1314.reverse();
        // timeArr1415.reverse();openArr1415.reverse();highArr1415.reverse();
        // timeArr1516.reverse();openArr1516.reverse();highArr1516.reverse();
        // timeArr1617.reverse();openArr1617.reverse();highArr1617.reverse();
        // timeArr1718.reverse();openArr1718.reverse();highArr1718.reverse();
        // console.log(timeArr);
        this.setState({
            timeArr78: timeArr78, openArr78: openArr78, highArr78: highArr78,
            timeArr89: timeArr89, openArr89: openArr89, highArr89: highArr89,
            timeArr0910: timeArr0910, openArr0910: openArr0910, highArr0910: highArr0910,
            // timeArr1011: timeArr1011, openArr1011: openArr1011, highArr1011: highArr1011,
            // timeArr1112: timeArr1112, openArr1112: openArr1112, highArr1112: highArr1112,
            // timeArr1213: timeArr1213, openArr1213: openArr1213, highArr1213: highArr1213,
            // timeArr1314: timeArr1314, openArr1314: openArr1314, highArr1314: highArr1314,
            // timeArr1415: timeArr1415, openArr1415: openArr1415, highArr1415: highArr1415,
            // timeArr1516: timeArr1516, openArr1516: openArr1516, highArr1516: highArr1516,
            // timeArr1617: timeArr1617, openArr1617: openArr1617, highArr1617: highArr1617,
            // timeArr1718: timeArr1718, openArr1718: openArr1718, highArr1718: highArr1718,
        });
    }

    render(){
        return(
            <div>
                <button onClick = {this.display}>
                    Display Historical trend
                </button>

                <Comparsion
                      name = {this.state.name}
                      highArr78 = {this.state.highArr78}
                      timeArr78 = {this.state.timeArr78}
                      highArr89 = {this.state.highArr89}
                      highArr0910 = {this.state.highArr0910}
                      />
            </div>
        )
    }
}

export default histTrend;