<template>
	<view>
		<view class="load-finish">
			<slot>
				
			</slot>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"LoadFinish",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.load-finish{
		width: 650rpx;
		height: 30rpx;
		/* line-height: 100rpx; */
		text-align: center;
		margin: 0 auto;
		color: #bebebe;
		margin-top: 10rpx;
	}
	
</style>
