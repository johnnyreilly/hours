import { fxRatesPath, FxRatesPage } from '../features/fxRates';
import { aboutPath, AboutPage } from '../features/about';
import { homePath, HomePage } from '../features/home/index';

export const publicRoutes = [
    { path: fxRatesPath, component: FxRatesPage, exact: true },
    { path: homePath, component: HomePage, exact: true },
    { path: aboutPath, component: AboutPage, exact: true }
];
