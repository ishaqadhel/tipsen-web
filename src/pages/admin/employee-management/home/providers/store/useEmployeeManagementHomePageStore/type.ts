import { User } from '@/types/apis/authentication/type';

export type EmployeeManagementHomePageStore = {
    isSortModalOpen: boolean;
    setIsSortModalOpen: (value: boolean) => void;
    isFilterModalOpen: boolean;
    setIsFilterModalOpen: (value: boolean) => void;
    isInformationModalOpen: boolean;
    setIsInformationModalOpen: (value: boolean) => void;
    selectedUser: User | null;
    setSelectedUser: (value: User | null) => void;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    isEditModalOpen: boolean;
    setIsEditModalOpen: (value: boolean) => void;
    setIsAttendanceModalOpen: (value: boolean) => void;
    isAttendanceModalOpen: boolean;
};
