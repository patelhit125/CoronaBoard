import React from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import TotalDataChart from './TotalDataChart';
import DailyDataChart from './DailyDataChart';
import TotalVaccinationDoseChart from './TotalVaccinationDoseChart';
import DailyVaccinationDoseChart from './DailyVaccinationDoseChart';
import VaccinationCategoryChart from './VaccinationCategoryChart';
import VaccinationGenderChart from './VaccinationGenderChart';
import CasesByStatesChart from './CasesByStatesChart';
import VaccinationByStatesChart from './VaccinationByStatesChart';

import { DATA_API_ROOT, gridSpacing } from './../../store/constant';
const DATA_URL = `${DATA_API_ROOT}/data.min.json`;

const Charts = () => {

    const [dataData, setData] = useState([]);

    const getData = async () => {
        await fetch(DATA_URL)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setData(json.TT);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    let vaccinated1Ratio = 0, vaccinated2Ratio = 0;
    if (dataData.length === undefined) {
        vaccinated1Ratio = ((dataData.total.vaccinated1 / dataData.meta.population) * 100).toFixed(2);
        vaccinated2Ratio = ((dataData.total.vaccinated2 / dataData.meta.population) * 100).toFixed(2);
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TotalDataChart title="Total Cases Trends" />
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <DailyDataChart title="Daily Cases Trends" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12}>
                                <Grid container spacing={gridSpacing} direction="column">
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader
                                                title={
                                                    <Typography component="div" className="card-header">
                                                        Vaccination
                                                    </Typography>
                                                }
                                            />
                                            <Divider />
                                            <CardContent>
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item xs={12}>
                                                        <Grid container alignItems="center" spacing={1}>
                                                            <Grid item sm zeroMinWidth>
                                                                <Typography variant="body2">At lease one dose</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="body2" align="right">
                                                                    {vaccinated1Ratio}%
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <LinearProgress variant="determinate" value={parseInt(vaccinated1Ratio)} color="primary" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container alignItems="center" spacing={1}>
                                                            <Grid item sm zeroMinWidth>
                                                                <Typography variant="body2">Fully vaccinated</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="body2" align="right">
                                                                    {vaccinated2Ratio}%
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <LinearProgress variant="determinate" value={parseInt(vaccinated2Ratio)} color="secondary" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <VaccinationCategoryChart title="Vaccination Category" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <VaccinationGenderChart title="Vaccination Gender" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Grid container spacing={gridSpacing} direction="column">
                            <Grid item xs={12} sm={12}>
                                <CasesByStatesChart title="Cases By States" />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <VaccinationByStatesChart title="Total Vaccination Coverage" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TotalVaccinationDoseChart title="Total Vaccination Coverage" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DailyVaccinationDoseChart title="Daily Vaccination Coverage" />
            </Grid>
        </Grid>
    );
};

export default Charts;
