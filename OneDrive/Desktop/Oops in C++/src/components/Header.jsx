import { Link, useLocation } from 'react-router-dom';
import { Code, Zap, Trophy, PlayCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getAllTopics } from '../data/topics';

export default function Header() {
    const location = useLocation();
    const { completedTopics } = useProgress();
    const totalTopics = getAllTopics().length;
    const progress = Math.round((completedTopics.length / totalTopics) * 100);

    return (
        <header className="navbar px-6 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Code size={22} className="text-white" />
                </div>
                <div>
                    <span className="text-lg font-bold gradient-text">OOPSify C++</span>
                    <span className="text-xs text-white/40 block">Crack OOP Interviews</span>
                </div>
            </Link>

            {/* Center - Progress */}
            <div className="hidden md:flex items-center gap-4 bg-white/5 rounded-full px-5 py-2.5 border border-white/10">
                <Trophy size={18} className="text-yellow-400" />
                <div className="flex items-center gap-3">
                    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="progress-bar h-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium text-white/70">
                        {completedTopics.length}/{totalTopics}
                    </span>
                </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
                <Link
                    to="/playground"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/playground'
                            ? 'bg-secondary/20 text-secondary border border-secondary/30'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <PlayCircle size={18} />
                    <span className="hidden sm:inline">Playground</span>
                </Link>

                <Link
                    to="/interview"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/interview'
                            ? 'bg-gradient-to-r from-primary to-secondary text-white'
                            : 'bg-white/5 hover:bg-white/10 text-white/80'
                        }`}
                >
                    <Zap size={18} />
                    <span className="hidden sm:inline">Interview Mode</span>
                </Link>
            </div>
        </header>
    );
}
