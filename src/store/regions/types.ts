import { STATUSES, IFetchApiCallbackData } from 'services';

export interface IRegionStore {
    fetchRegionsList: () => void;
    status: STATUSES;
    data: TRegionsStoreData[];
    regionsData: TRegionsStructureData;
    setData: (data: IFetchApiCallbackData<TRegionsStoreData[]>) => void;
}

export type TRegionsStoreData = {
    id: string; // "00000000-0000-0000-0000-000000000001"
    name: string; // "Федерация",
    parentId?: string;
    type: {
        id: number; // 0,
        name: string; // "Федерация"
    };
};

export type TRegionsStructureData = {
    id: string; // "00000000-0000-0000-0000-000000000001"
    name: string; // "Федерация",
    parentId?: string;
    type: {
        id: number; // 0,
        name: string; // "Федерация"
    };
    regions: {
        id: string; // "00000000-0000-0000-0000-000000000001"
        name: string; // "Федерация",
        parentId?: string;
        type: {
            id: number; // 0,
            name: string; // "Федерация"
        };
        area: {
            id: string; // "00000000-0000-0000-0000-000000000001"
            name: string; // "Федерация",
            parentId?: string;
            type: {
                id: number; // 0,
                name: string; // "Федерация"
            };
        }[];
    }[];
}[];
