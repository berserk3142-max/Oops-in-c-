import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modules, getAllTopics } from '../data/topics';
import { useProgress } from '../context/ProgressContext';

function Sidebar() {
    const { topicId } = useParams();
    const [expandedModules, setExpandedModules] = useState(['basics']);
    const [searchTerm, setSearchTerm] = useState('');
    const { completedTopics } = useProgress();
    const allTopics = getAllTopics();

    const toggleModule = (moduleId) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const filteredTopics = searchTerm
        ? allTopics.filter(t =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allTopics;

    const getModuleTopics = (moduleId) => {
        return filteredTopics.filter(t => t.module === moduleId);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                C++ OOP Tutorial
            </div>

            <div className="sidebar-search">
                <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <nav>
                {modules.map(module => {
                    const moduleTopics = getModuleTopics(module.id);
                    if (moduleTopics.length === 0) return null;

                    const isExpanded = expandedModules.includes(module.id);
                    const completedCount = moduleTopics.filter(t =>
                        completedTopics.includes(t.id)
                    ).length;

                    return (
                        <div key={module.id}>
                            <div
                                className="module-header"
                                onClick={() => toggleModule(module.id)}
                            >
                                <span>{module.icon}</span>
                                <span style={{ flex: 1 }}>{module.name}</span>
                                <span style={{ fontSize: '12px', color: '#666' }}>
                                    {completedCount}/{moduleTopics.length}
                                </span>
                                {isExpanded ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {moduleTopics.map(topic => (
                                            <Link
                                                key={topic.id}
                                                to={`/topic/${topic.id}`}
                                                className={`topic-item ${topicId === topic.id ? 'active' : ''}`}
                                            >
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    {completedTopics.includes(topic.id) && (
                                                        <CheckCircle size={14} style={{ color: topicId === topic.id ? 'white' : '#04AA6D' }} />
                                                    )}
                                                    {topic.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
