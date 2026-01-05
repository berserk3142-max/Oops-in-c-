// OOPSify C++ - Complete Topic Data
// All 64 topics with Hinglish explanations, examples, and code

// Import all topic modules
import { advancedTopics1 } from './advancedTopics1.js';
import { advancedTopics2 } from './advancedTopics2.js';
import { operatorTopics } from './operatorTopics.js';
import { namespaceTopics } from './namespaceTopics.js';
import { inheritanceTopics1 } from './inheritanceTopics1.js';
import { inheritanceTopics2 } from './inheritanceTopics2.js';
import { inheritanceTopics3 } from './inheritanceTopics3.js';
import { templateTopics } from './templateTopics.js';

export const modules = [
    { id: 'basics', name: 'Basics', icon: '🔧', color: '#8B5CF6' },
    { id: 'lifecycle', name: 'Object Lifecycle', icon: '🔄', color: '#06B6D4' },
    { id: 'advanced', name: 'Advanced Control', icon: '⚡', color: '#F59E0B' },
    { id: 'operators', name: 'Operator Overloading', icon: '➕', color: '#EC4899' },
    { id: 'namespace', name: 'Namespace', icon: '📦', color: '#10B981' },
    { id: 'inheritance', name: 'Inheritance & Polymorphism', icon: '🧬', color: '#3B82F6' },
    { id: 'casting', name: 'Type Casting', icon: '🔄', color: '#EF4444' },
    { id: 'templates', name: 'Templates', icon: '📐', color: '#14B8A6' },
];

