import React from 'react';
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

    const customization = {
        locale: 'en',
        themeType: cookies.get('darkMode'),
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
