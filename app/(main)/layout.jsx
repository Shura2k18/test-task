import Header from '@/components/Header';
import QueryProvider from '@/components/QueryProvider'

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <main className="p-6 max-w-7xl mx-auto">
                <QueryProvider>
                    {children}
                </QueryProvider>
            </main>
        </div>
    );
}