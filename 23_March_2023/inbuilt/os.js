let os = require('os');

console.log(os);
console.log("Platform : " + os.platform())
console.log("Architecture:  "+os.arch())
console.log("Release : "+os.release())
console.log("CPUS : "+os.cpus().length+" core")
console.log("Machine : "+os.machine())
console.log("Uptime : "+os.uptime())
console.log("FreeMemory : "+os.freemem())
console.log("Network Interfaces : "+os.networkInterfaces())
console.log("Home Directory : "+os.homedir())