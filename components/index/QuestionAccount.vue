<!-- 对应种类问题总数和已完成 -->
<template>
	<view class="question-account">
		<view class="all-question-wrap">
			<view class="all-question">
				<view class="all-question-text">
					<text>全部</text>

				</view>
				<view class="all-question-number">
					<text v-show="isLogin" class="already-finish-question-account">{{totalQuestionNumber}}</text>
					<text v-show="isLogin">个</text>
					<view v-show="!isLogin" class="no-login-show">
						<text class="login-text" @tap="userLogin">登录</text>
						以查看</view>
				</view>



			</view>
		</view>
		<view class="already-finish-question-wrap">
			<view class="already-finish-question">
				<view class="already-finish-question-text">
					<text>已刷过</text>

				</view>
				<view class="already-finish-question-number">
					<text v-show="isLogin" class="already-finish-question-account">{{finishQuestionNumber}}</text>
					<text v-show="isLogin">个</text>
					<view v-show="!isLogin" class="no-login-show">

						<text class="login-text" @tap="userLogin">登录</text>
						以计数</text>
					</view>


				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mixin
	} from "../../mixin/mixin.js"
	import {
		mapState
	} from "vuex"
	export default {
		name: "QuestionAccount",
		data() {
			return {

			};
		},
		computed: {
			...mapState(['isLogin', 'totalQuestionNumber','finishQuestionNumber'])
		},
		mixins: [mixin]


	}
</script>

<style lang="scss" scoped>
	.question-account {
		width: 650rpx;
		margin-left: 25rpx;
		display: flex;
		height: 200rpx;
	}

	.all-question-wrap {
		width: 325rpx;
	}

	.already-finish-question-wrap {
		width: 325rpx;
	}

	.all-question {
		width: 325rpx;
		text-align: center;
	}

	.all-question-text {
		height: 100rpx;
		color: rgb(185, 182, 188);
		position: relative;
	}

	.all-question-text text {
		position: absolute;
		bottom: 0;
		right: 120rpx;
		font-size: 40rpx;
	}

	.all-question-number {
		height: 100rpx;
		font-size: 50rpx;
	}



	.already-finish-question {
		width: 325rpx;
		text-align: center;

	}

	.already-finish-question-text {
		height: 100rpx;
		color: rgb(185, 182, 188);
		position: relative;
	}

	.already-finish-question-text text {
		position: absolute;
		bottom: 0;
		right: 120rpx;
		font-size: 40rpx;
	}

	.already-finish-question-number {
		height: 100rpx;
		font-size: 50rpx;

	}

	.already-finish-question-account {
		font-size: 80rpx;
	}

	.no-login-show {
		line-height: 120rpx;
	}

	.login-text {
		color: rgb(88, 107, 149);
	}
</style>
