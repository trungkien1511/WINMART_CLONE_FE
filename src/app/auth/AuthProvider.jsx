import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './auth-context';
import authService from '@features/auth/apis/authService.js';
import axios from 'axios';

const AUTH_ME_KEY = ['auth', 'me'];

export function AuthProvider({ children }) {
    const queryClient = useQueryClient();

    // QUERY: me
    const meQuery = useQuery({
        queryKey: AUTH_ME_KEY,
        queryFn: async () => {
            try {
                const res = await authService.me();
                return res.data;
            } catch (e) {
                if (axios.isAxiosError(e) && e.response?.status === 401) return null;
                throw e;
            }
        },
        retry: false
    });

    const status = meQuery.isLoading ? 'loading' : meQuery.data ? 'authenticated' : 'guest';

    const user = meQuery.data ?? null;

    const loginMutation = useMutation({
        mutationFn: ({ phoneNumber, password }) => authService.login(phoneNumber, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY });
        }
    });

    const registerMutation = useMutation({
        mutationFn: (payload) => authService.register(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY })
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => queryClient.setQueryData(AUTH_ME_KEY, null)
    });

    const { mutateAsync: loginMutateAsync, isPending: isLoggingIn } = loginMutation;
    const { mutateAsync: registerMutateAsync, isPending: isRegistering } = registerMutation;
    const { mutateAsync: logoutMutateAsync, isPending: isLoggingOut } = logoutMutation;

    const login = useCallback((credentials) => loginMutateAsync(credentials), [loginMutateAsync]);
    const register = useCallback((payload) => registerMutateAsync(payload), [registerMutateAsync]);
    const logout = useCallback(() => logoutMutateAsync(), [logoutMutateAsync]);

    const value = useMemo(
        () => ({ status, user, login, register, logout, isLoggingIn, isLoggingOut, isRegistering }),
        [status, user, login, register, logout, isLoggingIn, isLoggingOut, isRegistering]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
