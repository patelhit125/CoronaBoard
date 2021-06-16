import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import NavMotion from './layout/NavMotion';
import MainLayout from './layout/MainLayout';
import MinimalLayout from './layout/MinimalLayout';

const Dashboard = lazy(() => import('./views/Dashboard'));
const Charts = lazy(() => import('./views/Charts'));
const Vaccination = lazy(() => import('./views/Vaccination'));
const Resources = lazy(() => import('./views/Resources'));

const Routes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={[]}>
                        <MinimalLayout>
                            <Switch location={location} key={location.pathname}>
                                <NavMotion></NavMotion>
                            </Switch>
                        </MinimalLayout>
                    </Route>
                    <Route
                        path={[
                            '/',
                            '/charts',
                            '/vaccination',
                            '/resources'
                        ]}
                    >
                        <MainLayout>
                            <Switch location={location} key={location.pathname}>
                                <NavMotion>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route exact path="/charts" component={Charts} />
                                    <Route exact path="/vaccination" component={Vaccination} />
                                    <Route exact path="/resources" component={Resources} />
                                </NavMotion>
                                <Redirect to="/" />
                            </Switch>
                        </MainLayout>
                    </Route>
                </Switch>
            </Suspense>
        </AnimatePresence>
    );
};

export default Routes;
