import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { IRatePlanStore } from 'store/rate-plan';
import { SortIcon } from 'components/sort-icon';
import { ArchiveIcon } from 'assets/icons';
import Tooltip from '@material-ui/core/Tooltip';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
import { Switch } from '@material-ui/core';
import { Input } from 'components/input';
import { RegionList } from './components/region-list';
import { RatesList } from './components/rates-list';
import { HeaderInfoBlock } from './components/header-info-block';
import * as style from './rate-plans.module.scss';

// const regions = Array.from({ length: 24 }, (_, i) => ({ id: i, label: `Строка с номером ${i}` }));

type TStore = {
    ratePlanStore: IRatePlanStore;
};

type TState = {
    search: string;

    currentRate: string | null; // тариф
    currentRegionId: string | null; // регион

    isAscSort: boolean;
    isOpenAppModal: boolean;
    isOpenDeleteModal: boolean;
};

@inject('ratePlanStore')
@observer
export class RatePlans extends PureComponent<TStore, TState> {
    state = {
        search: '',
        currentRate: null,
        currentRegionId: null,
        isAscSort: true,
        isOpenAppModal: false,
        isOpenDeleteModal: false,
    };

    componentDidUpdate(prevProps: Readonly<never>, prevState: Readonly<TState>) {
        const { currentRate, currentRegionId } = this.state;

        if (currentRate !== prevState.currentRate) {
            this.handleFetchRatePlan();
        }

        if (currentRegionId !== prevState.currentRegionId) {
            console.log('currentRegionId', currentRegionId);
        }
    }

    handleFetchRatePlan = async () => {
        const {
            ratePlanStore: { fetchRatePlan },
        } = this.props;
        const { currentRate } = this.state;

        fetchRatePlan(currentRate);
    };

    toggleSort = () => {
        this.setState((prevState) => ({
            isAscSort: !prevState.isAscSort,
        }));
    };

    toggleAddModal = () => {
        this.setState((prevState) => ({
            isOpenAppModal: !prevState.isOpenAppModal,
        }));
    };

    toggleDeleteModal = () => {
        this.setState((prevState) => ({
            isOpenDeleteModal: !prevState.isOpenDeleteModal,
        }));
    };

    handleChangeSearch = ({ target: { value } }) => {
        this.setState({
            search: value,
        });
    };

    handleChangeRegion = ({ currentRegionId }) => {
        this.setState({
            currentRegionId,
        });
    };

    handleChangeRate = ({ currentRate }) => {
        this.setState({
            currentRate,
        });
    };

    render() {
        const { isAscSort, currentRate, search } = this.state;

        return (
            <div className={style.wrapper}>
                <div className={style.rates}>
                    <div className={style.controls}>
                        <SortIcon
                            className={style.sortIcon}
                            isAsc={isAscSort}
                            onClick={this.toggleSort}
                        />
                        <div className={style.controlsDescription}>Список тарифов</div>
                        <Tooltip title="Создание нового тарифа">
                            <ControlPointIcon
                                className={style.icon}
                                onClick={this.toggleAddModal}
                            />
                        </Tooltip>
                        <Tooltip title="Удалить тариф">
                            <HighlightOffIcon
                                className={cn(style.icon, !currentRate && style.disable)}
                                onClick={this.toggleDeleteModal}
                            />
                        </Tooltip>
                    </div>
                    <div className={style.search}>
                        <Input
                            placeholder="Поиск по тарифам"
                            icon={<SearchIcon className={style.searchIcon} />}
                            value={search}
                            onChange={this.handleChangeSearch}
                        />
                    </div>
                    <div className={style.switchBlock}>
                        <ArchiveIcon />
                        <span>Показать архивные</span>
                        <Switch disabled checked={false} />
                    </div>
                    <RatesList currentRate={currentRate} onChange={this.handleChangeRate} />
                </div>
                <RegionList onChange={this.handleChangeRegion} />
                <div className={style.content}>
                    <HeaderInfoBlock />
                    <div className={style.contentTable}>table</div>
                </div>
            </div>
        );
    }
}
