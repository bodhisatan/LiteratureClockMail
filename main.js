const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const schedule = require("node-schedule");//定时任务

require("./quoteMap");//引入全局变量

//发送者邮箱厂家
let EmianService = "163";

//发送者邮箱账户SMTP授权码
let EamilAuth = {
  user: "littlepumpkinhead@163.com",
  pass: "wingman199939"
};

//发送者昵称与邮箱地址
let EmailFrom = '"小姚同学" <littlepumpkinhead@163.com>';

//接收者邮箱地址
let EmailTo = "1807792487@qq.com";
//let EmailTo = "1813206474@qq.com";

//邮件主题
let EmailSubject = "写给他最最最喜翻的野蛮女友";

//Html数据初始化
let HtmlData = {};

function getData() {

  //文本信息
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

  //图片信息
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

//随机选择时间一样的文本
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
      getData(); //当登录、发送邮件失败，再次执行任务;
    }
    console.log("Message sent: %s", info.messageId);
    HtmlData = {}; //清除数据以便下次再次发送
  });
}

//schedule定时任务
/*var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = [0, new schedule.Range(1,23)];
rule.minute = 50;
rule.second = 0;
var j = schedule.scheduleJob(rule, function(){
  console.log("begin");
  getData();
});*/

getData();