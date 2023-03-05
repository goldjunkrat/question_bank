<template>
	<view class="analysis-wrap">
		<view class="hr-box">
			
		</view>
		<view class="answer-analysis">
			<view class="analysis-title">
				答案解析
			</view>
			<view class="analysis-text">
				<view class="box">
					
				</view>
				<text class="box-title">答案解析</text>
			</view>
			<view class="text-content">
				{{questionInfo.analysis}}
				<view class="higher">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name:"Analysis",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['questionInfo'])
		}
	}
</script>

<style>
	.analysis-wrap{
		margin-top: 20rpx;
		
	}
	.hr-box{
		height: 10rpx;
		width: 750rpx;
		background-color: grey;
	}
	.answer-analysis{
		width: 650rpx;
		margin-left: 50rpx;
	}
	.analysis-title{
		
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 50rpx;
		color: #ff1f0f;
		border-bottom: 2rpx solid grey;
	}
	.analysis-text{
		margin-top: 20rpx;
		display: flex;
	}
	.box{
		width: 4rpx;
		height: 40rpx;
		background-color:#ff5500;
	}
	.box-title{
		line-height: 40rpx;
		margin-left: 10rpx;
		font-weight: bold;
	}
	.text-content{
		margin-top: 20rpx;
		width: 650rpx;
		word-wrap: break-word;
	}
	.higher{
		height: 100rpx;
	}
</style>
