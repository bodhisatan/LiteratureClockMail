const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");

require("./quoteMap");

let EmianService = "163";  //here you should input the factory that provides the email service, such as '163'

let EamilAuth = {
  user: "your email address",
  pass: "your SMTP password"
};

let EmailFrom = '"you should input your nickname here" <you should input your email address here>';

let EmailTo = "email address of recipient";

let EmailSubject = "the email theme";

//initialize HtmlData
let HtmlData = {};

function getData() {

  //text information
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  const closestMinutes = findClosest(times, hours * 60 + minutes);
  const res = sample(quoteMap[closestMinutes]);
  textData = {
    quote_former: res.quote_former,
    quote_latter: res.quote_latter,
    time: res.time,
    work: res.work,
    author: res.author
  }
  console.log(textData);
  HtmlData.textData = textData;

  //picture information
  hours = (hours - 10 + 24) % 24;
  minutes = minutes - (minutes % 10);
  const
    hoursFormatted   = ("0" + hours).slice(-2),
    minutesFormatted = ("0" + minutes).slice(-2),
    url = `https://www.data.jma.go.jp/mscweb/data/himawari/img/fd_/fd__trm_${hoursFormatted}${minutesFormatted}.jpg`;
  console.log(url);
  HtmlData.imageData = url;
  
  sendMail();
}

/**
 * Find the element in A (an array of numbers) closest to T (a number).
 *
 * @param A  array to search in
 * @param T  element to look for
 */
function findClosest(A, T) {
  // Source: https://stackoverflow.com/a/35000557
  return A.reduce((prev, curr) => Math.abs(curr - T) < Math.abs(prev - T) ? curr : prev);
}

//select text at random
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sendMail() {
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "email.ejs"), "utf8")
  );
  const html = template(HtmlData);

  let transporter = nodemailer.createTransport({
    service: EmianService,
    port: 465,
    secureConnection: true,
    auth: EamilAuth
  });

  let mailOptions = {
    from: EmailFrom,
    to: EmailTo,
    subject: EmailSubject,
    html: html
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
      HtmlData = {};
      getData(); //after failing to send email, it will restart
    }
    console.log("Message sent: %s", info.messageId);
    HtmlData = {}; //clear data
  });
}

//schedule
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = [0, new schedule.Range(1,23)];
rule.minute = 50;
rule.second = 0;
var j = schedule.scheduleJob(rule, function(){
  console.log("begin");
  getData();
});