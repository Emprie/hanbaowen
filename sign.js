//因为这里我们肯定会用到express包，所以我们先将他引进去
const express=require("express")
const captchapng=require("captchapng")
const db=require("./utils/db.js")
db.configUrl('mongodb://127.0.0.1:27017/blog')
//利用路由，进行模块化开发
const router=module.exports=express.Router()
var code=0
//接下来就是配置一下规则---获取验证码的规则
router.get("/getpic",function(resquest,response){
	code=parseInt(Math.random()*9000+1000)
	var p = new captchapng(80,30,code); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        response.writeHead(200, {
        	'Content-Type': 'image/png'
        });
        response.end(imgbase64);

    })
//配置注册的规则
router.post("/signup",function(resquest,response){
	console.log(code)
	console.log(resquest.body.mycode)
	if(code!=resquest.body.mycode){
		response.send({status:"ok",msg:"验证码不对哦"})
		return
	}
	if(resquest.body.username.length<5||resquest.body.username.length>10){
		alert("您的用户名是不合法的哦")
		return
	}
	if(resquest.body.email.indexOf("@")==-1){
		alert("您的邮箱不合格哦")
		return
	}
	if(resquest.body.password.length<5||resquest.body.password.length>12){
		alert("您的密码不合格哦")
		return
	}
	db.find("user",{username:resquest.body.username},function(err,data){
		if(data.length<=0){
			db.insert("users",{
				username:resquest.body.username,
				email:resquest.body.email,
				password:resquest.body.password
			},function(err,result){
				if(result.insertedCount>0){
					response.send({status:"ok",msg:"注册成功了"})
					return
				}
			})
					return
		}
		response.send({status:"err",msg:"用户名已经存在了哦"})
	})
})
//配置一个登陆规则
router.post("/signin",function(request,response){
	console.log(request.body);
	db.find("users",{username:request.body.username,password:request.body.password},function(err,data){
		console.log(data)
		if(data.length<=0){
			response.send({status:"err",msg:"登陆失败，请检查您的用户名或者密码"})
			return
		}
		request.session.userinfo=data[0];
		response.send({status:"ok",msg:"登入成功"})
	})
})
//配置一个用户是否登入的规则
router.get("/issignin",function(request,response){
	if(request.session.userinfo){
		response.send({status:"ok",msg:"您已经登入"})
	}else {
		response.send({status:"err",msg:"您没有登入"})
	}
})
