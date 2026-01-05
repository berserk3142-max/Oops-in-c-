import { createContext, useContext, useState, useEffect } from 'react';
import { getAllTopics } from '../data/topics';

const ProgressContext = createContext();

export function useProgress() {
    return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem('oopsify-progress');
        return saved ? JSON.parse(saved) : [];
    });

    // Get total topics count
    const totalTopics = getAllTopics().length;

    useEffect(() => {
        localStorage.setItem('oopsify-progress', JSON.stringify(completedTopics));
    }, [completedTopics]);

    const markComplete = (topicId) => {
        if (!completedTopics.includes(topicId)) {
            setCompletedTopics([...completedTopics, topicId]);
        }
    };

    const markIncomplete = (topicId) => {
        setCompletedTopics(completedTopics.filter(id => id !== topicId));
    };

    const toggleComplete = (topicId) => {
        if (completedTopics.includes(topicId)) {
            markIncomplete(topicId);
        } else {
            markComplete(topicId);
        }
    };

    const isCompleted = (topicId) => completedTopics.includes(topicId);

    // Calculate progress percentage
    const getProgress = () => {
        if (totalTopics === 0) return 0;
        return (completedTopics.length / totalTopics) * 100;
    };

    const resetProgress = () => {
        setCompletedTopics([]);
    };

    return (
        <ProgressContext.Provider value={{
            completedTopics,
            totalTopics,
            markComplete,
            markIncomplete,
            toggleComplete,
            isCompleted,
            getProgress,
            resetProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
}
