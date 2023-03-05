<!-- 定义问题种类切换 -->
<template>
	<view class="question-type-wrap">
		<view class="choose-subject">
			<picker-view indicator-class="picker-box" indicator-style="height:30px;" :value="value" @change="bindChange" class="pick-view">
				<picker-view-column>
					<view v-for="(item,index) in subject" :key="index">
						{{item}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: "QuestionType",
		data() {
			return {
				value:[0],
				subject:['中药学','方剂学','针灸学','药鉴定','病理学']
			};
		},
		methods:{
			bindChange(e){
				
				// 获取选到的选项序号
				this.$store.commit('changeQuestionTypeId',e.detail.value[0]+1)
				this.$store.dispatch('getTotalFinishCorrectQuestionNumber')
				
				
			}
		}
	}
</script>

<style>
	.question-type-wrap {
		width: 650rpx;
		height: 120rpx;
		border-bottom: solid 2rpx rgb(221, 221, 221);
		margin-left: 25rpx;
		margin-top: 50rpx;
	}
	.pick-view{
		width: 200rpx;
		height: 120rpx;
		margin: 0 auto;
	}
	picker-view-column view{
		font-size: 40rpx;
		line-height: 60rpx;
		text-align: center;
		/* border: none; */
		outline: none;
		
	}
	
	
</style>
