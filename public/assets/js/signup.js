// 初始化
var vm=new Vue({
  el:"#box",
  data:{
    username:"",
    email:"",
    password:"",
    mycode:""
  },
  methods:{
    //注册一个点击事件
    signup:function(e){
      // 取消默认事件
      e.preventDefault()
      // 进行一系列的判断
      if(this.username.length<5||this.username.length>10){
        alert("您的用户名是不合法的哦")
        return
      }
      if(this.email.indexOf("@")==-1){
        alert("您的邮箱不合格哦")
        return
      }
      if(this.password.length<5||this.password.length>12){
        alert("您的密码不合格哦")
        return
      }
      this.$http.post("/signup",{
        username:this.username,
        email:this.email,
        password:this.password,
        mycode:this.mycode
      })
      .then(function(result){
        console.log(result)
      })
    }
  }
})