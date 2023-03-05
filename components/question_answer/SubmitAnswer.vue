<template>
	<view class="submit-answer-wrap" >
		
			<button class="submit-answer" :disabled="noChoosenOption">确定</button>
		
	</view>
</template>

<script>
	export default {
		name:"SubmitAnswer",
		data() {
			return {
				
			};
		},
		props:['noChoosenOption']
		
	}
</script>

<style>
	.submit-answer-wrap{
		position: fixed;
		width: 600rpx;
		bottom: 150rpx;
		left: 75rpx;
		height: 100rpx;
		border-radius: 30rpx;

		
	}
	.submit-answer{
		
		border-radius: 30rpx;
		height: 100rpx;
		color: white;
		background-color: #007AFF;
		line-height: 100rpx;
		/* box-shadow: 0 0 10rpx #e5fffe; */
	}
	
</style>
