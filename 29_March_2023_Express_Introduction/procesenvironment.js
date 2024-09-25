console.log(process.env.PATH); // Prints the system PATH variable

console.log(process.env.NODE_ENV); // Prints the current Node environment (e.g., 'development', 'production')

const port = process.env.PORT || 3000;
console.log(`Server will run on port: ${port}`);
