interface Gender{
     sex: "Male" | "Female"
}

interface People{
     name: string,
     age: number,
     gender: Gender
}

function getPeopleData(people : People){
     return "Hi "+ people.name + " Glade " + people.gender.sex + " You are not"+ people.age
}

var value = getPeopleData({
     name : "Danish",
     age: 23,
     gender : {
          sex: "Male"
     }
})

console.log(value);
