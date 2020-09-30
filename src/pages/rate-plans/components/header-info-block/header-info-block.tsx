import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { STATUSES, IFetchApiCallbackData } from 'services';
import { TRatePlateStoreData } from 'store/rate-plan';
import { emptyData, errorData, loadingData } from '../../../../constants';
import * as style from './header-info-block.module.scss';
import { LoadingText } from '../../../../components/loading-text';

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
        const isLoading = status === STATUSES.LOADING;
        const isLoadingError = status === STATUSES.ERROR;

        return (
            <div className={style.wrapper}>
                <p className={style.infoTitle}>Общая информация</p>
                {isLoadingError && <div className={style.error}>{errorData}</div>}
                {!isLoadingError && (
                    <>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Наименование: </span>
                                <LoadingText isLoading={isLoading}>{data?.name}</LoadingText>
                            </p>
                            <p>
                                <span>ID в биллинге: </span>
                                <LoadingText isLoading={isLoading}>
                                    {data?.ratePlanBillingId}
                                </LoadingText>
                            </p>
                        </div>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Сегмент рынка: </span>
                                <LoadingText isLoading={isLoading}>
                                    {data?.marketSegment?.name}
                                </LoadingText>
                            </p>
                            <p>
                                <span>Тип ТП: </span>
                                <LoadingText isLoading={isLoading}>
                                    {data?.ratePlanType?.name}
                                </LoadingText>
                            </p>
                        </div>
                        <div className={style.infoBlock}>
                            <p>
                                <span>Рубрика тарифа: </span>
                                <LoadingText isLoading={isLoading}>
                                    {data?.ratePlanRubric?.name}
                                </LoadingText>
                            </p>
                        </div>
                        <button>редактировать</button>
                    </>
                )}
            </div>
        );
    }
}

export const HeaderInfoBlock: any = HeaderInfoBlockComponent;
