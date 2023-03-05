<template>

	<view>
		<u-list>
			<u-list-item v-for="(item,index) in questionList" :key="index" @tap="toQuestion(index)">
				<view class="question-list-wrapper">
					<view class="question-list-wrap">
						<view class="question-item">
							
							<view class="question-title">
								<view class="wrong-question-index">
									{{index+1}}.
								</view>
								<text class="wrong-question-title-text">{{item.questionName}}</text>
							</view>
							<view class="question-type">
								难度:{{item.difficultyDegree}}
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
		name: "QuestionBankList",
		data() {
			return {

			};
		},
		methods:{
			toQuestion(index){
				this.$store.commit("initState")
				this.$store.commit("initQuestionOrder")
				this.$store.commit('initCurrentQuestionOrder')
				this.$store.commit("initCorrectWrongNumber")
				this.$store.commit("changeRestQuestionNumber")
				
				uni.navigateTo({
					url:`/pages/favorite_question_answer/favorite_question_answer?questionId=${this.questionList[index].questionId}&index=${index}`
				})
			}
		},
		computed:{
			...mapState(['questionList'])
		}
	}
</script>

<style>
	.question-list-wrapper {
		width: 660rpx;

	}

	.question-list-wrap {
		height: 150rpx;

		border: 2rpx solid #b6b6b6;
		width: 650rpx;
		border-radius: 10rpx;
		margin-top: 10rpx;
		box-shadow: 5rpx 2rpx 4rpx #007AFF;
	}

	.question-item {
		height: 150rpx;
		display: flex;
		flex-direction: column;

		justify-content: space-around;
		margin-left: 20rpx;
	}
	.question-title{
		
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
