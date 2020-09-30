import { TCallbackTab } from 'components/tabs/components/tab';

export interface ITabsItem {
    label: string;
    href: string;
    id: string;
    onClick?: TCallbackTab;
    disabled?: boolean;
}
