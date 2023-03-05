<!-- 定义开始答题按钮 -->
<template>
	<view class="btn-wrap">
		<!-- <input type="text" v-model="keyWord"/> -->
		<button class="start-answer" @tap="sendRequest">开始刷题</button>
		
	</view>
</template>

<script>
	import { mixin } from "../../mixin/mixin.js"
	import { mapState } from "vuex"
	export default {
		name: "startAnswer",
		data() {
			return {
				keyWord: ''
			};
		},
		methods: {
			
			sendRequest() {
				if(this.isLogin){
					// this.$bus.$off('getIsBeenChoosen')
					
					if(this.totalQuestionNumber <= this.finishQuestionNumber){
						uni.showModal({
							content:"进度已100%,是否重新刷题?",
							success:(res)=>{
								if(res.confirm){
									uni.request({
										url:`${this.$store.state.baseUrl}record/resetisvalidate`,
										method:'GET',
										data:{
											userId:this.userId,
											dicId:this.questionTypeId
										},
										success:()=>{
											this.$store.dispatch("getTotalFinishCorrectQuestionNumber")
											uni.redirectTo({
												url:"/pages/index/index"
											})
											
											
										}
									})
								}
								
							}
						})
						
					}else{
						this.$store.commit("initState")
						this.$store.commit("initQuestionOrder")
						this.$store.commit('initCurrentQuestionOrder')
						this.$store.commit("initCorrectWrongNumber")
						this.$store.commit("changeRestQuestionNumber")
						uni.navigateTo({
							url:"/pages/question_answer/question_answer_single"
						})
					}
				}else{
					uni.showModal({
						title:"您还未登录,请登录!",
						confirmText:"去登录",
						success: obj => {
							
							if(obj.confirm){
								this.userLogin()
							}
						}
					})
				}
				
				
			},
			
		},
		computed:{
			...mapState(['totalQuestionNumber',"finishQuestionNumber",'userId','questionTypeId','isLogin'])
		},
		mixins:[mixin]
	}
</script>

<style>
	.btn-wrap {
		width: 700rpx;
		height: 100rpx;
		margin-top: 100rpx;
		/* background-color: rgb(42,75,113); */
	}

	.start-answer {
		width: 700rpx;
		height: 100rpx;
		background-color: rgb(42, 75, 113);
		line-height: 100rpx;
		font-size: 50rpx;
		color: white;
	}
</style>
