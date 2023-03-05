export const mixin={
	methods:{
		userLogin() {
			uni.getUserProfile({
				desc: "用以登录账户",
				success: (result) => {
					
					let requestNickName = result.userInfo.nickName
					uni.login({
						onlyAuthorize: true,
						success: (res) => {
							let requestCode = res.code
							console.log(requestCode)
							uni.showLoading({
								title:"正在登录"
							})
							uni.request({
								url: `${this.$store.state.baseUrl}user/userLogin`,
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded"
								},
								data: {
									code: requestCode,
									'nickname':requestNickName
									
								},
								success: (data) => {
									uni.hideLoading()
									this.$store.commit('getUserInfo',result.userInfo)
									this.$store.commit('changeIsLogin')
									uni.setStorageSync('userInfo',result.userInfo)
									uni.setStorageSync('userId',data.data.extend.resMap.user.userId)
									this.$store.commit('getUserId',data.data.extend.resMap.user.userId)
									this.$store.dispatch('getTotalFinishCorrectQuestionNumber')
									
									console.log('登陆成功')
								},
								fail:()=>{
									console.log('登陆失败')
								}
							})
							
							
						}
					})
					
				}
			})
		},
	}
}