import { fxRatesPath, FxRatesPage } from '../features/fxRates';
import { aboutPath, AboutPage } from '../features/about';
import { homePath, HomePage } from '../features/home/index';

export const publicRoutes = [
    { path: homePath, component: HomePage, exact: true },
    { path: fxRatesPath, component: FxRatesPage, exact: true },
    { path: aboutPath, component: AboutPage, exact: true }
];
