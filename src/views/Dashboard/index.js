import React from 'react';
import { makeStyles, Grid, Card, CardHeader, CardContent, Hidden, Typography, Divider, LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import HotelTwoToneIcon from '@material-ui/icons/HotelTwoTone';
import HowToRegTwoToneIcon from '@material-ui/icons/HowToRegTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import SentimentVeryDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentVeryDissatisfiedTwoTone';
import VaccinatedLineCard from './VaccinatedLineCard';
import VaccineByAgeCard from './VaccineByAgeCard';
import CovidDataCard from './CovidDataCard';
import StateWiseDataCard from './StateWiseDataCard';

import { DATA_API_ROOT, gridSpacing, numDifferentiation } from './../../store/constant';
const DATA_URL = `${DATA_API_ROOT}/data.min.json`;

const useStyles = makeStyles((theme) => ({
    arrowicon: {
        '& svg': {
            width: '20px',
            height: '20px',
            verticalAlign: 'top',
        },
    },
    flatcardbody: {
        padding: '0px !important',
        '& svg': {
            width: '40px',
            height: '40px',
        },
    },
    flatcardblock: {
        padding: '25px 25px',
        borderLeft: '1px solid' + theme.palette.background.default,
        [theme.breakpoints.down('xs')]: {
            borderLeft: 'none',
            borderBottom: '1px solid' + theme.palette.background.default,
        },
        [theme.breakpoints.down('sm')]: {
            borderBottom: '1px solid' + theme.palette.background.default,
        },
    },
    textsuccess: {
        color: theme.palette.success.main,
    },
    texterror: {
        color: theme.palette.error.main,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();

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

    let conf = 0, recv = 0, decs = 0, actv = 0, confDelta = 0, recvDelta = 0, decsDelta = 0, actvDelta = 0, positivityRatio = 0, activeRatio = 0, recoveredRatio = 0, fatalityRatio = 0, vaccinated1Ratio = 0, vaccinated2Ratio=0;
    let arrowCnf=0, arrowAct=0, arrowRecv=0, arrowDecs=0;
    if(dataData.length === undefined) {
        conf = numDifferentiation(dataData.total.confirmed);
        recv = numDifferentiation(dataData.total.recovered);
        decs = numDifferentiation(dataData.total.deceased);
        actv = numDifferentiation(dataData.total.confirmed - dataData.total.recovered - dataData.total.deceased);
        confDelta = numDifferentiation(dataData.delta.confirmed);
        recvDelta = numDifferentiation(dataData.delta.recovered);
        decsDelta = numDifferentiation(dataData.delta.deceased);
        actvDelta = numDifferentiation(dataData.delta.confirmed - dataData.delta.recovered - dataData.delta.deceased);
        positivityRatio = ((dataData.total.confirmed / dataData.total.tested)*100).toFixed(2);
        activeRatio = (((dataData.total.confirmed - dataData.total.recovered - dataData.total.deceased) / dataData.total.confirmed)*100).toFixed(2);
        recoveredRatio = ((dataData.total.recovered / dataData.total.confirmed)*100).toFixed(2);
        fatalityRatio = ((dataData.total.deceased / dataData.total.confirmed)*100).toFixed(2);
        vaccinated1Ratio = ((dataData.total.vaccinated1 / dataData.meta.population)*100).toFixed(2);
        vaccinated2Ratio = ((dataData.total.vaccinated2 / dataData.meta.population)*100).toFixed(2);

        if(dataData.delta.confirmed > 0) { arrowCnf = 1 } else { arrowCnf = 2 }
        if(dataData.delta.confirmed - dataData.delta.recovered - dataData.delta.deceased > 0) { arrowAct = 1 } else { arrowAct = 2 }
        if(dataData.delta.recovered > 0) { arrowRecv = 1 } else { arrowRecv = 2 }
        if(dataData.delta.deceased > 0) { arrowDecs = 1 } else { arrowDecs = 2 }
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} sm={6} xs={6}>
                        <CovidDataCard
                            primary={conf}
                            secondary="Confirmed"
                            color={theme.palette.error.main}
                            footerData={confDelta}
                            iconPrimary={HotelTwoToneIcon}
                            iconFooter={arrowCnf}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={6}>
                        <CovidDataCard
                            primary={actv}
                            secondary="Active"
                            color={theme.palette.primary.main}
                            footerData={actvDelta}
                            iconPrimary={HowToRegTwoToneIcon}
                            iconFooter={arrowAct}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={6}>
                        <CovidDataCard
                            primary={recv}
                            secondary="Recovered"
                            color={theme.palette.success.main}
                            footerData={recvDelta}
                            iconPrimary={FavoriteTwoToneIcon}
                            iconFooter={arrowRecv}
                        />
                    </Grid>
                    <Grid item lg={3} sm={6} xs={6}>
                        <CovidDataCard
                            primary={decs}
                            secondary="Deceased"
                            color={theme.palette.warning.main}
                            footerData={decsDelta}
                            iconPrimary={SentimentVeryDissatisfiedTwoToneIcon}
                            iconFooter={arrowDecs}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={gridSpacing} direction="column">
                                    <Grid item xs={12}>
                                        <VaccinatedLineCard title="Vaccine Dose Administrated"/>
                                    </Grid>
                                    <Hidden only="sm">
                                        <Grid item xs={12}>
                                            <Card>
                                                <CardContent className={classes.flatcardbody}>
                                                    <Grid container alignItems="center" spacing={0}>
                                                        <Grid item sm={6} xs={12} className={classes.flatcardblock}>
                                                            <Grid container alignItems="center" spacing={1}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" align="left">
                                                                        First dose
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item sm zeroMinWidth>
                                                                    <Typography variant="h5" className={classes.texterror} align="right">
                                                                        {vaccinated1Ratio}%
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item sm={6} xs={12} className={classes.flatcardblock}>
                                                            <Grid container alignItems="center" spacing={1}>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" align="left">
                                                                        vaccinated
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item sm zeroMinWidth>
                                                                    <Typography variant="h5" className={classes.textsuccess} align="right">
                                                                        {vaccinated2Ratio}%
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <VaccineByAgeCard title="Vaccination By Age" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Typography component="div" className="card-header">
                                        Total Ratios
                                    </Typography>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Test Positivity Ratio</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    {positivityRatio}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={parseInt(positivityRatio)} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Active Ratio</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    {activeRatio}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={parseInt(activeRatio)} color="secondary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Recovery Ratio</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    {recoveredRatio}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={parseInt(recoveredRatio)} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Case Fatality Ratio</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    {fatalityRatio}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={parseInt(fatalityRatio)} color="secondary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item sm zeroMinWidth>
                                                <Typography variant="body2">Vaccination Ratio</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align="right">
                                                    {vaccinated2Ratio}%
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LinearProgress variant="determinate" value={parseInt(vaccinated2Ratio)} color="primary" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <StateWiseDataCard title="State-wise Data" />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
