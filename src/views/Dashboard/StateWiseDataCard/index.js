import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardHeader,
    Divider,
    Grid,
    CardContent,
    Typography
} from '@material-ui/core';

import { DATA_API_ROOT, gridSpacing, STATE_NAMES, numDifferentiation, checkNumber } from '../../../store/constant';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DATA_URL = `${DATA_API_ROOT}/data.min.json`;

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350,
    },
    th: {
        position: 'sticky',
        top: 0,
        zIndex: 999,
        backgroundColor: '#000',
        color: '#fff',
    },
    row: {
        padding: '1rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        width: '30rem',
        whiteSpace: 'normal',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: theme.palette.background.default
    },
    cell: {
        padding: '1rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        width: '30rem',
        whiteSpace: 'normal',
        position: 'sticky',
        left: 0,
        background: theme.palette.background.default
    },
    confirmed: {
        color: theme.palette.error.main,
        fontSize: 12,
    },
    recovered: {
        color: theme.palette.success.main,
        fontSize: 12,
    },
    deceased: {
        color: theme.palette.warning.main,
        fontSize: 12,
    },
}));

export default function StateWiseDataCard() {
    const classes = useStyles();

    const [dataTable, setTable] = useState([]);

    const getData = async () => {
        await fetch(DATA_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setTable(json);
          });
      }
      
    useEffect(() => {
        getData();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={
                            <Typography component="div" className="card-header">
                                State-wise Data
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent className="p-0">
                        <TableContainer>
                            <Table stickyHeader className={classes.table} size="small" aria-label="simple table">
                                <TableHead className={classes.th}>
                                    <TableRow>
                                        <TableCell className={classes.row}>State</TableCell>
                                        <TableCell>Confirmed</TableCell>
                                        <TableCell>Active</TableCell>
                                        <TableCell>Recovered</TableCell>
                                        <TableCell>Deceased</TableCell>
                                        <TableCell>Tested</TableCell>
                                        <TableCell>First Dose</TableCell>
                                        <TableCell>Second Dose</TableCell>
                                        <TableCell>Population</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(dataTable).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={classes.cell}>{STATE_NAMES[row]}</TableCell>
                                            <TableCell><div>{numDifferentiation(dataTable[row].total.confirmed)}</div><div className={classes.confirmed}>{checkNumber(numDifferentiation(dataTable[row].delta?.confirmed))}</div></TableCell>
                                            <TableCell>{numDifferentiation(dataTable[row].total.confirmed - dataTable[row].total.recovered - dataTable[row].total.deceased)}</TableCell>
                                            <TableCell><div>{numDifferentiation(dataTable[row].total.recovered)}</div><div className={classes.recovered}>{checkNumber(numDifferentiation(dataTable[row].delta?.recovered))}</div></TableCell>
                                            <TableCell><div>{numDifferentiation(dataTable[row].total.deceased)}</div><div className={classes.deceased}>{checkNumber(numDifferentiation(dataTable[row].delta?.deceased))}</div></TableCell>
                                            <TableCell>{numDifferentiation(dataTable[row].total.tested)}</TableCell>
                                            <TableCell>{numDifferentiation(dataTable[row].total.vaccinated1)}</TableCell>
                                            <TableCell>{numDifferentiation(dataTable[row].total.vaccinated2)}</TableCell>
                                            <TableCell>{numDifferentiation(dataTable[row].meta.population)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
