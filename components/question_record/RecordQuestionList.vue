<template>
	<view>
		<u-list height="100%">
			<u-list-item v-for="(item,index) in questionList" :key="index">
				<view class="wrong-question-wrapper">
					<view class="wrong-question-wrap">
						<view class="wrong-question">
							<view class="wrong-question-title">
								<view class="wrong-question-index">
									{{item.questionId}}.
								</view>
								<text class="wrong-question-title-text">{{item.questionName}}</text>
								
								
							</view>
							<view class="wrong-question-account">
								难度:{{item.difficultyDegree}}
							</view>
							<view class="do-this-question-date">
								种类:{{defineType(item.dictionaryId)}}
							</view>
						</view>
						
					</view>
				</view>
				
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name:"RecordQuestionList",
		
		data() {
			return {
				typeList:[
					'中医学',
					'药剂学',
					'针灸学',
					'药鉴定',
					'病理学',
					'其他'
				]
			};
		},
		methods:{
			defineType(index){
				return this.typeList[index-1]
			}
			
		},
		computed:{
			...mapState(['questionList'])
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.wrong-question-wrapper{
		width: 660rpx;
	}
	.wrong-question-wrap{
		height: 200rpx;
		border: 2rpx solid #b6b6b6;
		width: 650rpx;
		border-radius: 10rpx;
		margin-top: 10rpx;
		box-shadow: 5rpx 2rpx 4rpx #007AFF;
		/* background-image: linear-gradient(to right,rgb(146,79,88),rgb(161,119,120)); */
	}
	.wrong-question{
		height: 200rpx;
		display: flex;
		flex-direction: column;
		
		justify-content: space-around;
		margin-left: 20rpx;
		
		
	}
	.wrong-question-title{
		
		font-size: 30rpx;
		width: 595rpx;
		display: flex;
		align-items: center;
		
	}
	.wrong-question-index{
		height: 40rpx;
		width: 40rpx;
		display: inline-block;
		text-align: center;
		border: #007AFF 2rpx solid;
		margin-right: 10rpx;
	}
	.wrong-question-title-text{
		width: 500rpx;
		height: 40rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		white-space: nowrap; 
	}
	
	
</style>
