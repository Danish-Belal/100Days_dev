
function swap<T, U>(a : T ,b : U) : [U,T]{ 
     return [b,a]
}

let ans = swap(true, "Nell");
console.log(ans);


// Partial is used when we need to modifed, make all attribute ooptional , like for todo update