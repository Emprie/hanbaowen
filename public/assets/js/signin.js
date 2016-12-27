var vm=new Vue({
	el:"#box",
	data:{
		username:"",
		password:""
	},
	methods:{
		signin:function(e){
			//因为是sbmit  所以我们应该在这里取消他的默认事件
			e.preventDefault()
			this.$http.post("/signin",{
				username:this.username,
				password:this.password
			}).then(function(result){
				console.log(result)
				if(result.body.status==="ok"){
				location.href="/index.html"
				}
			})
		}
	}
})