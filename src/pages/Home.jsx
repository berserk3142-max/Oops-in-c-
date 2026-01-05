import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Zap, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { modules, getAllTopics, getTopicsByModule } from '../data/topics';
import { useProgress } from '../context/ProgressContext';

export default function Home() {
    const { completedTopics, getProgress } = useProgress();
    const allTopics = getAllTopics();
    const progress = getProgress(allTopics.length);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 mb-12"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="inline-block mb-6"
                >
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}>
                        <Code size={40} className="text-white" />
                    </div>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">OOPSify C++</span>
                </h1>
                <p className="text-lg text-white/55 mb-8 max-w-xl mx-auto leading-relaxed">
                    Learn C++ OOP in <span className="text-secondary font-medium">Hinglish</span> with
                    real-life examples, live code, and interview prep
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/topic/const-ness" className="btn-primary">
                        <Sparkles size={18} />
                        Start Learning
                        <ArrowRight size={18} />
                    </Link>
                    <Link to="/playground" className="btn-secondary">
                        <Code size={18} />
                        Open Playground
                    </Link>
                </div>
            </motion.section>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                {[
                    { icon: BookOpen, label: 'Topics', value: allTopics.length, color: 'from-purple-500 to-pink-500' },
                    { icon: Trophy, label: 'Completed', value: completedTopics.length, color: 'from-yellow-500 to-orange-500' },
                    { icon: Zap, label: 'Progress', value: `${progress}%`, color: 'from-cyan-500 to-blue-500' },
                    { icon: Code, label: 'Modules', value: modules.length, color: 'from-green-500 to-teal-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card text-center !mb-0"
                    >
                        <div className={`w-11 h-11 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={22} className="text-white" />
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-white/45">{stat.label}</p>
                    </motion.div>
                ))}
            </section>

            {/* Modules Grid */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <BookOpen size={24} className="text-primary" />
                    Learning Modules
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {modules.map((module, i) => {
                        const moduleTopics = getTopicsByModule(module.id);
                        const firstTopic = moduleTopics[0];
                        const completedCount = moduleTopics.filter(t => completedTopics.includes(t.id)).length;
                        const progressPercent = (completedCount / moduleTopics.length) * 100;

                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    to={firstTopic ? `/topic/${firstTopic.id}` : '#'}
                                    className="card block !mb-0 hover:border-white/15 transition-all"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-3xl">{module.icon}</span>
                                        <div>
                                            <h3 className="font-medium text-white text-base">{module.name}</h3>
                                            <p className="text-xs text-white/40 mt-1">{moduleTopics.length} topics</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${progressPercent}%`,
                                                backgroundColor: module.color
                                            }}
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-5">
                {[
                    {
                        icon: '🗣️',
                        title: 'Hinglish Explanations',
                        desc: 'Har concept simple Hinglish mein samjho, jaise dost explain kar raha ho'
                    },
                    {
                        icon: '💡',
                        title: 'Real-Life Examples',
                        desc: 'ATM, Phone, Hotel jaise relatable examples se concepts clear'
                    },
                    {
                        icon: '💻',
                        title: 'Live Code Playground',
                        desc: 'Monaco Editor mein code likho aur instantly output dekho'
                    },
                ].map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="card !mb-0"
                    >
                        <span className="text-4xl block mb-4">{feature.icon}</span>
                        <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
