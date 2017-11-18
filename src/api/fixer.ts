import { ajax } from './ajax';

export interface IFxRates {
    base: string;
    date: string;
    rates: { [ccy: string]: number };
}

export class FixerApi {
    getLatestRates = () =>
        ajax<IFxRates>('https://api.fixer.io/latest')

    getRatesForDate = (date: string) =>
        ajax<IFxRates>('https://api.fixer.io/' + date)

    // saveRates = (rate: IFxRates) =>
    //     ajax<IFxRates>('https://api.fixer.io/', { headers: jsonHeaders, method: 'POST', body: JSON.stringify(rate) })
}
