export function getWeatherInfo(code) {
    const weatherMap = {
        0: { icon: '☀️', description: 'Ясно' },
        1: { icon: '🌤️', description: 'Переважно ясно' },
        2: { icon: '⛅️', description: 'Мінлива хмарність' },
        3: { icon: '☁️', description: 'Хмарно' },
        45: { icon: '🌫️', description: 'Туман' },
        48: { icon: '🌫️', description: 'Паморозь' },
        51: { icon: '🌦️', description: 'Мряка: Легка' },
        53: { icon: '🌦️', description: 'Мряка: Помірна' },
        55: { icon: '🌦️', description: 'Мряка: Сильна' },
        56: { icon: '🌨️', description: 'Крижана мряка: Легка' },
        57: { icon: '🌨️', description: 'Крижана мряка: Сильна' },
        61: { icon: '🌧️', description: 'Дощ: Слабкий' },
        63: { icon: '🌧️', description: 'Дощ: Помірний' },
        65: { icon: '🌧️', description: 'Дощ: Сильний' },
        66: { icon: '🌨️', description: 'Крижаний дощ: Слабкий' },
        67: { icon: '🌨️', description: 'Крижаний дощ: Сильний' },
        71: { icon: '❄️', description: 'Снігопад: Слабкий' },
        73: { icon: '❄️', description: 'Снігопад: Помірний' },
        75: { icon: '❄️', description: 'Снігопад: Сильний' },
        77: { icon: '❄️', description: 'Снігові зерна' },
        80: { icon: '🌦️', description: 'Зливи: Слабкі' },
        81: { icon: '🌦️', description: 'Зливи: Помірні' },
        82: { icon: '🌦️', description: 'Зливи: Сильні' },
        85: { icon: '❄️', description: 'Снігові зливи: Слабкі' },
        86: { icon: '❄️', description: 'Снігові зливи: Сильні' },
        95: { icon: '🌩️', description: 'Гроза: Слабка або помірна' },
        96: { icon: '⛈️', description: 'Гроза зі слабким градом' },
        99: { icon: '⛈️', description: 'Гроза з сильним градом' },
    };

    return weatherMap[code] || { icon: '❓', description: 'Невідомо' };
}