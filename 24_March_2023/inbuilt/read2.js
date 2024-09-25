let fs = require("fs");

let data1 = fs.readFileSync("myCode1.txt", { flag: "r" });

console.log(data1);

let data2 = fs.readFileSync("myCode1.txt", { encoding: "utf-8", flag: "r" });

console.log(data2);

data2 = fs.readFileSync("myCode1.txt", { encoding: "utf-8", flag: "r" }, () => {
  console.log("hello");
});
console.log(data2);

fs.readFile("../Data/category.json", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
