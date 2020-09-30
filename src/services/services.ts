import axios, { AxiosRequestConfig } from 'axios';
import { STATUSES, IFetchApiCallbackData } from 'services';
import { onShowError } from '../components/error-notification';
import { errorMessageDefault } from '../constants';

export const axiosInstance = axios.create({
    baseURL: API_ROOT,
    responseType: 'json',
});

axiosInstance.interceptors.response.use((response) => {
    const NOT_AUTHORIZED_STATUS = 401;
    const { data } = response;
    if (data?.error?.errorId === NOT_AUTHORIZED_STATUS) {
        alert('Вы не авторизованы');
    }
    return response;
});

export const requestRaw = (config: AxiosRequestConfig) =>
    axiosInstance({
        ...config,
        headers: {
            ...config?.headers,
        },
    });

export const fetchApi = async (
    config: AxiosRequestConfig,
    setData: (data: IFetchApiCallbackData) => void
) => {
    try {
        const loading = {
            status: STATUSES.LOADING,
            data: null,
            error: null,
        };
        console.log('++++ URL ++++', config?.url);
        // eslint-disable-next-line no-console
        console.info(loading);
        setData(loading);

        const response = await requestRaw(config);
        const json = response.data;

        if (json) {
            const loaded = {
                status: STATUSES.LOADED,
                data: json.data || json,
                error: null,
            };
            // eslint-disable-next-line no-console
            console.info(loaded);
            setData(loaded);
            return loaded;
        }
        const error = {
            status: STATUSES.ERROR,
            data: null,
            error: errorMessageDefault,
        };
        onShowError(errorMessageDefault);
        setData(error);
        return error;
    } catch (error) {
        const errorObj = {
            status: STATUSES.ERROR,
            data: null,
            error,
        };
        onShowError(error?.message || errorMessageDefault);
        setData(errorObj);
        return errorObj;
    }
};
