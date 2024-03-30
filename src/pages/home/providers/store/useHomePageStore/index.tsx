import { create } from 'zustand';

import { HomePageStoreType } from '@/pages/home/providers/store/useHomePageStore/type';

const useHomePageStore = create<HomePageStoreType>((set) => ({
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({ isCreateModalOpen: value }),
}));

export default useHomePageStore;
