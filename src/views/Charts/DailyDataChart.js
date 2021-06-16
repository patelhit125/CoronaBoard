import React from 'react';
import { useTheme } from '@material-ui/styles';
import Chart from 'react-apexcharts';
import { DATA_API_ROOT, gridSpacing, numDifferentiation } from '../../store/constant';
import { Card, CardContent, Grid, Typography, CardHeader, Divider } from '@material-ui/core';
import { useState, useEffect } from 'react';
const DATA_URL = `${DATA_API_ROOT}/timeseries.min.json`;

const DailyDataChart = () => {
    const theme = useTheme();

    const [dataData, setData] = useState([]);

    const getData = async () => {
        await fetch(DATA_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setData(json.TT.dates);
          });
    }

    useEffect(() => {
        getData();
    }, []);

    const chartData = {
        type: 'line',
        height: 300,
        options: {
            chart: {
                sparkline: {
                    enabled: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: 'top',
                fontFamily: 'inherit',
                labels: {
                    colors: 'inherit',
                    fontFamily: 'inherit',
                }
            },
            colors: [
                theme.palette.error.main,
                theme.palette.primary.main,
                theme.palette.success.main,
                theme.palette.warning.main
            ],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false,
                },
                y: {
                    formatter: function (val) {
                      return numDifferentiation(val)
                    }
                }
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: 'Confirmed',
                data: [],
            },
            {
                name: 'Active',
                data: [],
            },
            {
                name: 'Recovered',
                data: [],
            },
            {
                name: 'Deceased',
                data: [],
            },
        ]
    };

    if(dataData.length === undefined) {
        Object.keys(dataData).map((date, index, array) => {
          for(let i=1; i<=array.length; i=i+20) {
            if(array.length-i === index) {
              if(dataData[date].delta.confirmed !== undefined){
                chartData.series[0].data.push(dataData[date].delta.confirmed);
                chartData.series[1].data.push(dataData[date].delta.confirmed-dataData[date].delta.recovered-dataData[date].delta.deceased);
                chartData.series[2].data.push(dataData[date].delta.recovered);
                chartData.series[3].data.push(dataData[date].delta.deceased);
                chartData.options.xaxis.categories.push(date);
              }
            }
          }

          return null;
        });
    }
    
    return (
        <Card>
            <CardHeader
                title={
                    <Typography component="div" className="card-header">
                      Daily Cases Trends
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item sm zeroMinWidth>
                                {chartData && (
                                    <Grid item>
                                        <Chart {...chartData} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DailyDataChart;
