import { STATUSES, IFetchApiCallbackData } from 'services';

export interface IRatePlanStore {
    fetchRatePlan: (patePlanId: string) => void;
    status: STATUSES;
    data: TRatePlateStoreData;
    setData: (data: IFetchApiCallbackData<TRatePlateStoreData>) => void;
}

export type TRatePlateStoreData = {
    id: string; // "ca21e9c8-cbe2-482c-83d1-92681de4e9a7",
    name: string; // "Welcome Сhina",
    ratePlanBillingId: string; // "1909",
    marketSegment: {
        id: number;
        0;
        name: string; // "Физ. лицо"
    };
    ratePlanRubric: {
        id: number;
        1;
        name: string; // "СНГ. Тёплый прием и Прочие"
    };
    ratePlanType: {
        id: number; // 1,
        name: string; // "Обычный"
    };
    isExclusive: boolean; // false
};
