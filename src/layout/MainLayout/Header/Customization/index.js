import React from 'react';
import { makeStyles, Tooltip, Button, useMediaQuery } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        fontSize: '1.5rem',
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            minWidth: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '35px',
        },
    },
}));

const Customization = () => {
    const classes = useStyles();
    const cookies = new Cookies();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    let darkModeBool;
    if (cookies.get('darkMode')) {
        if (cookies.get('darkMode') === 'dark') {
            darkModeBool = true;
        } else {
            darkModeBool = false;
        }
    } else {
        if (prefersDarkMode) {
            darkModeBool = true;
        } else {
            darkModeBool = false;
        }
        cookies.set('darkMode', prefersDarkMode);
    }

    const [dark, setDarkMode] = React.useState(darkModeBool);

    const handleDarkMode = () => {
        if (!dark) {
            setDarkMode(true);
            cookies.set('darkMode', 'dark', { path: '/' });
        }
        else {
            setDarkMode(false);
            cookies.set('darkMode', 'light', { path: '/' });
        }
        window.location.reload();
    }

    return (
        <React.Fragment>
            <Tooltip title='Dark Mode'>
                <Button className={classes.menuButton} color="inherit" onClick={handleDarkMode}>
                    {dark ?
                        <Brightness2OutlinedIcon className={classes.menuIcon} />
                        : <Brightness5OutlinedIcon className={classes.menuIcon} />
                    }
                </Button>
            </Tooltip>
        </React.Fragment>
    );
};

export default Customization;
