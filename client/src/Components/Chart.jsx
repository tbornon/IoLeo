import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Chart(props) {
    const [data, setData] = useState({
        datasets: [
            {
                fill: true,
                lineTension: 0.4,
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.data.map(data => ({ y: data.value, x: new Date(data.date) }))
            }
        ]
    });

    useEffect(() => {
        setData({
            datasets: [
                {
                    fill: true,
                    lineTension: 0.4,
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 4,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    label: props.variable.displayName,
                    data: props.data.map(data => ({ y: data.value, x: new Date(data.date) }))
                }
            ]
        });
    }, [props.data, props.variable]
    );

    useEffect(() => {
        if (props.newData && props.newData.variable === props.variable.name && props.newData.value) {
            setData({
                datasets: [
                    {
                        ...data.datasets[0],
                        data: [...data.datasets[0].data, {y:props.newData.value, x: props.newData.date}]
                    }
                ]
            });
        }// eslint-disable-next-line
    }, [props.newData, props.variable]
    );

    const options = {
        title: {
            display: true,
            text: props.title
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    // round: 'day'
                    tooltipFormat: 'DD/MM/YY HH:mm'
                },
                distribution: 'linear'
            }],
            yAxes: [{
                ticks: {
                    callback: (value, index, values) => value + props.variable.unit
                },
            }]
        },
        legend: {
            display: true,
            position: "bottom"
        },
        tooltips: {
            displayColors: false,
            callbacks: {
                label: (tooltipItem) => tooltipItem.yLabel + props.variable.unit,
                //title: () => null
            }
        }
    }

    return (
        <Line data={data} options={options} />
    )
}