'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Header from '@/components/Header';

export default function NotFound() {
    return (
        <div>
            <Header />

            <main className="p-6 max-w-7xl mx-auto">
                <div className="
          flex flex-col items-center justify-center 
          min-h-[calc(100vh_-_150px)] 
          text-center
        ">
                    <h1 className="text-8xl font-bold text-blue-600">
                        404
                    </h1>
                    <h2 className="text-3xl font-semibold text-gray-800 mt-4">
                        Ой! Сторінку не знайдено
                    </h2>
                    <p className="text-lg text-gray-500 mt-2 max-w-md">
                        Здається, сторінка, яку ви шукаєте, не існує або була переміщена.
                    </p>

                    <div className="mt-10">
                        <Link href="/" passHref legacyBehavior>
                            <Button
                                variant="primary"
                                className="py-3 px-6 text-lg"
                            >
                                Повернутися на Головну
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}