// Template Topics
export const templateTopics = [
    {
        id: 'template-1',
        title: 'Template-I',
        module: 'templates',
        order: 62,
        hinglish: `**Ek code, multiple types ke liye kaam kare!** 📐

Function template: Type parameter le kar generic function banao.
\`template<typename T>\` ya \`template<class T>\`

Compiler automatically sahi version generate karta hai!`,
        realLife: {
            title: 'One Size Fits All',
            icon: '👕',
            description: 'Universal charger jo iPhone aur Android dono charge kare = Template!'
        },
        code: `#include <iostream>
using namespace std;

// Function template
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Multiple type parameters
template<typename T, typename U>
void display(T first, U second) {
    cout << "First: " << first << ", Second: " << second << endl;
}

int main() {
    // Compiler generates int version
    cout << "Max int: " << maximum(10, 20) << endl;
    
    // Compiler generates double version
    cout << "Max double: " << maximum(3.14, 2.71) << endl;
    
    // Compiler generates string version
    cout << "Max string: " << maximum(string("apple"), string("banana")) << endl;
    
    // Multiple types
    display(42, "Hello");
    display(3.14, 100);
    
    return 0;
}`,
        output: `Max int: 20
Max double: 3.14
Max string: banana
First: 42, Second: Hello
First: 3.14, Second: 100`,
        diagram: `graph TD
    A[template T maximum] -->|int| B[int maximum]
    A -->|double| C[double maximum]
    A -->|string| D[string maximum]`,
        interview: [
            { q: 'Template compile time ya runtime?', a: 'Compile time! Code generate hota hai for each type used.' },
            { q: 'typename aur class mein fark?', a: 'Template parameters mein same hain. typename preferred hai.' }
        ]
    },
    {
        id: 'template-2',
        title: 'Template-II (typename)',
        module: 'templates',
        order: 63,
        hinglish: `**typename vs class, aur dependent types!** 🔤

typename chahiye jab:
- Nested type ko refer kar rahe ho
- Compiler ko batana hai "ye type hai, variable nahi"

\`typename Container::value_type\``,
        realLife: {
            title: 'Clarification Needed',
            icon: '❓',
            description: 'Bank mein "Account" kaho - Bank account ya personal account? Clarify karo!'
        },
        code: `#include <iostream>
#include <vector>
using namespace std;

// Need typename for dependent types
template<typename Container>
void printFirst(const Container& c) {
    // Container::value_type could be misunderstood as static member
    // typename tells compiler it's a TYPE
    typename Container::value_type first = c[0];
    cout << "First element: " << first << endl;
}

// Non-type template parameters
template<typename T, int Size>
class FixedArray {
    T data[Size];
public:
    void fill(T value) {
        for(int i = 0; i < Size; i++) {
            data[i] = value;
        }
    }
    
    void print() {
        for(int i = 0; i < Size; i++) {
            cout << data[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    vector<int> nums = {10, 20, 30};
    printFirst(nums);
    
    vector<string> words = {"Hello", "World"};
    printFirst(words);
    
    // Non-type parameter
    FixedArray<int, 5> arr;
    arr.fill(42);
    arr.print();
    
    return 0;
}`,
        output: `First element: 10
First element: Hello
42 42 42 42 42`,
        diagram: `graph LR
    A[Container::value_type] -->|ambiguous| B[Static member?]
    A -->|ambiguous| C[Nested type?]
    D[typename] -->|clarifies| E[It's a TYPE!]`,
        interview: [
            { q: 'Dependent type kya hai?', a: 'Type jo template parameter pe depend kare: T::something' },
            { q: 'Non-type template parameter kya ho sakta?', a: 'int, enum, pointer - compile time constants!' }
        ]
    },
    {
        id: 'template-3',
        title: 'Template-III (class templates)',
        module: 'templates',
        order: 64,
        hinglish: `**Class bhi generic bana sakte ho!** 🏗️

\`template<typename T> class MyClass { }\`

STL sab class templates hain:
- vector<T>
- list<T>
- map<K, V>`,
        realLife: {
            title: 'Universal Container',
            icon: '📦',
            description: 'Same dabba, kuch bhi store karo - fruits, books, electronics!'
        },
        code: `#include <iostream>
using namespace std;

// Class template
template<typename T>
class Stack {
    T data[100];
    int top;
    
public:
    Stack() : top(-1) {}
    
    void push(T value) {
        if(top < 99) {
            data[++top] = value;
            cout << "Pushed: " << value << endl;
        }
    }
    
    T pop() {
        if(top >= 0) {
            return data[top--];
        }
        throw runtime_error("Stack empty!");
    }
    
    bool isEmpty() { return top == -1; }
};

// Template with multiple params
template<typename K, typename V>
class Pair {
    K key;
    V value;
public:
    Pair(K k, V v) : key(k), value(v) {}
    
    void display() {
        cout << key << " => " << value << endl;
    }
};

int main() {
    // Integer stack
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    cout << "Popped: " << intStack.pop() << endl;
    
    // String stack
    Stack<string> strStack;
    strStack.push("Hello");
    strStack.push("World");
    
    // Pair template
    Pair<string, int> age("Rahul", 25);
    Pair<int, string> rollName(101, "Priya");
    
    age.display();
    rollName.display();
    
    return 0;
}`,
        output: `Pushed: 10
Pushed: 20
Popped: 20
Pushed: Hello
Pushed: World
Rahul => 25
101 => Priya`,
        diagram: `graph TD
    A[Stack Template] -->|Stack int| B[int Stack]
    A -->|Stack string| C[string Stack]
    D[Pair K,V] -->|string,int| E[Name-Age]
    D -->|int,string| F[Roll-Name]`,
        interview: [
            { q: 'Template definition aur declaration alag files mein?', a: 'Muskil hai! Usually header mein hi definition rakhte hain.' },
            { q: 'Template specialization kya hai?', a: 'Specific type ke liye different implementation: template<> class X<int> { }' }
        ]
    }
];
