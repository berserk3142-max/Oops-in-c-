// Inheritance Topics Part 1
export const inheritanceTopics1 = [
    {
        id: 'inheritance-1',
        title: 'Inheritance Part-I',
        module: 'inheritance',
        order: 41,
        hinglish: `**Parent class ke features child class mein aate hain!** 👨‍👧

Inheritance = Code Reuse!
Parent = Base class
Child = Derived class

Syntax: \`class Child : public Parent { }\``,
        realLife: {
            title: 'Father-Son Property',
            icon: '👨‍👦',
            description: 'Baap ki property bete ko milti hai without rewriting will!'
        },
        code: `#include <iostream>
using namespace std;

// Base class
class Animal {
public:
    string name;
    
    void eat() {
        cout << name << " is eating" << endl;
    }
    
    void sleep() {
        cout << name << " is sleeping" << endl;
    }
};

// Derived class
class Dog : public Animal {
public:
    void bark() {
        cout << name << " says Woof!" << endl;
    }
};

int main() {
    Dog d;
    d.name = "Buddy";
    
    // Inherited methods
    d.eat();
    d.sleep();
    
    // Own method
    d.bark();
    
    return 0;
}`,
        output: `Buddy is eating
Buddy is sleeping
Buddy says Woof!`,
        diagram: `graph TD
    A[Animal Base] -->|inherits| B[Dog Derived]
    A --> C[eat, sleep]
    B --> D[bark]
    B --> C`,
        interview: [
            { q: 'Inheritance ka main benefit?', a: 'Code reuse aur IS-A relationship represent karna.' },
            { q: 'Multiple inheritance C++ mein allowed?', a: 'Haan! Ek class multiple classes inherit kar sakti hai.' }
        ]
    },
    {
        id: 'inheritance-2',
        title: 'Inheritance Part-II',
        module: 'inheritance',
        order: 42,
        hinglish: `**Method Overriding - Parent ki function ko child mein redefine!** 🔄

Same function name + same parameters = Override!
Child ka version call hoga jab child object use karein.`,
        realLife: {
            title: 'Recipe Modification',
            icon: '👨‍🍳',
            description: 'Dadi ki recipe inherit ki, but apna tadka lagaya = Override!'
        },
        code: `#include <iostream>
using namespace std;

class Bird {
public:
    virtual void fly() {
        cout << "Bird is flying high!" << endl;
    }
    
    void eat() {
        cout << "Bird is eating" << endl;
    }
};

class Penguin : public Bird {
public:
    // Override - penguins can't fly!
    void fly() override {
        cout << "Penguin can't fly, but can swim!" << endl;
    }
};

class Eagle : public Bird {
public:
    void fly() override {
        cout << "Eagle soars majestically!" << endl;
    }
};

int main() {
    Bird b;
    Penguin p;
    Eagle e;
    
    b.fly();  // Bird version
    p.fly();  // Penguin version (overridden)
    e.fly();  // Eagle version (overridden)
    
    return 0;
}`,
        output: `Bird is flying high!
Penguin can't fly, but can swim!
Eagle soars majestically!`,
        diagram: `graph TD
    A[Bird: fly] -->|override| B[Penguin: fly - swim]
    A -->|override| C[Eagle: fly - soar]`,
        interview: [
            { q: 'Overriding aur Overloading mein fark?', a: 'Overriding = same signature in child. Overloading = different parameters in same class.' },
            { q: 'override keyword kyun use karein?', a: 'Compiler check karega ki actually override ho raha hai, typo se bachega!' }
        ]
    },
    {
        id: 'inheritance-3',
        title: 'Inheritance Part-III',
        module: 'inheritance',
        order: 43,
        hinglish: `**Types of Inheritance!** 🌳

1. Single: A → B
2. Multiple: A, B → C
3. Multilevel: A → B → C
4. Hierarchical: A → B, C, D
5. Hybrid: Mix of above`,
        realLife: {
            title: 'Family Tree',
            icon: '🌳',
            description: 'Single = Direct heir. Multiple = Two parents. Multilevel = Generations.'
        },
        code: `#include <iostream>
using namespace std;

// Multilevel Inheritance
class GrandParent {
public:
    void fromGrandParent() { cout << "GrandParent trait" << endl; }
};

class Parent : public GrandParent {
public:
    void fromParent() { cout << "Parent trait" << endl; }
};

class Child : public Parent {
public:
    void fromChild() { cout << "Child trait" << endl; }
};

// Multiple Inheritance
class Mother {
public:
    void motherSkill() { cout << "Cooking from Mother" << endl; }
};

class Father {
public:
    void fatherSkill() { cout << "Driving from Father" << endl; }
};

class Kid : public Mother, public Father {
public:
    void ownSkill() { cout << "Gaming - own skill!" << endl; }
};

int main() {
    cout << "=== Multilevel ===" << endl;
    Child c;
    c.fromGrandParent();
    c.fromParent();
    c.fromChild();
    
    cout << "\\n=== Multiple ===" << endl;
    Kid k;
    k.motherSkill();
    k.fatherSkill();
    k.ownSkill();
    
    return 0;
}`,
        output: `=== Multilevel ===
GrandParent trait
Parent trait
Child trait

=== Multiple ===
Cooking from Mother
Driving from Father
Gaming - own skill!`,
        diagram: `graph TD
    subgraph Multilevel
    A[GrandParent] --> B[Parent]
    B --> C[Child]
    end
    
    subgraph Multiple
    D[Mother] --> F[Kid]
    E[Father] --> F
    end`,
        interview: [
            { q: 'Diamond problem kya hai?', a: 'Multiple inheritance mein same base class do baar inherit ho jaye. Virtual inheritance se solve.' },
            { q: 'Kaunsa inheritance avoid karna chahiye?', a: 'Unnecessary multiple inheritance. Complexity badhti hai.' }
        ]
    },
    {
        id: 'inheritance-4-access',
        title: 'Inheritance Part-IV (Access Specifier)',
        module: 'inheritance',
        order: 44,
        hinglish: `**public, protected, private inheritance ka fark!** 🔐

public inheritance: public→public, protected→protected
protected inheritance: public→protected, protected→protected
private inheritance: public→private, protected→private`,
        realLife: {
            title: 'Security Clearance',
            icon: '🔑',
            description: 'Top secret (private) sirf authorized ko. Protected = family tak. Public = sabko.'
        },
        code: `#include <iostream>
using namespace std;

class Base {
public:
    int pubVar = 1;
protected:
    int protVar = 2;
private:
    int privVar = 3;  // Never inherited!
};

class PublicDerived : public Base {
public:
    void show() {
        cout << "pubVar: " << pubVar << endl;    // OK - public
        cout << "protVar: " << protVar << endl;  // OK - protected
        // cout << privVar;  // ERROR - private never inherited!
    }
};

class ProtectedDerived : protected Base {
public:
    void show() {
        cout << "pubVar: " << pubVar << endl;    // Now protected!
        cout << "protVar: " << protVar << endl;  // Still protected
    }
};

int main() {
    PublicDerived pd;
    pd.pubVar = 10;    // OK - still public
    // pd.protVar = 20; // ERROR - protected
    pd.show();
    
    ProtectedDerived prd;
    // prd.pubVar = 10;  // ERROR - now protected!
    prd.show();
    
    return 0;
}`,
        output: `pubVar: 10
protVar: 2
pubVar: 1
protVar: 2`,
        diagram: `graph TD
    A[Base: public protected private] -->|public| B[public protected ❌]
    A -->|protected| C[protected protected ❌]
    A -->|private| D[private private ❌]`,
        interview: [
            { q: 'private inheritance kab use karein?', a: 'Implementation inheritance ke liye, IS-A nahi HAS-A ke liye.' },
            { q: 'protected member outside access ho sakta?', a: 'Nahi! Sirf class aur derived classes mein.' }
        ]
    },
    {
        id: 'inheritance-4-constr',
        title: 'Inheritance Part-IV (Constr & Deconstr)',
        module: 'inheritance',
        order: 45,
        hinglish: `**Constructor aur Destructor call order!** 📞

Construction: Base pehle, phir Derived (top-down)
Destruction: Derived pehle, phir Base (bottom-up)

LIFO - Last In First Out!`,
        realLife: {
            title: 'Building Construction',
            icon: '🏗️',
            description: 'Foundation pehle (Base), phir floors (Derived). Demolition ulta!'
        },
        code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "Base Constructor" << endl; }
    ~Base() { cout << "Base Destructor" << endl; }
};

