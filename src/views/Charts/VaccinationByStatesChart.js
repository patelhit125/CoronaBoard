import React from 'react';
import { useTheme } from '@material-ui/styles';
import Chart from 'react-apexcharts';
import Cookies from 'universal-cookie';
import { DATA_API_ROOT, gridSpacing, STATE_NAMES, numDifferentiation } from '../../store/constant';
import { Card, CardContent, Grid, Typography, CardHeader, Divider } from '@material-ui/core';
import { useState, useEffect } from 'react';
const DATA_URL = `${DATA_API_ROOT}/data.min.json`;

const CasesByStatesChart = () => {
    const theme = useTheme();
    const cookies = new Cookies();
    const [dataData, setData] = useState([]);

    const getData = async () => {
        await fetch(DATA_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setData(json);
          });
    }

    useEffect(() => {
        getData();
    }, []);

    const chartData = {
        type: 'bar',
        height: 334,
        options: {
            chart: {
                toolbar: {
                  show: false
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
                theme.palette.warning.main
            ],
            stroke: {
                show: false,
            },
            tooltip: {
                theme: cookies.get('darkMode'),
                style: {
                    fontFamily: `'Manrope', sans-serif`,
                },
                fixed: {
                    enabled: false,
                },
                x: {
                    formatter: function(state) {
                        return STATE_NAMES[state];
                    }
                },
                y: {
                    formatter: function (val) {
                      return numDifferentiation(val)
                    }
                }
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        colors: theme.palette.text.primary
                    }
                }
            },
            responsive: [{
                breakpoint: 789,
                options: {
                    plotOptions: {
                      bar: {
                        dataLabels: {
                            hideOverflowingLabels: true,
                        }
                      }
                    }
                },
                xaxis: {
                    labels: {
                        hideOverlappingLabels: true,
                    },
                },
            }],
            grid: {
                show: false,
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

    if(dataData.length === undefined) {
        Object.keys(dataData).map((states) => {
            if(states!=='TT') {
                chartData.series[0].data.push(dataData[states].total.vaccinated1);
                chartData.series[1].data.push(dataData[states].total.vaccinated2);
                chartData.options.xaxis.categories.push(states);
            }
            return null;
        });
    }
    
    return (
        <Card>
            <CardHeader
                title={
                    <Typography component="div" className="card-header">
                        Cases By States
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

export default CasesByStatesChart;
