

function getFirstEle<T>(arr : T[]) : T{
     return arr[0];
}
let ans1 = getFirstEle<number>([1,2,3,4]);
console.log(ans1);


let ans2 = getFirstEle<string>(["Hiiii" , "hello" , "ok" , "buy"]);
console.log(ans2);

