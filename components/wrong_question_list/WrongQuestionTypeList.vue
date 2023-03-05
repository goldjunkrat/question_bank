<template>
	<view class="top-type-list-wrap">
		<u-scroll-list class="top-type-list" indicatorActiveColor="#2f5076">
			<view  
			@tap="chooseType(index)" 
			v-for="(item, index) in typeList" 
			:key="index" 
			class="top-type-list-item"
			:class="(choosenNumber===index)?'content-active':''"
			>
				<view class="icon" :class="item.className">
					
				</view>
				<view class="top-type-list-text">
					{{item.title}}
				</view>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "WrongQuestionTypeList",
		data() {
			return {
				
			};
		},
		methods:{
			chooseType(index){
				this.$store.commit('changeChoosenNumber',index)
				this.$store.commit('initQuestionList')
				this.$store.commit('initPage')
				this.$store.dispatch('getQuestionList')
			}
		},
		computed:{
			...mapState(['choosenNumber'])	
		},
		props:['typeList']
	}
</script>

<style>
	.top-type-list-wrap{
		width: 750rpx;
		height: 160rpx;
	}
	.top-type-list-item{
		width: 250rpx;
		height: 100rpx;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		
	}
	.icon{
		font-size: 50rpx;
	}
	.content-active{
		color: #007AFF;
	}
	
</style>
