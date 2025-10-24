'use client';

import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useSavedUsers() {
    const [savedUsers, setSavedUsers] = useLocalStorage('savedUsers', []);

    const addUser = (userToAdd) => {
        setSavedUsers((prevUsers) => {
            const isAlreadySaved = prevUsers.some(
                (u) => u.login.uuid === userToAdd.login.uuid
            );

            if (isAlreadySaved) {
                return prevUsers;
            }

            return [...prevUsers, userToAdd];
        });
    };

    const removeUser = (userToRemove) => {
        setSavedUsers((prevUsers) => {
            return prevUsers.filter(
                (u) => u.login.uuid !== userToRemove.login.uuid
            );
        });
    };

    const savedUserIds = useMemo(() => {
        return new Set(savedUsers.map((u) => u.login.uuid));
    }, [savedUsers]);

    return {
        savedUsers,
        addUser,
        removeUser,
        savedUserIds,
    };
}