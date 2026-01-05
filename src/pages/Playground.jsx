import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Download, Terminal, Code, FileCode } from 'lucide-react';

const templates = {
    empty: {
        name: 'Empty',
        code: `#include <iostream>
using namespace std;

int main() {
    
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

    const runCode = () => {
        setIsRunning(true);
        setTimeout(() => {
            setOutput('// Simulated output\n// Connect to backend for real compilation\nProgram executed successfully!');
            setIsRunning(false);
        }, 1000);
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
        <div className="h-full flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                        <Code size={20} className="text-secondary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">C++ Playground</h1>
                        <p className="text-sm text-white/50">Write, run, and experiment</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Templates */}
                    <select
                        onChange={(e) => setCode(templates[e.target.value].code)}
                        className="px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 focus:border-primary/50 focus:outline-none text-sm text-white"
                    >
                        {Object.entries(templates).map(([key, val]) => (
                            <option key={key} value={key} className="bg-dark-800">{val.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={() => setCode('')}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                        title="Clear"
                    >
                        <Trash2 size={18} className="text-white/60" />
                    </button>

                    <button
                        onClick={downloadCode}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                        title="Download"
                    >
                        <Download size={18} className="text-white/60" />
                    </button>

                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="btn-primary flex items-center gap-2 !py-2.5"
                    >
                        <Play size={16} fill="white" />
                        {isRunning ? 'Running...' : 'Run Code'}
                    </button>
                </div>
            </div>

            {/* Editor + Output Grid */}
            <div className="flex-1 grid grid-cols-2 gap-6 min-h-[400px]">
                {/* Code Editor */}
                <div className="code-block flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                        <FileCode size={16} className="text-white/40" />
                        <span className="text-sm text-white/60">main.cpp</span>
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="cpp"
                            value={code}
                            onChange={(value) => setCode(value || '')}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', monospace",
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="code-block flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                        <Terminal size={16} className="text-green-400" />
                        <span className="text-sm text-white/60">Output</span>
                    </div>
                    <div className="flex-1 p-4 overflow-auto">
                        <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                            {output || '// Click "Run Code" to execute\n// Output will appear here'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
