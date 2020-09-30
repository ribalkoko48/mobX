import { observable, action, computed, runInAction } from 'mobx';
import { STATUSES, IFetchApiCallbackData } from 'services/types';
import { fetchApi } from 'services';
import { TRateStoreData } from './types';

class RateStoreClass {
    @observable data: TRateStoreData = null;

    @observable status: STATUSES = STATUSES.NOT_LOADED;

    @observable error: string | null = null;

    @action setData(response: IFetchApiCallbackData<TRateStoreData>) {
        this.data = response.data;
        this.status = response.status;
        this.error = response.error;
    }

    @action fetchRatesList = async () => {
        await fetchApi(
            {
                method: 'GET',
                url: `${API_ROOT}/rateplans/all`,
            },
            (response) => runInAction(() => this.setData(response))
        );
    };

    @computed get rateData() {
        return this.data;
    }
}

export const rateStore = new RateStoreClass();
