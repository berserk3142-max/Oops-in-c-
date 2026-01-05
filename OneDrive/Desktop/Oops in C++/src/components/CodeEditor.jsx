import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Check, RotateCcw, Terminal, FileCode } from 'lucide-react';

export default function CodeEditor({ code: initialCode, expectedOutput }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            setOutput(expectedOutput || 'Code executed successfully!');
            setIsRunning(false);
        }, 800);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetCode = () => {
        setCode(initialCode);
        setOutput(null);
    };

    return (
        <div>
            {/* Editor */}
            <div className="code-block mb-5">
                <div className="code-header">
                    <div className="flex items-center gap-3">
                        <FileCode size={16} className="text-white/40" />
                        <span className="text-sm text-white/55">main.cpp</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={resetCode}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            title="Reset"
                        >
                            <RotateCcw size={14} className="text-white/45" />
                        </button>
                        <button
                            onClick={copyCode}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            title="Copy"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/45" />}
                        </button>
                    </div>
                </div>

                <Editor
                    height="260px"
                    defaultLanguage="cpp"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', monospace",
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        lineNumbers: 'on',
                        renderLineHighlight: 'line',
                    }}
                />
            </div>

            {/* Run Button */}
            <button
                onClick={runCode}
                disabled={isRunning}
                className="btn-primary mb-5"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
            >
                <Play size={18} fill="white" />
                {isRunning ? 'Compiling...' : 'Run Code'}
            </button>

            {/* Output */}
            {output && (
                <div className="code-block">
                    <div className="code-header">
                        <div className="flex items-center gap-3">
                            <Terminal size={16} className="text-green-400" />
                            <span className="text-sm text-white/55">Output</span>
                        </div>
                    </div>
                    <div className="p-5">
                        <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap leading-relaxed">{output}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
