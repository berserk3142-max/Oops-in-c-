import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllTopics } from '../data/topics';

function InterviewMode() {
    const allTopics = getAllTopics();
    const [expandedQuestions, setExpandedQuestions] = useState({});

    const toggleQuestion = (id) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Collect all interview questions
    const allQuestions = allTopics.flatMap(topic =>
        (topic.interview || []).map((qa, idx) => ({
            ...qa,
            topicId: topic.id,
            topicTitle: topic.title,
            id: `${topic.id}-${idx}`
        }))
    );

    return (
        <div className="content-area" style={{ maxWidth: '900px' }}>
            <h1>C++ Interview Questions</h1>
            <p>
                Practice these common interview questions covering all OOP concepts.
                Click on a question to reveal the answer.
            </p>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', margin: '24px 0 32px' }}>
                <div className="stat-card">
                    <div className="stat-number">{allQuestions.length}</div>
                    <div className="stat-label">Total Questions</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{allTopics.length}</div>
                    <div className="stat-label">Topics Covered</div>
                </div>
            </div>

            <h2>All Interview Questions</h2>

            {allQuestions.map((item, index) => (
                <div
                    key={item.id}
                    style={{
                        background: expandedQuestions[item.id] ? '#D4EDDA' : '#E7E9EB',
                        borderRadius: '5px',
                        marginBottom: '12px',
                        overflow: 'hidden',
                        transition: 'background 0.2s'
                    }}
                >
                    <div
                        onClick={() => toggleQuestion(item.id)}
                        style={{
                            padding: '16px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <HelpCircle size={18} style={{ color: '#04AA6D', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: '#000' }}>
                                {index + 1}. {item.q}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                                Topic: {item.topicTitle}
                            </div>
                        </div>
                        {expandedQuestions[item.id] ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </div>

                    {expandedQuestions[item.id] && (
                        <div style={{
                            padding: '0 20px 16px 50px',
                            color: '#333'
                        }}>
                            <strong>Answer:</strong> {item.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default InterviewMode;
