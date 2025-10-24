import { NextResponse } from 'next/server';

const RANDOM_USER_API = 'https://randomuser.me/api/';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const results = searchParams.get('results') || '9';

    try {
        const userResponse = await fetch(
            `${RANDOM_USER_API}?page=${page}&results=${results}&seed=abc`
        );

        if (!userResponse.ok) {
            const errorData = await userResponse.text();
            throw new Error(`Не вдалося завантажити користувачів: ${errorData}`);
        }

        const userData = await userResponse.json();

        return NextResponse.json(userData);

    } catch (error) {
        console.error('Помилка в /api/users:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}