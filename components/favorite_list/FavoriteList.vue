<template>
	<view>
		<u-list height="100%">
			<u-list-item v-for="(item,index) in questionList" :key="index" @tap="toFavoriteQuestion(index)">
				<view class="wrong-question-wrapper">
					<view class="wrong-question-wrap">
						<view class="wrong-question">
							<view class="wrong-question-title">
								<view class="wrong-question-index">
									{{index+1}}.
								</view>
								<text class="wrong-question-title-text">{{item.questionName}}</text>
							</view>
							<view class="wrong-question-account">
								难度:{{item.difficultyDegree}}
							</view>
							<view class="do-this-question-date">
								收藏日期:{{getDate(item.updateTime)}}
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
		name:"FavoriteList",
		data() {
			return {
				
			};
		},
		methods:{
			toFavoriteQuestion(index){
				this.$store.commit("initState")
				this.$store.commit("initQuestionOrder")
				this.$store.commit('initCurrentQuestionOrder')
				this.$store.commit("initCorrectWrongNumber")
				this.$store.commit("changeRestQuestionNumber")
				
				uni.navigateTo({
					url:`/pages/favorite_question_answer/favorite_question_answer?questionId=${this.questionList[index].questionId}&index=${index}`
				})
			},
			getDate(time){
				let d = new Date(time)
				let date = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
				return date
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
		/* background-image: linear-gradient(to right,#fcffb8,#ffff08); */
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
