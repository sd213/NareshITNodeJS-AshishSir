let fs = require("fs");
fs.writeFile("myCode0.txt", "This is mydata of node", (err) => {
  if (err) throw err;
  console.log("First Task Done");
}); // here no matter how many writefile executes it will create the file if file with data exists then just overwrite the data
fs.appendFile("myCode1.txt", "Code From Node fs", (err) => {
  if (err) throw err;
  console.log("File appended");
}); // but here it does not matter if file exists or not exists if exists with data then data will appended otherwise work like normal write function which means to write new file with data.
