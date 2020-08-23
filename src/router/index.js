import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Bem from '../pages/bem'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch> 
                <Route exact path="/" component={Bem} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;