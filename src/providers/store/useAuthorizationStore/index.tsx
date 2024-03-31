import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';

import { User } from '@/types/apis/authentication/type';

type AuthStoreType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
    stopLoading: () => void;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: (user) => {
        set(
            produce<AuthStoreType>((state) => {
                state.isAuthenticated = true;
                state.user = user;
            }),
        );
    },
    logout: () => {
        set(
            produce<AuthStoreType>((state) => {
                state.isAuthenticated = false;
                state.user = null;
            }),
        );
    },
    stopLoading: () => {
        set(
            produce<AuthStoreType>((state) => {
                state.isLoading = false;
            }),
        );
    },
}));

const useAuthorizationStore = createSelectorHooks(useAuthStoreBase);

export default useAuthorizationStore;
