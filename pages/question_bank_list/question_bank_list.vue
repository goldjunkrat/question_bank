<template>
	<view class="container">
		<view class="top-part">
			<view class="search-wrap">
				<u-search :clearabled="true" v-model="searchContent" @custom="search(searchContent)"></u-search>
			</view>
		</view>
		
		<view class="wrong-question-list-wrap">
			<!-- <WrongQuestionList v-for="(item,index) in itemList" :key="index" v-show="choosenNumber===index" :typeList="itemList" /> -->
			<QuestionBankList></QuestionBankList>
		</view>
		<view class="load-finish">
			<LoadFinish v-show="questionListLength===0">
				-----还没有收藏-----
			</LoadFinish>
			<LoadFinish v-show="questionListLength!==0">
				-----已经到底了-----
			</LoadFinish>
		</view>
		
	</view>
</template>

<script>
	import WrongQuestionList from '../../components/wrong_question_list/WrongQuestionList.vue'
	import QuestionBankList from "../../components/question_bank_list/QuestionBankList.vue"
	import LoadFinish from '../../components/wrong_question_list/LoadFinish.vue'
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				
				searchContent:'',
			}
		},
		onLoad(value) {
			// console.log(value)
			uni.setNavigationBarTitle({
				title:value.title
			})
			uni.showLoading({
				title:"正在加载"
			})
			this.$store.commit('initPage')
			this.$store.commit('initQuestionList')
			
			this.$store.commit('initWrongQuestionIdList')
			this.$store.dispatch('getQuestionBankList')
		},
		
		onReady(){
			uni.hideLoading()
		},
		methods: {
			search(searchContent){
				this.$store.commit('initPage')
				this.$store.commit('initQuestionList')
				
				this.$store.commit('initWrongQuestionIdList')
				this.$store.dispatch('getSearchQuestionBankContent',searchContent)
				this.searchContent = ''
			}
		},
		computed:{
			...mapState(['choosenNumber','questionList','questionListLength','hasNextPage','questionOrder'])
		},
		// 触底事件发生时
		onReachBottom() {
				this.$store.commit('changePage')
				if(this.hasNextPage){
					this.$store.dispatch("getQuestionBankList")
				}
		},
		components:{
			WrongQuestionList,
			QuestionBankList,
			LoadFinish
		}
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.top-part{
		width: 750rpx;
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: white;
	}
	.search-wrap{
		margin-top: 20rpx;
		
	}
	.wrong-question-list-wrap{
		margin-top: 100rpx;
	}
	.load-finish{
		margin-top: 10rpx;
	}
</style>
