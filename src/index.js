
import React from "react";
import { createRoot } from "react-dom/client";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';
import App from "./App";
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store=createStore(reducers,compose(applyMiddleware(thunk)));

const domnode=document.getElementById('root');
const root=createRoot(domnode);
root.render(
    
        <Provider store={store}>
            
            <GoogleOAuthProvider clientId="725407432219-44vjfsfatd1g7cbvq4aai1o8597j7iof.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>
            
        </Provider>
   
);
