import * as React from 'react';
import {
    withRouter,
    Route,
    RouteComponentProps,
    Switch
} from 'react-router-dom';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as classNames from 'classnames';
import { Header } from './header';
import { publicRoutes } from './routes';
import { NotFound } from '../shared/notFound';
import * as css from '../../styles/styles.scss';
import { config } from '../../config';

interface ILayoutProps extends RouteComponentProps<{}> {
}

@withRouter
@observer
export class Layout extends React.Component<Partial<ILayoutProps>> {

    renderRoute = ({ path, component, exact }: { path: string; exact?: boolean; component: React.ComponentType<RouteComponentProps<any> | {}> }) => (
        <Route key={path} exact={exact} path={path} component={component} />
    )

    render() {
        return (
            <div>
                <Header />
                <div>
                    <main className={classNames(css.container, css.section)} role="main">
                        <Switch>
                            {publicRoutes.map(this.renderRoute)}
                            <Route component={NotFound} />
                        </Switch>
                    </main>
                </div>
                {config.development ? <DevTools /> : null}
            </div>
        );
    }
}
