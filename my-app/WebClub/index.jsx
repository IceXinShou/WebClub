/* @refresh reload */
import {render} from 'solid-js/web';
import {Router} from 'solid-app-router'

import './index.css';
import Body from './Body';
import NavigationBar from './NavigationBar';

history.scrollRestoration = 'manual';
render(() =>
        <Router>
            <Body/>
            <NavigationBar/>
        </Router>
    , document.getElementById('root')
);