import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from '../pages/Main/index';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Main}></Route>
    </Switch>
)

export default Routes