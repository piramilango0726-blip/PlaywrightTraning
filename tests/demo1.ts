let message1:string= "Hello World";
message1="23";
console.log(message1);

let age1:number = 20;
console.log(age1);

let numbers1:number[] = [1, 2, 3];

let isactive:boolean = false;

let data:any = "Hello World";

function add1(a:number, b:number):number
{
    return a+b;
}
add1(2,3);

let user1: {
    name:string,
    age:number
    location:string
} = {
    name:"John",
    age:30,
    location:"USA"
}
user1.location = "India";