// Core topics (Basics and Lifecycle)
const coreTopics = [
    // ========== MODULE 1: BASICS ==========
    {
        id: 'const-ness',
        title: 'const-ness',
        module: 'basics',
        order: 1,
        hinglish: `**const ka matlab hai "ye change nahi hoga"** 🔒

Socho tumhare paas ATM card hai:
- Card number FIXED hai → **const**
- Balance change hota hai → **non-const**

C++ mein const 3 jagah use hota hai:
1. **const variable** → value fix
2. **const pointer** → pointer fix
3. **const function** → object change nahi karega`,
        realLife: {
            title: 'ATM Card Example',
            icon: '💳',
            description: 'ATM card number kabhi change nahi hota (const), lekin balance change hota rehta hai (non-const)'
        },
        code: `#include <iostream>
using namespace std;

class ATM {
    const int cardNumber;  // Fixed! Cannot change
    int balance;           // Can change
    
public:
    ATM(int num, int bal) : cardNumber(num), balance(bal) {}
    
    // const function - promise: won't modify object
    int getCardNumber() const {
        return cardNumber;
    }
    
    void deposit(int amount) {
        balance += amount;  // OK - balance is non-const
    }
};

int main() {
    ATM myCard(1234, 5000);
    cout << "Card: " << myCard.getCardNumber() << endl;
    myCard.deposit(1000);
    return 0;
}`,
        output: `Card: 1234`,
        diagram: `graph LR
    A[const int cardNumber] -->|Cannot Change| B[1234]
    C[int balance] -->|Can Change| D[5000 → 6000]`,
        interview: [
            { q: 'const function kya karti hai?', a: 'Ye promise karti hai ki function object ko modify nahi karega. Agar kare toh compiler error dega.' },
            { q: 'const variable ko constructor mein kaise initialize karte hain?', a: 'Initialization list use karte hain, constructor body mein nahi kar sakte.' }
        ]
    },
    {
        id: 'inline-keyword',
        title: 'inline keyword',
        module: 'basics',
        order: 2,
        hinglish: `**inline function matlab code directly paste ho jata hai** 📋

Normal function call mein:
1. Jump to function
2. Execute
3. Return back
→ Time lagta hai!

inline mein:
- Compiler function ka code COPY-PASTE kar deta hai call ki jagah
- No jumping = FASTER! ⚡`,
        realLife: {
            title: 'Shortcut vs Full Path',
            icon: '🚀',
            description: 'Jaise shortcut use karna vs pura address follow karna. Shortcut faster hai!'
        },
        code: `#include <iostream>
using namespace std;

// inline function
inline int square(int x) {
    return x * x;
}

int main() {
    // Compiler replaces this with: int result = 5 * 5;
    int result = square(5);
    cout << "Square: " << result << endl;
    return 0;
}`,
        output: `Square: 25`,
        diagram: `graph LR
    A[square 5] -->|inline| B[5 * 5 = 25]
    C[No function call overhead]`,
        interview: [
            { q: 'inline kab use karna chahiye?', a: 'Chhoti functions jo baar baar call hoti hain, jaise getters/setters.' },
            { q: 'Kya compiler hamesha inline karta hai?', a: 'Nahi! inline sirf REQUEST hai. Compiler decide karta hai.' }
        ]
    },
    {
        id: 'function-overloading',
        title: 'Function Overloading',
        module: 'basics',
        order: 3,
        hinglish: `**Same naam, different parameters = Function Overloading** 🎭

Jaise ek doctor:
- Bachche ko alag treat karta hai
- Adult ko alag treat karta hai
- Same "treat" function, different approach!

Rules:
- Same function name ✅
- Different parameter types/count ✅
- Return type se overload NAHI hota ❌`,
        realLife: {
            title: 'Doctor Analogy',
            icon: '👨‍⚕️',
            description: 'Doctor treat() function hai - bachche ko candy deta hai, adult ko injection!'
        },
        code: `#include <iostream>
using namespace std;

class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    double add(double a, double b) {
        return a + b;
    }
};

int main() {
    Calculator calc;
    cout << calc.add(2, 3) << endl;
    cout << calc.add(2, 3, 4) << endl;
    cout << calc.add(2.5, 3.5) << endl;
    return 0;
}`,
        output: `5
9
6`,
        diagram: `graph TD
    A[add Function] --> B[add int,int]
    A --> C[add int,int,int]
    A --> D[add double,double]`,
        interview: [
            { q: 'Sirf return type se overload ho sakta hai?', a: 'Nahi! Compiler confuse ho jayega ki kaunsa call karna hai.' },
            { q: 'Overloading compile time ya runtime?', a: 'Compile time! Compiler decide karta hai.' }
        ]
    },
    {
        id: 'operator-overloading',
        title: 'Operator Overloading',
        module: 'basics',
        order: 4,
        hinglish: `**Apne class ke liye +, -, * operators banao!** ➕

By default, + sirf int, float ke liye kaam karta hai.
Tumhare Complex class ke liye + chahiye? OVERLOAD karo!

Syntax: \`returnType operator+(parameters)\``,
        realLife: {
            title: 'Custom Math',
            icon: '🧮',
            description: 'Jaise Vector + Vector = New Vector. Math naturally likho!'
        },
        code: `#include <iostream>
using namespace std;

class Complex {
    int real, imag;
public:
    Complex(int r = 0, int i = 0) : real(r), imag(i) {}
    
    Complex operator+(const Complex& other) {
        return Complex(real + other.real, imag + other.imag);
    }
    
    void display() {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(3, 4), c2(1, 2);
    Complex c3 = c1 + c2;
    c3.display();
    return 0;
}`,
        output: `4 + 6i`,
        diagram: `graph LR
    A[c1: 3+4i] -->|+| B[c2: 1+2i]
    B --> C[c3: 4+6i]`,
        interview: [
            { q: 'Kaun se operators overload nahi ho sakte?', a: ':: . .* ?: sizeof - ye 5 operators overload nahi ho sakte.' },
            { q: 'Friend function se kab overload karte hain?', a: 'Jab left operand humara object nahi hai, jaise cout << obj' }
        ]
    },
    {
        id: 'new-and-delete',
        title: 'New and Delete',
        module: 'basics',
        order: 5,
        hinglish: `**new = Heap pe memory lo, delete = Wapis do** 🏠

Stack memory automatic free hoti hai.
Heap memory MANUALLY free karni padti hai!

new kya karta hai:
1. Memory allocate karta hai
2. Constructor call karta hai
3. Pointer return karta hai`,
        realLife: {
            title: 'Hotel Room Booking',
            icon: '🏨',
            description: 'new = Room book karna, delete = Checkout karna. Checkout bhool gaye? Memory LEAK!'
        },
        code: `#include <iostream>
using namespace std;

class Student {
    string name;
public:
    Student(string n) : name(n) {
        cout << name << " created!" << endl;
    }
    ~Student() {
        cout << name << " destroyed!" << endl;
    }
};

int main() {
    Student* s1 = new Student("Rahul");
    cout << "Using student..." << endl;
    delete s1;
    
    int* arr = new int[5];
    delete[] arr;
    return 0;
}`,
        output: `Rahul created!
Using student...
Rahul destroyed!`,
        diagram: `graph TD
    A[new Student] --> B[Heap Memory]
    B --> C[Constructor Called]
    C --> D[Pointer Returned]
    D -->|delete| E[Destructor Called]
    E --> F[Memory Freed]`,
        interview: [
            { q: 'new aur malloc mein kya fark hai?', a: 'new constructor call karta hai, malloc sirf memory deta hai.' },
            { q: 'delete[] kab use karte hain?', a: 'Arrays ke liye! new[] ke saath delete[] use karo.' }
        ]
    },
    {
        id: 'placement-new',
        title: 'Placement new',
        module: 'basics',
        order: 6,
        hinglish: `**Already allocated memory pe object banao!** 🎯

Normal new: Khud memory find karta hai
Placement new: Tum batao kahan banana hai!

Use case: Memory pools, embedded systems, performance optimization`,
        realLife: {
            title: 'Reserved Parking',
            icon: '🅿️',
            description: 'Normal parking = koi bhi slot. Reserved = specific slot pe park karo!'
        },
        code: `#include <iostream>
#include <new>
using namespace std;

class Data {
    int value;
public:
    Data(int v) : value(v) {
        cout << "Data created with " << value << endl;
    }
    ~Data() {
        cout << "Data destroyed" << endl;
    }
};

int main() {
    char buffer[sizeof(Data)];
    Data* ptr = new (buffer) Data(42);
    ptr->~Data();
    return 0;
}`,
        output: `Data created with 42
Data destroyed`,
        diagram: `graph LR
    A[char buffer] -->|Placement new| B[Object at buffer address]
    B -->|Manual destructor| C[Object destroyed]`,
        interview: [
            { q: 'Placement new ke baad delete call karte hain?', a: 'Nahi! Sirf destructor manually call karo. Memory tumne allocate ki thi.' },
            { q: 'Kab use hota hai?', a: 'Memory pools, custom allocators, embedded systems mein.' }
        ]
    },
    {
        id: 'overloading-new-delete',
        title: 'Overloading new & delete',
        module: 'basics',
        order: 7,
        hinglish: `**Custom memory management chahiye? new/delete overload karo!** 🛠️

Kab useful:
- Memory tracking/debugging
- Custom memory pools
- Memory leak detection`,
        realLife: {
            title: 'Custom Warehouse',
            icon: '🏭',
            description: 'Default warehouse ki jagah apna warehouse use karo jahan tracking ho!'
        },
        code: `#include <iostream>
#include <cstdlib>
using namespace std;

class Tracked {
public:
    void* operator new(size_t size) {
        cout << "Allocating " << size << " bytes" << endl;
        return malloc(size);
    }
    
    void operator delete(void* ptr) {
        cout << "Freeing memory" << endl;
        free(ptr);
    }
    
    int data;
};

int main() {
    Tracked* t = new Tracked();
    t->data = 100;
    delete t;
    return 0;
}`,
        output: `Allocating 4 bytes
Freeing memory`,
        diagram: `graph TD
    A[new Tracked] --> B[Custom operator new]
    B --> C[malloc + logging]
    D[delete t] --> E[Custom operator delete]
    E --> F[free + logging]`,
        interview: [
            { q: 'Global new/delete overload ho sakte hain?', a: 'Haan! Class ke bahar define karo, sab jagah apply hoga.' },
            { q: 'operator new mein kya return karna padta hai?', a: 'void* pointer jo allocated memory ko point kare.' }
        ]
    },
    {
        id: 'this-pointer',
        title: 'this pointer',
        module: 'basics',
        order: 8,
        hinglish: `**this = Current object ka address** 👈

Har non-static member function ke paas secretly this pointer hota hai.
Compiler khud pass karta hai!

Use cases:
1. Parameter aur member ka same naam ho
2. Chaining ke liye *this return karo
3. Object khud ko return kare`,
        realLife: {
            title: 'Aap Khud',
            icon: '🪞',
            description: 'Jaise "main" ya "I" bolte ho apne liye, object "this" bolta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Builder {
    int value;
public:
    Builder() : value(0) {}
    
    Builder& add(int x) {
        this->value += x;
        return *this;
    }
    
    Builder& multiply(int x) {
        this->value *= x;
        return *this;
    }
    
    void show() {
        cout << "Value: " << value << endl;
    }
};

int main() {
    Builder b;
    b.add(5).multiply(3).add(10).show();
    return 0;
}`,
        output: `Value: 25`,
        diagram: `graph LR
    A[this] -->|points to| B[Current Object]
    B --> C[value: 25]`,
        interview: [
            { q: 'static function mein this hota hai?', a: 'Nahi! Static function kisi object se tied nahi hai.' },
            { q: 'this pointer ka type kya hota hai?', a: 'ClassName* const - address change nahi ho sakta.' }
        ]
    },
    {
        id: 'information-hiding',
        title: 'Information Hiding',
        module: 'basics',
        order: 9,
        hinglish: `**Private rakh jo bahar nahi dikhana!** 🔐

Encapsulation = Data + Functions together
Information Hiding = Private members

Access Specifiers:
- **private**: Sirf class ke andar
- **protected**: Class + Derived classes
- **public**: Sabko accessible`,
        realLife: {
            title: 'Bank Vault',
            icon: '🏦',
            description: 'Bank balance private hai, sirf authorized functions access kar sakti hain!'
        },
        code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
    
public:
    BankAccount(double initial) : balance(initial) {}
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: " << amount << endl;
        }
    }
    
    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount acc(1000);
    acc.deposit(500);
    cout << "Balance: " << acc.getBalance() << endl;
    return 0;
}`,
        output: `Deposited: 500
Balance: 1500`,
        diagram: `graph TD
    A[BankAccount] --> B[private: balance]
    A --> C[public: deposit]
    A --> D[public: getBalance]
    E[Outside World] -->|✓| C
    E -->|✓| D
    E -->|✗| B`,
        interview: [
            { q: 'struct mein default access kya hota hai?', a: 'public! Class mein default private hota hai.' },
            { q: 'Encapsulation aur Abstraction mein fark?', a: 'Encapsulation = data hiding, Abstraction = complexity hiding.' }
        ]
    },
    // ========== MODULE 2: LIFECYCLE ==========
    {
        id: 'constructors',
        title: 'Constructors',
        module: 'lifecycle',
        order: 10,
        hinglish: `**Object bante hi automatically call hota hai!** 🎬

Constructor Rules:
1. Class ka same naam
2. No return type (void bhi nahi!)
3. Object create hote hi call hota hai

Types:
- Default Constructor
- Parameterized Constructor
- Copy Constructor`,
        realLife: {
            title: 'Birth Certificate',
            icon: '👶',
            description: 'Bachcha paida hote hi naam, DOB fill hota hai = Constructor!'
        },
        code: `#include <iostream>
using namespace std;

class Person {
    string name;
    int age;
public:
    Person() : name("Unknown"), age(0) {
        cout << "Default constructor" << endl;
    }
    
    Person(string n, int a) : name(n), age(a) {
        cout << "Parameterized constructor" << endl;
    }
    
    void display() {
        cout << name << ", " << age << endl;
    }
};

int main() {
    Person p1;
    Person p2("Raj", 25);
    p1.display();
    p2.display();
    return 0;
}`,
        output: `Default constructor
Parameterized constructor
Unknown, 0
Raj, 25`,
        diagram: `graph TD
    A[new Person] --> B{Arguments?}
    B -->|No| C[Default Constructor]
    B -->|Yes| D[Parameterized Constructor]`,
        interview: [
            { q: 'Constructor private ho sakta hai?', a: 'Haan! Singleton pattern mein use hota hai.' },
            { q: 'Constructor mein return statement likh sakte ho?', a: 'return; likh sakte ho, but koi value return nahi kar sakte.' }
        ]
    },
    {
        id: 'destructors',
        title: 'Destructors',
        module: 'lifecycle',
        order: 11,
        hinglish: `**Object destroy hone se pehle cleanup!** 🧹

Destructor = ~ClassName()

Kab call hota hai:
1. Scope end hone pe (stack objects)
2. delete call karne pe (heap objects)

Cleanup mein kya karte hain:
- Files close karo
- Memory free karo
- Connections band karo`,
        realLife: {
            title: 'Hotel Checkout',
            icon: '🏨',
            description: 'Room chhodni se pehle keys return, bill pay = Destructor!'
        },
        code: `#include <iostream>
using namespace std;

class FileHandler {
    string filename;
public:
    FileHandler(string name) : filename(name) {
        cout << "Opening file: " << filename << endl;
    }
    
    ~FileHandler() {
        cout << "Closing file: " << filename << endl;
    }
};

void processFile() {
    FileHandler f("data.txt");
    cout << "Processing..." << endl;
}

int main() {
    cout << "=== Starting ===" << endl;
    processFile();
    cout << "=== Done ===" << endl;
    return 0;
}`,
        output: `=== Starting ===
Opening file: data.txt
Processing...
Closing file: data.txt
=== Done ===`,
        diagram: `graph TD
    A[Object Created] --> B[Constructor]
    B --> C[Object Used]
    C --> D[Scope Ends / delete]
    D --> E[Destructor]
    E --> F[Memory Freed]`,
        interview: [
            { q: 'Destructor overload ho sakta hai?', a: 'Nahi! Ek hi destructor ho sakta hai, no parameters.' },
            { q: 'Virtual destructor kab chahiye?', a: 'Jab base class pointer se derived object delete karo.' }
        ]
    },
    {
        id: 'initialization-list',
        title: 'Why Initialization List',
        module: 'lifecycle',
        order: 12,
        hinglish: `**Constructor body se pehle members initialize karo!** ⚡

Initialization List MUST use karni padti hai jab:
1. **const** members ho
2. **reference** members ho
3. **Base class** constructor call karna ho
4. Member ka **default constructor** na ho

Syntax: Constructor() : member1(val1), member2(val2) { }`,
        realLife: {
            title: 'Form Filling',
            icon: '📝',
            description: 'Kuch fields MANDATORY hain form submit se pehle fill karne!'
        },
        code: `#include <iostream>
using namespace std;

class Student {
    const int rollNo;
    string& schoolRef;
    string name;
    
public:
    Student(int r, string& school, string n) 
        : rollNo(r), schoolRef(school), name(n) {
    }
    
    void display() {
        cout << rollNo << " - " << name << " @ " << schoolRef << endl;
    }
};

int main() {
    string school = "Delhi Public School";
    Student s(101, school, "Amit");
    s.display();
    return 0;
}`,
        output: `101 - Amit @ Delhi Public School`,
        diagram: `graph LR
    A[Constructor Called] --> B[Init List Executes]
    B --> C[const/ref initialized]
    C --> D[Constructor Body]`,
        interview: [
            { q: 'Init list aur constructor body mein fark?', a: 'Init list = initialization (efficient). Body = assignment (extra step).' },
            { q: 'Init list mein order kya matter karta hai?', a: 'Declaration order matter karta hai, list order nahi!' }
        ]
    },
    {
        id: 'order-of-initialization',
        title: 'Order of Initialization',
        module: 'lifecycle',
        order: 13,
        hinglish: `**Members DECLARATION order mein initialize hote hain!** 📋

Init list mein order likho kuch bhi,
Initialize hoga declaration order mein!`,
        realLife: {
            title: 'Assembly Line',
            icon: '🏭',
            description: 'Factory mein parts ek fixed order mein fit hote hain, random nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Correct {
    int first;
    int second;
    
public:
    Correct(int x) : first(x), second(first * 2) {}
    
    void show() {
        cout << "first: " << first << ", second: " << second << endl;
    }
};

int main() {
    Correct c(10);
    c.show();
    return 0;
}`,
        output: `first: 10, second: 20`,
        diagram: `graph TD
    A[Declaration Order] --> B[int first]
    B --> C[int second]
    D[Init happens in] --> B
    B --> C`,
        interview: [
            { q: 'Compiler order change kar sakta hai?', a: 'Nahi! Declaration order FIXED hai.' },
            { q: 'Kaise pata chalega galat order?', a: 'Compiler warning enable karo: -Wreorder' }
        ]
    },
    {
        id: 'copy-constructor-1',
        title: 'Copy Constructor-I',
        module: 'lifecycle',
        order: 14,
        hinglish: `**Ek object se doosra object COPY karo!** 📋

Kab call hota hai:
1. \`Student s2 = s1;\`
2. \`Student s2(s1);\`
3. Function mein pass by value
4. Function se object return

Syntax: \`ClassName(const ClassName& other)\``,
        realLife: {
            title: 'Xerox Copy',
            icon: '📄',
            description: 'Original document se photocopy banana = Copy Constructor!'
        },
        code: `#include <iostream>
using namespace std;

class Book {
    string title;
    int pages;
    
public:
    Book(string t, int p) : title(t), pages(p) {
        cout << "Constructor: " << title << endl;
    }
    
    Book(const Book& other) : title(other.title), pages(other.pages) {
        cout << "Copy Constructor: " << title << endl;
    }
    
    void display() {
        cout << title << " (" << pages << " pages)" << endl;
    }
};

int main() {
    Book b1("C++ Primer", 500);
    Book b2 = b1;
    Book b3(b1);
    b2.display();
    return 0;
}`,
        output: `Constructor: C++ Primer
Copy Constructor: C++ Primer
Copy Constructor: C++ Primer
C++ Primer (500 pages)`,
        diagram: `graph LR
    A[b1: C++ Primer] -->|Copy| B[b2: C++ Primer]
    A -->|Copy| C[b3: C++ Primer]`,
        interview: [
            { q: 'Copy constructor mein const reference kyun?', a: 'const = original change na ho, reference = infinite loop avoid karo!' },
            { q: 'Default copy constructor kya karta hai?', a: 'Shallow copy - sab members byte by byte copy.' }
        ]
    },
    {
        id: 'copy-constructor-2',
        title: 'Copy Constructor-II',
        module: 'lifecycle',
        order: 15,
        hinglish: `**Function mein objects pass/return karte waqt copy hoti hai!** 🔄

Pass by value = Copy
Return by value = Copy

Optimization: Move semantics (C++11)`,
        realLife: {
            title: 'Courier Service',
            icon: '📦',
            description: 'Original file office mein, copy courier se bhejo = Pass by value!'
        },
        code: `#include <iostream>
using namespace std;

class Data {
    int value;
public:
    Data(int v) : value(v) {
        cout << "Constructor: " << value << endl;
    }
    
    Data(const Data& other) : value(other.value) {
        cout << "Copy: " << value << endl;
    }
    
    int get() { return value; }
};

void process(Data d) {
    cout << "Processing: " << d.get() << endl;
}

int main() {
    Data d1(42);
    cout << "--- Calling process ---" << endl;
    process(d1);
    return 0;
}`,
        output: `Constructor: 42
--- Calling process ---
Copy: 42
Processing: 42`,
        diagram: `graph TD
    A[Original Object] -->|Pass by value| B[Copy Made]
    B --> C[Function Uses Copy]
    C --> D[Copy Destroyed]`,
        interview: [
            { q: 'Copy kaise avoid karein?', a: 'Pass by reference: void process(const Data& d)' },
            { q: 'RVO kya hai?', a: 'Return Value Optimization - compiler copy skip kar deta hai!' }
        ]
    },
    {
        id: 'deep-shallow-copy',
        title: 'Deep and Shallow Copy',
        module: 'lifecycle',
        order: 16,
        hinglish: `**Shallow = Pointer copy, Deep = Data copy!** 🌊

Shallow Copy Problem:
- Pointer same memory point karte hain
- Ek delete karo, doosra CRASH!

Deep Copy Solution:
- Naya memory allocate karo
- Data COPY karo`,
        realLife: {
            title: 'House Key vs House',
            icon: '🔑',
            description: 'Shallow = Same ghar ki duplicate key. Deep = Naya ghar bana do identical!'
        },
        code: `#include <iostream>
#include <cstring>
using namespace std;

class DeepString {
public:
    char* data;
    
    DeepString(const char* str) {
        data = new char[strlen(str) + 1];
        strcpy(data, str);
    }
    
    DeepString(const DeepString& other) {
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
    }
    
    ~DeepString() {
        delete[] data;
    }
};

int main() {
    DeepString s1("Hello");
    DeepString s2 = s1;
    
    s2.data[0] = 'J';
    
    cout << "s1: " << s1.data << endl;
    cout << "s2: " << s2.data << endl;
    return 0;
}`,
        output: `s1: Hello
s2: Jello`,
        diagram: `graph TD
    subgraph Deep
    D[ptr1] --> E[Data Copy 1]
    F[ptr2] --> G[Data Copy 2]
    end`,
        interview: [
            { q: 'Kab deep copy zaruri hai?', a: 'Jab class mein pointers/dynamic memory ho!' },
            { q: 'Default copy constructor shallow ya deep?', a: 'SHALLOW! Manually deep copy likhni padti hai.' }
        ]
    },
    {
        id: 'copy-assignment-operator',
        title: 'Copy Assignment Operator',
        module: 'lifecycle',
        order: 17,
        hinglish: `**Already existing object mein copy karo!** 📝

Copy Constructor vs Assignment:
- Constructor: \`A b = a;\` (b is new)
- Assignment: \`b = a;\` (b already exists)

Rule of Three: Agar custom destructor hai, to copy constructor AUR assignment operator bhi likho!`,
        realLife: {
            title: 'Replace Phone Data',
            icon: '📱',
            description: 'Naya phone = Copy Constructor. Purane phone mein restore = Assignment!'
        },
        code: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
    char* data;
    
public:
    MyString(const char* str = "") {
        data = new char[strlen(str) + 1];
        strcpy(data, str);
    }
    
    MyString(const MyString& other) {
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
    }
    
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            delete[] data;
            data = new char[strlen(other.data) + 1];
            strcpy(data, other.data);
        }
        return *this;
    }
    
    ~MyString() { delete[] data; }
    void print() { cout << data << endl; }
};

