import { create } from 'zustand';

import { AdminLayoutStoreType } from '@/providers/store/useAdminLayoutStore/type';

const useAdminLayoutStore = create<AdminLayoutStoreType>((set) => ({
    isMobileSideBarOpen: false,
    setIsMobileSideBarOpen: (value: boolean) =>
        set(() => ({
            isMobileSideBarOpen: value,
        })),
}));

export default useAdminLayoutStore;
