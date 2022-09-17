import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../themes';
import Routes from '../Routes';
import Cookies from 'universal-cookie';
import NavigationScroll from './NavigationScroll';
import { StylesProvider } from '@material-ui/core/styles';

const App = () => {
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
    
    const customization = {
        locale: 'en',
        themeType: darkModeBool ? 'dark' : 'light',
        direction: false
    };

    return (
        <React.Fragment>
                <IntlProvider locale={customization.locale} defaultLocale="en">
                    <CssBaseline />
                    <NavigationScroll>
                        <StylesProvider>
                            <ThemeProvider theme={theme(customization)}>
                                <Routes />
                            </ThemeProvider>
                        </StylesProvider>
                    </NavigationScroll>
                </IntlProvider>
        </React.Fragment>
    );
};

export default App;
