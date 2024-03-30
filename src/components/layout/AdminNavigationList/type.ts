import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

export type PageListType = {
    name: string;
    href: string;
    icon: IconType | LucideIcon;
    exactMatch?: boolean | undefined;
    children?: PageListType[];
};
