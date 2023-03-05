<template>
	<view class="container">
		<Question :isSubmit="isSubmit" :canBeChoosen="canBeChoosen" :isSingle="isSingle"
			 :choosenAnswerList="choosenAnswerList"
			:choosenAnswerSet="choosenAnswerSet" />
		<SubmitAnswer v-show="!isSubmit&&isSingle" @tap="submitAnswerSingle" :hasChoosenOption="hasChoosenOption"
			:noChoosenOption="noChoosenOption" />
		<SubmitAnswer v-show="!isSubmit&&(!isSingle)" @tap="submitAnswerMuti" :noChoosenOption="noChoosenOption" />
		<LastOrNext v-show="isSubmit" />
		<BottomNav />
		<Analysis v-show="isSubmit" />

	</view>
</template>

<script>
	import Question from "../../components/question_answer/Question.vue"
	import BottomNav from "../../components/wrong_question_answer/BottomNavigation.vue"
	import SubmitAnswer from "../../components/question_answer/SubmitAnswer.vue"
	import LastOrNext from "../../components/wrong_question_answer/LastOrNext.vue"
	import Analysis from "../../components/question_answer/Analysis.vue"
	
	import { mapState } from "vuex"
	export default {
		data() {
			return {

			}
		},
		methods: {
					submitAnswerSingle() {
						
						this.$store.commit("addCurrentQuestionOrder")
						this.$store.commit("changeIsSubmit")
						this.$store.commit("changeCanBeChoosen")
						// 当提交时,表示此题已做完,那就将已做过的题号+1
						this.$store.commit("addFinishQuestionNumber")
						// 判断答案是否正确
						if (this.choosenAnswerList[0].optionName === this.questionInfo.answer) {
							this.$store.commit('changeIsRight', 0)
							this.$store.commit('addCorrectNumber')
						} else {
							this.$store.commit('changeIsRight', 1)
							this.$store.commit('addWrongNumber')
						}
						
						uni.request({
							url: `${this.$store.state.baseUrl}record/submitredoerrorquestion`,
							method: 'POST',
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								errorRecord:(!this.isRight)?'':this.choosenAnswerList[0].optionName,
								questionId: this.questionInfo.questionId,
								userId: this.userId,
								isRight: this.isRight,
								dictionaryId: this.questionInfo.dictionaryId,
								questionName:this.questionInfo.questionName,
								questionType:this.questionInfo.questionType,
								choicea:this.questionInfo.choicea,
								choiceb:this.questionInfo.choiceb,
								choicec:this.questionInfo.choicec,
								choiced:this.questionInfo.choiced,
								choicee:this.questionInfo.choicee,
								answer:this.questionInfo.answer,
								analysis:this.questionInfo.analysis,
								konwledgePoint:this.questionInfo.konwledgePoint,
								difficultyDegree:this.questionInfo.difficultyDegree,
								source:this.questionInfo.source,
								questionOrder:this.questionOrder,
								isFavorite:this.isFavorite
							}
						})
		
		
					},
					submitAnswerMuti() {
						
						this.$store.commit("addCurrentQuestionOrder")
						this.$store.commit("changeIsSubmit")
						this.$store.commit("changeCanBeChoosen")
						// 当提交时,表示此题已做完,那就将已做过的题号+1
						this.$store.commit("addFinishQuestionNumber")
						// 将答案数组处理为有序的字符串
						let answer = ''
						for (let item of this.mutiChoosenAnswerList) {
							
							if (item === 'A') {
								answer += 'A'
							}
						}
						for (let item of this.mutiChoosenAnswerList) {
							if (item === 'B') {
								answer += 'B'
							}
						}
						for (let item of this.mutiChoosenAnswerList) {
							if (item === 'C') {
								answer += 'C'
							}
						}
						for (let item of this.mutiChoosenAnswerList) {
							if (item === 'D') {
								answer += 'D'
							}
						}
						for (let item of this.mutiChoosenAnswerList) {
							if (item === 'E') {
								answer += 'E'
							}
						}
						
						// 判断答案是否正确
						if(answer===this.questionInfo.answer){
							this.$store.commit('changeIsRight', 0)
							this.$store.commit('addCorrectNumber')
						}else{
							this.$store.commit('changeIsRight', 1)
							this.$store.commit('addWrongNumber')
						}
						uni.request({
							url: `${this.$store.state.baseUrl}record/submitredoerrorquestion`,
							method: 'POST',
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								errorRecord:(!this.isRight)?'':answer,
								questionId: this.questionInfo.questionId,
								userId: this.userId,
								isRight: this.isRight,
								dictionaryId: this.questionInfo.dictionaryId,
								questionName:this.questionInfo.questionName,
								questionType:this.questionInfo.questionType,
								choicea:this.questionInfo.choicea,
								choiceb:this.questionInfo.choiceb,
								choicec:this.questionInfo.choicec,
								choiced:this.questionInfo.choiced,
								choicee:this.questionInfo.choicee,
								answer:this.questionInfo.answer,
								analysis:this.questionInfo.analysis,
								konwledgePoint:this.questionInfo.konwledgePoint,
								difficultyDegree:this.questionInfo.difficultyDegree,
								source:this.questionInfo.source,
								questionOrder:this.questionOrder,
								isFavorite:this.isFavorite
							},
							
						})
						
					}
				},
				computed: {
					...mapState(['itemList', 'isSingle', 'isSubmit', 'canBeChoosen', 'noChoosenOption', 'choosenNumber',
						'choosenAnswerList', 'mutiChoosenAnswerSet', 'questionInfo', 'isRight', 'userId',
						'mutiChoosenAnswerList',"totalQuestionNumber","finishQuestionNumber","questionOrder","isFavorite",
						"isWrongQuestionCorrect",'wrongQuestionIndex','restWrongQuestionNumber'
					])
				},
				onLoad(value) {
					uni.showLoading({
						title: "正在加载"
					})
					// console.log(value)
					// console.log(this.wrongQuestionIndex)
					this.$store.commit('changeWrongQuestionIndex',parseInt(value.index))
					this.$store.commit('changeRestWrongQuestionNumber')
					// console.log(this.wrongQuestionIndex)
					// 第一次进入时,请求题目信息
					this.$store.dispatch('getWrongQuestionInfo',value.questionId)
					
					// 第一次进入时,必定为当次的第一题
					this.$store.commit('changeIsFirstOne',true)
					// 判断进入时,是否为最后一题
					if(this.questionOrder===this.restWrongQuestionNumber){
						this.$store.commit('changeIsLastOne',true)
					}else{
						this.$store.commit('changeIsLastOne',false)
						// this.$store.commit('changeIsFirstOne',true)
					}
		
				},
				onReady() {
					uni.hideLoading()
				},
				mounted() {
		
					
					
					this.$bus.$on('getMutiOrSingle', value => {
						this.isSingle = value
					})
					
				},
				components: {
					Question,
					BottomNav,
					SubmitAnswer,
					LastOrNext,
					Analysis
				}
			}
		</script>
		
		<style>
			.container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
		
			}
		</style>