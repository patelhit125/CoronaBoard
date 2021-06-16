import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import value from '../../assets/scss/_themes-vars.scss';
import { Card, CardContent, CardHeader, Divider, Hidden, Grid, Typography, useMediaQuery } from '@material-ui/core';

import { VACCINE_API, numDifferentiation } from '../../store/constant';

const VaccinationCatergotyChart = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [dataVaccineGender, setVaccineCategory] = useState([]);

  const getVaccineCategory = () => {
    fetch(VACCINE_API)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setVaccineCategory(json.topBlock.vaccination);
      });
  }

  const chartAgeData = {
    height: 225,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: false,
      },
      labels: ['Male', 'Female', 'Others'],
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
      colors: [value.warning, value.success, value.error],
    },
    series: [],
  }

  if (dataVaccineGender.length === undefined) {
    chartAgeData.series = [dataVaccineGender.male, dataVaccineGender.female, dataVaccineGender.others];
  }

  useEffect(() => {
    getVaccineCategory();
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Typography t="div" className="card-header">
            Vaccination By Gender
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          <Grid item xs={12} sm={7} md={12}>
            <Chart {...chartAgeData} />
          </Grid>
          <Hidden only="lg">
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
                  <Typography variant="h6">Male</Typography>
                  <Typography variant="subtitle1" style={{ color: theme.palette.warning.main }}>
                    {numDifferentiation(dataVaccineGender.male)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h6">Female</Typography>
                  <Typography variant="subtitle1" style={{ color: theme.palette.success.main }}>
                    {numDifferentiation(dataVaccineGender.female)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h6">Others</Typography>
                  <Typography variant="subtitle1" style={{ color: theme.palette.error.main }}>
                    {numDifferentiation(dataVaccineGender.others)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VaccinationCatergotyChart;
