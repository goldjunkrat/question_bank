<template>
	<view class="common-cell-wrap">
		<view class="common-cell">
			<view class="item">
				<view :class="userCenterItem.iconName">
				</view>
				<view class="title">
					{{userCenterItem.title}}
				</view>
			</view>
			<u-icon name="arrow-right" :size="iconSize"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CommonCell",
		data() {
			return {
				
			};
		},
		props:[
			"userCenterItem"
		]
	}
</script>

<style>
	.common-cell-wrap{
		
		width: 750rpx;
		height: 120rpx;

		background-color: white;
		border-radius: 10rpx;
	}
	.common-cell{
		display: flex;
		width: 700rpx;
		margin-left: 25rpx;
		line-height: 120rpx;
		justify-content: space-between;
		font-size: 40rpx;
	}
	.item{
		display: flex;
		
	}
	.icon{
		font-size: 40rpx;
	}
	.title{
		margin-left: 20rpx;
	}
</style>
