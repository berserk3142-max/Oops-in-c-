import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, RotateCcw, Check } from 'lucide-react';

function CodeEditor({ initialCode, expectedOutput }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const runCode = () => {
        setOutput(expectedOutput || 'Code executed successfully!');
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetCode = () => {
        setCode(initialCode);
        setOutput('');
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <span className="editor-title">Code Editor</span>
                <div className="editor-actions">
                    <button
                        onClick={copyCode}
                        style={{
                            background: '#E7E9EB',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '13px'
                        }}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={resetCode}
                        style={{
                            background: '#E7E9EB',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '13px'
                        }}
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <button onClick={runCode} className="run-btn">
                        <Play size={14} />
                        Try it Yourself »
                    </button>
                </div>
            </div>

            <Editor
                height="300px"
                defaultLanguage="cpp"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs"
                options={{
                    fontSize: 14,
                    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: false,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    readOnly: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                }}
            />

            {output && (
                <div className="output-container">
                    <div style={{ color: '#04AA6D', marginBottom: '8px', fontWeight: 600 }}>
                        Output:
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{output}</pre>
                </div>
            )}
        </div>
    );
}

export default CodeEditor;
