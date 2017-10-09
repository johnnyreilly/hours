import * as mobx from 'mobx';
import { Api } from '../api';
import { CounterStore } from './counterStore';
import { FxRatesStore } from './fxRatesStore';
import { HourStore } from './hourStore';

mobx.useStrict(true); // Use to prevent mysterious issues creeping in https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#usestrict

export class Stores {
    fxRatesStore: FxRatesStore;
    counterStore: CounterStore;
    hourStore: HourStore;
    
    constructor(api: Api) {
        this.fxRatesStore = new FxRatesStore(api);
        this.counterStore = new CounterStore();
        this.hourStore = new HourStore();
    }
}
