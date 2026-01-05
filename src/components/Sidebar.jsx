import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Check, Circle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modules, getAllTopics, getTopicsByModule } from '../data/topics';
import { useProgress } from '../context/ProgressContext';

export default function Sidebar() {
    const [expandedModules, setExpandedModules] = useState(['basics']);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const { isCompleted } = useProgress();
    const allTopics = getAllTopics();

    const toggleModule = (moduleId) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const filteredTopics = searchQuery
        ? allTopics.filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : null;

    return (
        <aside className="sidebar">
            {/* Search Header */}
            <div className="sidebar-header">
                <div className="relative">
                    <Search size={16} className="absolute left-14 top-1/2 -translate-y-1/2 text-white/40" style={{ left: '14px' }} />
                    <input
                        type="text"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="sidebar-search"
                    />
                </div>
            </div>

            {/* Topic List */}
            <div className="sidebar-content">
                {searchQuery ? (
                    /* Search Results */
                    <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-4 px-2">
                            {filteredTopics.length} results found
                        </p>
                        {filteredTopics.map(topic => (
                            <TopicItem
                                key={topic.id}
                                topic={topic}
                                isActive={location.pathname === `/topic/${topic.id}`}
                                isCompleted={isCompleted(topic.id)}
                            />
                        ))}
                    </div>
                ) : (
                    /* Module List */
                    <div>
                        {modules.map(module => {
                            const moduleTopics = getTopicsByModule(module.id);
                            const completedCount = moduleTopics.filter(t => isCompleted(t.id)).length;
                            const isExpanded = expandedModules.includes(module.id);

                            return (
                                <div key={module.id} className="module-section">
                                    {/* Module Header */}
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="module-header w-full"
                                    >
                                        <div className="flex items-center">
                                            <span className="module-icon">{module.icon}</span>
                                            <div className="text-left">
                                                <p className="module-name">{module.name}</p>
                                                <p className="module-count">{completedCount}/{moduleTopics.length} completed</p>
                                            </div>
                                        </div>
                                        <div className="text-white/40">
                                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </div>
                                    </button>

                                    {/* Topics */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="topic-list">
                                                    {moduleTopics.map(topic => (
                                                        <TopicItem
                                                            key={topic.id}
                                                            topic={topic}
                                                            isActive={location.pathname === `/topic/${topic.id}`}
                                                            isCompleted={isCompleted(topic.id)}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="sidebar-footer">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">Total Topics</span>
                    <span className="text-white/70 font-medium">{allTopics.length}</span>
                </div>
            </div>
        </aside>
    );
}

function TopicItem({ topic, isActive, isCompleted }) {
    return (
        <Link
            to={`/topic/${topic.id}`}
            className={`topic-item ${isActive ? 'active' : ''}`}
        >
            <span className="topic-check">
                {isCompleted ? (
                    <Check size={14} className="text-green-400" />
                ) : (
                    <Circle size={14} className="text-white/25" />
                )}
            </span>
            <span className="truncate">{topic.title}</span>
        </Link>
    );
}
