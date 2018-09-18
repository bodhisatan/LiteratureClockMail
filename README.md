# LiteratureClockMail
[中文文档](#中文文档)

A script written by node.js to send email with Literature-Clock, based on work and idea by [Jaap Meijers](https://www.instructables.com/id/Literary-Clock-Made-From-E-reader/).
Also Thanks for the picture source coming from another developer's [open-source-code](https://github.com/boramalper/literary-clock).

### *preview first*
![image][https://github.com/bodhisatan/LiteratureClockMail/preview.png]

### *how to use it*
* first you have to deploy the environment of node.js
* then you should git clone or download the repository
* after that you can use command 'npm install' to install the modules that requested
* next you must open 'main.js' to modify some parameter
* at last you can use 'node main.js' to run the script

### *parameter settings*
* if you are interested in the quick and dirty script, you can change the following settings to have a try
* if you do not have a email account with SMTP service, you have to apply for it first
```JavaScript
let EmianService = "163";  //here you should input the factory that provides the email service, such as '163'

let EamilAuth = {
  user: "your email address",
  pass: "your SMTP password"
};

let EmailFrom = '"you should input your nickname here" <you should input your email address here>';

let EmailTo = "email address of recipient";

let EmailSubject = "the email theme";
```
### 中文文档
这是一个node.js写的小脚本，采用EJS模版引擎生成HTML，并将此HTML通过nodemailer发送给自己的小女友，定时功能采用node-schedule模块实现

* 如何使用 
    * 第一步：在本地配置node环境
    * 第二步：将代码git clone或直接下载到本地
    * 第三步：使用"npm install"命令安装依赖
    * 第四步：修改main.js配置部分
    * 第五步：使用"node main.js"运行脚本

* 配置修改
    * 如果你对此脚本有兴趣，欢迎修改了配置部分后将其运行于你的pc或者云服务器
    * 如果你的邮箱尚未开通SMTP，请先开通再填写相应配置（关于如何开通，请自行百度/Google）
```JavaScript
let EmianService = "163";  //此处填写邮箱厂商，如163

let EamilAuth = {
  user: "你的邮箱",
  pass: "SMTP密码"
};

let EmailFrom = '"发件人昵称" <你的邮箱地址>';

let EmailTo = "接收人邮箱地址";

let EmailSubject = "邮件主题";
```
*如果对你有所帮助，欢迎 star 或 fork ！*

