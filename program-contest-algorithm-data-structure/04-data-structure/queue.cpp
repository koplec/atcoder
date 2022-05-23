#include <iostream>
#include <string>
using namespace std;

const int QUEUE_MAX_NUM = 100000;

//ring arrayでの実装
struct QueueItem {
    string name;
    int time;
};
const QueueItem EMPTY_ITEM = QueueItem{
    name:"EMPTY_ITEM", time:-1,
};
class Queue{
    public:
    Queue(){
        head = 0;
        tail = 0;
    }
    bool isEmpty(){
        return head == tail;
    }
    bool isFull(){
        return head == (tail + 1) % QUEUE_MAX_NUM;
    }
    void enqueue(QueueItem item){
        if(isFull()){
            cout << "euqueue error overflow" << endl;
            return;
        }
        ary[tail] = item;
        if(tail + 1 == QUEUE_MAX_NUM){
            tail = 0;
        }else{
            tail++;
        }
    }
    QueueItem dequeue(){
        if(isEmpty()){
            cout << "dequeue error underflow" << endl;
            return EMPTY_ITEM;
        }
        QueueItem x = ary[head];
        if(head+1 == QUEUE_MAX_NUM){
            head = 0;
        }else{
            head++;
        }
        return x;
    }
    
    private:
    int head, tail;
    QueueItem ary[QUEUE_MAX_NUM];
};