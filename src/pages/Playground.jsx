import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Download, Terminal, Code, FileCode } from 'lucide-react';

const templates = {
    empty: {
        name: 'Empty Template',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
    },
    class: {
        name: 'Class Template',
        code: `#include <iostream>
using namespace std;

class MyClass {
private:
    int data;
    
public:
    MyClass(int d) : data(d) {
        cout << "Constructor called" << endl;
    }
    
    ~MyClass() {
        cout << "Destructor called" << endl;
    }
    
    void display() const {
        cout << "Data: " << data << endl;
    }
};

int main() {
    MyClass obj(42);
    obj.display();
    return 0;
}`
    },
    inheritance: {
        name: 'Inheritance',
        code: `#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
    
public:
    Animal(string n) : name(n) {}
    
    virtual void speak() {
        cout << name << " makes a sound" << endl;
    }
    
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    
    void speak() override {
        cout << name << " says Woof!" << endl;
    }
};

int main() {
    Animal* pet = new Dog("Buddy");
    pet->speak();
    delete pet;
    return 0;
}`
    },
    operators: {
        name: 'Operator Overloading',
        code: `#include <iostream>
using namespace std;

class Complex {
    double real, imag;
    
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    friend ostream& operator<<(ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};

int main() {
    Complex c1(3, 4), c2(1, 2);
    Complex c3 = c1 + c2;
    cout << "c1 = " << c1 << endl;
    cout << "c2 = " << c2 << endl;
    cout << "c1 + c2 = " << c3 << endl;
    return 0;
}`
    }
};

export default function Playground() {
    const [code, setCode] = useState(templates.empty.code);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('empty');

    const runCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            // Simulate output based on template
            let simulatedOutput = '';
            if (code.includes('Hello, World')) {
                simulatedOutput = 'Hello, World!';
            } else if (code.includes('MyClass')) {
                simulatedOutput = 'Constructor called\nData: 42\nDestructor called';
            } else if (code.includes('Dog')) {
                simulatedOutput = 'Buddy says Woof!';
            } else if (code.includes('Complex')) {
                simulatedOutput = 'c1 = 3 + 4i\nc2 = 1 + 2i\nc1 + c2 = 4 + 6i';
            } else {
                simulatedOutput = 'Program executed successfully!';
            }
            setOutput(simulatedOutput);
            setIsRunning(false);
        }, 800);
    };

    const handleTemplateChange = (e) => {
        const key = e.target.value;
        setSelectedTemplate(key);
        setCode(templates[key].code);
        setOutput('');
    };

    const downloadCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'main.cpp';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="content-area" style={{ maxWidth: '1200px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ marginBottom: '8px' }}>C++ Playground</h1>
                    <p style={{ margin: 0 }}>Write, run, and experiment with C++ code</p>
                </div>
            </div>

            {/* Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <select
                    value={selectedTemplate}
                    onChange={handleTemplateChange}
                    style={{
                        padding: '10px 16px',
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'white',
                        cursor: 'pointer'
                    }}
                >
                    {Object.entries(templates).map(([key, val]) => (
                        <option key={key} value={key}>{val.name}</option>
                    ))}
                </select>

                <button
                    onClick={() => { setCode(''); setOutput(''); }}
                    className="btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
                >
                    <Trash2 size={16} />
                    Clear
                </button>

                <button
                    onClick={downloadCode}
                    className="btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
                >
                    <Download size={16} />
                    Download
                </button>

                <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px' }}
                >
                    <Play size={16} fill="white" />
                    {isRunning ? 'Running...' : 'Run Code'}
                </button>
            </div>

            {/* Editor + Output Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', minHeight: '500px' }}>
                {/* Code Editor */}
                <div className="editor-container" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="editor-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileCode size={16} />
                            <span className="editor-title">main.cpp</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, minHeight: '450px' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="cpp"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'Consolas', 'Monaco', monospace",
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                lineNumbers: 'on',
                                wordWrap: 'on',
                            }}
                        />
                    </div>
                </div>

                {/* Output */}
                <div style={{
                    border: '1px solid #D4D4D4',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '12px 16px',
                        background: '#E7E9EB',
                        borderBottom: '1px solid #D4D4D4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Terminal size={16} style={{ color: '#04AA6D' }} />
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>Output</span>
                    </div>
                    <div style={{
                        flex: 1,
                        padding: '16px',
                        background: '#1e1e1e',
                        minHeight: '450px'
                    }}>
                        <pre style={{
                            fontFamily: "'Consolas', monospace",
                            fontSize: '14px',
                            color: '#04AA6D',
                            margin: 0,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {output || '// Click "Run Code" to execute\n// Output will appear here'}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="info-box green" style={{ marginTop: '24px' }}>
                <strong>💡 Tip:</strong> This is a simulated playground. For real C++ compilation,
                you would need to connect to a backend service like Judge0, Wandbox, or run locally with g++.
            </div>
        </div>
    );
}
