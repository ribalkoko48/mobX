import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { STATUSES, IFetchApiCallbackData } from 'services';
import { TRatePlateStoreData } from 'store/rate-plan';
import { emptyData, errorData, loadingData } from '../../../../constants';
import * as style from './header-info-block.module.scss';

type TPropsRatePlanStore = {
    fetchRatesList: () => void;
    status: STATUSES;
    data: TRatePlateStoreData;
    setData: (data: IFetchApiCallbackData<TRatePlateStoreData>) => void;
};

type TPropsHeaderInfoBlock = {
    ratePlanStore: TPropsRatePlanStore;
};

@inject('ratePlanStore')
@observer
class HeaderInfoBlockComponent extends PureComponent<TPropsHeaderInfoBlock> {
    render() {
        const {
            ratePlanStore: { data, status },
        } = this.props;

        return (
            <div className={style.wrapper}>
                <p className={style.infoTitle}>Общая информация</p>
                {status === STATUSES.ERROR && <div className={style.error}>{errorData}</div>}
                {status === STATUSES.LOADING && <div className={style.loading}>{loadingData}</div>}
                {status === STATUSES.LOADED || status === STATUSES.NOT_LOADED ? (
                    <>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Наименование: </span>
                                {data?.name || emptyData}
                            </p>
                            <p>
                                <span>ID в биллинге: </span>
                                {data?.ratePlanBillingId || emptyData}
                            </p>
                        </div>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Сегмент рынка: </span>
                                {data?.marketSegment?.name || emptyData}
                            </p>
                            <p>
                                <span>Тип ТП: </span>
                                {data?.ratePlanType?.name || emptyData}
                            </p>
                        </div>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Рубрика тарифа: </span>
                                {data?.ratePlanRubric?.name || emptyData}
                            </p>
                        </div>
                        <button>редактировать</button>
                    </>
                ) : null}
            </div>
        );
    }
}

export const HeaderInfoBlock: any = HeaderInfoBlockComponent;
