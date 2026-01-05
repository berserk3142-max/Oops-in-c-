import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="app-layout">
            {/* Fixed Top Navbar */}
            <Header />

            {/* Main Body */}
            <div className="main-container">
                {/* Fixed Sidebar */}
                <Sidebar />

                {/* Scrollable Content */}
                <main className="content-area">
                    {children}
                </main>
            </div>
        </div>
    );
}
