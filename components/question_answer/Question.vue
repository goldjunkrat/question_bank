<template>
	<view class="question-wrap">
		<view class="question">
			<view class="title">
				<view class="question-number">
					{{questionOrder}}.
				</view>
				<text class="question-text">{{questionInfo.questionName}}</text>
				
			</view>
			<view class="question-type">
				<view class="single-choice">
					<u-tag text="单选题" plain size="mini" :color="isSingle?'':'grey'" :borderColor="isSingle?'':'grey'" :plainFill="isSingle?'true':'false'"> </u-tag>
				</view>
				
				<view class="multiple-choice">
					<u-tag text="多选题" plain size="mini" :color="isSingle?'grey':''" :borderColor="isSingle?'grey':''" :plainFill="isSingle?'false':'true'"> </u-tag>
				</view>
				
			</view>
			
			<!-- 单选 -->
			<view v-if="isSingle" class="check-items">
				<button 
				@tap="singleChoose(index,item)" 
				class="check-item"
				
				:class="item.isBeenChoosen?'button-active':''"
				
				v-for="(item,index) in itemList"
				:key="index"
				:disabled="!canBeChoosen"
				>
					<view class="option-content-wrap" :class="item.isBeenChoosen?'text-active':''">
						<text>
							{{item.optionName}}
						</text>
						<text>
							{{item.title}}
						</text>
					</view>
					
					
				</button>
				
				<view class="diff-answer-wrap" v-show="isSubmit">
					<view class="your-answer-wrap">
						你的答案:
						<text :class="(isRight===0)?'your-answer-right':'your-answer-wrong'">
							{{choosenAnswerList[0].optionName}}
						</text>
					</view>
					<view class="correct-answer-wrap">
						正确答案:
						<text class="correct-answer">
							{{questionInfo.answer}}
						</text>
					</view>
				</view>
			</view>
			
			<!-- 多选 -->
			<view v-if="!isSingle" class="check-items">
				<button 
				@tap="mutiChoose(index,item)" 
				class="check-item"
				:class="item.isBeenChoosen?'button-active':''"
				
				v-for="(item,index) in itemList"
				:key="index"
				:disabled="!canBeChoosen"
				>
					<view class="option-content-wrap" :class="item.isBeenChoosen?'text-active':''">
						<text>
							{{item.optionName}}
						</text>
						<text>
							{{item.title}}
						</text>
					</view>
					
					
				</button>
				
				<view class="diff-answer-wrap" v-show="isSubmit">
					<view class="your-answer-wrap">
						你的答案:
						<text v-for="(item,index) of mutiChoosenAnswerList" :key="index" :class="(isRight===0)?'your-answer-right':'your-answer-wrong'">
							{{item}}
						</text>
					</view>
					<view class="correct-answer-wrap">
						正确答案:
						<text class="correct-answer">
							{{questionInfo.answer}}
						</text>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name:"Question",
		data() {
			return {
				
				
			};
		},
		
		mounted(){
			
				this.$emit('getMutiOrSingle',this.isSingle)
				// console.log(this.mutiChoosenAnswerList)
				
			
		},
		computed:{
			...mapState(['questionInfo','isRight','mutiChoosenAnswerList','questionOrder','preChooseItem','itemList'])
		},
		methods:{
			singleChoose(index,item){
				// 判断这个题有没有被第一次选择,如果不是第一次选择,则改变上一个选项的被选状态
				if(this.preChooseItem!== -1){
					this.$store.commit("changeIsBeenChoosen",this.preChooseItem)
				}
				
				this.$store.commit('changeIsBeenChoosen',index)
				
				this.$store.commit('clearChoosenAnswerList')
				this.$store.commit('setChoosenAnswerList',item)
				
				if(this.choosenAnswerList.length===0){
					
				}else{
					this.$store.commit("changeNoChoosenOptionToFalse")
				}
				this.$store.commit('changePreChooseItem',index)
			},
			
			mutiChoose(index,item){
				
				this.$store.commit('changeIsBeenChoosen',index)
				
				if(item.isBeenChoosen){
					this.$store.commit("addMutiChoosenAnswerSet",item.optionName)
				}else{
					this.$store.commit("deleteMutiChoosenAnswerSet",item.optionName)
				}
				this.$store.commit('changeMutiChoosenAnswerList')
				
				if(this.mutiChoosenAnswerList.length<=1){
					this.$store.commit("changeNoChoosenOptionToTrue")
				}else{
					this.$store.commit("changeNoChoosenOptionToFalse")
				}
				
				
			}
			
			
		},
		
		props:['isSubmit','canBeChoosen','isSingle','mutiChoosenAnswerSet','choosenAnswerList']
	}
</script>

<style>
	.question-wrap{
		width: 650rpx;
		/* margin-left: 50rpx; */
		/* height: 800rpx; */
		margin-top: 50rpx;
		/* background-color: #007AFF; */
	}
	.title{
		display: flex;
		flex-wrap: wrap;
	}
	.question-number{
		width: 80rpx;
		text-align: center;
		/* background-color: #007AFF; */
		line-height: 46rpx;
		border-radius: 10rpx;
		border: 2rpx solid #2f5076;
		margin-right:10rpx ;
	}
	.question-text{
		display: block;
		
		line-height: 46rpx;
		
	}
	.question-type{
		margin-top: 20rpx;
		width: 230rpx;
		display: flex;
	}
	.multiple-choice{
		margin-left: 20rpx;
		
	}
	.check-items{
		margin-top: 30rpx;
		/* height: 650rpx; */
		/* background-color: #000000; */
	}
	.check-item{
		height: 100rpx;
		margin-bottom: 50rpx;
		/* background-color: #000000; */
		line-height: 100rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		text-align: left;
		position: relative;
		
	}
	.option-content-wrap{
		height: 100rpx;
		width: 650rpx;
		position: absolute;
		left: 0;
		
	}
	.check-item text{
		margin-left: 30rpx;		
	}
	.diff-answer-wrap{
		display: flex;
		margin-top: 30rpx;
		justify-content: space-between;
		height: 60rpx;
	}
	.button-active{
		border-color: #ff5500;
		
	}
	.text-active{
		background-color: #ffd4b7;
	}
	.correct-answer{
		color:#00aa00;
	}
	.your-answer-right{
		color:#00aa00;
	}
	.your-answer-wrong{
		color:#ff0000;
	}
</style>
