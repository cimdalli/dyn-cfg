import * as React from 'react';
import * as Redux from 'redux';

import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer, ReactRouterReduxHistory } from 'react-router-redux'

import { reducers, StoreState } from "../reducers"
import { StoreBuilder } from 'redux-ts'

import routes from '../routes'


export default class RootContainer extends React.Component<any, any>{
    store: Redux.Store<StoreState>;
    history: ReactRouterReduxHistory;

    constructor() {
        super();

        let devTool = (f: Redux.StoreCreator) => {
            return ((window as any).__REDUX_DEVTOOLS_EXTENSION__) ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ : f
        }

        this.store = new StoreBuilder<StoreState>()
            .withEnhancer(devTool)
            .withMiddleware(routerMiddleware(hashHistory))
            .withReducer("routing", routerReducer)
            .withReducersMap(reducers)
            .build();

        this.history = syncHistoryWithStore(hashHistory, this.store);
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router history={this.history} routes={routes} />
            </Provider>
        );
    }
} 