<template>
	<view class="info-wrapper">
		<view class="info-wrap">
			<view class="already-finish-wrap">
				<view class="already-finish">
					<view class="already-finish-text">
						已刷题
					</view>
					<view v-show="isLogin" class="already-finish-number">
						{{alreadyFinishQuestion}}
					</view>
					<view v-show="!isLogin" class="already-finish-text">
						<text class="login-text" @click="userLogin">登录</text>
						以查看
					</view>
				</view>
			</view>
			<view class="divide-line">
				
			</view>
			<view class="additional-function-wrap">
				<view class="additional-function">
					<view class="wrong-topic-text-wrap">
						<view class="wrong-topic-text" @tap="toWrongQuestionList">
							<view>
								
								<u-icon name="file-text" :size="iconSize"></u-icon>
								错题本
							</view>
							<u-icon name="arrow-right" :size="iconSize"></u-icon>
						</view>
					</view>
					<view class="favorite-wrap">
						<view class="favorite" @tap="toFavoriteList">
							<view>
								<u-icon name="star" :size="iconSize"></u-icon>
								收藏夹
							</view>

							<u-icon name="arrow-right" :size="iconSize"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mixin } from "../../mixin/mixin.js"
	import {mapState} from 'vuex'
	export default {
		name:"InfoToSolveQuestion",
		data() {
			return {
				iconSize:'60rpx',
				alreadyFinishQuestion:0
			}
		},
		computed:{
			...mapState(['isLogin'])
		},
		mounted(){
			uni.request({
				url:`${this.$store.state.baseUrl}record/didtotalcount`,
				data:{
					userId:this.$store.state.userId,
				},
				success:(data)=>{
					this.alreadyFinishQuestion = data.data.extend.didTotalCount
				}
			})
		},
		methods: {
			toWrongQuestionList(){
				if(this.isLogin){
					uni.navigateTo({
						url:"/pages/wrong_question_list/wrong_question_list"
					})
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
			toFavoriteList(){
				if(this.isLogin){
					uni.navigateTo({
						url:"/pages/favorite_list/favorite_list"
					})
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
		mixins:[mixin]
		
	}
</script>

<style>
	.info-wrapper{
		padding-top: 100rpx;
		box-sizing: border-box;
		height: 400rpx;
		width: 750rpx;
		background-image: linear-gradient(to right,rgb(68,89,114),#2f5076);
		
	}
	.info-wrap{
		display: flex;
		
		width: 650rpx;
		height: 298rpx;
		background-color: white;
		margin-left: 50rpx;
		border-bottom: 2rpx solid rgb(220,220,220);
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}
	.divide-line{
		height: 298rpx;
		border-right: 2rpx solid rgb(220,220,220);
		margin-right: 4rpx;
	}
	.already-finish-wrap,
	.additional-function-wrap{
		width: 325rpx;
		height: 298rpx;
	}
	.already-finish-wrap{
		width: 320rpx;
		
	}
	.already-finish-text,
	.already-finish-number{
		line-height: 149rpx;
		font-size: 40rpx;
		text-align: center;
	}
	.already-finish-number{
		font-size: 100rpx;
	}
	.wrong-topic-text-wrap,
	.favorite-wrap{
		line-height: 149rpx;
		font-size: 40rpx;
		text-align: center;
	}
	.wrong-topic-text,
	.favorite{
		display: flex;
		justify-content: space-between;
	}
	.wrong-topic-text>view,
	.favorite>view{
		display: flex;
	}
	.login-text{
		color: rgb(88,107,149);
	}
</style>
