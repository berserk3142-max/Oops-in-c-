import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code, MessageSquare, Home } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

function Header() {
    const location = useLocation();
    const { getProgress } = useProgress();
    const progress = getProgress();

    const navItems = [
        { path: '/', label: 'HOME', icon: Home },
        { path: '/topic/const-ness', label: 'TUTORIALS', icon: BookOpen },
        { path: '/playground', label: 'PLAYGROUND', icon: Code },
        { path: '/interview', label: 'INTERVIEW', icon: MessageSquare },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path.split('/')[1] === 'topic' ? '/topic' : path);
    };

    return (
        <header className="navbar">
            <Link to="/" className="header-logo">
                <span>OOPSify</span> C++
            </Link>

            <nav className="header-nav">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`header-nav-item ${isActive(path) ? 'active' : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="progress-text">{Math.round(progress)}% Complete</span>
            </div>
        </header>
    );
}

export default Header;
