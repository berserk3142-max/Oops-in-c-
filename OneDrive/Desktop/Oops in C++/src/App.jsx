import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Playground from './pages/Playground';
import InterviewMode from './pages/InterviewMode';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:topicId" element={<Topic />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/interview" element={<InterviewMode />} />
          </Routes>
        </Layout>
      </Router>
    </ProgressProvider>
  );
}

export default App;
