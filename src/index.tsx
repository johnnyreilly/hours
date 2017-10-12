import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { App } from './app';
import { Api } from './api';
import { Config } from './config';
import { Dependencies } from './dependencies';
import { StorageFacade } from './dependencies/storageFacade';
import './styles/styles.scss';

/**
 * Wire up dependencies which will be used by the app
 */
function getDependencies() {
    const config = new Config({
        // These values are suppied by the webpack.DefinePlugin - see config
        API_BASE_URL: process.env.API_BASE_URL,
        APP_BASE_URL: process.env.APP_BASE_URL,
        LOGIN_APP_BASE_URL: process.env.LOGIN_APP_BASE_URL,
        LOGIN_API_BASE_URL: process.env.LOGIN_API_BASE_URL,
        NODE_ENV: process.env.NODE_ENV,
    });
    const api = new Api(config);
    const storage = new StorageFacade(window.localStorage);
    const dependencies = new Dependencies(api, config, storage);

    dependencies.securityStore.initialise();

    return dependencies;
}

/**
 * Render the app
 */
function renderApp(dependencies: Dependencies) {
    const rootEl = document.getElementById('root');
    ReactDOM.render(
        <AppContainer>
            <Provider {...dependencies}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AppContainer>,
        rootEl
    );

    const anyModule: any = module;

    // Hot Module Replacement API
    if (anyModule.hot) {
        anyModule.hot.accept('./app', () => {
            const makeNextApp = require('./app').default;
            const nextApp = makeNextApp(['app']);
            ReactDOM.render(
                <AppContainer>
                    <Provider {...dependencies}>
                        <Router>
                            {nextApp.App}
                        </Router>
                    </Provider>
                </AppContainer>,
                rootEl
            );
        });
    }
}

renderApp(
    getDependencies()
);
