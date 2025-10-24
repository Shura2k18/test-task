'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import UserList from '@/components/UserList';
import useSavedUsers from '@/hooks/useSavedUsers';
import Button from "@/components/ui/Button";

const fetchUsers = async ({ pageParam = 1 }) => {
    const res = await fetch(`/api/users?page=${pageParam}&results=9`);
    if (!res.ok) {
        throw new Error('Не вдалося завантажити користувачів');
    }
    return res.json();
};

export default function HomePage() {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = Number(lastPage.info.page);
            const totalPages = 50;

            if (currentPage >= totalPages) {
                return undefined;
            }
            return currentPage + 1;
        },
    });

    const { addUser, savedUserIds } = useSavedUsers();

    const users = data ? data.pages.flatMap(page => page.results) : [];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Випадкові користувачі</h1>

            {isLoading && <p className="text-gray-500 text-lg">Завантаження...</p>}
            {isError && <p className="text-red-500">Помилка: {error.message}</p>}

            <UserList
                users={users}
                onSaveUser={addUser}
                savedUserIds={savedUserIds}
                isSavedList={false}
            />
            {hasNextPage && (
                <div className="flex justify-center mt-6">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    className="font-bold py-3 px-6 rounded-lg text-lg">
                        {isFetchingNextPage ? 'Завантаження...' : 'Завантажити ще'}
                    </Button>
                </div>
            )}
        </div>
    );
}