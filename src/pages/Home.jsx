import { Link } from 'react-router-dom';
import { BookOpen, Code, MessageSquare, CheckCircle, Trophy, Target } from 'lucide-react';
import { modules, getAllTopics } from '../data/topics';
import { useProgress } from '../context/ProgressContext';

function Home() {
    const { completedTopics, getProgress } = useProgress();
    const allTopics = getAllTopics();
    const progress = getProgress();

    return (
        <div className="content-area" style={{ maxWidth: '1000px' }}>
            {/* Hero Section */}
            <div className="hero">
                <h1>
                    Learn <span>C++ OOP</span>
                </h1>
                <p>
                    Master Object-Oriented Programming in C++ with Hinglish explanations,
                    real-life examples, and interview preparation.
                </p>
                <Link to="/topic/const-ness" className="btn-primary" style={{ fontSize: '18px', padding: '14px 32px' }}>
                    Start Learning »
                </Link>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{allTopics.length}</div>
                    <div className="stat-label">Total Topics</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{modules.length}</div>
                    <div className="stat-label">Modules</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{completedTopics.length}</div>
                    <div className="stat-label">Completed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{Math.round(progress)}%</div>
                    <div className="stat-label">Progress</div>
                </div>
            </div>

            {/* Modules Section */}
            <h2>C++ OOP Modules</h2>
            <div className="modules-grid">
                {modules.map(module => {
                    const moduleTopics = allTopics.filter(t => t.module === module.id);
                    const completedCount = moduleTopics.filter(t =>
                        completedTopics.includes(t.id)
                    ).length;
                    const firstTopic = moduleTopics[0];

                    return (
                        <Link
                            key={module.id}
                            to={firstTopic ? `/topic/${firstTopic.id}` : '/'}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="module-card">
                                <div className="module-icon">{module.icon}</div>
                                <div className="module-title">{module.name}</div>
                                <div className="module-count">
                                    {completedCount}/{moduleTopics.length} topics completed
                                </div>
                                <div
                                    style={{
                                        marginTop: '12px',
                                        height: '4px',
                                        background: '#E7E9EB',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${moduleTopics.length ? (completedCount / moduleTopics.length) * 100 : 0}%`,
                                            height: '100%',
                                            background: '#04AA6D',
                                            transition: 'width 0.3s'
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Features Section */}
            <h2>What You'll Learn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <BookOpen size={32} style={{ color: '#04AA6D', marginBottom: '12px' }} />
                    <h3 style={{ margin: '0 0 8px 0' }}>Hinglish Content</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Easy to understand explanations in Hindi-English mix</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <Code size={32} style={{ color: '#04AA6D', marginBottom: '12px' }} />
                    <h3 style={{ margin: '0 0 8px 0' }}>Live Code Editor</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Practice C++ code directly in the browser</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <MessageSquare size={32} style={{ color: '#04AA6D', marginBottom: '12px' }} />
                    <h3 style={{ margin: '0 0 8px 0' }}>Interview Prep</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Common interview questions with answers</p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="info-box green" style={{ textAlign: 'center', padding: '32px' }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Ready to Master C++ OOP?</h3>
                <p style={{ margin: '0 0 20px 0' }}>Start with the basics and work your way up to advanced concepts!</p>
                <Link to="/topic/const-ness" className="btn-primary">
                    Start Tutorial »
                </Link>
            </div>
        </div>
    );
}

export default Home;
