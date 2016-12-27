var vm=new Vue({
	el:"#box",
	data:{
		issignin:false
	},
	methods:{
		
	}
})
Vue.http.get('/issignin').then(function(res){
	console.log(res)
	if(res.body.status==='ok'){
		vm.issignin = true
	}
})