int main() {
    MyString s1("Hello");
    MyString s2("World");
    s2 = s1;
    s1.print();
    s2.print();
    return 0;
}`,
        output: `Hello
Hello`,
        diagram: `graph LR
    A[s1: Hello] -->|operator=| B[s2: World → Hello]`,
        interview: [
            { q: 'Self-assignment check kyun?', a: 's1 = s1; mein pehle delete karo, phir copy = CRASH!' },
            { q: '*this kyun return karte hain?', a: 'Chaining ke liye: a = b = c;' }
        ]
    },
    {
        id: 'constant-objects',
        title: 'Constant Objects',
        module: 'advanced',
        order: 18,
        hinglish: `**Object create hone ke baad change nahi ho sakta!** 🔒

\`const MyClass obj;\`

Rules:
- Sirf const member functions call ho sakti hain
- Data members change nahi ho sakte
- Initialization list mein sab set karo`,
        realLife: {
            title: 'Framed Certificate',
            icon: '🏆',
            description: 'Certificate frame ho gaya = const object. Ab modify nahi kar sakte!'
        },
        code: `#include <iostream>
using namespace std;

class Config {
    int maxUsers;
    string appName;
    
public:
    Config(int m, string n) : maxUsers(m), appName(n) {}
    
    int getMaxUsers() const { return maxUsers; }
    string getName() const { return appName; }
    void setMaxUsers(int m) { maxUsers = m; }
};

int main() {
    const Config production(100, "MyApp");
    cout << production.getName() << endl;
    cout << production.getMaxUsers() << endl;
    return 0;
}`,
        output: `MyApp
100`,
        diagram: `graph TD
    A[const Config] --> B[getMaxUsers - OK]
    A --> C[getName - OK]
    A -->|X| D[setMaxUsers - ERROR]`,
        interview: [
            { q: 'const object pe non-const function call ho sakti hai?', a: 'Nahi! Compiler error dega.' },
            { q: 'Constructor const hota hai?', a: 'Nahi, object initialize karna padta hai!' }
        ]
    },
    {
        id: 'constant-data-members',
        title: 'Constant Data Members',
        module: 'advanced',
        order: 19,
        hinglish: `**Member variable jo initialize ke baad change na ho!** 🔐

\`const int id;\`

Points:
- Initialization list mein hi set kar sakte ho
- Constructor body mein assignment ERROR!
- Har object ka alag const value ho sakta hai`,
        realLife: {
            title: 'Aadhaar Number',
            icon: '🆔',
            description: 'Aadhaar number ek baar assign hua = life time fixed!'
        },
        code: `#include <iostream>
using namespace std;

class Employee {
    const int empId;
    string name;
    
public:
    Employee(int id, string n) : empId(id), name(n) {}
    
    void display() const {
        cout << "ID: " << empId << ", Name: " << name << endl;
    }
};

int main() {
    Employee e1(101, "Rahul");
    Employee e2(102, "Priya");
    e1.display();
    e2.display();
    return 0;
}`,
        output: `ID: 101, Name: Rahul
ID: 102, Name: Priya`,
        diagram: `graph TD
    A[Employee e1] --> B[const empId = 101]
    C[Employee e2] --> D[const empId = 102]`,
        interview: [
            { q: 'const member vs static const member?', a: 'const = per object, static const = shared by all objects.' },
            { q: 'Constructor body mein const assign kyun nahi?', a: 'Object create hote hi const seal ho jata hai!' }
        ]
    },
    {
        id: 'mutable-members',
        title: 'Mutable Data Members',
        module: 'advanced',
        order: 20,
        hinglish: `**const function mein bhi ye member change ho sakta hai!** 🔓

\`mutable int counter;\`

Use case:
- Caching
- Logging
- Access counters
- Internal state jo logical const nahi todte`,
        realLife: {
            title: 'View Counter',
            icon: '👁️',
            description: 'Document read karte waqt view count badhta hai, but document change nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Document {
    string content;
    mutable int viewCount;
    
public:
    Document(string c) : content(c), viewCount(0) {}
    
    string read() const {
        viewCount++;
        return content;
    }
    
    int getViews() const { return viewCount; }
};

int main() {
    const Document doc("Secret Data");
    cout << doc.read() << endl;
    cout << doc.read() << endl;
    cout << "Total views: " << doc.getViews() << endl;
    return 0;
}`,
        output: `Secret Data
Secret Data
Total views: 2`,
        diagram: `graph LR
    A[const Document] --> B[mutable viewCount]
    B -->|Can modify| C[viewCount++]`,
        interview: [
            { q: 'mutable overuse karna chahiye?', a: 'Nahi! Sirf internal state ke liye. Logic mutability nahi!' },
            { q: 'mutable static ho sakta hai?', a: 'Haan, lekin rarely used.' }
        ]
    },
    {
        id: 'when-mutable',
        title: 'When to use Mutable Data Members',
        module: 'advanced',
        order: 21,
        hinglish: `**Mutable = Internal state jo user ke perspective se const hai** 🎭

Good uses ✅:
1. Cache results
2. Count accesses
3. Lazy initialization
4. Thread locks (mutex)

Bad uses ❌:
- Actual data change karna
- const bypass karna`,
        realLife: {
            title: 'Odometer in const Car',
            icon: '🚗',
            description: 'Car const hai (specifications fixed), but mileage badhta rehta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Calculator {
    mutable bool cached;
    mutable int cachedResult;
    int a, b;
    
public:
    Calculator(int x, int y) : a(x), b(y), cached(false), cachedResult(0) {}
    
    int computeSum() const {
        if (!cached) {
            cout << "Computing..." << endl;
            cachedResult = a + b;
            cached = true;
        }
        return cachedResult;
    }
};

int main() {
    const Calculator calc(100, 200);
    cout << calc.computeSum() << endl;
    cout << calc.computeSum() << endl;
    cout << calc.computeSum() << endl;
    return 0;
}`,
        output: `Computing...
300
300
300`,
        diagram: `graph LR
    A[First Call] --> B[Compute & Cache]
    C[Second Call] --> D[Return Cached]`,
        interview: [
            { q: 'mutable ka abuse kya hai?', a: 'Jab actual object state change ho. const ka purpose hi defeat ho jata hai.' },
            { q: 'Alternative kya hai mutable ka?', a: 'const_cast, but more dangerous!' }
        ]
    }
];

// Combine all topics
export const topics = [
    ...coreTopics,
    ...advancedTopics1,
    ...advancedTopics2,
    ...operatorTopics,
    ...namespaceTopics,
    ...inheritanceTopics1,
    ...inheritanceTopics2,
    ...inheritanceTopics3,
    ...templateTopics
].sort((a, b) => a.order - b.order);

// Get all topics
export function getAllTopics() {
    return topics;
}

export function getTopicById(id) {
    return topics.find(t => t.id === id);
}

export function getTopicsByModule(moduleId) {
    return topics.filter(t => t.module === moduleId);
}
