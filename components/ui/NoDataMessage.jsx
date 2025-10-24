'use client';

export default function NoDataMessage() {
    return (
        <div className="flex justify-center items-center h-screen fixed inset-0 z-[-1]">
            <p className="text-center text-4xl text-gray-500 font-bold">Немає збережених користувачів</p>
        </div>
    );
}