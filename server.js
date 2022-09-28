var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/EmailGet', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
		//const text = "Probosys" ;
		var Mytext = req.body.text;
		console.log(Mytext);
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'probosysbots@gmail.com',
              pass: 'pmwtdhprpmxsevzq'
          }
      });
      let mailOptions = {
          from: '"Probosys Team" <probosysbots@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: "Info from - ASUG Literature Bot", // Subject line
          //text: req.body.body, // plain text body
		  html: '<b><p>Hi ' + Mytext + ',</p><p>Please find the attachment for details.</p><p>Thanks,<br>Probosys Team</p></b>', // html body
		  attachments: [{   // file on disk as an attachment
            filename: 'Info_ASUG_Literature_Bot.pdf',
            path: './Attachment/Info_ASUG_Literature_Bot.pdf' // stream this file
        }]// html body

      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
