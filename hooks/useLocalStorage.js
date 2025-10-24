'use client';

import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
        }
    }, [key]);
    const setValue = (value) => {
        if (typeof window === 'undefined') {
            console.warn(`Attempted to set localStorage key “${key}” on the server`);
            return;
        }

        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”:', error);
        }
    };

    return [storedValue, setValue];
}