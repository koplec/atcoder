#include <iostream>
#include <string>
using namespace std;

const int STACK_MAX_NUM  = 1000;

bool isNumber(const string& str){
    for(char const &c: str){
        if(isdigit(c) == 0) return false;
    }
    return true;
};
class Stack {
    public:
    Stack(){
        top = 0;
    }
    bool isEmpty(){
        return top == 0;
    }
    bool isFull(){
        return top >= STACK_MAX_NUM - 1;
    }
    void push(int x){
        // cout << "push:" << x << endl;
        if(isFull()){
            cout << "push overflow error" << endl;
            return;
        }
        top++;
        ary[top] = x;
    }
    int pop(){
        if(isEmpty()){
            cout << "pop underflow error" << endl;
            return 0;
        }
        top--;
        int ret = ary[top+1];
        // cout << "pop:" << ret << endl;

        return ret;
    }
    private:
    int top;
    int ary[STACK_MAX_NUM];
};

int main(int argc, char const *argv[])
{
    Stack stack;
    string str;
    while(cin >> str){//ctrl+dで抜ける
        // cout << "input:" << str << endl;
        if(isNumber(str)){
            int num = stoi(str);
            stack.push(num);
            continue;
        }
        if(str == "+"){
            int a = stack.pop();
            int b = stack.pop();
            int ret = a + b;
            stack.push(ret);
            continue;
        }
        if(str == "*"){
            int a = stack.pop();
            int b = stack.pop();
            int ret = a * b;
            stack.push(ret);
            continue;
        }
        if(str == "-"){
            int a = stack.pop();
            int b = stack.pop();
            int ret = a - b;
            stack.push(ret);
            continue;
        }
    }
    int last = stack.pop();
    cout << "last:" << last << endl;
    return 0;
}
