import { observable, action, runInAction } from 'mobx';
import { STATUSES, IFetchApiCallbackData } from 'services/types';
import { fetchApi } from 'services';
import { TRatePlateStoreData } from './types';

class RatePlanStoreClass {
    @observable data: TRatePlateStoreData = null;

    @observable status: STATUSES = STATUSES.NOT_LOADED;

    @observable error: string | null = null;

    @action setData(response: IFetchApiCallbackData<TRatePlateStoreData>) {
        this.data = response.data;
        this.status = response.status;
        this.error = response.error;
    }

    @action fetchRatePlan = (uuid) => {
        fetchApi(
            {
                method: 'GET',
                url: `${API_ROOT}/rateplans/${uuid}`,
            },
            (response) => runInAction(() => this.setData(response))
        );
    };
}

export const ratePlanStore = new RatePlanStoreClass();
