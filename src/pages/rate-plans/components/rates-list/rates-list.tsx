import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { STATUSES } from 'services';
import cn from 'classnames';
import { IRatesStore } from 'store/rates';
import * as style from './rates-list.module.scss';

type TProps = {
    onChange: (data: { currentRate: string | null }) => void;
    currentRate: string | null;
};

type TStore = {
    rateStore: IRatesStore;
};

@inject('rateStore')
@observer
class RatesListComponent extends PureComponent<TProps & TStore> {
    componentDidMount() {
        const { rateStore } = this.props;

        if (rateStore.status === STATUSES.NOT_LOADED) rateStore.fetchRatesList();
    }

    render() {
        const {
            rateStore: { data, status },
            currentRate,
            onChange,
        } = this.props;

        return (
            <>
                {status === STATUSES.ERROR && 'Данные не загрузились. Обновите странцу'}
                {status === STATUSES.LOADING && '...загрузка'}
                {status === STATUSES.LOADED && (
                    <div className={style.wrapper}>
                        <ul>
                            {data?.map((item) => (
                                <li
                                    role="presentation"
                                    className={cn(
                                        style.listItem,
                                        currentRate === item.id && style.currentItem
                                    )}
                                    key={`${item.id}_${item.name}`}
                                    onClick={() => onChange({ currentRate: item.id })}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }
}

export const RatesList: any = RatesListComponent;
