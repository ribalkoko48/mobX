import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { STATUSES } from 'services';
import cn from 'classnames';
import AnimateHeight from 'react-animate-height';
import { IRegionStore } from 'store/regions';
import * as style from './region-list.module.scss';

type TProps = {
    onChange: (data: { currentRegionId: string }) => void;
};

type TStore = {
    regionsStore: IRegionStore;
};

type TState = {
    isFederationOpen: boolean;
    currentRegionId: string | null;
    currentAreaId: string | null;
};

@inject('regionsStore')
@observer
class RegionListComponent extends PureComponent<TProps & TStore, TState> {
    state = {
        isFederationOpen: false,
        currentRegionId: null,
        currentAreaId: null,
    };

    componentDidMount() {
        const { regionsStore } = this.props;

        if (regionsStore.status === STATUSES.NOT_LOADED) regionsStore.fetchRegionsList();
    }

    toggleFederation = (id) => () => {
        const { onChange } = this.props;

        onChange({ currentRegionId: id });

        this.setState((prevState) => ({
            isFederationOpen: !prevState.isFederationOpen,
            currentRegionId: null,
            currentAreaId: null,
        }));
    };

    handleCurrentRegion = (id) => () => {
        const { onChange } = this.props;

        onChange({ currentRegionId: id });

        this.setState((prevState) => ({
            currentRegionId: prevState.currentRegionId === id ? null : id,
            currentAreaId: null,
        }));
    };

    handleCurrentArea = (id) => () => {
        const { onChange } = this.props;

        onChange({ currentRegionId: id });

        this.setState((prevState) => ({
            currentAreaId: prevState.currentAreaId === id ? null : id,
        }));
    };

    render() {
        const {
            regionsStore: { status, regionsData },
        } = this.props;
        const { currentRegionId, currentAreaId, isFederationOpen } = this.state;

        return (
            <>
                {status === STATUSES.ERROR && 'Данные не загрузились. Обновите странцу'}
                {status === STATUSES.LOADING && '...загрузка'}
                {status === STATUSES.LOADED && (
                    <div className={style.wrapper}>
                        <ul>
                            {regionsData?.map((item) => (
                                <React.Fragment key={`${item.id}_${item.name}`}>
                                    <li
                                        role="presentation"
                                        className={cn(
                                            style.listItem,
                                            isFederationOpen && style.currentItem
                                        )}
                                        onClick={this.toggleFederation(item.id)}>
                                        {item.name}
                                    </li>
                                    <AnimateHeight height={isFederationOpen ? 'auto' : 0}>
                                        <ul>
                                            {item.regions.map((regionItem) => (
                                                <React.Fragment
                                                    key={`${regionItem.id}_${regionItem.name}`}>
                                                    <li
                                                        role="presentation"
                                                        className={cn(
                                                            style.listItem,
                                                            style.regionItem,
                                                            currentRegionId === regionItem.id &&
                                                                style.currentItem
                                                        )}
                                                        onClick={this.handleCurrentRegion(
                                                            regionItem.id
                                                        )}>
                                                        {regionItem.name}
                                                    </li>
                                                    <AnimateHeight
                                                        height={
                                                            currentRegionId === regionItem.id
                                                                ? 'auto'
                                                                : 0
                                                        }>
                                                        <ul>
                                                            {regionItem.area.map((areaItem) => (
                                                                <li
                                                                    role="presentation"
                                                                    className={cn(
                                                                        style.listItem,
                                                                        style.areaItem,
                                                                        currentAreaId ===
                                                                            areaItem.id &&
                                                                            style.currentItem
                                                                    )}
                                                                    key={`${areaItem.id}_${areaItem.name}`}
                                                                    onClick={this.handleCurrentArea(
                                                                        areaItem.id
                                                                    )}>
                                                                    {areaItem.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AnimateHeight>
                                                </React.Fragment>
                                            ))}
                                        </ul>
                                    </AnimateHeight>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }
}

export const RegionList: any = RegionListComponent;
