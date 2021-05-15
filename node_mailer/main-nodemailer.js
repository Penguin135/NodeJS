var nodemailer = require('nodemailer');
var mailer = require('./config/nodemailer.json');

function sendEmail(toEmail, title, txt){
    var transporter = nodemailer.createTransport({
        host: mailer.smtpServerURL, // SMTP 서버 주소
        secure: true,               // false로 사용시, port 옵션 추가 필요
        auth:{
            user: mailer.authUser,  // SMTP 메일서버 계정
            pass: mailer.authPass   // SMTP 메일서버 비번
        }
    });

    var mailOptions = {
        from: mailer.fromEmail, // 보내는 사람 주소
        to: toEmail,            // 받는 사람 주소
        subject: title,         // 제목
        text:txt               // 본문
        // html: ``
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        }
        console.log("sended email" + info.response);
        transporter.close();
    })
}

sendEmail('rudwns273@naver.com', 'hello', 'Hello World');