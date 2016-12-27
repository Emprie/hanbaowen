const express=require("express")
const db=require("./utils/db.js")
const router=modules.exports=express.Router()
router.post("/publish",function(request,response){
	db.insert("blog",{title:request.body.title,content:request.body.content},function(err,result){
		if(result.insertedCount<=0){
			response.send({status:"err",msg:"插入失败了~"})
			return
		}
		response.send({status:"ok",msg:"插入成功"})
	})
})