export default {
	namespaced:true,
	states:{
		// 用户信息
		userInfo:{},
		// 用户id
		userId:-1,
		// 判断用户是否登录
		isLogin:false,
	},
	actions:{
		
	},
	mutations:{
		// 从本地存储中获取用户信息(头像,昵称)
		getUserInfo(state,userObj){
			state.userInfo = userObj
		},
		// 从本地存储中获取用户id
		getUserId(state,id){
			state.userId = id
		},
		// 更改登陆状态
		changeIsLogin(state){
			state.isLogin = true
		},
	}
}