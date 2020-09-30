import { STATUSES, IFetchApiCallbackData } from 'services';

export interface IRatesStore {
    fetchRatesList: () => void;
    status: STATUSES;
    data: TRateStoreData[];
    setData: (data: IFetchApiCallbackData<TRateStoreData[]>) => void;
}

export type TRateStoreData = { id: string; name: string };
