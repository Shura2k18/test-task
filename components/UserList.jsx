'use client';

import React from 'react';
import UserCard from './UserCard';

export default function UserList({
                                     users = [],
                                     onSaveUser,
                                     onRemoveUser,
                                     savedUserIds = new Set(),
                                     isSavedList
                                 }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {users.map((user) => (
                <UserCard
                    key={user.login.uuid}
                    user={user}
                    onSave={() => onSaveUser(user)}
                    onRemove={() => onRemoveUser(user)}
                    isSaved={savedUserIds.has(user.login.uuid)}
                    isSavedList={isSavedList}
                />
            ))}
        </div>
    );
}