// Inheritance Topics Part 3 - Advanced and Type Casting
export const inheritanceTopics3 = [
    {
        id: 'dynamic-binding-exercise',
        title: 'Dynamic Binding Exercise',
        module: 'inheritance',
        order: 53,
        hinglish: `**Practice: Employee payroll system!** 💼

Base: Employee
Derived: Manager, Developer, Intern
Virtual: calculateSalary()`,
        realLife: {
            title: 'HR Payroll',
            icon: '💰',
            description: 'Ek payroll system, different salary calculations for different roles!'
        },
        code: `#include <iostream>
using namespace std;

class Employee {
protected:
    string name;
    double baseSalary;
public:
    Employee(string n, double s) : name(n), baseSalary(s) {}
    virtual double calculateSalary() { return baseSalary; }
    virtual void showDetails() {
        cout << "Name: " << name << ", Salary: Rs." << calculateSalary() << endl;
    }
    virtual ~Employee() {}
};

class Manager : public Employee {
    double bonus;
public:
    Manager(string n, double s, double b) : Employee(n, s), bonus(b) {}
    double calculateSalary() override { return baseSalary + bonus; }
};

class Developer : public Employee {
    int projects;
public:
    Developer(string n, double s, int p) : Employee(n, s), projects(p) {}
    double calculateSalary() override { return baseSalary + (projects * 5000); }
};

int main() {
    Employee* team[3];
    team[0] = new Manager("Rahul", 80000, 20000);
    team[1] = new Developer("Priya", 60000, 3);
    team[2] = new Employee("Amit", 30000);
    
    cout << "=== Payroll ===" << endl;
    for(int i = 0; i < 3; i++) {
        team[i]->showDetails();
        delete team[i];
    }
    return 0;
}`,
        output: `=== Payroll ===
Name: Rahul, Salary: Rs.100000
Name: Priya, Salary: Rs.75000
Name: Amit, Salary: Rs.30000`,
        diagram: `graph TD
    A[Employee] --> B[Manager: base + bonus]
    A --> C[Developer: base + projects*5000]
    A --> D[Regular: base only]`,
        interview: [
            { q: 'Factory pattern kahan use hoga yahan?', a: 'Employee* createEmployee(type) function bana sakte hain.' },
            { q: 'Yahan virtual destructor kyun?', a: 'Delete team[i] pe derived destructor bhi chale.' }
        ]
    },
    {
        id: 'salary-processing-app',
        title: 'Design Salary Processing Application',
        module: 'inheritance',
        order: 54,
        hinglish: `**Complete Salary App with OOP Design!** 💼

Design Pattern: Strategy + Polymorphism
- TaxCalculator (interface)
- OldRegime, NewRegime (implementations)
- SalaryProcessor uses them`,
        realLife: {
            title: 'Income Tax Filing',
            icon: '📊',
            description: 'Same salary, different tax based on regime choice!'
        },
        code: `#include <iostream>
using namespace std;

// Strategy Interface
class TaxCalculator {
public:
    virtual double calculate(double income) = 0;
    virtual string getName() = 0;
    virtual ~TaxCalculator() {}
};

class OldRegime : public TaxCalculator {
public:
    double calculate(double income) override {
        if(income <= 250000) return 0;
        if(income <= 500000) return (income - 250000) * 0.05;
        if(income <= 1000000) return 12500 + (income - 500000) * 0.20;
        return 112500 + (income - 1000000) * 0.30;
    }
    string getName() override { return "Old Regime"; }
};

class NewRegime : public TaxCalculator {
public:
    double calculate(double income) override {
        if(income <= 300000) return 0;
        if(income <= 600000) return (income - 300000) * 0.05;
        if(income <= 900000) return 15000 + (income - 600000) * 0.10;
        return 45000 + (income - 900000) * 0.15;
    }
    string getName() override { return "New Regime"; }
};

void processSalary(double income, TaxCalculator* calc) {
    cout << calc->getName() << ": Tax = Rs." << calc->calculate(income) << endl;
}

int main() {
    double salary = 800000;
    cout << "Salary: Rs." << salary << endl;
    
    OldRegime old;
    NewRegime newR;
    
    processSalary(salary, &old);
    processSalary(salary, &newR);
    
    return 0;
}`,
        output: `Salary: Rs.800000
Old Regime: Tax = Rs.72500
New Regime: Tax = Rs.35000`,
        diagram: `graph TD
    A[TaxCalculator Interface] --> B[OldRegime]
    A --> C[NewRegime]
    D[processSalary] -->|uses| A`,
        interview: [
            { q: 'Strategy pattern kya hai?', a: 'Algorithm family define karo, runtime pe select karo.' },
            { q: 'Open/Closed principle kaise apply?', a: 'New tax regime add karo without changing existing code!' }
        ]
    },
    {
        id: 'vtable',
        title: 'Virtual Function Table',
        module: 'inheritance',
        order: 55,
        hinglish: `**Compiler internally vtable maintain karta hai!** 📋

Har class jismein virtual ho, uska vtable banta hai.
Har object mein vptr (pointer to vtable) hota hai.

Runtime pe vptr se vtable, vtable se function address!`,
        realLife: {
            title: 'Phone Directory',
            icon: '📞',
            description: 'Naam se number dhundo (vtable lookup). Phir call karo (function call).'
        },
        code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() { cout << "Animal speaks" << endl; }
    virtual void eat() { cout << "Animal eats" << endl; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Dog barks" << endl; }
    // eat() inherited from Animal
};

class Cat : public Animal {
public:
    void speak() override { cout << "Cat meows" << endl; }
    void eat() override { cout << "Cat eats fish" << endl; }
};

int main() {
    cout << "Size of Animal: " << sizeof(Animal) << " bytes" << endl;
    cout << "Size has vptr (usually 8 bytes on 64-bit)" << endl;
    
    Animal* animals[2];
    animals[0] = new Dog();
    animals[1] = new Cat();
    
    for(int i = 0; i < 2; i++) {
        animals[i]->speak();  // vptr -> vtable -> correct function
        animals[i]->eat();
        delete animals[i];
    }
    return 0;
}`,
        output: `Size of Animal: 8 bytes
Size has vptr (usually 8 bytes on 64-bit)
Dog barks
Animal eats
Cat meows
Cat eats fish`,
        diagram: `graph TD
    A[Dog Object] -->|vptr| B[Dog vtable]
    B --> C[Dog::speak]
    B --> D[Animal::eat]
    E[Cat Object] -->|vptr| F[Cat vtable]
    F --> G[Cat::speak]
    F --> H[Cat::eat]`,
        interview: [
            { q: 'vtable memory mein kahan hota hai?', a: 'Read-only data section mein, shared by all objects of class.' },
            { q: 'vptr kab set hota hai?', a: 'Constructor mein, base to derived order mein update hota hai.' }
        ]
    },
    {
        id: 'type-casting',
        title: 'Type Casting',
        module: 'casting',
        order: 47,
        hinglish: `**C++ mein type convert karna!** 🔄

C-style: (int)x - dangerous, no checking!
C++ style: 4 operators for safety`,
        realLife: {
            title: 'Currency Exchange',
            icon: '💱',
            description: 'Dollar ko Rupees mein convert karna = type casting!'
        },
        code: `#include <iostream>
using namespace std;

int main() {
    double pi = 3.14159;
    
    // C-style cast (avoid!)
    int x = (int)pi;
    cout << "C-style: " << x << endl;
    
    // C++ casts (prefer these!)
    int y = static_cast<int>(pi);
    cout << "static_cast: " << y << endl;
    
    // Pointer casts
    int num = 65;
    char* ch = reinterpret_cast<char*>(&num);
    cout << "reinterpret_cast: " << *ch << endl;  // 'A'
    
    // Const removal
    const int val = 100;
    int* ptr = const_cast<int*>(&val);
    cout << "const_cast ptr: " << *ptr << endl;
    
    return 0;
}`,
        output: `C-style: 3
static_cast: 3
reinterpret_cast: A
const_cast ptr: 100`,
        diagram: `graph TD
    A[Type Casting] --> B[static_cast - safe conversions]
    A --> C[dynamic_cast - polymorphic]
    A --> D[const_cast - const removal]
    A --> E[reinterpret_cast - bit reinterpret]`,
        interview: [
            { q: 'C-style cast kyun avoid karein?', a: 'Koi checking nahi, kuch bhi convert kar dega!' },
            { q: '4 C++ casts kaun se hain?', a: 'static_cast, dynamic_cast, const_cast, reinterpret_cast' }
        ]
    },
    {
        id: 'type-casting-operators-1',
        title: 'Type Casting Operators - I',
        module: 'casting',
        order: 56,
        hinglish: `**const_cast: const/volatile hatao ya lagao!** 🔓

Sirf const/volatile modify karta hai.
Type nahi badalta!

Warning: const variable modify karna = undefined behavior!`,
        realLife: {
            title: 'Read-Only to Writable',
            icon: '📝',
            description: 'Read-only file ko temporarily writable banana!'
        },
        code: `#include <iostream>
using namespace std;

void legacyFunc(char* str) {
    cout << "Legacy: " << str << endl;
}

int main() {
    const char* msg = "Hello";
    
    // Need to pass to legacy function that doesn't use const
    // (but won't modify the string)
    legacyFunc(const_cast<char*>(msg));
    
    // Proper use: temporary const removal for API compatibility
    const int x = 10;
    int* ptr = const_cast<int*>(&x);
    
    // WARNING: Modifying x through ptr is UNDEFINED BEHAVIOR!
    // *ptr = 20;  // Don't do this!
    
    cout << "x via ptr: " << *ptr << endl;
    
    return 0;
}`,
        output: `Legacy: Hello
x via ptr: 10`,
        diagram: `graph LR
    A[const int*] -->|const_cast| B[int*]
    C[volatile T*] -->|const_cast| D[T*]`,
        interview: [
            { q: 'const_cast kab safe hai?', a: 'Jab original object const nahi thi, sirf pointer const hai.' },
            { q: 'const object modify karna kya hai?', a: 'Undefined behavior! Compiler optimize kar sakta hai.' }
        ]
    },
    {
        id: 'static-cast',
        title: 'Type Casting Operators - II (static_cast)',
        module: 'casting',
        order: 57,
        hinglish: `**static_cast: Compile time pe check hota hai!** ✅

Use for:
- Numeric conversions (int→double)
- Pointer to void* and back
- Upcast (derived→base) always safe
- Downcast (base→derived) - unsafe, no runtime check!`,
        realLife: {
            title: 'Known Conversion',
            icon: '🔢',
            description: 'Meters to Centimeters - formula pata hai, direct convert!'
        },
        code: `#include <iostream>
using namespace std;

class Animal { public: virtual ~Animal() {} };
class Dog : public Animal { public: void bark() { cout << "Woof!" << endl; } };

int main() {
    // Numeric conversion
    double d = 3.14;
    int i = static_cast<int>(d);
    cout << "double to int: " << i << endl;
    
    // void* conversion
    int x = 42;
    void* vp = static_cast<void*>(&x);
    int* ip = static_cast<int*>(vp);
    cout << "via void*: " << *ip << endl;
    
    // Upcasting (safe)
    Dog dog;
    Animal* aPtr = static_cast<Animal*>(&dog);
    
    // Downcasting (UNSAFE with static_cast!)
    Animal* aPtr2 = new Dog();
    Dog* dPtr = static_cast<Dog*>(aPtr2);  // Works but no runtime check
    dPtr->bark();
    
    delete aPtr2;
    return 0;
}`,
        output: `double to int: 3
via void*: 42
Woof!`,
        diagram: `graph TD
    A[static_cast] --> B[Numeric: int ↔ double]
    A --> C[Pointer: T* ↔ void*]
    A --> D[Upcast: Derived* → Base*]
    A --> E[Downcast: Risky!]`,
        interview: [
            { q: 'static_cast aur C-style cast mein fark?', a: 'static_cast explicit hai, compile error dega invalid conversion pe.' },
            { q: 'Downcast ke liye kya use karein?', a: 'dynamic_cast - runtime check karega.' }
        ]
    },
    {
        id: 'reinterpret-cast',
        title: 'Type Casting Operators - III (reinterpret_cast)',
        module: 'casting',
        order: 58,
        hinglish: `**reinterpret_cast: Bits ko different type se read karo!** ⚠️

Most dangerous cast!
No conversion, just reinterpretation.
Use: Low-level, hardware, serialization.`,
        realLife: {
            title: 'Same File, Different App',
            icon: '📁',
            description: '.txt file ko .cpp extension de do - content same, interpretation different!'
        },
        code: `#include <iostream>
using namespace std;

int main() {
    int num = 0x41424344;  // Contains 'DCBA' in ASCII
    
    // Reinterpret as char array
    char* chars = reinterpret_cast<char*>(&num);
    cout << "Bytes: ";
    for(int i = 0; i < 4; i++) {
        cout << chars[i];
    }
    cout << endl;
    
    // Pointer to integer (for address arithmetic)
    int x = 42;
    uintptr_t addr = reinterpret_cast<uintptr_t>(&x);
    cout << "Address as int: " << addr << endl;
    
    // Back to pointer
    int* ptr = reinterpret_cast<int*>(addr);
    cout << "Value: " << *ptr << endl;
    
    return 0;
}`,
        output: `Bytes: DCBA
Address as int: 140732920755196
Value: 42`,
        diagram: `graph LR
    A[int bits] -->|reinterpret| B[char* view]
    C[T*] -->|reinterpret| D[uintptr_t]`,
        interview: [
            { q: 'reinterpret_cast kab use karein?', a: 'Hardware access, memory-mapped I/O, serialization.' },
            { q: 'Ye portable hai?', a: 'Nahi! Platform-specific behavior ho sakta hai.' }
        ]
    },
    {
        id: 'dynamic-cast',
        title: 'Type Casting Operators - IV (dynamic_cast)',
        module: 'casting',
        order: 59,
        hinglish: `**dynamic_cast: Runtime pe safe downcast!** 🛡️

Sirf polymorphic classes pe kaam karta hai (virtual function chahiye).
Fail hone pe nullptr return karta hai (pointer) ya exception (reference).`,
        realLife: {
            title: 'ID Card Check',
            icon: '🪪',
            description: 'Club mein entry se pehle ID check = dynamic_cast. Fake ID? Entry denied!'
        },
        code: `#include <iostream>
using namespace std;

class Animal { 
public: 
    virtual ~Animal() {} 
    virtual void speak() { cout << "Animal" << endl; }
};

class Dog : public Animal { 
public: 
    void speak() override { cout << "Woof!" << endl; }
    void fetch() { cout << "Fetching ball!" << endl; }
};

class Cat : public Animal {
public:
    void speak() override { cout << "Meow!" << endl; }
    void climb() { cout << "Climbing tree!" << endl; }
};

void tryFetch(Animal* a) {
    Dog* d = dynamic_cast<Dog*>(a);
    if(d) {
        d->fetch();
    } else {
        cout << "Not a dog, can't fetch!" << endl;
    }
}

int main() {
    Animal* a1 = new Dog();
    Animal* a2 = new Cat();
    
    cout << "Try fetch on Dog: ";
    tryFetch(a1);
    
    cout << "Try fetch on Cat: ";
    tryFetch(a2);
    
    delete a1;
    delete a2;
    return 0;
}`,
        output: `Try fetch on Dog: Fetching ball!
Try fetch on Cat: Not a dog, can't fetch!`,
        diagram: `graph TD
    A[Animal* ptr] -->|dynamic_cast Dog*| B{Is Dog?}
    B -->|Yes| C[Dog* valid]
    B -->|No| D[nullptr]`,
        interview: [
            { q: 'dynamic_cast kab fail hota hai?', a: 'Jab actual object target type nahi hai.' },
            { q: 'RTTI kya hai?', a: 'Runtime Type Information - dynamic_cast internally use karta hai.' }
        ]
    },
    {
        id: 'multiple-inheritance-1',
        title: 'Multiple Inheritance I',
        module: 'inheritance',
        order: 60,
        hinglish: `**Ek class multiple parents se inherit kare!** 👨‍👩‍👧

Syntax: \`class C : public A, public B { }\`

Problem: Ambiguity jab same naam dono mein ho!
Solution: Scope resolution \`::\``,
        realLife: {
            title: 'Dual Citizenship',
            icon: '🌍',
            description: 'India aur US dono ki citizenship = Multiple inheritance of rights!'
        },
        code: `#include <iostream>
using namespace std;

class Printer {
public:
    void print() { cout << "Printing document" << endl; }
};

class Scanner {
public:
    void scan() { cout << "Scanning document" << endl; }
    void start() { cout << "Scanner starting" << endl; }
};

class Copier {
public:
    void copy() { cout << "Copying document" << endl; }
    void start() { cout << "Copier starting" << endl; }
};

// Multiple inheritance
class AllInOne : public Printer, public Scanner, public Copier {
public:
    void startAll() {
        Scanner::start();  // Resolve ambiguity
        Copier::start();
    }
};

int main() {
    AllInOne device;
    device.print();
    device.scan();
    device.copy();
    device.startAll();
    return 0;
}`,
        output: `Printing document
Scanning document
Copying document
Scanner starting
Copier starting`,
        diagram: `graph TD
    A[Printer] --> D[AllInOne]
    B[Scanner] --> D
    C[Copier] --> D`,
        interview: [
            { q: 'Ambiguity kaise resolve karein?', a: 'ClassName::functionName() use karo.' },
            { q: 'Diamond problem kya hai?', a: 'A→B, A→C, B+C→D. D mein A ka duplicate!' }
        ]
    },
    {
        id: 'multiple-inheritance-2',
        title: 'Multiple Inheritance II',
        module: 'inheritance',
        order: 61,
        hinglish: `**Diamond Problem aur Virtual Inheritance!** 💎

Problem: Grandparent do baar inherit ho jaye!
Solution: \`class B : virtual public A\`

Virtual inheritance = sirf ek copy of grandparent!`,
        realLife: {
            title: 'Family Tree Merge',
            icon: '👨‍👩‍👧‍👦',
            description: 'Ek hi dada ka naam do baar list mein kyun aaye? Virtual se ek hi rahega!'
        },
        code: `#include <iostream>
using namespace std;

class Animal {
public:
    Animal() { cout << "Animal constructed" << endl; }
    void breathe() { cout << "Breathing..." << endl; }
};

// Virtual inheritance
class Mammal : virtual public Animal {
public:
    Mammal() { cout << "Mammal constructed" << endl; }
};

class WingedAnimal : virtual public Animal {
public:
    WingedAnimal() { cout << "WingedAnimal constructed" << endl; }
};

// Bat inherits from both, but Animal only once!
class Bat : public Mammal, public WingedAnimal {
public:
    Bat() { cout << "Bat constructed" << endl; }
};

int main() {
    cout << "Creating Bat:" << endl;
    Bat b;
    cout << endl;
    b.breathe();  // No ambiguity!
    return 0;
}`,
        output: `Creating Bat:
Animal constructed
Mammal constructed
WingedAnimal constructed
Bat constructed

Breathing...`,
        diagram: `graph TD
    A[Animal] -->|virtual| B[Mammal]
    A -->|virtual| C[WingedAnimal]
    B --> D[Bat]
    C --> D
    E[Only ONE Animal!]`,
        interview: [
            { q: 'Virtual inheritance mein constructor order?', a: 'Virtual base pehle, phir non-virtual, declaration order mein.' },
            { q: 'Virtual base ka constructor kaun call karta hai?', a: 'Most derived class (Bat) directly call karta hai!' }
        ]
    }
];
