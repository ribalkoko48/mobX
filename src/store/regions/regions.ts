import { observable, action, computed, runInAction } from 'mobx';
import { STATUSES, IFetchApiCallbackData } from 'services/types';
import { fetchApi } from 'services';
import { TRegionsStoreData } from './types';

const FEDERATION_ID = 0;
const REGION_ID = 1;
const AREA_ID = 2;

class RegionsStoreClass {
    @observable data: TRegionsStoreData[] = null;

    @observable status: STATUSES = STATUSES.NOT_LOADED;

    @observable error: string | null = null;

    @action setData(response: IFetchApiCallbackData<TRegionsStoreData[]>) {
        this.data = response.data;
        this.status = response.status;
        this.error = response.error;
    }

    @action fetchRegionsList = async () => {
        await fetchApi(
            {
                method: 'GET',
                url: `${API_ROOT}/TerritorialStructure/rootId=`,
            },
            (response) => runInAction(() => this.setData(response))
        );
    };

    @computed get regionsData() {
        if (this.data) {
            const federations = this.data.find(({ type: { id } }) => id === FEDERATION_ID);
            const regions = this.data.filter(({ type: { id } }) => id === REGION_ID);
            const area = this.data.filter(({ type: { id } }) => id === AREA_ID);

            return [
                {
                    ...federations,
                    regions: regions.map((regionItem) => ({
                        ...regionItem,
                        area: area.filter((areaItem) => regionItem.id === areaItem.parentId),
                    })),
                },
            ];
        }

        return null;
    }
}

export const regionsStore = new RegionsStoreClass();
