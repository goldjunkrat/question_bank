<template>
	<view class="big-cell-wrap">
		<view class="big-cell">
			<view class="head-icon-wrap">
				<view v-show="!isLogin" class="iconfont icon-jurassic_user icon">

				</view>
				<view v-show="isLogin" class="">
					<image :src="userInfo.avatarUrl" class="avatar"></image>
				</view>
			</view>
			<view class="username-wrap" v-show="isLogin">
				{{userInfo.nickName}}
			</view>
			<view class="username-wrap" v-show="!isLogin">
				未
				<text class="login-text" @click="userLogin">登录</text>
				

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import { mixin } from "../../mixin/mixin.js"
	export default {
		name: "BigCell",
		data() {
			return {

			};
		},
		computed: {
			...mapState(['isLogin', 'userInfo'])
		},
		mixins:[mixin],
		methods: {
			// userLogin() {
			// 	uni.getUserProfile({
			// 		desc: "用以登录账户",
			// 		success: (result) => {
			// 			let requestNickName = result.userInfo.nickName
			// 			// console.log(requestNickName)
			// 			uni.login({
			// 				onlyAuthorize: true,
			// 				success: (res) => {
			// 					let requestCode = res.code
			// 					console.log(requestCode)
			// 					uni.request({
			// 						url: "http://10.16.36.7:8080/tcm_practicing_war/user/userLogin",
			// 						method: 'POST',
			// 						header: {
			// 							'content-type': "application/x-www-form-urlencoded"
			// 						},
			// 						data: {
			// 							code: requestCode,
			// 							'nickname':requestNickName
										
			// 						},
			// 						success: (data) => {
										
			// 							this.$store.commit('getUserInfo',result.userInfo)
			// 							this.$store.commit('changeIsLogin')
			// 						}
			// 					})
								
								
			// 				}
			// 			})
						
			// 		}
			// 	})

				


			// 	// uni.getUserProfile({
			// 	// 	desc:"用以登录账户",
			// 	// 	success:(res)=>{
				
			// 	// 		console.log(res.userInfo)
			// 	// 	}
			// 	// })
			// },
			
		}
	}
</script>

<style>
	.big-cell-wrap {
		margin-top: 50rpx;
		width: 750rpx;
		height: 300rpx;
		box-sizing: border-box;
		padding-top: 50rpx;
		background-color: white;
		border-radius: 40rpx;
	}

	.big-cell {
		height: 200rpx;
		width: 750rpx;
		display: flex;
		/* background-color: #007AFF; */
	}

	.head-icon-wrap {
		margin-left: 50rpx;
		height: 200rpx;
		width: 200rpx;
		border-radius: 100rpx;
		background-color: rgb(234, 234, 234);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.icon {
		font-size: 180rpx;
		color: white;
	}

	.username-wrap {
		line-height: 200rpx;
		margin-left: 50rpx;
		font-size: 40rpx;
	}

	.login-text {
		color: rgb(88, 107, 149);
	}

	.avatar {
		width: 216rpx;
		height: 216rpx;

	}
</style>
