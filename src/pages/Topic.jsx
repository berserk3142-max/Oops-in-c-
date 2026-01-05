import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Lightbulb, HelpCircle } from 'lucide-react';
import { getTopicById, getAllTopics } from '../data/topics';
import { useProgress } from '../context/ProgressContext';
import CodeEditor from '../components/CodeEditor';
import Diagram from '../components/Diagram';

function Topic() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { completedTopics, toggleComplete } = useProgress();
    const topic = getTopicById(topicId);
    const allTopics = getAllTopics();

    if (!topic) {
        return (
            <div className="content-area">
                <h1>Topic Not Found</h1>
                <p>The topic you're looking for doesn't exist.</p>
                <Link to="/" className="btn-primary">Go Home</Link>
            </div>
        );
    }

    const currentIndex = allTopics.findIndex(t => t.id === topicId);
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
    const isCompleted = completedTopics.includes(topicId);

    return (
        <div className="content-area" style={{ maxWidth: '900px' }}>
            {/* Top Navigation */}
            <div className="nav-top">
                {prevTopic ? (
                    <Link to={`/topic/${prevTopic.id}`} className="btn-nav">
                        <ChevronLeft size={18} /> Previous
                    </Link>
                ) : <div />}
                {nextTopic ? (
                    <Link to={`/topic/${nextTopic.id}`} className="btn-nav">
                        Next <ChevronRight size={18} />
                    </Link>
                ) : <div />}
            </div>

            {/* Page Title */}
            <h1>C++ {topic.title}</h1>

            {/* Hinglish Explanation */}
            <div style={{ marginBottom: '24px' }}>
                <div
                    style={{
                        fontSize: '17px',
                        lineHeight: '1.8',
                        color: '#333'
                    }}
                    dangerouslySetInnerHTML={{
                        __html: topic.hinglish
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/`(.*?)`/g, '<code style="background:#E7E9EB;padding:2px 6px;border-radius:3px;font-family:Consolas,monospace">$1</code>')
                            .replace(/\n/g, '<br/>')
                    }}
                />
            </div>

            {/* Real Life Example */}
            {topic.realLife && (
                <div className="reallife-box">
                    <div className="reallife-title">
                        <Lightbulb size={18} />
                        {topic.realLife.icon} {topic.realLife.title}
                    </div>
                    <div className="reallife-desc">
                        {topic.realLife.description}
                    </div>
                </div>
            )}

            {/* Code Example */}
            <h2>Example</h2>
            <div className="example-box">
                <h3>C++ Code:</h3>
                <CodeEditor
                    initialCode={topic.code}
                    expectedOutput={topic.output}
                />
            </div>

            {/* Diagram */}
            {topic.diagram && (
                <>
                    <h2>Visual Diagram</h2>
                    <div className="diagram-container">
                        <Diagram code={topic.diagram} />
                    </div>
                </>
            )}

            {/* Interview Questions */}
            {topic.interview && topic.interview.length > 0 && (
                <>
                    <h2>Interview Questions</h2>
                    <div className="qa-section">
                        {topic.interview.map((item, index) => (
                            <div key={index} className="qa-item">
                                <div className="qa-question">
                                    <HelpCircle size={16} style={{ color: '#04AA6D' }} />
                                    Q: {item.q}
                                </div>
                                <div className="qa-answer">
                                    <strong>A:</strong> {item.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Mark Complete */}
            <div style={{ margin: '32px 0', textAlign: 'center' }}>
                <button
                    onClick={() => toggleComplete(topicId)}
                    className={isCompleted ? 'btn-secondary' : 'btn-primary'}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 32px'
                    }}
                >
                    <CheckCircle size={18} />
                    {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
                </button>
            </div>

            {/* Bottom Navigation */}
            <div className="page-nav">
                {prevTopic ? (
                    <Link to={`/topic/${prevTopic.id}`} className="btn-nav">
                        <ChevronLeft size={18} /> Previous
                    </Link>
                ) : <div />}
                {nextTopic ? (
                    <Link to={`/topic/${nextTopic.id}`} className="btn-nav">
                        Next <ChevronRight size={18} />
                    </Link>
                ) : <div />}
            </div>
        </div>
    );
}

export default Topic;
