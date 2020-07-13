import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './paginas/Home';
import Sobre from './paginas/Sobre';
import NotFound from './paginas/NotFound';
import Login from './paginas/Login';
import Signup from './paginas/Signup';
import AdPage from './paginas/AdPage';
import AddAd from './paginas/AddAd';
import Ads from './paginas/Ads';
import MyAccount from './paginas/MyAccount';

export default () =>{
    return(
        <Switch>
            <RouteHandler exact path="/">
                <Home />
            </RouteHandler>
            <RouteHandler private exact path="/sobre">
                <Sobre />
            </RouteHandler>
            <RouteHandler exact path="/login">
                <Login />
            </RouteHandler>
            <RouteHandler exact path="/signup">
                <Signup />
            </RouteHandler>
            <RouteHandler exact path="/ad/:id">
                <AdPage />
            </RouteHandler>
            <RouteHandler private exact path="/postar-anuncio">
                <AddAd />
            </RouteHandler>
            <RouteHandler private exact path="/ads">
                <Ads />
            </RouteHandler>
            <RouteHandler private exact path="/minha-conta">
                <MyAccount />
            </RouteHandler>
            <RouteHandler >
                <NotFound />
            </RouteHandler>
        </Switch>

    )
}