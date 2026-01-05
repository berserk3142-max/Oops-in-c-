// Inheritance Topics Part 2 - Polymorphism and Virtual
export const inheritanceTopics2 = [
    {
        id: 'inheritance-5-phone',
        title: 'Inheritance Part-V (Model Phone Hierarchy)',
        module: 'inheritance',
        order: 46,
        hinglish: `**Real world example: Phone class hierarchy!** 📱

Phone (Base) → SmartPhone → iPhone/Android

Common features base mein, specific features derived mein!`,
        realLife: {
            title: 'Phone Evolution',
            icon: '📱',
            description: 'Basic phone → Feature phone → Smartphone → iPhone/Android. Each adds features!'
        },
        code: `#include <iostream>
using namespace std;

class Phone {
protected:
    string brand;
public:
    Phone(string b) : brand(b) {}
    virtual void call() { cout << "Making a call..." << endl; }
    virtual void showInfo() { cout << "Brand: " << brand << endl; }
};

class SmartPhone : public Phone {
protected:
    int ram;
public:
    SmartPhone(string b, int r) : Phone(b), ram(r) {}
    void browseInternet() { cout << "Browsing with " << ram << "GB RAM" << endl; }
    void showInfo() override {
        Phone::showInfo();
        cout << "RAM: " << ram << "GB" << endl;
    }
};

class iPhone : public SmartPhone {
    bool hasFaceID;
public:
    iPhone(int r, bool fid) : SmartPhone("Apple", r), hasFaceID(fid) {}
    void useFaceID() { 
        if(hasFaceID) cout << "Face ID unlocked!" << endl; 
    }
    void showInfo() override {
        SmartPhone::showInfo();
        cout << "Face ID: " << (hasFaceID ? "Yes" : "No") << endl;
    }
};

int main() {
    iPhone myPhone(8, true);
    myPhone.showInfo();
    myPhone.call();
    myPhone.browseInternet();
    myPhone.useFaceID();
    return 0;
}`,
        output: `Brand: Apple
RAM: 8GB
Face ID: Yes
Making a call...
Browsing with 8GB RAM
Face ID unlocked!`,
        diagram: `graph TD
    A[Phone] -->|call, showInfo| B[SmartPhone]
    B -->|browseInternet| C[iPhone]
    B -->|browseInternet| D[Android]
    C -->|useFaceID| E[Specific Features]`,
        interview: [
            { q: 'IS-A relationship kya hai?', a: 'iPhone IS-A SmartPhone, SmartPhone IS-A Phone.' },
            { q: 'Base function call kaise karein override mein?', a: 'ClassName::functionName() use karo.' }
        ]
    },
    {
        id: 'static-dynamic-binding-1',
        title: 'Static & Dynamic Binding',
        module: 'inheritance',
        order: 48,
        hinglish: `**Compile time vs Runtime function call decision!** ⚡

Static Binding (Early): Compile time pe decide - FAST
Dynamic Binding (Late): Runtime pe decide - FLEXIBLE

Non-virtual = Static
Virtual = Dynamic`,
        realLife: {
            title: 'Movie Ticket',
            icon: '🎬',
            description: 'Advance booking = Static (fix). Spot booking = Dynamic (runtime pe decide).'
        },
        code: `#include <iostream>
using namespace std;

class Animal {
public:
    void normalSound() {  // Static binding
        cout << "Animal sound" << endl;
    }
    virtual void virtualSound() {  // Dynamic binding
        cout << "Animal virtual sound" << endl;
    }
};

class Dog : public Animal {
public:
    void normalSound() {
        cout << "Dog barks (static)" << endl;
    }
    void virtualSound() override {
        cout << "Dog barks (dynamic)" << endl;
    }
};

int main() {
    Animal* ptr;
    Dog d;
    ptr = &d;
    
    cout << "Through base pointer:" << endl;
    ptr->normalSound();   // Static: Animal version
    ptr->virtualSound();  // Dynamic: Dog version!
    
    return 0;
}`,
        output: `Through base pointer:
Animal sound
Dog barks (dynamic)`,
        diagram: `graph TD
    A[Base* ptr = &derived] -->|non-virtual| B[Compile time: Base version]
    A -->|virtual| C[Runtime: Derived version]`,
        interview: [
            { q: 'Static binding fast kyun hai?', a: 'Function address compile time pe fix. No lookup needed.' },
            { q: 'Virtual function slow kyun?', a: 'Runtime pe vtable lookup hoti hai.' }
        ]
    },
    {
        id: 'static-dynamic-binding-2',
        title: 'Static & Dynamic Binding-II',
        module: 'inheritance',
        order: 49,
        hinglish: `**Polymorphism ka magic virtual se aata hai!** ✨

Base pointer different derived objects handle kar sakta hai.
Sahi function automatically call hoti hai runtime pe!`,
        realLife: {
            title: 'Universal Remote',
            icon: '🎮',
            description: 'Ek remote different TVs ko control karta hai. Same button, different action!'
        },
        code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() {
        cout << "Drawing Shape" << endl;
    }
    virtual double area() = 0;  // Pure virtual
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() override { cout << "Drawing Circle" << endl; }
    double area() override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    void draw() override { cout << "Drawing Rectangle" << endl; }
    double area() override { return width * height; }
};

void processShape(Shape* s) {
    s->draw();
    cout << "Area: " << s->area() << endl;
}

int main() {
    Circle c(5);
    Rectangle r(4, 6);
    
    cout << "=== Polymorphism ===" << endl;
    processShape(&c);  // Circle behavior
    processShape(&r);  // Rectangle behavior
    
    return 0;
}`,
        output: `=== Polymorphism ===
Drawing Circle
Area: 78.5397
Drawing Rectangle
Area: 24`,
        diagram: `graph TD
    A[processShape Shape*] -->|Circle*| B[Circle::draw, area]
    A -->|Rectangle*| C[Rectangle::draw, area]`,
        interview: [
            { q: 'Polymorphism kya hai?', a: 'Same interface, different implementations. One name, many forms.' },
            { q: 'Pure virtual function ka syntax?', a: 'virtual returnType func() = 0;' }
        ]
    },
    {
        id: 'static-dynamic-binding-3',
        title: 'Static & Dynamic Binding-III',
        module: 'inheritance',
        order: 50,
        hinglish: `**Object slicing problem!** ✂️

Jab derived object ko base object mein copy karo:
- Derived part CUT ho jata hai!
- Sirf base part bachta hai

Solution: Pointers/References use karo!`,
        realLife: {
            title: 'Photocopy of Part',
            icon: '📄',
            description: 'A4 paper ka sirf half photocopy = Object Slicing!'
        },
        code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void show() { cout << "Base" << endl; }
};

class Derived : public Base {
    int extra;
public:
    Derived() : extra(100) {}
    void show() override { cout << "Derived, extra=" << extra << endl; }
};

void byValue(Base b) {    // SLICING!
    b.show();
}

void byPointer(Base* b) {  // No slicing
    b->show();
}

void byReference(Base& b) {  // No slicing
    b.show();
}

int main() {
    Derived d;
    
    cout << "By Value (SLICED): ";
    byValue(d);
    
    cout << "By Pointer (OK): ";
    byPointer(&d);
    
    cout << "By Reference (OK): ";
    byReference(d);
    
    return 0;
}`,
        output: `By Value (SLICED): Base
By Pointer (OK): Derived, extra=100
By Reference (OK): Derived, extra=100`,
        diagram: `graph TD
    A[Derived Object] -->|By Value| B[Sliced! Only Base part]
    A -->|By Pointer| C[Full object, Derived behavior]
    A -->|By Reference| D[Full object, Derived behavior]`,
        interview: [
            { q: 'Object slicing kaise avoid karein?', a: 'Pointers ya references use karo for polymorphism.' },
            { q: 'STL containers mein polymorphism kaise?', a: 'vector<Base*> use karo, vector<Base> nahi!' }
        ]
    },
    {
        id: 'virtual-destructor',
        title: 'Static & Dynamic Binding-IV (Virtual Destructor)',
        module: 'inheritance',
        order: 51,
        hinglish: `**Base pointer se delete karte waqt derived destructor bhi chale!** 🗑️

Problem: Non-virtual destructor se derived part leak ho jata hai!
Solution: Base destructor VIRTUAL banao!`,
        realLife: {
            title: 'Complete Demolition',
            icon: '🏚️',
            description: 'Building tod rahe ho to extension bhi toda jaye, sirf main building nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "Base constructed" << endl; }
    virtual ~Base() { cout << "Base destroyed" << endl; }
};

class Derived : public Base {
    int* data;
public:
    Derived() {
        data = new int[100];
        cout << "Derived constructed, memory allocated" << endl;
    }
    ~Derived() {
        delete[] data;
        cout << "Derived destroyed, memory freed" << endl;
    }
};

int main() {
    cout << "=== With Virtual Destructor ===" << endl;
    Base* ptr = new Derived();
    delete ptr;  // Both destructors called!
    
    return 0;
}`,
        output: `=== With Virtual Destructor ===
Base constructed
Derived constructed, memory allocated
Derived destroyed, memory freed
Base destroyed`,
        diagram: `graph TD
    A[delete Base*] -->|virtual ~Base| B[~Derived called]
    B --> C[~Base called]
    D[Without virtual] -->|Only ~Base| E[Memory Leak!]`,
        interview: [
            { q: 'Kab virtual destructor chahiye?', a: 'Jab class mein koi bhi virtual function ho!' },
            { q: 'Constructor virtual ho sakta hai?', a: 'Nahi! Object type pehle se pata hona chahiye.' }
        ]
    },
    {
        id: 'pure-virtual-abstract',
        title: 'Pure Virtual Function & Abstract Class',
        module: 'inheritance',
        order: 52,
        hinglish: `**Pure virtual = Implementation nahi, sirf interface!** 🎯

\`virtual void func() = 0;\`

Abstract class:
- Jismein kam se kam ek pure virtual ho
- Object NAHI ban sakta
- Sirf pointer/reference ban sakte hain`,
        realLife: {
            title: 'Blueprint/Contract',
            icon: '📋',
            description: 'House blueprint se rehna nahi sakte. Usse actual ghar banana padta hai!'
        },
        code: `#include <iostream>
using namespace std;

// Abstract class
class Vehicle {
public:
    virtual void start() = 0;    // Pure virtual
    virtual void stop() = 0;     // Pure virtual
    virtual void fuel() {        // Regular virtual
        cout << "Fueling vehicle" << endl;
    }
};

class Car : public Vehicle {
public:
    void start() override { cout << "Car: Turn key" << endl; }
    void stop() override { cout << "Car: Apply brakes" << endl; }
};

class Bike : public Vehicle {
public:
    void start() override { cout << "Bike: Kick start" << endl; }
    void stop() override { cout << "Bike: Hand brake" << endl; }
};

int main() {
    // Vehicle v;  // ERROR! Abstract class
    
    Vehicle* v1 = new Car();
    Vehicle* v2 = new Bike();
    
    v1->start();
    v1->stop();
    
    v2->start();
    v2->stop();
    
    delete v1;
    delete v2;
    return 0;
}`,
        output: `Car: Turn key
Car: Apply brakes
Bike: Kick start
Bike: Hand brake`,
        diagram: `graph TD
    A[Vehicle Abstract] -->|implements| B[Car]
    A -->|implements| C[Bike]
    A -->|start = 0, stop = 0| D[Pure Virtual]`,
        interview: [
            { q: 'Interface aur Abstract class mein fark?', a: 'C++ mein same. Interface = sab pure virtual. Abstract = kuch pure virtual.' },
            { q: 'Abstract class ka pointer ban sakta hai?', a: 'Haan! Derived object point karega.' }
        ]
    }
];
