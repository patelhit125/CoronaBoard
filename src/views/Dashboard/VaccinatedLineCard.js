import React from 'react';
import { useTheme } from '@material-ui/styles';
import Chart from 'react-apexcharts';
import { DATA_API_ROOT, numDifferentiation } from './../../store/constant';
import { Box, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
const DATA_URL = `${DATA_API_ROOT}/timeseries.min.json`;

const useStyles = makeStyles(() => ({
    content: {
        padding: 0,
        paddingBottom: '0 !important',
    },
}));

const VaccinatedLineCard = () => {
    const classes = useStyles();
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
        height: 115,
        options: {
            chart: {
                sparkline: {
                    enabled: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#fff'],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            tooltip: {
                theme: 'dark',
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

    const data = {
        title: "Vaccine Dose Administrated",
        vaccinedose: 0,
        footerData: [
            {
                value: 0,
                label: 'First Dose',
            },
            {
                value: 0,
                label: 'Second Dose',
            },
        ]
    }

    if(dataData.length === undefined) {
        Object.keys(dataData).map((date, index, array) => {
            for(let i=1; i<=array.length; i=i+10) {
                if(array.length-i === index) {
                    if(dataData[date].total.vaccinated2 !== undefined){
                        chartData.series[0].data.push(dataData[date].total.vaccinated1);
                        chartData.series[1].data.push(dataData[date].total.vaccinated2);
                        chartData.options.xaxis.categories.push(date);
                    }
                }
            }
            if(array.length-1 === index) {
                if(dataData[date].total.vaccinated2 !== undefined){
                    data.footerData[0].value = dataData[date].total.vaccinated1;
                    data.footerData[1].value = dataData[date].total.vaccinated2;
                    data.vaccinedose = dataData[date].total.vaccinated1 + dataData[date].total.vaccinated2;
                }
            }
            return null;
        });
    }
    
    return (
        <Card>
            <CardContent className={classes.content}>
                <Box color="#fff" bgcolor={theme.palette.primary.main} p={3}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item container justify="space-between" alignItems="center">
                            {data.title && (
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {data.title}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item>
                                <Grid container alignItems="center">
                                    {data.vaccinedose && (
                                        <Typography variant="subtitle1" color="inherit">
                                            {numDifferentiation(data.vaccinedose)}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {chartData && (
                            <Grid item>
                                <Chart {...chartData} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
                {data.footerData && (
                    <Grid container justify="space-around" alignItems="center">
                        {data.footerData.map((item, index) => (
                            <Grid item key={index}>
                                <Box mt={3} mb={3} p={1}>
                                    <Grid container direction="column" spacing={1} alignItems="center">
                                        <Typography variant="h4">{numDifferentiation(item.value)}</Typography>
                                        <Typography variant="subtitle2" color="secondary">
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default VaccinatedLineCard;
