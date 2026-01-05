// Operator Overloading Topics
export const operatorTopics = [
    {
        id: 'operator-overloading-udt-1',
        title: 'Operator Overloading UDT - I',
        module: 'operators',
        order: 30,
        hinglish: `**User Defined Types ke liye operators banana!** ➕

Default mein +, -, * sirf primitive types pe kaam karte hain.
Apni class ke liye? OVERLOAD karo!

Syntax: \`ReturnType operator+(parameters)\``,
        realLife: {
            title: 'Money Class',
            icon: '💰',
            description: '500 rupees + 300 rupees = 800 rupees. Natural math likho!'
        },
        code: `#include <iostream>
using namespace std;

class Distance {
    int feet, inches;
public:
    Distance(int f = 0, int i = 0) : feet(f), inches(i) {}
    
    // Overload + operator
    Distance operator+(const Distance& d) {
        int totalInches = (feet + d.feet) * 12 + inches + d.inches;
        return Distance(totalInches / 12, totalInches % 12);
    }
    
    void display() {
        cout << feet << " feet " << inches << " inches" << endl;
    }
};

int main() {
    Distance d1(5, 8);
    Distance d2(3, 10);
    
    Distance d3 = d1 + d2;  // Uses overloaded +
    
    cout << "d1: "; d1.display();
    cout << "d2: "; d2.display();
    cout << "d1 + d2: "; d3.display();
    
    return 0;
}`,
        output: `d1: 5 feet 8 inches
d2: 3 feet 10 inches
d1 + d2: 9 feet 6 inches`,
        diagram: `graph LR
    A[d1: 5ft 8in] -->|+| B[d2: 3ft 10in]
    B --> C[d3: 9ft 6in]`,
        interview: [
            { q: 'operator+ mein const& kyun?', a: 'Copy avoid karo (efficiency) aur original change na ho (safety).' },
            { q: 'Kya precedence change hoti hai overload se?', a: 'Nahi! Precedence same rehti hai, sirf behavior change hota hai.' }
        ]
    },
    {
        id: 'operator-overloading-udt-2',
        title: 'Operator Overloading UDT - II (Issues)',
        module: 'operators',
        order: 31,
        hinglish: `**Member function se overload ki problems!** ⚠️

Issue 1: Left operand HAMESHA calling object hona chahiye
\`obj1 + obj2\` = \`obj1.operator+(obj2)\`

Issue 2: \`5 + obj\` kaam nahi karega!
5 mein operator+ function nahi hai!`,
        realLife: {
            title: 'One-sided Conversation',
            icon: '🗣️',
            description: 'Member function = sirf object bol sakta hai. Agar doosra pehle bole? Problem!'
        },
        code: `#include <iostream>
using namespace std;

class Number {
    int value;
public:
    Number(int v = 0) : value(v) {}
    
    // Member function overload
    Number operator+(const Number& n) {
        return Number(value + n.value);
    }
    
    // This works: Number + int
    Number operator+(int x) {
        return Number(value + x);
    }
    
    // But int + Number WON'T WORK with member function!
    // 5.operator+(obj) doesn't exist!
    
    int getValue() { return value; }
};

int main() {
    Number n1(10);
    
    Number n2 = n1 + 5;   // OK! n1.operator+(5)
    cout << "n1 + 5 = " << n2.getValue() << endl;
    
    // Number n3 = 5 + n1;  // ERROR! 5.operator+(n1) doesn't exist
    
    return 0;
}`,
        output: `n1 + 5 = 15`,
        diagram: `graph TD
    A[obj + 5] -->|Works| B[obj.operator+ 5]
    C[5 + obj] -->|Fails| D[5.operator+ obj - No such function!]`,
        interview: [
            { q: 'int + Object kaise handle karein?', a: 'Friend function ya global function use karo!' },
            { q: 'Implicit conversion help karega?', a: 'Haan, agar int se Object ka converting constructor ho to kaam kar sakta hai.' }
        ]
    },
    {
        id: 'operator-overloading-udt-3',
        title: 'Operator Overloading UDT - III (Issues)',
        module: 'operators',
        order: 32,
        hinglish: `**Symmetry problem - dono sides se kaam karna chahiye!** ↔️

Mathematical operators symmetric hone chahiye:
\`a + b\` = \`b + a\`

Member function se ye possible nahi!`,
        realLife: {
            title: 'Handshake',
            icon: '🤝',
            description: 'Handshake dono sides se start ho sakti hai. Sirf ek side se start ho = asymmetric!'
        },
        code: `#include <iostream>
using namespace std;

class Fraction {
    int num, den;
public:
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}
    
    // Member operators - asymmetric!
    Fraction operator*(const Fraction& f) {
        return Fraction(num * f.num, den * f.den);
    }
    
    // Fraction * int works
    Fraction operator*(int x) {
        return Fraction(num * x, den);
    }
    
    // int * Fraction DOESN'T work with member!
    
    void display() {
        cout << num << "/" << den << endl;
    }
};

int main() {
    Fraction f1(3, 4);
    
    Fraction f2 = f1 * 2;   // OK: 3/4 * 2 = 6/4
    f2.display();
    
    // Fraction f3 = 2 * f1;  // ERROR!
    
    return 0;
}`,
        output: `6/4`,
        diagram: `graph LR
    A[Fraction * int] -->|OK| B[Member function]
    C[int * Fraction] -->|FAIL| D[Need friend/global function]`,
        interview: [
            { q: 'Symmetric operators ke liye best practice?', a: 'Global function ya friend function use karo.' },
            { q: 'Assignment operator symmetric hona chahiye?', a: 'Nahi! a = b is not same as b = a conceptually.' }
        ]
    },
    {
        id: 'operator-overloading-udt-4',
        title: 'Operator Overloading UDT - IV (Friend rescue)',
        module: 'operators',
        order: 33,
        hinglish: `**Friend function se symmetry achieve karo!** ✅

Friend function class ka member nahi hai.
Dono operands parameter hain = symmetric!

\`friend Fraction operator*(int, const Fraction&);\``,
        realLife: {
            title: 'Neutral Judge',
            icon: '⚖️',
            description: 'Friend function = neutral judge jo dono sides ko equally treat karta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Fraction {
    int num, den;
public:
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}
    
    // Friend functions for symmetric operations
    friend Fraction operator*(const Fraction& f1, const Fraction& f2);
    friend Fraction operator*(const Fraction& f, int x);
    friend Fraction operator*(int x, const Fraction& f);
    
    void display() {
        cout << num << "/" << den << endl;
    }
};

Fraction operator*(const Fraction& f1, const Fraction& f2) {
    return Fraction(f1.num * f2.num, f1.den * f2.den);
}

Fraction operator*(const Fraction& f, int x) {
    return Fraction(f.num * x, f.den);
}

Fraction operator*(int x, const Fraction& f) {
    return Fraction(f.num * x, f.den);  // Same logic, different order!
}

int main() {
    Fraction f1(3, 4);
    
    Fraction f2 = f1 * 2;   // Fraction * int
    Fraction f3 = 2 * f1;   // int * Fraction - NOW WORKS!
    
    cout << "f1 * 2 = "; f2.display();
    cout << "2 * f1 = "; f3.display();
    
    return 0;
}`,
        output: `f1 * 2 = 6/4
2 * f1 = 6/4`,
        diagram: `graph TD
    A[Fraction * int] --> C[friend operator*]
    B[int * Fraction] --> C
    C --> D[Same result!]`,
        interview: [
            { q: 'Member vs Friend operator kab use karein?', a: 'Symmetric operators = Friend. Assignment, [] = Member.' },
            { q: 'Global non-friend function bhi kaam karega?', a: 'Haan, agar sirf public members access karni hon.' }
        ]
    },
    {
        id: 'stream-operators-global',
        title: 'Overloading stream operators (Global)',
        module: 'operators',
        order: 34,
        hinglish: `**cout << obj aur cin >> obj ke liye overload karo!** 📺

cout ka type: ostream
cin ka type: istream

Global function banao jo ostream/istream parameter le!`,
        realLife: {
            title: 'TV Remote',
            icon: '📺',
            description: 'cout = TV. Object ko display karna hai? Remote (operator<<) add karo!'
        },
        code: `#include <iostream>
using namespace std;

class Date {
public:  // Public for global function access
    int day, month, year;
    
    Date(int d = 1, int m = 1, int y = 2000) : day(d), month(m), year(y) {}
};

// Global function - needs public members
ostream& operator<<(ostream& out, const Date& d) {
    out << d.day << "/" << d.month << "/" << d.year;
    return out;
}

istream& operator>>(istream& in, Date& d) {
    cout << "Enter day month year: ";
    in >> d.day >> d.month >> d.year;
    return in;
}

int main() {
    Date today(15, 8, 2024);
    cout << "Today: " << today << endl;
    
    // Chaining works!
    Date d1(1, 1, 2020), d2(25, 12, 2020);
    cout << "Dates: " << d1 << " and " << d2 << endl;
    
    return 0;
}`,
        output: `Today: 15/8/2024
Dates: 1/1/2020 and 25/12/2020`,
        diagram: `graph LR
    A[cout] -->|<<| B[operator<< function]
    B -->|access| C[Date object]
    B -->|return| A`,
        interview: [
            { q: 'Reference return kyun karte hain?', a: 'Chaining ke liye: cout << a << b << c' },
            { q: 'Member function se << overload ho sakta?', a: 'Technically haan, but syntax ulta: obj << cout' }
        ]
    },
    {
        id: 'stream-operators-friend',
        title: 'Overloading stream operators (Friend)',
        module: 'operators',
        order: 35,
        hinglish: `**Private members ke liye friend operator!** 🔐

Agar members private hain, global function access nahi kar sakta.
Solution: Friend bana do!`,
        realLife: {
            title: 'VIP Access',
            icon: '🎫',
            description: 'Friend function = VIP pass. Private areas bhi access kar sakta hai!'
        },
        code: `#include <iostream>
using namespace std;

class BankAccount {
private:  // Private members!
    string accountNumber;
    double balance;
    
public:
    BankAccount(string num, double bal) : accountNumber(num), balance(bal) {}
    
    // Friend declarations
    friend ostream& operator<<(ostream& out, const BankAccount& acc);
    friend istream& operator>>(istream& in, BankAccount& acc);
};

ostream& operator<<(ostream& out, const BankAccount& acc) {
    out << "Account: " << acc.accountNumber << ", Balance: Rs." << acc.balance;
    return out;
}

istream& operator>>(istream& in, BankAccount& acc) {
    cout << "Enter account number: ";
    in >> acc.accountNumber;
    cout << "Enter balance: ";
    in >> acc.balance;
    return in;
}

int main() {
    BankAccount myAcc("SBI123456", 50000.75);
    cout << myAcc << endl;
    
    return 0;
}`,
        output: `Account: SBI123456, Balance: Rs.50000.75`,
        diagram: `graph TD
    A[operator<< friend] -->|Access| B[private: accountNumber]
    A -->|Access| C[private: balance]`,
        interview: [
            { q: 'Friend function class ka member hai?', a: 'Nahi! Sirf access milta hai, scope mein nahi aata.' },
            { q: 'Inline friend define kar sakte hain?', a: 'Haan! Class ke andar hi definition likh sakte hain.' }
        ]
    },
    {
        id: 'unary-increment',
        title: 'Overloading Unary (++)',
        module: 'operators',
        order: 36,
        hinglish: `**Pre-increment (++x) aur Post-increment (x++) overload!** ➕

Pre-increment: \`operator++()\` - no parameter
Post-increment: \`operator++(int)\` - dummy int parameter

Post-increment old value return karta hai!`,
        realLife: {
            title: 'Counter Machine',
            icon: '🔢',
            description: 'Pre = pehle increment, phir use. Post = pehle use, phir increment.'
        },
        code: `#include <iostream>
using namespace std;

class Counter {
    int count;
public:
    Counter(int c = 0) : count(c) {}
    
    // Pre-increment: ++obj
    Counter& operator++() {
        count++;
        return *this;  // Return modified object
    }
    
    // Post-increment: obj++
    Counter operator++(int) {  // dummy int for distinction
        Counter temp = *this;  // Save old value
        count++;               // Increment
        return temp;           // Return OLD value
    }
    
    int getCount() { return count; }
};

int main() {
    Counter c1(5);
    
    cout << "Initial: " << c1.getCount() << endl;
    
    // Pre-increment
    cout << "++c1: " << (++c1).getCount() << endl;
    cout << "After: " << c1.getCount() << endl;
    
    // Post-increment
    cout << "c1++: " << (c1++).getCount() << endl;  // Returns OLD value
    cout << "After: " << c1.getCount() << endl;
    
    return 0;
}`,
        output: `Initial: 5
++c1: 6
After: 6
c1++: 6
After: 7`,
        diagram: `graph TD
    A[++obj Pre] -->|Increment| B[Return modified]
    C[obj++ Post] -->|Save old| D[Increment]
    D -->|Return old| E[Old value]`,
        interview: [
            { q: 'Pre aur Post mein kaun fast hai?', a: 'Pre! Copy nahi banani padti. Post mein temp object banta hai.' },
            { q: 'Dummy int ka kya role hai?', a: 'Sirf distinction ke liye. Compiler ko batata hai ye post-increment hai.' }
        ]
    }
];
