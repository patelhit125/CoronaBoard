import React from 'react';

import {
    makeStyles,
    Button,
    ClickAwayListener,
    Fade,
    Grid,
    Paper,
    Popper,
    List,
    Badge
} from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';

import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { gridSpacing, API_DOMAIN, timeDifference } from '../../../../store/constant';
const DATA_API = `${API_DOMAIN}/updatelog/log.json`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 0,
        borderRadius: '10px',
    },
    ScrollHeight: {
        height: '320px',
        overflowX: 'hidden',
        padding: '1rem',
    },
    menuIIcon: {
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
    dataCard: {
        marginTop: '0.5rem',
    },
    secondaryText: {
        color: theme.palette.secondary.main
    },
    newLine: {
        whiteSpace: 'pre-line',
    }
}));

const NotificationSection = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [badge, setBadge] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [dataData, setData] = React.useState([]);

    const getData = async () => {
        await fetch(DATA_API)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setData(json);
            });
    }

    React.useEffect(() => {
        getData();
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setBadge(true);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Button
                className={classes.menuButton}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <Badge color="error" variant="dot" invisible={badge}>
                    <NotificationsNoneOutlinedIcon className={classes.menuIIcon} />
                </Badge>
                
            </Button>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: {
                        offset: {
                            enable: true,
                            offset: '0px, 10px',
                        },
                        preventOverflow: {
                            padding: 0,
                        },
                    },
                }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List className={classes.root}>
                                    <PerfectScrollbar className={classes.ScrollHeight}>
                                    {dataData && Object.keys(dataData).reverse().map((data, index) => (
                                        <Grid key={index} container spacing={gridSpacing} className={classes.dataCard}>
                                            <Grid item xs={12}>
                                                    <div className={classes.secondaryText}>
                                                        {timeDifference(Date.now()/1000, dataData[data].timestamp)}
                                                    </div>
                                                    <div className={classes.newLine}>
                                                        {dataData[data].update}
                                                    </div>
                                            </Grid>
                                        </Grid>
                                    ))}
                                    </PerfectScrollbar>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
