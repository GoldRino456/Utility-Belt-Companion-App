import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen min-w-screen bg-gray-100">
            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 max-w-7xl">
                {children}
            </main>
        </div>
    );
}

export default Layout;