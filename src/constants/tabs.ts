import { ITabsItem } from './types';

export const RATES_TAB = 'rates';
export const SERVICES_TAB = 'services';
export const SMS_ITEMS_TAB = 'sim-items';
export const SMS_TYPES_TAB = 'sim-types';
export const SERVICE_PACKAGES_TAB = 'service-packages';
export const BK_TAB = 'bk';
export const OTHER_DIRECTORIES_TAB = 'other-directories';

export const tabs: ITabsItem[] = [
    { label: 'Тарифы', href: `/${RATES_TAB}`, id: RATES_TAB },
    { label: 'Услуги', href: `/${SERVICES_TAB}`, id: SERVICES_TAB },
    { label: 'Товарные позиции SIM-карт и Регионы', href: `/${SMS_ITEMS_TAB}`, id: SMS_ITEMS_TAB },
    { label: 'Типы SIM-карт', href: `/${SMS_TYPES_TAB}`, id: SMS_TYPES_TAB },
    { label: 'Пакеты обслуживания', href: `/${SERVICE_PACKAGES_TAB}`, id: SERVICE_PACKAGES_TAB },
    { label: 'БК', href: `/${BK_TAB}`, id: BK_TAB },
    { label: 'Другие справочники', href: `/${OTHER_DIRECTORIES_TAB}`, id: OTHER_DIRECTORIES_TAB },
];
