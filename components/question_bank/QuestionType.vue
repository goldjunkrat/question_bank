<template>
	<view class="type-wrap">
		<view class="type">
			<view class="type-item" v-for="(item,index) in typeItem" :key="item.id" @tap="toQuestionList(index)">
				<view>
					<view :class="item.className"></view>
					{{item.title}}
					
				</view>
				
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import { mixin } from "../../mixin/mixin.js"
	export default {
		name:"QuestionType",
		data() {
			return {
				typeItem:[
					{
						id:"001",
						title:"中药学",
						className:"iconfont icon-caoyaofei"
					},{
						id:"002",
						title:"药剂学",
						className:"iconfont icon-yaoji"
					},{
						id:"003",
						title:"针灸学",
						className:"iconfont icon-zhenjiu"
					},{
						id:"004",
						title:"药鉴定",
						className:"iconfont icon-fangdajing"
					},{
						id:"005",
						title:"病理学",
						className:"iconfont icon-binglike"
					},{
						id:"006",
						title:"其他",
						className:"iconfont icon-qita"
					},
				],
				
			};
		},
		computed:{
			...mapState(['isLogin'])
		},
		methods:{
			toQuestionList(index){
				if(this.isLogin){
					this.$store.commit('changeChoosenNumber',index)
					uni.navigateTo({
						url:`/pages/question_bank_list/question_bank_list?title=${this.typeItem[index].title}`
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
		mixins:[mixin]
	}
</script>

<style>
	.type-wrap{
		margin-top: 100rpx;
		height: 500rpx;
		width: 750rpx;
		/* background-color: #007AFF; */
	}
	.type{
		height: 500rpx;
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.type-item{
		width: 250rpx;
		height: 250rpx;
		flex-shrink: 0;
		
		text-align: center;
		
	}
	.type-item>view{
		
		margin-top: 107rpx;
		/* line-height: 250rpx; */
	}
	.type-item>view>view{
		font-size: 70rpx;
	}
	
</style>
