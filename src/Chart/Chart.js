import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

const Charts = (props) => {
    const { Country, TotalConfirmed, TotalDeaths, TotalRecovered } = props.obj;
    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
        xaxis: {
                categories: Country
            }
        },
        series: [
            {
                name: "Total Confirmed",
                data: TotalConfirmed
            },
            {
                name: "Total Recovered",
                data: TotalDeaths
            },
            {
                
                name: "Total Deaths",
                data: TotalRecovered
            }
        ]
    });
    
    useEffect(() => {
        let { Country, TotalConfirmed, TotalDeaths, TotalRecovered } = props.obj;
        setChart({
            options: {
                chart: {
                    id: "basic-bar"
                },
            xaxis: {
                    categories: Country
                }
            },
            series: [
                {
                    name: "Total Confirmed",
                    data: TotalConfirmed
                },
                {
                    name: "Total Recovered",
                    data: TotalDeaths
                },
                {
                    
                    name: "Total Deaths",
                    data: TotalRecovered
                }
            ]
        })

     },[props.obj])
    console.log(chart);
    
    return (
        <div className="container">
            <div className="mixed-chart">
                <Chart
                    options={chart.options}
                    series={chart.series}
                    type="bar"
                    width="100%"
                    animation={chart.animation}
                />
            </div>
        </div>
    )
}

export default Charts
