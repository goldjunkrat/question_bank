<template>
	<view class="bottom-nav-wrap">
		<view class="bottom-nav">
			<view class="favorite-wrap">
				
					<text 
					@tap="addDeleteFavorite" 
					class="iconfont icon-shoucang1 icon"
					:class="(isFavorite)?'favorite':''"
					>
						
					</text>
				
				
				<text>收藏</text>
			</view>
			<view class="question-account-wrap">
				<view class="correct-wrap">
					<text class="iconfont icon-zhengque data-icon">
						
					</text>
					<text>{{correctNumber}}</text>
				</view>
				<view class="wrong-wrap">
					<text class="iconfont icon-cuowu data-icon">
						
					</text>
					<text>{{wrongNumber}}</text>
				</view>
				<view class="question-sort-wrap">
					<text class="iconfont icon-lvzhou_zongshu data-icon">
						
					</text>
					<text>{{questionOrder}}/{{restWrongQuestionNumber}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name:"BottomNavigation",
		data() {
			return {
				
			};
		},
		methods:{
			addDeleteFavorite(){
				if(!this.isFavorite){
					this.$store.dispatch("addFavorite")
				}else{
					this.$store.dispatch("removeFavorite")
				}
				
			}
		},
		
		computed:{
			...mapState(['correctNumber','wrongNumber','finishQuestionNumber','totalQuestionNumber','isFavorite','wrongQuestionListLength','wrongQuestionIndex','questionOrder','restWrongQuestionNumber'])
		}
	}
</script>

<style>
	.bottom-nav-wrap{
		width: 750rpx;
		height: 100rpx;
		border-top: 2rpx solid;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 100;
		background-color: white;
	}
	.bottom-nav{
		width: 650rpx;
		margin-left: 50rpx;
		display: flex;
	}
	.favorite-wrap{
		width: 250rpx;
		text-align: center;
		line-height: 100rpx;
		
	}
	.icon{
		font-size: 50rpx;
		vertical-align: bottom;
		padding-right: 20rpx;
	}
	.question-account-wrap{
		width: 400rpx;
		display: flex;
		line-height: 100rpx;
		text-align: center;
		box-sizing: border-box;
		padding-left: 30rpx;
	}
	.correct-wrap{
		width: 100rpx;
		color: green;
	}
	.wrong-wrap{
		width: 100rpx;
		color: red;
	}
	.question-sort-wrap{
		width: 200rpx;
		color: #ffb22c;
	}
	.data-icon{
		font-size: 50rpx;
		vertical-align: bottom;
	}
	.favorite{
		color:#ffbc13;
	}
	
</style>
