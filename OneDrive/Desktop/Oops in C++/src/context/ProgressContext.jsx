import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function useProgress() {
    return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem('oopsify-progress');
        return saved ? JSON.parse(saved) : [];
    });

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

    const isCompleted = (topicId) => completedTopics.includes(topicId);

    const getProgress = (totalTopics) => {
        return Math.round((completedTopics.length / totalTopics) * 100);
    };

    const resetProgress = () => {
        setCompletedTopics([]);
    };

    return (
        <ProgressContext.Provider value={{
            completedTopics,
            markComplete,
            markIncomplete,
            isCompleted,
            getProgress,
            resetProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
}
