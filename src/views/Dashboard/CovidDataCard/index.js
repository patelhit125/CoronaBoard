import React from 'react';

import { makeStyles, Card, CardContent, Grid, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles((theme) => ({
    secondary: {
        marginTop: '.5rem',
    },
    footer: {
        textAlign: 'center',
        padding: theme.spacing(1.2),
        paddingLeft: '20px',
        paddingRight: '20px',
        color: theme.palette.common.white,
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        }
    },
    primaryIcon: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '.5rem',
        }
    }
}));

const CovidDataCard = (props) => {
    const { primary, secondary, iconPrimary, color, footerData, iconFooter } = props;
    const classes = useStyles();

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    let IconFooter;
    if(iconFooter === 1) {
        IconFooter = TrendingUpIcon;
    }
    if(iconFooter === 2) {
        IconFooter = TrendingDownIcon;
    }
    const footerIcon = IconFooter ? <IconFooter /> : null;
    const primaryData = primary ? primary : 0;

    return (
        <Card>
            <CardContent>
                <Grid container justify="space-between" className={classes.container}>
                    <Grid item lg={6} sm={6} xs={12}>
                        <Typography variant="h3" style={{ color: color }}>
                            {primaryData}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.secondary}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" style={{ color: color }} className={classes.primaryIcon}>
                            {primaryIcon}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <div style={{ background: color }}>
                <Grid container justify="space-between" className={classes.footer}>
                    <Grid item>
                        <Typography variant="body2">{footerData}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{footerIcon}</Typography>
                    </Grid>
                </Grid>
            </div>
        </Card>
    );
};

export default CovidDataCard;
