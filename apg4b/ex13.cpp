#include <bits/stdc++.h>
using namespace std;

int main(int argc, char const *argv[])
{
    int N;
    cin >> N;
    vector<int> points(N);

    for(int i=0; i<N; i++){
        cin >> points.at(i);
    }
    int avg = 0;
    for(int i=0; i<N; i++){
        avg += points.at(i);
    }
    avg /= N;

    //output
    for(int i=0; i<N; i++){
        int a = points.at(i) - avg;
        if(a < 0) a = -a;
        cout << a << endl;
    }

    return 0;
}
