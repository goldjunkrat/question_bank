<!-- 整个问题数据区域 -->
<template>
	<view>
		<view class="index-wrapper">
			<QuestionAccount/>
			<view class="line-progress-wrap">
				<template>
					<u-line-progress :percentage="percentage" activeColor="#2f5076">
						<!-- <view class="custom-percentage"> -->
							<text class="iconfont icon-yaoji icon"></text>
							<text class="u-percentage-slot">{{percentage}}%</text>
						<!-- </view> -->
					</u-line-progress>
				</template>
			</view>
			
			<QuestionType/>
			<FinishType/>
			
			
		</view>
	</view>
</template>

<script>
	
	import QuestionAccount from "./QuestionAccount.vue"
	import QuestionType from "./QuestionType.vue"
	import FinishType from "./FinishInType.vue"
	import { mapGetters } from "vuex"
	export default {
		name:"QuestionDataView",
		data() {
			return {
				
			};
		},
		components:{
			QuestionAccount,
			QuestionType,
			FinishType
		},
		computed:{
			...mapGetters(['percentage'])
		}
	}
</script>

<style>
	.index-wrapper{
		width: 700rpx;
		height: 600rpx;
		background-color: rgb(254,254,254);
		margin-top: 75rpx;
		border-radius: 30rpx;
		
	}
	.line-progress-wrap{
		margin-top: 40rpx;
		width: 650rpx;
		margin-left: 25rpx;
	}
	.custom-percentage{
		margin-bottom: 4px;
		margin-right: -30px;
		color: #007AFF;
	}
	.u-percentage-slot {
		padding-right: 6px;
		background-color: $u-warning;
		color: #fff;
		border-radius: 100px;
		font-size: 10px;
		margin-right: -5px;
		/* color: #007AFF; */
		
	}
	.icon{
		font-size: 20rpx;
	}
	
</style>
