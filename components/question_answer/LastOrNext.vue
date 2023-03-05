<template>
	<view :class="(isFirstOne||isLastOne)?'first-last-question-wrap':'last-or-next-wrap'">
		<button v-show="!isFirstOne" class="last-btn" @tap="toPreviousQuestion">上一题</button>
		<button v-show="!isLastOne" class="next-btn" @tap="toNextQuestion">下一题</button>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name:"LastOrNext",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['isFirstOne','isLastOne','finishQuestionNumber','totalQuestionNumber','questionOrder','baseUrl','userId','currentQuestionOrder','restQuestionNumber'])
		},
		methods:{
			toNextQuestion(){
				// 题号+1
				this.$store.commit("addQuestionOrder")
				
				// 判断点击下一题时,下一题是否是最后一题
				if(this.questionOrder === this.restQuestionNumber){
					this.$store.commit('changeIsLastOne',true)
				}else{
					this.$store.commit('changeIsLastOne',false)
				}
				// 只要能点击下一题,说明下一题肯定不是第一题,一定会显示"上一题"
				this.$store.commit("changeIsFirstOne",false)
				// 判断下一题是新题还是本次刷过的题
				if(this.questionOrder>this.currentQuestionOrder){
					// 初始化页面
					this.$store.commit("initState")
					// 发送请求获取下一题信息
					this.$store.dispatch("getQuestionInfo")
				}
				else{
					// 初始化页面
					this.$store.commit("recoverState")
					// 发送请求获取上一题信息
					this.$store.dispatch("getPreQuestionInfo")
				}
				
			},
			toPreviousQuestion(){
				// 题号-1
				this.$store.commit("minusQuestionOrder")
				// 初始化页面
				this.$store.commit("recoverState")
				// 只要能点击上一题,说明上一题肯定不是最后一题,一定会显示"下一题"
				this.$store.commit("changeIsLastOne",false)
				// 当题号经过-1之后=1,说明回到了第一题,即不能出现"上一题"
				if(this.questionOrder===1){
					this.$store.commit('changeIsFirstOne',true)
				}else{
					this.$store.commit('changeIsFirstOne',false)
				}
				// 发送请求获取上一题信息
				this.$store.dispatch("getPreQuestionInfo")
			}
		}
	}
</script>

<style scoped>
	.last-or-next-wrap{
		position: fixed;
		width: 600rpx;
		bottom: 150rpx;
		left: 75rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		
	}
	.first-last-question-wrap{
		position: fixed;
		width: 600rpx;
		bottom: 150rpx;
		left: 75rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
	}
	.last-btn,
	.next-btn{
		line-height: 100rpx;
		width: 250rpx;
		margin: 0;
		border-radius: 30rpx;
		background-color: rgb(252,183,80);
		color: white;
	}
	
</style>