class Derived : public Base {
public:
    Derived() { cout << "Derived Constructor" << endl; }
    ~Derived() { cout << "Derived Destructor" << endl; }
};

class GrandDerived : public Derived {
public:
    GrandDerived() { cout << "GrandDerived Constructor" << endl; }
    ~GrandDerived() { cout << "GrandDerived Destructor" << endl; }
};

int main() {
    cout << "--- Creating object ---" << endl;
    GrandDerived g;
    cout << "\\n--- Object going out of scope ---" << endl;
    return 0;
}`,
        output: `--- Creating object ---
Base Constructor
Derived Constructor
GrandDerived Constructor

--- Object going out of scope ---
GrandDerived Destructor
Derived Destructor
Base Destructor`,
        diagram: `graph TD
    A[Create] --> B[Base Ctor]
    B --> C[Derived Ctor]
    C --> D[GrandDerived Ctor]
    E[Destroy] --> F[GrandDerived Dtor]
    F --> G[Derived Dtor]
    G --> H[Base Dtor]`,
        interview: [
            { q: 'Base constructor mein parameters pass kaise karein?', a: 'Initialization list mein: Derived() : Base(params) { }' },
            { q: 'Virtual destructor kyun chahiye?', a: 'Base pointer se derived object delete karne ke liye!' }
        ]
    }
];
