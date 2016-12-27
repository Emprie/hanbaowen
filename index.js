const express=require("express")
const sign=require("./sign.js")
const bodyParser = require('body-parser')
const session=require("express-session")
const app=express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
//因为页面已加载的时候肯定要读取public文件夹下的静态页面
app.use(express.static("public"))
app.use(session({
  secret:'myblog' , // 可以给任意字符
  resave: true, // 表明要不要对当前用户的session进行强制保存
  saveUninitialized: true, // 默认内部对数据做一些初始化!
  cookie:{ // 对要存储到客户的cookie做些配置
    maxAge: 100000,// 就是设置过期时间
  }
}))
app.use(sign)
app.listen(3000,"127.0.0.1",function(err){
	if(err){
		console.log(err)
	}
	console.log("服务器正常启动，地址为127.0.0.1:3000")
})

