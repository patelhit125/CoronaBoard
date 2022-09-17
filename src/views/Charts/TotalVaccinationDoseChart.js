import React from 'react';
import { useTheme } from '@material-ui/styles';
import Chart from 'react-apexcharts';
import Cookies from 'universal-cookie';
import { DATA_API_ROOT, numDifferentiation, gridSpacing } from '../../store/constant';
import { Card, CardContent, Grid, Typography, CardHeader, Divider } from '@material-ui/core';
import { useState, useEffect } from 'react';
const DATA_URL = `${DATA_API_ROOT}/timeseries.min.json`;

const VaccinationDoseChart = () => {
    const theme = useTheme();
    const cookies = new Cookies();
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
        height: 250,
        options: {
            chart: {
                sparkline: {
                    enabled: true,
                }
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
                theme.palette.primary.main,
                theme.palette.success.main
            ],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            tooltip: {
                theme: cookies.get('darkMode'),
                style: {
                    fontFamily: `'Manrope', sans-serif`,
                },
                fixed: {
                    enabled: false,
                },
                marker: {
                    show: false,
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
                name: 'First Dose',
                data: [],
            },
            {
                name: 'Second Dose',
                data: [],
            },
        ]
    };

    if (dataData.length === undefined) {
        Object.keys(dataData).map((date, index, array) => {
            for(let i=1; i<=array.length; i=i+5) {
                if(array.length-i === index) {
                    if (dataData[date].total.vaccinated2 !== undefined) {
                        chartData.series[0].data.push(dataData[date].total.vaccinated1);
                        chartData.series[1].data.push(dataData[date].total.vaccinated2);
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
                        Total Vaccination Coverage
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

export default VaccinationDoseChart;
