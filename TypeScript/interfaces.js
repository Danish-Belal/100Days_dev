function getPeopleData(people) {
    return "Hi " + people.name + " Glade " + people.gender.sex + "You are not" + people.age;
}
var value = getPeopleData({
    name: "Danish",
    age: 23,
    gender: {
        sex: "Male"
    }
});
console.log(value);
