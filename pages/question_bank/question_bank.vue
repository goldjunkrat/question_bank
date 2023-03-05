<template>
	<view class="content">
		<Info/>
		<Type/>
	</view>
</template>

<script>
	import Info from "../../components/question_bank/InfoToSolveQuestion.vue"
	import Type from "../../components/question_bank/QuestionType.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.showLoading({
				title:"正在加载"
			})
			
		},
		onReady(){
			uni.hideLoading()
		},
		components:{
			Info,
			Type
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* width: 700rpx; */
	}
</style>
