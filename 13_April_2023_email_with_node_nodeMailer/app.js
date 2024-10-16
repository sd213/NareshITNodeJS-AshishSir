let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport(
    {
        service:'gmail.com',
        auth:{
            user:process.env.user,
            pass:process.env.pass

        }
    }
)

let mailOption = {
    from:process.env.user,
    to:'somitdas001element@gmail.com',
    subject:'Sending Email Using AngularS',
    text:"This som who is Learning AngularJS"
}
transporter.sendMail(mailOption,(err,info)=>{
    if(err) console.log(err);
    else{
        console.log(`Email Sent to : ${info.response}`);
    }
})