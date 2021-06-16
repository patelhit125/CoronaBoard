import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import value from '../../assets/scss/_themes-vars.scss';
import { Card, CardContent, CardHeader, Divider, Hidden, Grid, Typography, useMediaQuery } from '@material-ui/core';

import { VACCINE_API, numDifferentiation } from './../../store/constant';

const VaccineByAgeCard = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    const [dataVaccineByAge, setVaccineByAge] = useState([]);

    const getVaccineByAge = () => {
        fetch(VACCINE_API)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setVaccineByAge(json.vaccinationByAge);
        });
    }
    
    const chartAgeData = {
        height: 225,
        type: 'donut',
        options: {
            dataLabels: {
                enabled: false,
            },
            labels: ['18 - 45', '45 - 60', 'Above 60'],
            legend: {
                show: true,
                position: 'bottom',
                fontFamily: 'inherit',
                labels: {
                    colors: 'inherit',
                    fontFamily: 'inherit',
                },
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: function (val) {
                      return numDifferentiation(val)
                    }
                }
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10,
            },
            colors: [value.error, value.primary, value.warning],
        },
        series: [],
    }

    if(dataVaccineByAge.length === undefined) {
        chartAgeData.series = [dataVaccineByAge.vac_18_45, dataVaccineByAge.vac_45_60, dataVaccineByAge.above_60];
    }

    useEffect(() => {
        getVaccineByAge();
    }, []);

    return (
        <Card>
            <CardHeader
                title={
                    <Typography t="div" className="card-header">
                        Vaccination By Age
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
                    <Grid item xs={12} sm={7} md={12}>
                        <Chart {...chartAgeData} />
                    </Grid>
                    <Hidden only="sm">
                        <Grid item>
                            <Divider />
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        container
                        direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
                        justify="space-around"
                        alignItems="center"
                        xs={12}
                        sm={5}
                        md={12}
                    >
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Typography variant="h6">18 - 45</Typography>
                                <Typography variant="subtitle1" style={{ color: theme.palette.error.main }}>
                                    {numDifferentiation(dataVaccineByAge.vac_18_45)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Typography variant="h6">45 - 60</Typography>
                                <Typography variant="subtitle1" style={{ color: theme.palette.primary.main }}>
                                        {numDifferentiation(dataVaccineByAge.vac_45_60)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Typography variant="h6">Above 60</Typography>
                                <Typography variant="subtitle1" style={{ color: theme.palette.warning.main }}>
                                    {numDifferentiation(dataVaccineByAge.above_60)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default VaccineByAgeCard;
