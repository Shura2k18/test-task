import { NextResponse } from 'next/server';

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
        return NextResponse.json(
            { error: 'Відсутні параметри latitude або longitude' },
            { status: 400 }
        );
    }

    try {
        const weatherUrl = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            const errorData = await weatherResponse.text();
            throw new Error(`Помилка API погоди: ${errorData}`);
        }

        const weatherData = await weatherResponse.json();
        return NextResponse.json(weatherData);

    } catch (error) {
        console.error('Помилка в /api/weather:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}