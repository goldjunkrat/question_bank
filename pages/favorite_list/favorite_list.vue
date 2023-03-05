<template>
	<view class="container">
		<view class="top-part">
			<view class="search-wrap">
				<u-search :clearabled="true" v-model="searchContent" @custom="search(searchContent)"></u-search>
			</view>
			<view class="type-list-wrap">
				<FavoriteQusetionTypeList :typeList="typeList"/>
			</view>
			<view class="hr-line">
				<u-gap height="1" bgColor="#bbb" ></u-gap>
			</view>
			
		</view>
		<view class="wrong-question-list-wrap">
			<FavoriteList v-for="(item,index) in typeList" :key="index" v-show="choosenNumber===index"  />
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
	import FavoriteQusetionTypeList from "../../components/favorite_list/FavoriteQuestionTypeList.vue"
	import FavoriteList from "../../components/favorite_list/FavoriteList.vue"
	import LoadFinish from '../../components/wrong_question_list/LoadFinish.vue'
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				
				searchContent:'',
				typeList:[
					{
						className:"iconfont icon-caoyaofei",	
						title:"中药学"
					},
					{
						className:"iconfont icon-yaoji",
						title:"药剂学"
					},
					{
						className:"iconfont icon-zhenjiu",
						title:"针灸学"
					},
					{
						className:"iconfont icon-fangdajing",
						title:"药鉴定"
					},
					{
						className:"iconfont icon-binglike",
						title:"病理学"
					},
					{
						className:"iconfont icon-qita",
						title:"其他"
					}
				]
			}
		},
		methods: {
			search(searchContent){
				this.$store.commit('initPage')
				this.$store.commit('initQuestionList')
				this.$store.commit('initChoosenNumber')
				this.$store.commit('initWrongQuestionIdList')
				this.$store.dispatch('getSearchFavoriteContent',searchContent)
				this.searchContent = ''
			}
		},
		onLoad() {
			uni.showLoading({
				title:"正在加载"
			})
			
			
		},
		onShow() {
			this.$store.commit('initPage')
			this.$store.commit('initQuestionList')
			this.$store.commit('initChoosenNumber')
			this.$store.commit('initWrongQuestionIdList')
			this.$store.dispatch('getFavoriteQuestionList')
			
		},
		onReady(){
			uni.hideLoading()
		},
		
		computed:{
			...mapState(['choosenNumber','questionList','questionListLength','hasNextPage','questionOrder'])
		},
		// 触底事件发生时
		onReachBottom() {
				this.$store.commit('changePage')
				if(this.hasNextPage){
					this.$store.dispatch("getQuestionList")
				}
		},
		components:{
			FavoriteQusetionTypeList,
			FavoriteList,
			LoadFinish
		}
	}
</script>

<style  scoped>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.search-wrap{
		margin-top: 20rpx;
	}
	.top-part{
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: white;
	}
	.hr-line{
		/* margin-top: 20rpx; */
		width: 750rpx;
	}
	.type-list-wrap{
		margin-top: 50rpx;
		height: 160rpx;
		
	}
	.wrong-question-list-wrap{
		margin-top: 320rpx;
	}
	.load-finish{
		margin-top: 10rpx;
	}
</style>
