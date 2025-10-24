'use client';

import React from 'react';
import UserList from '@/components/UserList';
import useSavedUsers from '@/hooks/useSavedUsers';
import NoDataMessage from "@/components/ui/NoDataMessage";

export default function SavedPage() {

    const { savedUsers, removeUser, savedUserIds } = useSavedUsers();

    return (
        <div>
            {savedUsers.length === 0 ? (
                <NoDataMessage />
            ): (
                <>
                    <h1 className="text-3xl font-bold mb-6 text-center">Збережені користувачі</h1>
                    <UserList
                        users={savedUsers}
                        onRemoveUser={removeUser}
                        savedUserIds={savedUserIds}
                        isSavedList={true}
                    />
                </>
            )}
        </div>
    );
}
