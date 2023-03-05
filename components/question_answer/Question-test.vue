<template>
	<view class="question-wrap">
		<view class="question">
			<view class="title">
				<view class="question-number">
					123.
				</view>
				<text class="question-text">既能清热泻火,又能除烦止渴的药物是:</text>
				
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
			<view v-if="isSingle" class="check-items" v-for="(item,index) in itemList">
				<u-button 
				size="large"
				@tap="changeColor(index,item)" 
				:disabled="canBeChoosen"
				
				
				
				:color="((right||!canBeChoosen)&&choosenNumber===index)?'#ff5500':''"
				:key="index"
				
				>
					<view class="option-content-wrap">
						<text>
							{{item.optionName}}
						</text>
						<text>
							{{item.title}}
						</text>
					</view>
					
					
				</u-button>
				
				
			</view>
			<view class="diff-answer-wrap" v-show="isSubmit">
				<view class="your-answer-wrap">
					你的答案:
					<text class="your-answer">
						{{choosenAnswerList[0].optionName}}
					</text>
				</view>
				<view class="correct-answer-wrap">
					正确答案:
					<text class="correct-answer">
						AD
					</text>
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
				:disabled="canBeChoosen"
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
						<text v-for="(item,index) of mutiChoosenAnswerList" :key="index" class="your-answer">
							{{item}}
						</text>
					</view>
					<view class="correct-answer-wrap">
						正确答案:
						<text class="correct-answer">
							AD
						</text>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	export default {
		name:"Question",
		data() {
			return {
				right:true,
				mutiChoosenAnswerList:[]
			};
		},
		
		mounted(){
			
				this.$emit('getMutiOrSingle',this.isSingle)
				// console.log(this.mutiChoosenAnswerList)
				
			
		},
		methods:{
			changeColor(index,item){
				
				this.$store.commit('setChoosenNumber',index)
				this.$store.commit('clearChoosenAnswerList')
				this.$store.commit('setChoosenAnswerList',item)
				this.$bus.$emit('getChoosenAnswerList',this.$store.state.choosenAnswerList)
				console.log(this.canBeChoosen)
			},
			
			mutiChoose(index,item){
				item.isBeenChoosen = !item.isBeenChoosen
				this.$bus.$emit('getIsBeenChoosen',index)
				
				if(item.isBeenChoosen){
					this.$store.commit("addMutiChoosenAnswerSet",item.optionName)
				}else{
					this.$store.commit("deleteMutiChoosenAnswerSet",item.optionName)
				}
				this.mutiChoosenAnswerList = [...this.$store.state.mutiChoosenAnswerSet]
				
				this.$bus.$emit('getMutiChoosenAnswerList',this.mutiChoosenAnswerList)
			}
			
			
		},
		
		props:['itemList','isSubmit','canBeChoosen','isSingle','choosenNumber','mutiChoosenAnswerSet','choosenAnswerList']
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
		/* height: 100rpx; */
		margin-bottom: 50rpx;
		/* background-color: #000000; */
		line-height: 100rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		text-align: left;
		position: relative;
	}
	.check-item{
		
		
	}
	.option-content-wrap{
		height: 100rpx;
		width: 650rpx;
		position: absolute;
		left: -250rpx;
		
		/* bottom: 0; */
		
	}
	.option-content-wrap text{
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
	
</style>
