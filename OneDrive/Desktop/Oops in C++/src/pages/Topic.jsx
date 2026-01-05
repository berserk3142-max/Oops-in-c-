import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, BookOpen, Lightbulb, HelpCircle, BarChart3 } from 'lucide-react';
import { getTopicById, getAllTopics, modules } from '../data/topics';
import { useProgress } from '../context/ProgressContext';
import CodeEditor from '../components/CodeEditor';
import Diagram from '../components/Diagram';

export default function Topic() {
    const { topicId } = useParams();
    const { isCompleted, markComplete, markIncomplete } = useProgress();
    const topic = getTopicById(topicId);
    const allTopics = getAllTopics();

    if (!topic) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Topic not found!</h2>
                <Link to="/" className="text-primary hover:underline">Go Home</Link>
            </div>
        );
    }

    const currentIndex = allTopics.findIndex(t => t.id === topicId);
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
    const module = modules.find(m => m.id === topic.module);
    const completed = isCompleted(topicId);

    const toggleComplete = () => {
        if (completed) markIncomplete(topicId);
        else markComplete(topicId);
    };

    return (
        <motion.div
            key={topicId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
        >
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <div className="page-breadcrumb">
                            <span>{module?.icon}</span>
                            <span>{module?.name}</span>
                            <span>•</span>
                            <span>Topic {topic.order} of {allTopics.length}</span>
                        </div>
                        <h1 className="page-title">{topic.title}</h1>
                    </div>
                    <button
                        onClick={toggleComplete}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${completed
                            ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                            : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                            }`}
                    >
                        <Check size={16} />
                        {completed ? 'Completed' : 'Mark Complete'}
                    </button>
                </div>
            </div>

            {/* Concept Section */}
            <div className="card">
                <div className="card-header">
                    <div className="card-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                        <BookOpen size={22} className="text-primary" />
                    </div>
                    <h2 className="card-title">Concept Explained (Hinglish)</h2>
                </div>
                <div className="card-body whitespace-pre-line">
                    {topic.hinglish}
                </div>
            </div>

            {/* Real Life Example */}
            <div className="card card-highlight">
                <div className="card-header">
                    <div className="card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                        <Lightbulb size={22} className="text-yellow-400" />
                    </div>
                    <h2 className="card-title">Real-Life Example</h2>
                </div>
                <div className="example-box">
                    <span className="example-icon">{topic.realLife?.icon}</span>
                    <div>
                        <h3 className="example-title">{topic.realLife?.title}</h3>
                        <p className="example-desc">{topic.realLife?.description}</p>
                    </div>
                </div>
            </div>

            {/* Diagram */}
            {topic.diagram && (
                <div className="card">
                    <div className="card-header">
                        <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                            <BarChart3 size={22} className="text-secondary" />
                        </div>
                        <h2 className="card-title">Visual Diagram</h2>
                    </div>
                    <Diagram code={topic.diagram} />
                </div>
            )}

            {/* Code Editor */}
            <div className="card">
                <div className="card-header">
                    <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                        <span className="text-xl">💻</span>
                    </div>
                    <h2 className="card-title">Code Example</h2>
                </div>
                <CodeEditor
                    code={topic.code}
                    expectedOutput={topic.output}
                />
            </div>

            {/* Interview Q&A */}
            {topic.interview && topic.interview.length > 0 && (
                <div className="card">
                    <div className="card-header">
                        <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                            <HelpCircle size={22} className="text-purple-400" />
                        </div>
                        <h2 className="card-title">Interview Questions</h2>
                    </div>
                    <div>
                        {topic.interview.map((qa, i) => (
                            <div key={i} className="qa-item">
                                <p className="qa-question">Q: {qa.q}</p>
                                <p className="qa-answer">A: {qa.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="page-nav">
                {prevTopic ? (
                    <Link to={`/topic/${prevTopic.id}`} className="nav-btn">
                        <ChevronLeft size={18} />
                        <div className="text-left">
                            <span className="text-white/40 text-xs block">Previous</span>
                            <span>{prevTopic.title}</span>
                        </div>
                    </Link>
                ) : (
                    <div />
                )}

                {nextTopic ? (
                    <Link to={`/topic/${nextTopic.id}`} className="nav-btn nav-btn-next">
                        <div className="text-right">
                            <span className="text-white/70 text-xs block">Next</span>
                            <span>{nextTopic.title}</span>
                        </div>
                        <ChevronRight size={18} />
                    </Link>
                ) : (
                    <Link to="/" className="nav-btn nav-btn-next">
                        🎉 Course Complete!
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
