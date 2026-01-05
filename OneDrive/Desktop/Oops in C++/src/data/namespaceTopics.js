// Namespace Topics
export const namespaceTopics = [
    {
        id: 'namespace-1',
        title: 'Namespace-I',
        module: 'namespace',
        order: 37,
        hinglish: `**Naam ke conflicts avoid karo!** 📦

Problem: Do libraries mein same naam ki function?
Solution: Namespace = Names ka container!

Syntax: \`namespace Name { ... }\`
Access: \`Name::function()\``,
        realLife: {
            title: 'Same Name Students',
            icon: '👨‍🎓',
            description: 'Class mein 2 "Rahul" hain? "Sharma wala Rahul" aur "Verma wala Rahul" bolte hain!'
        },
        code: `#include <iostream>
using namespace std;

namespace Physics {
    double getForce(double m, double a) {
        return m * a;
    }
}

namespace Chemistry {
    double getForce(double k, double x) {
        return k * x;  // Hooke's law
    }
}

int main() {
    // Same function name, different namespace!
    cout << "F = ma: " << Physics::getForce(10, 9.8) << " N" << endl;
    cout << "F = kx: " << Chemistry::getForce(100, 0.5) << " N" << endl;
    
    return 0;
}`,
        output: `F = ma: 98 N
F = kx: 50 N`,
        diagram: `graph TD
    A[Physics namespace] --> B[getForce m*a]
    C[Chemistry namespace] --> D[getForce k*x]
    E[No conflict!]`,
        interview: [
            { q: 'Namespace kya solve karta hai?', a: 'Name collision! Different libraries mein same naam ho sakte hain.' },
            { q: 'std namespace mein kya hai?', a: 'Standard library: cout, cin, vector, string, etc.' }
        ]
    },
    {
        id: 'namespace-2',
        title: 'Namespace-II',
        module: 'namespace',
        order: 38,
        hinglish: `**Nested namespaces aur namespace members!** 📦📦

Namespace ke andar:
- Variables
- Functions
- Classes
- Aur namespaces (nested)!`,
        realLife: {
            title: 'Company Departments',
            icon: '🏢',
            description: 'Company > Department > Team > Employee. Hierarchical organization!'
        },
        code: `#include <iostream>
using namespace std;

namespace Company {
    string name = "TechCorp";
    
    namespace Engineering {
        int teamSize = 50;
        
        void showInfo() {
            cout << Company::name << " - Engineering: " << teamSize << " members" << endl;
        }
        
        namespace Frontend {
            string tech = "React";
        }
    }
    
    namespace Marketing {
        int teamSize = 20;
    }
}

int main() {
    cout << "Company: " << Company::name << endl;
    
    Company::Engineering::showInfo();
    
    cout << "Frontend uses: " << Company::Engineering::Frontend::tech << endl;
    
    cout << "Marketing team: " << Company::Marketing::teamSize << endl;
    
    return 0;
}`,
        output: `Company: TechCorp
TechCorp - Engineering: 50 members
Frontend uses: React
Marketing team: 20`,
        diagram: `graph TD
    A[Company] --> B[Engineering]
    A --> C[Marketing]
    B --> D[Frontend]
    B --> E[teamSize: 50]
    D --> F[tech: React]`,
        interview: [
            { q: 'Nested namespace ko short mein access kaise karein?', a: 'namespace alias use karo: namespace FE = Company::Engineering::Frontend;' },
            { q: 'C++17 mein nested namespace syntax?', a: 'namespace A::B::C { } directly likh sakte hain!' }
        ]
    },
    {
        id: 'namespace-3',
        title: 'Namespace-III (shortcuts)',
        module: 'namespace',
        order: 39,
        hinglish: `**using se typing kam karo!** ⌨️

3 ways:
1. \`using namespace X;\` - sab import
2. \`using X::func;\` - specific import  
3. \`namespace ShortName = LongNamespaceName;\` - alias`,
        realLife: {
            title: 'Speed Dial',
            icon: '📱',
            description: 'Full number yaad nahi? Speed dial (alias) use karo!'
        },
        code: `#include <iostream>
using namespace std;

namespace VeryLongNamespaceName {
    void greet() {
        cout << "Hello from long namespace!" << endl;
    }
    
    int getValue() {
        return 42;
    }
}

int main() {
    // Method 1: Full path (safe but long)
    VeryLongNamespaceName::greet();
    
    // Method 2: Alias (shortcut!)
    namespace Short = VeryLongNamespaceName;
    Short::greet();
    
    // Method 3: Import specific
    using VeryLongNamespaceName::getValue;
    cout << "Value: " << getValue() << endl;  // No prefix needed!
    
    // Method 4: Import all (use carefully!)
    // using namespace VeryLongNamespaceName;
    
    return 0;
}`,
        output: `Hello from long namespace!
Hello from long namespace!
Value: 42`,
        diagram: `graph LR
    A[Long::Namespace::Name] -->|alias| B[Short]
    C[using X::func] -->|import| D[func directly]`,
        interview: [
            { q: 'using namespace std; kyun baura hai headers mein?', a: 'Name pollution! Har jagah std ka naam aa jayega, conflicts ho sakte hain.' },
            { q: 'Header files mein kya use karein?', a: 'Direct std:: prefix use karo. using sirf .cpp mein, wo bhi local scope mein.' }
        ]
    },
    {
        id: 'namespace-4',
        title: 'Namespace-IV (Global and open nature)',
        module: 'namespace',
        order: 40,
        hinglish: `**Namespace kahi bhi extend ho sakta hai!** 🔓

Namespace OPEN hai:
- Different files mein same namespace
- Same file mein multiple times define
- Sab merge ho jata hai!

Global namespace = :: (empty prefix)`,
        realLife: {
            title: 'Wikipedia Article',
            icon: '📚',
            description: 'Article alag alag log edit karte hain, sab ek mein merge hota hai!'
        },
        code: `#include <iostream>
using namespace std;

// First part of MyLib
namespace MyLib {
    void func1() {
        cout << "Function 1" << endl;
    }
}

// Extend same namespace!
namespace MyLib {
    void func2() {
        cout << "Function 2" << endl;
    }
}

// Global variable
int globalVar = 100;

namespace MyLib {
    int globalVar = 200;  // Different from global!
}

int main() {
    MyLib::func1();
    MyLib::func2();  // Both work!
    
    // Access global with ::
    cout << "Global: " << ::globalVar << endl;
    cout << "MyLib: " << MyLib::globalVar << endl;
    
    return 0;
}`,
        output: `Function 1
Function 2
Global: 100
MyLib: 200`,
        diagram: `graph TD
    A[namespace MyLib part 1] --> C[Merged MyLib]
    B[namespace MyLib part 2] --> C
    D[:: global namespace] --> E[globalVar = 100]
    C --> F[globalVar = 200]`,
        interview: [
            { q: 'Anonymous namespace kya hai?', a: 'namespace { } bina naam ke. Internal linkage deta hai, sirf us file mein visible.' },
            { q: 'Global function access kaise karein agar same naam local mein ho?', a: '::functionName() use karo for global.' }
        ]
    }
];
