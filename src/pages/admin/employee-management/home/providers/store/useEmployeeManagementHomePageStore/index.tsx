import { create } from 'zustand';

import { EmployeeManagementHomePageStore } from '@/pages/admin/employee-management/home/providers/store/useEmployeeManagementHomePageStore/type';

import { User } from '@/types/apis/authentication/type';

const useEmployeeManagementHomePageStore =
    create<EmployeeManagementHomePageStore>((set) => ({
        isSortModalOpen: false,
        isFilterModalOpen: false,
        isInformationModalOpen: false,
        selectedUser: null,
        isCreateModalOpen: false,
        isEditModalOpen: false,
        setIsSortModalOpen: (value: boolean) =>
            set(() => ({
                isSortModalOpen: value,
            })),
        setIsFilterModalOpen: (value: boolean) =>
            set(() => ({
                isFilterModalOpen: value,
            })),
        setIsInformationModalOpen: (value: boolean) =>
            set(() => ({
                isInformationModalOpen: value,
            })),
        setSelectedUser: (value: User | null) =>
            set(() => ({
                selectedUser: value,
            })),
        setIsCreateModalOpen: (value: boolean) =>
            set(() => ({
                isCreateModalOpen: value,
            })),
        setIsEditModalOpen: (value: boolean) =>
            set(() => ({
                isEditModalOpen: value,
            })),
    }));

export default useEmployeeManagementHomePageStore;
