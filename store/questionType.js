import store from "./store.js"
export default {
	namespaced:true,
	state:{
		// 题目种类id
		questionTypeId:0,
		// 某种题目总数
		totalQuestionNumber:0,
		// 某种题目所完成数量
		finishQuestionNumber:0
	},
	actions:{
		// 发请求从后台获取题目总数
		getTotalQuestionNumber(context){
			uni.request({
				url:"http://localhost:8080/tcm_practicing_war/question/questions",
				method:"POST",
				data:{
					userId:store.state.userId,
					dicId:state.questionTypeId
				},
				success:(data)=>{
					context.commit('changeTotalQuestionNumber',data.extend.questionCount)
				}
			})
		},
		// 发请求从后台获取题目已完成数量
		getFinishQuestionNumber(context){
			
		}
	},
	mutations:{
		// 更改题目种类
		changeQuestionTypeId(state,value){
			state.questionTypeId = value	
		},
		// 更新某种题目总数
		changeTotalQuestionNumber(state,value){
			state.totalQuestionNumber = value
		},
		// 更新某种题目所完成数量
		changeFinishQuestionNumber(state,value){
			state.finishQuestionNumber = value
		}
	}
}