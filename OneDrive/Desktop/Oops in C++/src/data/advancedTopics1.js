// Advanced Control Topics - Part 1 (Static, Singleton, Friend)
export const advancedTopics1 = [
    {
        id: 'static-members-1',
        title: 'Static Members-I',
        module: 'advanced',
        order: 22,
        hinglish: `**Static = Sab objects ke beech SHARED!** 🤝

Normal member: Har object ka apna copy
Static member: EK hi copy sabke liye!

Static variable class ke saath belong karta hai, object ke saath nahi.

Declaration: \`static int count;\`
Definition: \`int ClassName::count = 0;\` (class ke bahar)`,
        realLife: {
            title: 'College Notice Board',
            icon: '📋',
            description: 'Har student ka apna roll number (normal), but notice board sabke liye EK hai (static)!'
        },
        code: `#include <iostream>
using namespace std;

class Student {
    string name;
    static int totalStudents;  // Shared by all
    
public:
    Student(string n) : name(n) {
        totalStudents++;  // Increment shared counter
    }
    
    static int getTotal() {
        return totalStudents;
    }
    
    void display() {
        cout << name << " (Total: " << totalStudents << ")" << endl;
    }
};

// Define static member OUTSIDE class
int Student::totalStudents = 0;

int main() {
    cout << "Initial: " << Student::getTotal() << endl;
    
    Student s1("Rahul");
    Student s2("Priya");
    Student s3("Amit");
    
    s1.display();
    cout << "Final: " << Student::getTotal() << endl;
    return 0;
}`,
        output: `Initial: 0
Rahul (Total: 3)
Final: 3`,
        diagram: `graph TD
    A[Student Class] --> B[static totalStudents = 3]
    C[s1: Rahul] --> B
    D[s2: Priya] --> B
    E[s3: Amit] --> B`,
        interview: [
            { q: 'Static member kahan define karte hain?', a: 'Class ke bahar! Class mein sirf declaration hoti hai.' },
            { q: 'Static function mein this pointer hota hai?', a: 'Nahi! Static function kisi object se tied nahi hai.' }
        ]
    },
    {
        id: 'static-members-2',
        title: 'Static Members-II',
        module: 'advanced',
        order: 23,
        hinglish: `**Static function sirf static members access kar sakti hai!** ⚡

Rules:
1. Static function mein \`this\` pointer NAHI hota
2. Non-static member directly access NAHI kar sakti
3. Object bina bhi call ho sakti hai: \`ClassName::staticFunc()\``,
        realLife: {
            title: 'Bank HQ vs Branch',
            icon: '🏦',
            description: 'HQ (static) sirf apna data dekh sakti hai, individual customer (non-static) ka nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Counter {
    int instanceId;           // Per object
    static int totalCount;    // Shared
    
public:
    Counter() : instanceId(++totalCount) {}
    
    // Static function
    static int getCount() {
        // return instanceId;  // ERROR! Cannot access non-static
        return totalCount;     // OK - static accessing static
    }
    
    // Non-static function
    void showAll() {
        cout << "ID: " << instanceId;          // OK
        cout << ", Total: " << totalCount << endl;  // OK
    }
};

int Counter::totalCount = 0;

int main() {
    // Call static without object!
    cout << "Count: " << Counter::getCount() << endl;
    
    Counter c1, c2, c3;
    cout << "Count: " << Counter::getCount() << endl;
    
    c1.showAll();
    return 0;
}`,
        output: `Count: 0
Count: 3
ID: 1, Total: 3`,
        diagram: `graph LR
    A[Static Function] --> B[Can Access Static Members]
    A -->|X| C[Cannot Access Non-Static]
    D[Non-Static Function] --> B
    D --> E[Can Access Non-Static]`,
        interview: [
            { q: 'Static function virtual ho sakti hai?', a: 'Nahi! Virtual polymorphism ke liye hai, jo object pe depend karta hai.' },
            { q: 'Static function mein this use kar sakte hain?', a: 'Nahi! this current object point karta hai, static function object-independent hai.' }
        ]
    },
    {
        id: 'static-members-3',
        title: 'Static Members-III',
        module: 'advanced',
        order: 24,
        hinglish: `**Static const member class ke andar initialize ho sakta hai!** 🎯

Normal static: Bahar define karo
Static const integral: Andar hi initialize kar sakte ho!

\`static const int MAX = 100;\` // OK inside class!
\`static int count = 0;\` // ERROR! Bahar karo`,
        realLife: {
            title: 'Universal Constants',
            icon: '🌍',
            description: 'Gravity constant (9.8) har jagah same hai aur change nahi hoti = static const!'
        },
        code: `#include <iostream>
using namespace std;

class GameConfig {
public:
    // Static const - can initialize inside!
    static const int MAX_PLAYERS = 4;
    static const int MAX_LEVELS = 50;
    
    // Non-const static - must define outside
    static int currentPlayers;
    
    static void addPlayer() {
        if (currentPlayers < MAX_PLAYERS) {
            currentPlayers++;
            cout << "Player added! Current: " << currentPlayers << endl;
        } else {
            cout << "Max players reached!" << endl;
        }
    }
};

int GameConfig::currentPlayers = 0;

int main() {
    cout << "Max Players: " << GameConfig::MAX_PLAYERS << endl;
    cout << "Max Levels: " << GameConfig::MAX_LEVELS << endl;
    
    GameConfig::addPlayer();
    GameConfig::addPlayer();
    GameConfig::addPlayer();
    GameConfig::addPlayer();
    GameConfig::addPlayer();  // This will fail
    
    return 0;
}`,
        output: `Max Players: 4
Max Levels: 50
Player added! Current: 1
Player added! Current: 2
Player added! Current: 3
Player added! Current: 4
Max players reached!`,
        diagram: `graph TD
    A[Static const int] -->|Initialize inside| B[MAX_PLAYERS = 4]
    C[Static int] -->|Define outside| D[currentPlayers]`,
        interview: [
            { q: 'constexpr aur static const mein fark?', a: 'constexpr compile-time evaluate hota hai, const runtime pe bhi ho sakta hai.' },
            { q: 'Static member function ko const bana sakte hain?', a: 'Nahi! const ka matlab this modify nahi karega, static mein this hi nahi.' }
        ]
    },
    {
        id: 'singleton-class',
        title: 'Singleton Class',
        module: 'advanced',
        order: 25,
        hinglish: `**Sirf EK hi object ban sake - Singleton Pattern!** 1️⃣

Kab use karein:
- Database connection
- Logger
- Configuration manager
- Thread pool

Implementation:
1. Constructor PRIVATE karo
2. Static instance rako
3. Static function se access do`,
        realLife: {
            title: 'India ka President',
            icon: '🏛️',
            description: 'Ek time pe sirf EK president ho sakta hai. Naya banana allowed nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Database {
private:
    static Database* instance;
    string connectionString;
    
    // Private constructor!
    Database(string conn) : connectionString(conn) {
        cout << "Database connected!" << endl;
    }
    
public:
    // Delete copy constructor
    Database(const Database&) = delete;
    Database& operator=(const Database&) = delete;
    
    // Static accessor
    static Database* getInstance(string conn = "") {
        if (instance == nullptr) {
            instance = new Database(conn);
        }
        return instance;
    }
    
    void query(string sql) {
        cout << "Executing: " << sql << endl;
    }
};

Database* Database::instance = nullptr;

int main() {
    // First call - creates instance
    Database* db1 = Database::getInstance("mysql://localhost");
    db1->query("SELECT * FROM users");
    
    // Second call - returns SAME instance
    Database* db2 = Database::getInstance();
    db2->query("SELECT * FROM orders");
    
    cout << "Same instance? " << (db1 == db2 ? "Yes!" : "No") << endl;
    return 0;
}`,
        output: `Database connected!
Executing: SELECT * FROM users
Executing: SELECT * FROM orders
Same instance? Yes!`,
        diagram: `graph TD
    A[getInstance Call 1] --> B{instance == null?}
    B -->|Yes| C[Create new Database]
    B -->|No| D[Return existing]
    E[getInstance Call 2] --> B`,
        interview: [
            { q: 'Singleton thread-safe kaise banayein?', a: 'Double-checked locking ya Meyer\'s Singleton (static local variable) use karein.' },
            { q: 'Singleton ka disadvantage?', a: 'Testing hard ho jati hai, global state ki tarah behave karta hai.' }
        ]
    },
    {
        id: 'friend-function',
        title: 'Friend function',
        module: 'advanced',
        order: 26,
        hinglish: `**Bahar ki function ko private access de do!** 🤝

Friend function class ka member nahi hai, but private access mil jata hai!

Syntax: \`friend returnType functionName(params);\`

Note: Friend function mein this pointer NAHI hota!`,
        realLife: {
            title: 'Close Family Friend',
            icon: '👨‍👩‍👧',
            description: 'Family friend ghar ke private areas access kar sakta hai, random visitor nahi!'
        },
        code: `#include <iostream>
using namespace std;

class Box {
    int length, width;
    
public:
    Box(int l, int w) : length(l), width(w) {}
    
    // Declare friend function
    friend int calculateArea(const Box& b);
};

// Friend function definition - NOT a member!
int calculateArea(const Box& b) {
    // Can access private members!
    return b.length * b.width;
}

int main() {
    Box box(10, 5);
    
    // Call as regular function, not box.calculateArea()
    cout << "Area: " << calculateArea(box) << endl;
    
    return 0;
}`,
        output: `Area: 50`,
        diagram: `graph LR
    A[Box Class] -->|friend| B[calculateArea Function]
    B -->|Access| C[private: length, width]`,
        interview: [
            { q: 'Friend function member function hai?', a: 'Nahi! Sirf access milta hai, member nahi banti.' },
            { q: 'Friendship inherit hoti hai?', a: 'Nahi! Derived class ko automatically friend access nahi milta.' }
        ]
    }
];
