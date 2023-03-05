<template>
	<view class="content">
		<QuestionDataView />
		<StartAnswer />
		<view>
			<button type="default">111</button>
		</view>

	</view>
</template>

<script>
	
	import QuestionDataView from "../../components/index/QuestionDataView.vue"
	import StartAnswer from "../../components/index/startAnswer.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			if (this.isLogin) {


				this.$store.dispatch('getTotalFinishCorrectQuestionNumber')

			}

			uni.showLoading({
				title: "正在加载"
			})

		},
		onReady() {
			uni.hideLoading()
		},
		onShow() {
			if (this.isLogin) {
				this.$store.dispatch('getTotalFinishCorrectQuestionNumber')
			}



		},
		computed: {
			...mapState(['isLogin'])
		},
		methods: {
			
		},
		components: {
			QuestionDataView,
			StartAnswer,
			

		}
	}
</script>

<style>
	page {
		background-color: #eaeaea;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* width: 700rpx; */
	}

	
	
</style>
