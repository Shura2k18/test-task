'use client';

import { getWeatherInfo } from '@/lib/weatherUtils';

export default function WeatherModal({ weather, user, onClose }) {
    if (!weather || !user) return null;

    const { icon, description } = getWeatherInfo(weather.current_weather.weathercode);

    return (
        <div
            className="fixed inset-0 bg-black/50 z-40 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-2xl shadow-2xl z-50 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-center mb-4">
                    Погода для {user.location.city}
                </h2>

                <div className="text-center mb-6">
                    <span className="text-8xl" role="img" aria-label={description}>{icon}</span>
                    <p className="text-4xl font-bold text-gray-800">
                        {weather.current_weather.temperature}°C
                    </p>
                    <p className="text-xl text-gray-600">{description}</p>
                </div>

                <div className="flex justify-around align-center bg-gray-100 p-3 rounded-lg">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Мін. за день</p>
                        <p className="text-2xl font-bold">
                            {weather.daily.temperature_2m_min[0]}°C
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Вітер</p>
                        <p className="text-2xl font-bold">
                            {weather.current_weather.windspeed} km/h
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Макс. за день</p>
                        <p className="text-2xl font-bold">
                            {weather.daily.temperature_2m_max[0]}°C
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Закрити
                </button>
            </div>
        </div>
    );
}