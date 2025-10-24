'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherModal from './WeatherModal';
import { getWeatherInfo } from '@/lib/weatherUtils';
import Button from "@/components/ui/Button";

function WeatherSpinner() {
    return (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    );
}

const fetchWeather = async (user) => {
    const { latitude, longitude } = user.location.coordinates;
    const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);

    if (!res.ok) {
        throw new Error('Не вдалося завантажити погоду');
    }
    return res.json();
};

export default function UserCard({ user, onSave, onRemove, isSaved, isSavedList = false }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQueryEnabled, setIsQueryEnabled] = useState(false);

    const {
        data: weather,
        isFetching: isWeatherLoading,
        isError: isWeatherError,
        error: weatherError,
        refetch
    } = useQuery({
        queryKey: ['weather', user.login.uuid],
        queryFn: () => fetchWeather(user),

        enabled: isQueryEnabled,
        refetchInterval: isQueryEnabled ? 1000 * 60 * 5 : false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const handleWeatherClick = async () => {
        if (isModalOpen) {
            setIsModalOpen(false);
            return;
        }
        if (weather) {
            setIsModalOpen(true);
            return;
        }

        try {
            const { data: fetchedData } = await refetch();

            if (fetchedData) {
                setIsQueryEnabled(true);
                setIsModalOpen(true);
            }
        } catch (err) {
            console.error("Не вдалося завантажити погоду: ", err);
        }
    };

    const weatherInfo = weather ? getWeatherInfo(weather.current_weather.weathercode) : null;

    return (
        <>
            <div className="bg-white p-5 rounded-2xl shadow-lg transition-shadow hover:shadow-xl flex flex-col justify-between min-h-[420px]">
                <div>
                    <img
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                        className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-gray-100"
                    />
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        {user.name.first} {user.name.last}
                    </h2>
                    <p className="text-gray-600 text-center text-sm truncate" title={user.email}>
                        {user.email}
                    </p>
                    <p className="text-gray-500 text-center mt-1">
                        {user.location.city}, {user.location.country}
                    </p>
                    <p className="text-sm text-center text-gray-400">({user.gender})</p>
                </div>
                {weather && (
                    <div className="text-center mt-4 bg-blue-50 p-1 rounded-lg animate-fade-in">
                        <div className="flex items-center justify-center">
                            <span className="text-3xl" role="img">{weatherInfo.icon}</span>
                            <p className="mr-2">{weatherInfo.description}</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {weather.current_weather.temperature}°C
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-gray-500 mr-2">
                                Мін: {weather.daily.temperature_2m_min[0]}°C
                            </p>
                            <p className="text-sm text-gray-500">
                                Макс: {weather.daily.temperature_2m_max[0]}°C
                            </p>
                        </div>
                    </div>
                )}

                {isWeatherError && (
                    <p className="text-red-500 text-xs text-center mt-2">
                        {weatherError.message || 'Помилка завантаження'}
                    </p>
                )}

                <div className="flex justify-between gap-3 mt-6">
                    {isSavedList ? (
                        <Button onClick={onRemove}
                                className="flex-1"
                                variant="danger"
                        >Видалити</Button>
                    ) : (
                        <Button onClick={onSave}
                                className="flex-1 disabled:cursor-not-allowed"
                                variant="success"
                            disabled={isSaved}
                        >{isSaved ? 'Збережено' : 'Зберегти'}</Button>
                    )}
                    <Button
                        onClick={handleWeatherClick}
                        disabled={isWeatherLoading}
                        className="flex-1">
                        {isWeatherLoading ? (
                            <WeatherSpinner />
                        ) : (
                            weather ? 'Деталі' : 'Погода'
                        )}
                    </Button>
                </div>
            </div>

            {isModalOpen && (
                <WeatherModal
                    user={user}
                    weather={weather}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}