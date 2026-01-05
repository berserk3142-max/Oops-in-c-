import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, Check, X, RotateCcw, Trophy } from 'lucide-react';
import { getAllTopics } from '../data/topics';

export default function InterviewMode() {
    const allTopics = getAllTopics().filter(t => t.interview && t.interview.length > 0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });
    const [completed, setCompleted] = useState(false);

    const currentTopic = allTopics[currentIndex];
    const currentQA = currentTopic?.interview?.[0];

    const handleAnswer = (correct) => {
        if (correct) {
            setScore(s => ({ ...s, correct: s.correct + 1 }));
        } else {
            setScore(s => ({ ...s, wrong: s.wrong + 1 }));
        }

        if (currentIndex < allTopics.length - 1) {
            setCurrentIndex(i => i + 1);
            setShowAnswer(false);
        } else {
            setCompleted(true);
        }
    };

    const restart = () => {
        setCurrentIndex(0);
        setScore({ correct: 0, wrong: 0 });
        setShowAnswer(false);
        setCompleted(false);
    };

    if (completed) {
        const percentage = Math.round((score.correct / (score.correct + score.wrong)) * 100);
        return (
            <div className="max-w-xl mx-auto text-center py-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                >
                    <Trophy size={56} className="text-white" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-3">Interview Complete! 🎉</h1>
                <p className="text-lg text-white/60 mb-8">
                    You scored <span className="text-primary font-bold">{percentage}%</span>
                </p>

                <div className="flex justify-center gap-10 mb-8">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-green-400">{score.correct}</p>
                        <p className="text-white/50">Correct</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-red-400">{score.wrong}</p>
                        <p className="text-white/50">Wrong</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={restart} className="btn-secondary flex items-center gap-2">
                        <RotateCcw size={18} />
                        Try Again
                    </button>
                    <Link to="/" className="btn-primary flex items-center gap-2">
                        Back to Learning
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Zap size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Interview Mode</h1>
                        <p className="text-sm text-white/50">Rapid fire Q&A</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <Check size={16} className="text-green-400" />
                        <span className="font-medium">{score.correct}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                        <X size={16} className="text-red-400" />
                        <span className="font-medium">{score.wrong}</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div>
                <div className="flex justify-between text-sm text-white/50 mb-2">
                    <span>Question {currentIndex + 1} of {allTopics.length}</span>
                    <span>{currentTopic?.title}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / allTopics.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="card"
                >
                    <div className="mb-6">
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                            {currentTopic?.title}
                        </span>
                        <h2 className="text-xl font-bold text-white mt-2">{currentQA?.q}</h2>
                    </div>

                    {showAnswer ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="p-5 bg-white/5 rounded-xl border-l-4 border-green-500">
                                <p className="text-white/80">{currentQA?.a}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/25 transition-colors font-medium"
                                >
                                    <Check size={18} />
                                    I knew it!
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors font-medium"
                                >
                                    <X size={18} />
                                    Need review
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-lg hover:scale-[1.01] transition-transform"
                        >
                            Show Answer
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Quick Link */}
            <div className="text-center">
                <Link
                    to={`/topic/${currentTopic?.id}`}
                    className="text-sm text-white/40 hover:text-primary transition-colors"
                >
                    📖 Review this topic →
                </Link>
            </div>
        </div>
    );
}
