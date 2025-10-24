'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <nav className={"bg-white px-6 py-4 border-b border-gray-200 flex gap-6 shadow-sm"}>
            <Link href="/" className={"text-lg font-semibold text-blue-600 hover:text-blue-800"}>
                Головна (Випадкові)
            </Link>
            <Link href="/saved" className={"text-lg font-semibold text-blue-600 hover:text-blue-800"}>
                Збережені
            </Link>
        </nav>
    );
}