
type input = (number | string)[];
function getFirstNumber(arr: input) : (number | string){
     return arr[0];
}
let array = [1,2,3,4,5];
let array2 = ["He", "shae", "sesa"];
let ans = getFirstNumber(array2)
console.log(ans);
