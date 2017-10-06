import * as React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { aboutPath } from '../features/about';
import { homePath } from '../features/home';
import { fxRatesPath } from '../features/fxRates';
import FaHourglassStart from 'react-icons/lib/fa/hourglass-3';

interface IHeaderProps extends RouteComponentProps<{}> {
}

@withRouter
@observer
export class Header extends React.Component<Partial<IHeaderProps>> {

    publicLinks = [
        { path: fxRatesPath, title: 'FX Rates' },
        { path: homePath, title: 'Home' },
        { path: aboutPath, title: 'About' },
    ];

    renderLink({ path, title }: { path: string, title: string }) {
        return (
            <Link key={path} to={path} className={classNames('nav-item', 'is-tab', this.isActive(path))}>{title}</Link>
        );
    }

    isActive(to: string) {
        return this.props.location.pathname === to ? 'is-active' : '';
    }

    render() {
        return (
            <nav className="nav has-shadow" id="top">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <FaHourglassStart />
                            <span style={{ marginLeft: '5px' }}>Hours</span>
                        </Link>
                    </div>
                    <span className="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className="nav-right nav-menu">
                        {this.publicLinks.map(link => this.renderLink(link))}
                    </div>
                </div>
            </nav>
        );
    }
}