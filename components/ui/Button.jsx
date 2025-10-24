'use client';

import React from 'react';

export default function Button({
                                   children,
                                   onClick,
                                   disabled = false,
                                   variant = 'primary',
                                   className = '',
                                   ...props
                               }) {

    const baseStyles = `
    font-semibold py-2 px-4 rounded-lg
    transition-colors duration-150
    flex justify-center items-center gap-2
    disabled:bg-gray-400 disabled:cursor-not-allowed
  `;

    let variantStyles = '';
    switch (variant) {
        case 'success':
            variantStyles = 'bg-green-600 text-white hover:bg-green-700';
            break;
        case 'danger':
            variantStyles = 'bg-red-600 text-white hover:bg-red-700';
            break;
        case 'primary':
        default:
            variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400';
            break;
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles} ${className} cursor-pointer`}
            {...props}
        >
            {children}
        </button>
    );
}