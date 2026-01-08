import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './auth-context';
import authService from '@features/auth/apis/authService.js';

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
                if (e?.response?.status === 401) return null;
                throw e;
            }
        },
        retry: false
    });

    const status = meQuery.data ? 'authenticated' : 'guest';
    const user = meQuery.data ?? null;

    // MUTATION: login
    const loginMutation = useMutation({
        mutationFn: ({ phoneNumber, password }) => authService.login(phoneNumber, password),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY })
    });

    // MUTATION: logout
    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.setQueryData(AUTH_ME_KEY, null);
            queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY });
        }
    });

    const login = useCallback(
        (credentials) => {
            return loginMutation.mutateAsync(credentials);
        },
        [loginMutation] // ← phụ thuộc object mutation
    );

    const logout = useCallback(() => {
        return logoutMutation.mutateAsync();
    }, [logoutMutation]);

    const value = useMemo(
        () => ({
            status,
            user,
            login,
            logout,
            isLoggingIn: loginMutation.isPending,
            isLoggingOut: logoutMutation.isPending
        }),
        [status, user, login, logout, loginMutation.isPending, logoutMutation.isPending]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
