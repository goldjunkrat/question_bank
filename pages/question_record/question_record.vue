<template>
	<view class="content">
		
			<!-- 图表 -->
			<view class="echart">
				<uni-ec-canvas force-use-old-canvas="true" class="uni-ec-canvas canvas" id="uni-ec-canvas" ref="uni-ec-canvas" canvas-id="uni-ec-canvas"
					:ec="ec" @inited="inited"></uni-ec-canvas>
			</view>
		<view class="top-part">
			<view class="hr-line">
				
			</view>
		</view>
		
		
			<view class="record-question-list-wrap">
				<RecordQuestionList></RecordQuestionList>
			</view>
			<view class="load-finish">
				
				<LoadFinish v-show="questionListLength===0">
					-----还没有记录-----
				</LoadFinish>
				<LoadFinish v-show="questionListLength!==0">
					-----已经到底了-----
				</LoadFinish>
			</view>
		
		
	</view>
</template>

<script>
	// 引入echart
	import uniEcCanvas from './uni-ec-canvas/uni-ec-canvas.vue'
	import LoadFinish from '../../components/wrong_question_list/LoadFinish.vue'
	import RecordQuestionList from "../../components/question_record/RecordQuestionList.vue"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				//echart 配置项
				ec: {
					option: {
						title: {
							text: '各类题目完成百分比'
						},
						tooltip: {},
						legend: {
							data: ['数量']
						},
						xAxis: {
							data: ['中药学', '药剂学', '针灸学', '药鉴定', '病理学']
						},
						yAxis: {},
						series: [{
							name: '数量',
							type: 'bar',
							data: this.$store.state.finishPercentageList
						}],
						color: [
							"rgb(42, 75, 113)"
						]
					}
				},
			}
		},
		methods: {
			inited(chart) {
				// console.log('图表初始化完毕')
				// console.log('chart实例', chart)
			},
		},
		computed:{
			...mapState(['choosenNumber','questionList','questionListLength','hasNextPage','finishPercentageList'])
		},
		onInit() {
			
		},
		onLoad() {
			this.$store.commit('initPage')
			this.$store.commit('initQuestionList')
			this.$store.commit('initChoosenNumber')
			this.$store.commit('initWrongQuestionIdList')
			this.$store.dispatch('getHistoryQuestionList')
			// this.$store.dispatch('getHistoryFinishPercentageList')
			
			console.log(this.$store.state.finishPercentageList)
			
			
		},
		computed:{
			percentageList(){
				
				return this.finishPercentageList
			}
		},
		onShow() {
			
		},
		components: {
			uniEcCanvas,
			RecordQuestionList,
			LoadFinish
		},
		// 触底事件发生时
		onReachBottom() {
			
			this.$store.commit('changePage')
			
			if(this.$store.state.hasNextPage){
				this.$store.dispatch("getHistoryQuestionList")
			}
		},
	}
</script>

<style>
	page{
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* width: 700rpx; */
		/* position: relative; */
	}
	.uni-ec-canvas {
		width: 750rpx;
		height: 500rpx;
		display: block;
		
	}
	.echart {
		margin-top: 20rpx;
		width: 750rpx;
		height: 500rpx;
	}
	.hr-line{
		width: 750rpx;
		border-top: 2rpx solid #a3a3a3;
	}
	.top-part{
		height: 500rpx;
		width: 750rpx;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: white;
	}
	/* .echart{
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: white;
	} */
	/* .canvas{
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: white;
	} */
	.record-question-list-wrap{
		/* margin-top: 520rpx; */
		/* z-index: 100; */
	}
	.load-finish{
		margin-top: 10rpx;
	}
</style>
