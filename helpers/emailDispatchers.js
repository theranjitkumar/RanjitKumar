var nodemailer = require('nodemailer');
// var constant = require('./cofig/constant');

var EMD = {};
module.exports = EMD;

EMD.syaHello = function() {
  console.log('hello dude...');
}

EMD.dispatchMail = function(userEmail, tempPassword){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodedevelopertest@gmail.com',
      pass: 'nodetest'
    }
  });
  
  var mailOptions = {
    from: 'nodedevelopertest@gmail.com',
    to: userEmail,
    subject: 'Test Mail',
    html: `
    Hi, 
    <br> 
    <p>Your are registerd as new member in abhishek networking </p>
    <p> Your temprary password is ${tempPassword} </p>
    <p> <a href="#"> Click Me </a> for reset your password and update your profile </p>
    <br>
    <p> <strong> Best Regards & Good Luck </strong> </p>
    <p> Abhisekh Networking </p>
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response+'\n'+mailOptions.to);
    }
  });  
}