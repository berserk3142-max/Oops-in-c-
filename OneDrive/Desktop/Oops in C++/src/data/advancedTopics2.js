// Advanced Control Topics - Part 2 (Friend Examples, Friend Class)
export const advancedTopics2 = [
    {
        id: 'friend-example-1',
        title: 'Why Friend Function : Example-I',
        module: 'advanced',
        order: 27,
        hinglish: `**Jab do classes ke private data compare karna ho!** ⚖️

Problem: Class A aur Class B ka private data compare karna hai
Solution: Ek friend function jo dono access kare!`,
        realLife: {
            title: 'Referee in Match',
            icon: '🏏',
            description: 'Referee dono teams ke private scores access karke winner decide karta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Circle;  // Forward declaration

class Rectangle {
    int area;
public:
    Rectangle(int a) : area(a) {}
    friend void compare(Rectangle, Circle);
};

class Circle {
    int area;
public:
    Circle(int a) : area(a) {}
    friend void compare(Rectangle, Circle);
};

// Friend of BOTH classes!
void compare(Rectangle r, Circle c) {
    if (r.area > c.area)
        cout << "Rectangle is bigger" << endl;
    else if (c.area > r.area)
        cout << "Circle is bigger" << endl;
    else
        cout << "Both are equal" << endl;
}

int main() {
    Rectangle rect(100);
    Circle circ(80);
    compare(rect, circ);
    return 0;
}`,
        output: `Rectangle is bigger`,
        diagram: `graph TD
    A[Rectangle private: area] --> C[compare function]
    B[Circle private: area] --> C
    C --> D[Result: Who is bigger?]`,
        interview: [
            { q: 'Forward declaration kyun chahiye?', a: 'Compiler ko batana padta hai ki Circle naam ki class aayegi, define baad mein hogi.' },
            { q: 'Ek function multiple classes ka friend ho sakta hai?', a: 'Haan! Jitni classes mein declare karo, utni ka friend.' }
        ]
    },
    {
        id: 'friend-example-2',
        title: 'Why Friend Function : Example-II',
        module: 'advanced',
        order: 28,
        hinglish: `**Operator overloading mein jab left side hamara object na ho!** ➕

Problem: \`cout << obj\` mein cout left pe hai
Solution: Friend function use karo!

Member function: \`obj.operator<<()\` 
Friend function: \`operator<<(cout, obj)\``,
        realLife: {
            title: 'Translator',
            icon: '🗣️',
            description: 'cout Hindi nahi samajhta, friend function translator ki tarah kaam karta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Point {
    int x, y;
public:
    Point(int a, int b) : x(a), y(b) {}
    
    // Friend for << operator
    friend ostream& operator<<(ostream& out, const Point& p);
    
    // Friend for >> operator  
    friend istream& operator>>(istream& in, Point& p);
};

ostream& operator<<(ostream& out, const Point& p) {
    out << "(" << p.x << ", " << p.y << ")";
    return out;
}

istream& operator>>(istream& in, Point& p) {
    cout << "Enter x y: ";
    in >> p.x >> p.y;
    return in;
}

int main() {
    Point p1(3, 4);
    cout << "Point: " << p1 << endl;
    
    Point p2(0, 0);
    // cin >> p2;  // Would work for input
    // cout << "You entered: " << p2 << endl;
    
    return 0;
}`,
        output: `Point: (3, 4)`,
        diagram: `graph LR
    A[cout] -->|<<| B[operator<< friend]
    B --> C[Access Point private x,y]
    C --> D[Output: 3, 4]`,
        interview: [
            { q: 'ostream& return kyun karte hain?', a: 'Chaining ke liye! cout << a << b << c kaam kare.' },
            { q: 'Member function se << overload ho sakta hai?', a: 'Technically haan, but syntax ulta ho jayega: obj << cout' }
        ]
    },
    {
        id: 'friend-class',
        title: 'Friend Class',
        module: 'advanced',
        order: 29,
        hinglish: `**Puri class ko friend bana do - sab members ko access!** 🏠

\`friend class ClassName;\`

Ek baar friend class banayi, uski SAB functions ko private access mil gaya!

Note: Friendship one-way hai. A ne B ko friend banaya doesn't mean B ne A ko.`,
        realLife: {
            title: 'Maintenance Staff',
            icon: '🔧',
            description: 'Maintenance team ko building ke sab rooms ka access milta hai!'
        },
        code: `#include <iostream>
using namespace std;

class Engine {
private:
    int horsepower;
    bool isRunning;
    
public:
    Engine(int hp) : horsepower(hp), isRunning(false) {}
    
    // Entire Mechanic class is friend!
    friend class Mechanic;
};

class Mechanic {
public:
    void diagnose(Engine& e) {
        // Can access ALL private members of Engine!
        cout << "Checking engine: " << e.horsepower << " HP" << endl;
        cout << "Running: " << (e.isRunning ? "Yes" : "No") << endl;
    }
    
    void startEngine(Engine& e) {
        e.isRunning = true;  // Modify private!
        cout << "Engine started!" << endl;
    }
    
    void upgradeHP(Engine& e, int newHP) {
        e.horsepower = newHP;  // Modify private!
        cout << "Upgraded to " << newHP << " HP" << endl;
    }
};

int main() {
    Engine car(150);
    Mechanic mech;
    
    mech.diagnose(car);
    mech.startEngine(car);
    mech.upgradeHP(car, 200);
    mech.diagnose(car);
    
    return 0;
}`,
        output: `Checking engine: 150 HP
Running: No
Engine started!
Upgraded to 200 HP
Checking engine: 200 HP
Running: Yes`,
        diagram: `graph TD
    A[Engine Class] -->|friend class| B[Mechanic Class]
    B --> C[diagnose - reads private]
    B --> D[startEngine - modifies private]
    B --> E[upgradeHP - modifies private]`,
        interview: [
            { q: 'Friendship mutual hoti hai?', a: 'Nahi! A friend of B doesn\'t make B friend of A.' },
            { q: 'Friend class inherit hoti hai?', a: 'Nahi! Derived class ko friend access nahi milta automatically.' }
        ]
    }
];
