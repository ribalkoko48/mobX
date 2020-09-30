// eslint-disable-next-line
export enum STATUSES {
    NOT_LOADED = 'NOT_LOADED',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
}

export interface IFetchApiCallbackData<D = any> {
    data: D | null;
    status: STATUSES;
    error: null | string;
}
