import './globals.css';

export const metadata = {
    title: 'User Weather App',
    description: 'View users and their local weather.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="uk">
            <body>
            {children}
            </body>
        </html>
    );
}
