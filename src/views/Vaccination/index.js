import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Grid, Typography, FormControl, FormControlLabel, RadioGroup, Radio, InputLabel, MenuItem, Select, TextField, Button, CardContent, Chip } from '@material-ui/core';
import { gridSpacing, VACCINE_SETU_API, getDateData } from './../../store/constant';
const DATA_URL_STATES = `${VACCINE_SETU_API}/admin/location/states`;
const DATA_URL_DISTRICTS = `${VACCINE_SETU_API}/admin/location/districts/`;
const DATA_DISTRICTS = `${VACCINE_SETU_API}/appointment/sessions/public/calendarByDistrict?district_id=`;
const DATA_URL_PINCODE = `${VACCINE_SETU_API}/appointment/sessions/public/calendarByPin?pincode=`;

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: 10,
        minWidth: '100%',
        textTransform: 'none',
        fontWeight: 'normal',
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
        },
        height: '3.25rem'
    },
    dataCard: {
        marginTop: '1rem',
    },
    secondaryText: {
        color: theme.palette.secondary.main,
        wordWrap: 'break-word'
    },
    colorSuccess: {
        color: theme.palette.success.main,
    },
    space: {
        wordWrap: 'break-word'
    }
}));

const Vaccination = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [status, setStatus] = React.useState(0);
    const [valueRadio, setRadioValue] = React.useState('pincode');
    const [valueStates, setStatesValue] = React.useState('');
    const [valueDistricts, setDistrictsValue] = React.useState('');
    const [valuePincode, setPincodeValue] = React.useState('');
    const [valueDisable, setDisable] = React.useState(true);
    const [isData, setDataData] = React.useState(false);
    const [dataStates, setStates] = React.useState([]);
    const [dataDistricts, setDistricts] = React.useState([]);
    const [dataData, setData] = React.useState([]);

    const getStates = async () => {
        await fetch(DATA_URL_STATES)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setStates(json.states);
            })
    }

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);

        if (event.target.value === 'district') {
            setStatus(1)
        }
        else {
            setStatus(0)
        }
    };

    const handlePincodeChange = (event) => {
        setPincodeValue(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setDistrictsValue(event.target.value);
    };

    const handleStatesChange = (event) => {
        setStatesValue(event.target.value);
        setDisable(false);
        const getDistricts = async () => {
            await fetch(DATA_URL_DISTRICTS + event.target.value)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    setDistricts(json.districts);
                });
        }

        getDistricts();
    };

    const handleCheckSlots = () => {
        if (valueRadio === 'pincode') {
            const getDataByPincode = async () => {
                await fetch(DATA_URL_PINCODE + valuePincode + '&date=' + getDateData(new Date()))
                    .then((response) => {
                        if (!response.ok) {
                            setDataData(true);
                        }
                        else {
                            setDataData(false);
                            return response.json();
                        }
                    })
                    .then((json) => {
                        if (json === undefined || json.centers.length === 0) { setDataData(true); }
                        else {
                            setDataData(false);
                            setData(json.centers);
                        }
                    })
                    .catch((error) => {
                        setDataData(true);
                        console.log(error);
                    });
            }

            getDataByPincode();
        }
        else {
            const getDataByDistrict = async () => {
                await fetch(DATA_DISTRICTS + valueDistricts + '&date=' + getDateData(new Date()))
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        setData(json.centers);
                    });
            }

            getDataByDistrict();
        }
    }

    React.useEffect(() => {
        getStates();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h2" align="center">
                    Vaccination Slot Finder
                </Typography>
            </Grid>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={3}>
                    <Grid container direction="column" justify="center" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="select" name="select" value={valueRadio} onChange={handleRadioChange}>
                                    <FormControlLabel value="pincode" control={<Radio color="primary" />} label="Pincode" />
                                    <FormControlLabel value="district" control={<Radio color="primary" />} label="District" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {status ? (
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="selectStates">States</InputLabel>
                                    <Select
                                        labelId="selectStates"
                                        id="selectStates"
                                        onChange={handleStatesChange}
                                        value={valueStates}
                                        label="States"
                                    >
                                        {Object.keys(dataStates).map((data, index) => (
                                            <MenuItem key={index} value={data}>{dataStates[data].state_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl} disabled={valueDisable}>
                                    <InputLabel id="selectDistricts">Districts</InputLabel>
                                    <Select
                                        labelId="selectDistricts"
                                        id="selectDistricts"
                                        onChange={handleDistrictChange}
                                        value={valueDistricts}
                                        label="Districts"
                                    >
                                        {Object.keys(dataDistricts).map((data, index) => (
                                            <MenuItem key={index} value={dataDistricts[data].district_id}>{dataDistricts[data].district_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) :
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        error={isData}
                                        inputMode="numeric"
                                        className={classes.formControl}
                                        id="pincode"
                                        onBlur={handlePincodeChange}
                                        label="Pincode"
                                        variant="outlined"
                                    />
                                </form>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button size="large" className={classes.formControl} variant="contained" color="primary" onClick={handleCheckSlots}>
                                Check Slots
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {dataData.length > 0 ?
                    <Grid item xs={12} sm={9}>
                        {!isData ? dataData && Object.keys(dataData).map((data, index) => (
                            <Card key={index} className={classes.dataCard}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={9} className={classes.space}>
                                            {dataData[data].name}
                                            <div className={classes.secondaryText}>
                                                {dataData[data].address}, {dataData[data].state_name} - {dataData[data].pincode}
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} container justify="flex-end" className={classes.colorSuccess}>
                                            <Chip style={{ backgroundColor: dataData[data].fee_type === 'Paid' ? theme.palette.warning.main : theme.palette.success.main }} label={dataData[data].fee_type} />
                                        </Grid>
                                        {Object.keys(dataData[data].sessions).map((sessions, index) => (
                                            <Grid key={index} container className={classes.dataCard}>
                                                <Grid item xs={6}>
                                                    {dataData[data].sessions[sessions].date}
                                                </Grid>
                                                <Grid item xs={6} container justify="flex-end">
                                                    Age: {dataData[data].sessions[sessions].min_age_limit}+
                                                </Grid>
                                                <Grid item xs={6} style={{ color: dataData[data].sessions[sessions].available_capacity_dose1 === 0 ? theme.palette.error.main : theme.palette.success.main }}>
                                                    Dose 1: {dataData[data].sessions[sessions].available_capacity_dose1} <div> {dataData[data].sessions[sessions].vaccine} </div>
                                                </Grid>
                                                <Grid item xs={6} style={{ color: dataData[data].sessions[sessions].available_capacity_dose2 === 0 ? theme.palette.error.main : theme.palette.success.main }}>
                                                    Dose 2: {dataData[data].sessions[sessions].available_capacity_dose2} <div> {dataData[data].sessions[sessions].vaccine} </div>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )) :
                            <Card className={classes.dataCard}>
                                <CardContent>
                                    No slots available
                                </CardContent>
                            </Card>
                        }
                    </Grid>
                    : <Grid item xs={12} sm={9}>
                        <Card className={classes.dataCard}>
                            <CardContent>Please enter your pincode or select district</CardContent>
                        </Card>
                    </Grid>}
            </Grid>
        </Grid>
    );
};

export default Vaccination;
