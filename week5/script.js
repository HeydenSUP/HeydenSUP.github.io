// number variable 0 - infinity dont use quotes
let a = 10;
let b = -30;
console.log(a, b);
let c = a - b;
console.log(c);

let grade = 52;
if (grade > 70) {
  console.log("good good good");
} else {
  console.log("bad bad bad");
}
// + addition as well as joining
// - subtract
// * multi
// /

//string variables
const myName = "heyden";
console.log(myName);
const myCity = "Melbourne";
const msg = `
<h1> i live in ${myCity}</h1>
<p>i love this city</p>

`;
console.log(msg);

//boolen variables TRUE FLASE
let isThisSunday = false;
let isItAfternoon = true;

//object { name:vale, name:value}
const myStudentRecord = {
  name: "sam",
  id: 1234,
  course: "OART1013",
};

console.log(myStudentRecord);
console.log(myStudentRecord.course);

// arrays
// let sName = "heyden"
// let sName ="jim"
let sName = ["Heyden", "Jim", "Sarah", "Alice"];
console.log(sName[0]);

let numbers = [2, 4, 6, 8, 10];
console.log(numbers[3]);
