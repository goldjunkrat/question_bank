<!-- 对应种类的已学数量 -->
<template>
	<view class="finish-type-wrap">
		<view class="finish-type">
			<text class="texts">
				本模块正确率:
			</text>
			<text v-show="isLogin">
				<text >
					<text class="already-study" >{{correctQuestionNumber}}</text>
					/
					<text class="need-to-study">{{totalQuestionNumber}}</text>
				</text>
			</text>
			
			
			
			<view class="already-study" v-show="!isLogin">
				
					<text class="login-text" @click="userLogin">
						登录
					</text>
				
				
				
				以查看</view>
			
		</view>
	</view>
</template>

<script>
	import { mixin } from "../../mixin/mixin.js"
	import { mapState } from "vuex"
	export default {
		name:"FinishInType",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['isLogin','totalQuestionNumber','correctQuestionNumber'])
		},
		mixins:[mixin]
		
	}
</script>

<style>
	.finish-type-wrap{
		width: 650rpx;
		margin-left: 25rpx;
		/* margin-top: 50rpx; */
		height: 120rpx;
		padding-top: 60rpx;
		box-sizing: border-box;
		border-bottom: 4rpx rgb(105,121,140) solid;
	}
	.texts{
		color: rgb(185,182,188);
	}
	.already-study,
	.need-to-study
	{
		font-size: 40rpx;
		display: inline;
	}
	.login-text{
		color: rgb(88,107,149);
		
	}
</style>
