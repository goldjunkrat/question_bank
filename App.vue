<script>
	import { mapState } from "vuex"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.checkSession({
				success:()=>{
					
					this.$store.commit('getUserInfo',uni.getStorageSync('userInfo'))
					
					this.$store.commit('getUserId',uni.getStorageSync('userId'))
					if(this.$store.state.userId&&this.$store.state.userInfo){
						this.$store.commit('changeIsLogin')
						this.$store.dispatch('getTotalFinishCorrectQuestionNumber')
					}
					
					
					
					// console.log('登录态还在')
				},
				fail:()=>{
					this.$store.commit('changeIsLoginToFalse')
					// console.log('未登录')
					
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		computed:{
			...mapState(['isLogin','userInfo','userId'])
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
