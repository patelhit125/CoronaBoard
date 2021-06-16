import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import { gridSpacing, API_DOMAIN } from './../../store/constant';
const DATA_API = `${API_DOMAIN}/crowdsourced_resources_links.json`;

const useStyles = makeStyles(() => ({
    dataCard: {
        marginTop: '1.5rem',
    },
    space: {
        wordWrap: 'break-word'
    }
}));

const Resources = () => {
    const classes = useStyles();
    const [dataData, setData] = React.useState([]);
    
    const getData = async () => {
        await fetch(DATA_API)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setData(json.crowdsourcd_resources_links);
            });
    }

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h2">
                    Resources
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                {dataData && Object.keys(dataData).map((data, index) => (
                    <Grid key={index} item xs={12} className={classes.dataCard}>
                        <Typography variant="h6">
                            {dataData[data].description}
                        </Typography>
                        <div>
                            <Link href={dataData[data].link} className={classes.space} target="_blank" rel="noopener noreferrer">
                                {dataData[data].link}
                            </Link>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Resources;
