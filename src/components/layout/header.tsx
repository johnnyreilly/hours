import * as React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { aboutPath } from '../features/about';
import { dataPath } from '../features/data/index';
import { homePath } from '../features/home';
import { fxRatesPath } from '../features/fxRates';

interface IHeaderProps extends RouteComponentProps<{}> {
}

@withRouter
@observer
export class Header extends React.Component<Partial<IHeaderProps>> {

    publicLinks = [
        { path: homePath, title: 'Home' },
        { path: dataPath, title: 'Data' },
        { path: fxRatesPath, title: 'FX Rates' },
        { path: aboutPath, title: 'About' },
    ];

    renderLink({ path, title }: { path: string, title: string }) {
        return (
            <Menu.Item key={path} active={this.props.location.pathname === path}>
                <Link key={path} to={path}>{title}</Link>
            </Menu.Item>
        );
    }

    render() {
        return (
            <Menu stackable={true} className={classNames('selection', 'list')}>
                <Menu.Item className="brand">
                    <Link to="/">
                        <Icon className="hourglass start big"  />
                        HOURS
                    </Link>
                </Menu.Item>

                {this.publicLinks.map(link => this.renderLink(link))}
            </Menu>
        );
    }
}