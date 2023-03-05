<template>
	<view class="container">
		<BigCell/>
		<view class="exam-wrap">
			<CommonCell :userCenterItem="userCenterItem[0]"/>
		</view>
		
		<view class="wrong-wrap" @tap="toWrongQuestionList">
			<commonCell :userCenterItem="userCenterItem[1]"/>
		</view>
		<view class="favourite-wrap" @tap="toFavoriteList">
			<commonCell :userCenterItem="userCenterItem[2]"/>
		</view>
		<view class="favourite-wrap" @tap="toQuestionRecord">
			<commonCell :userCenterItem="userCenterItem[4]"/>
		</view>
			
		
		
		<view class="book-wrap">
			<commonCell :userCenterItem="userCenterItem[3]"/>
		</view>
		

	</view>
</template>

<script>
	import BigCell from '../../components/user/BigCell.vue'
	import CommonCell from '../../components/user/CommonCell.vue'
	import {mapState} from "vuex"
	import { mixin } from "../../mixin/mixin.js"
	export default {
		data() {
			return {
				userCenterItem:[
					{iconName:"iconfont icon-kaoshi icon",title:"我的考试"},
					{iconName:"iconfont icon-cuotiben icon",title:"错题本"},
					{iconName:"iconfont icon-shoucang icon",title:"收藏夹"},
					{iconName:"iconfont icon-shujia icon",title:"书架"},
					{iconName:"iconfont icon-lishijilu_huaban icon",title:"历史记录"}
				]
				
			}
		},
		computed:{
			...mapState(['isLogin'])
		},
		methods: {
			toWrongQuestionList(){
				if(this.isLogin){
					uni.navigateTo({
						url:"/pages/wrong_question_list/wrong_question_list"
					})
				}else{
					uni.showModal({
						title:"您还未登录,请登录!",
						confirmText:"去登录",
						success: obj => {
							
							if(obj.confirm){
								this.userLogin()
							}
						}
					})
				}
				
			},
			toFavoriteList(){
				if(this.isLogin){
					uni.navigateTo({
						url:"/pages/favorite_list/favorite_list"
					})
				}else{
					uni.showModal({
						title:"您还未登录,请登录!",
						confirmText:"去登录",
						success: obj => {
							
							if(obj.confirm){
								this.userLogin()
							}
						}
					})
				}
				
			},
				
			toQuestionRecord(){
				if(this.isLogin){
					
					uni.navigateTo({
						url:"/pages/question_record/question_record"
					})
				}else{
					uni.showModal({
						title:"您还未登录,请登录!",
						confirmText:"去登录",
						success: obj => {
							
							if(obj.confirm){
								this.userLogin()
							}
						}
					})
				}
			}
		},
		onLoad() {
			uni.showLoading({
				title:"正在加载"
			})
			this.$store.commit('initPage')
			this.$store.commit('initQuestionList')
			this.$store.commit('initWrongQuestionIdList')
			this.$store.dispatch('getHistoryFinishPercentageList')
			
			
		},
		onReady(){
			uni.hideLoading()
		},
		components: {
			BigCell,
			CommonCell
		},
		mixins:[mixin]
	}
</script>

<style>
	page {
		background-color: rgb(234, 234, 234);
	}
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.exam-wrap{
		margin-top: 50rpx;
	}
	.wrong-wrap{
		margin-top: 50rpx;
	}
	.favourite-wrap{
		margin-top: 4rpx;	
	}
	.book-wrap{
		margin-top: 50rpx;
	}
</style>
