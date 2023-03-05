import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
// import QuestionType from "./questionType"
export default new Vuex.Store({
	// modules:{
	// 	QuestionType
	// },
	state:{
		// 路由网址
		baseUrl:'https://www.cqupttoolkit.top:8080/tcm_practicing/',
		// 用户信息
		userInfo:{},
		// 用户id
		userId:-1,
		// 题目种类id
		questionTypeId:1,
		// 某种题目总数
		totalQuestionNumber:0,
		// 某种题目所完成数量
		finishQuestionNumber:0,
		// 在开启本次答题时,还剩多少题没做
		restQuestionNumber:0,
		// 某种题目正确的数量
		correctQuestionNumber:0,
		// 单次刷题题目的序号
		questionOrder:1,
		// 单词刷题刷到最新一题的序号
		currentQuestionOrder:0,
		// 单次刷题正确的个数
		correctNumber:0,
		// 单次刷题错误的个数
		wrongNumber:0,
		// 题目信息
		questionInfo:{},
		// 选项列表
		itemList: [],
		// 上一个选的选项(适用于单选切换选项的场景)
		preChooseItem:-1,
		// 判断用户是否登录
		isLogin:false,
		// 判断是否是单选题,此数据应从后端接收
		isSingle:true,
		// 判断答题时是否点击了提交
		isSubmit: false,
		// 判断答题时选项是否可以被选,应用场景:点击提交后,所有选项都不能再被选择
		canBeChoosen: true,
		// 是否没选选项
		noChoosenOption:true,
		// 判断错题是否答对
		isWrongQuestionCorrect:false,
		// 错题本,列表,题库的选项号
		choosenNumber:0,
		// 单选的选项列表
		choosenAnswerList:[],
		// 题目是否正确
		isRight:1,
		// 多选的选项集合
		mutiChoosenAnswerSet:new Set(),
		// 多选的选项列表
		mutiChoosenAnswerList:[],
		// 是否是第一个题
		isFirstOne:true,
		// 是否是最后一个题
		isLastOne:false,
		// 是否收藏
		isFavorite:false,
		
		// 题目列表(题库,错题本,收藏夹统一使用的列表)
		questionList:[],
		// 题目列表当页的数量
		questionListLength:0,
		// 错题列表所有题的数量(用于底部栏进行展示)
		wrongQuestionListLength:0,
		
		// 列表的分页页数
		page:1,
		// 是否有下一页
		hasNextPage:false,
		// 错题的questionId列表
		wrongQuestionIdList:[],
		// 点击的错题的index
		wrongQuestionIndex:0,
		// 从点进去的那道题到错题结束的题目数量
		restWrongQuestionNumber:0,
		// 各科题目完成的百分比
		finishPercentageList:[],
		// 搜索的关键词
		searchContent:''
	},
	getters:{
		// 完成题目数量百分比
		percentage(state){
			return Math.trunc((state.finishQuestionNumber/state.totalQuestionNumber)*100)
		},
		
	},
	actions:{
		
			
		
		
		// 发请求从后台获取该类题目总数,该类题目已完成数,该类题目正确数
		getTotalFinishCorrectQuestionNumber(context){
			uni.request({
				url:`${this.state.baseUrl}question/questions`,
				method:"POST",
				header: {
					'content-type': "application/x-www-form-urlencoded"
				},
				data:{
					userId:this.state.userId,
					dicId:this.state.questionTypeId
				},
				success:(data)=>{
					
					context.commit('changeTotalQuestionNumber',data.data.extend.questionCount)
					context.commit('changeFinishQuestionNumber',data.data.extend.didQuestionCount)
					context.commit('changeCorrectQuestionNumber',data.data.extend.accuracy.accuracyRightCount)
					
				}
			})
		},
		// 发请求从后台获取下一题题目信息
		getQuestionInfo(context){
			uni.request({
				url:`${this.state.baseUrl}question/doPractice`,
				method:'POST',
				header: {
					'content-type': "application/x-www-form-urlencoded"
				},
				data:{
					userId:this.state.userId,
					dicId:this.state.questionTypeId
				},
				success:(data)=>{
					
					let question = data.data.extend.question
					console.log(question)
					context.commit('changeQuestionInfo',question)
					
					context.commit('SetIsSingle',(question.questionType===0)?true:false)
					
					context.commit('changeIsFavorite',data.data.extend.isFavorite)
					
					let a = new Item('A',question.choicea)
					
					let b = new Item('B',question.choiceb)
					let arr = [a,b]
					if(question.choicec&&question.choicec!=''){
						let c = new Item('C',question.choicec)
						arr.push(c)
					}
					
					if(question.choiced&&question.choiced!=''){
						let d = new Item('D',question.choiced)
						arr.push(d)
					}
					
					if(question.choicee&&question.choicee!=''){
						let e = new Item('E',question.choicee)
						arr.push(e)
					}
					context.commit('changeItemList',arr)
					
				}
			})
		},
		// 获取错题信息
		getWrongQuestionInfo(context,questionId){
			uni.request({
				url:`${this.state.baseUrl}record/getonerromerrorbook`,
				method:'POST',
				header: {
					'content-type': "application/x-www-form-urlencoded"
				},
				data:{
					userId:this.state.userId,
					dicId:this.state.questionTypeId,
					questionId:questionId
				},
				success:(data)=>{
					
					
					let question = data.data.extend.oneRromErrorBook
					
					context.commit('changeQuestionInfo',question)
					
					context.commit('SetIsSingle',(question.questionType===0)?true:false)
					
					context.commit('changeIsFavorite',data.data.extend.isFavorite)
					
					let a = new Item('A',question.choicea)
					
					let b = new Item('B',question.choiceb)
					let arr = [a,b]
					if(question.choicec&&question.choicec!=''){
						let c = new Item('C',question.choicec)
						arr.push(c)
					}
					
					if(question.choiced&&question.choiced!=''){
						let d = new Item('D',question.choiced)
						arr.push(d)
					}
					
					if(question.choicee&&question.choicee!=''){
						let e = new Item('E',question.choicee)
						arr.push(e)
					}
					context.commit('changeItemList',arr)
					
				}
			})
		},
		// 获取收藏的题信息
		getFavoriteQuestionInfo(context,questionId){
			uni.request({
				url:`${this.state.baseUrl}favorite/getonefromfavoritesbook`,
				method:'POST',
				header: {
					'content-type': "application/x-www-form-urlencoded"
				},
				data:{
					userId:this.state.userId,
					// dicId:this.state.questionTypeId,
					questionId:questionId
				},
				success:(data)=>{
					
					console.log(data.data)
					let question = data.data.extend.map.question
					
					context.commit('changeQuestionInfo',question)
					
					context.commit('SetIsSingle',(question.questionType===0)?true:false)
					
					context.commit('changeIsFavorite',data.data.extend.map.isFavorite)
					
					let a = new Item('A',question.choicea)
					
					let b = new Item('B',question.choiceb)
					let arr = [a,b]
					if(question.choicec&&question.choicec!=''){
						let c = new Item('C',question.choicec)
						arr.push(c)
					}
					
					if(question.choiced&&question.choiced!=''){
						let d = new Item('D',question.choiced)
						arr.push(d)
					}
					
					if(question.choicee&&question.choicee!=''){
						let e = new Item('E',question.choicee)
						arr.push(e)
					}
					context.commit('changeItemList',arr)
					
				}
			})
		},
		// 查询已做过的题目
		getPreQuestionInfo(context){
			uni.request({
				url:`${this.state.baseUrl}question/prequestion`,
				method:'POST',
				header: {
					'content-type': "application/x-www-form-urlencoded"
				},
				data:{
					userId:this.state.userId,
					questionOrder:this.state.questionOrder,
				},
				success:(data)=>{
					
					let question = data.data.extend.preQuestion
					console.log(question)
					// 获取题目信息
					context.commit('changeQuestionInfo',question)
					
					// 判断单选多选
					context.commit('SetIsSingle',(question.questionType===0)?true:false)
					
					// 获取是否收藏
					
					if(data.data.extend.preQuestion.isFavorite==="true"){
						context.commit('changeIsFavorite',true)
					}else{
						context.commit('changeIsFavorite',false)
					}
					
					
					
					
					// 获取选项列表
					let a = new Item('A',question.choicea)
					
					let b = new Item('B',question.choiceb)
					let arr = [a,b]
					if(question.choicec!=='null'){
						let c = new Item('C',question.choicec)
						arr.push(c)
					}
					
					if(question.choiced!=='null'){
						let d = new Item('D',question.choiced)
						arr.push(d)
					}
					
					if(question.choicee!=='null'){
						let e = new Item('E',question.choicee)
						arr.push(e)
					}
					context.commit('changeItemList',arr)
					//判断选项列表中哪些是之前选的 
					
					
					// 如果上一题正确
					if(question.isRight===0){
						context.commit('changeIsRight', 0)
						// 上一题是单选
						if(question.questionType===0){
							context.commit('clearChoosenAnswerList')
							if(question.answer==='A'){
								context.commit('setChoosenAnswerList',arr[0])
								context.commit('changeIsBeenChoosen',0)
							}
							if(question.answer==='B'){
								context.commit('setChoosenAnswerList',arr[1])
								context.commit('changeIsBeenChoosen',1)
							}
							if(question.answer==='C'){
								context.commit('setChoosenAnswerList',arr[2])
								context.commit('changeIsBeenChoosen',2)
							}
							if(question.answer==='D'){
								context.commit('setChoosenAnswerList',arr[3])
								context.commit('changeIsBeenChoosen',3)
							}
							if(question.answer==='E'){
								context.commit('setChoosenAnswerList',arr[4])
								context.commit('changeIsBeenChoosen',4)
							}
							
							
						}
						// 上一题是多选
						else{
							if(question.answer.indexOf('A')!==-1){
								context.commit("addMutiChoosenAnswerSet",'A')
								context.commit('changeIsBeenChoosen',0)
							}
							if(question.answer.indexOf('B')!==-1){
								context.commit("addMutiChoosenAnswerSet",'B')
								context.commit('changeIsBeenChoosen',1)
							}
							if(question.answer.indexOf('C')!==-1){
								context.commit("addMutiChoosenAnswerSet",'C')
								context.commit('changeIsBeenChoosen',2)
							}
							if(question.answer.indexOf('D')!==-1){
								context.commit("addMutiChoosenAnswerSet",'D')
								context.commit('changeIsBeenChoosen',3)
							}
							if(question.answer.indexOf('E')!==-1){
								context.commit("addMutiChoosenAnswerSet",'E')
								context.commit('changeIsBeenChoosen',4)
							}
							context.commit('changeMutiChoosenAnswerList')
						}
					}
					// 如果上一题错误
					else{
						context.commit('changeIsRight', 1)
						// 上一题是单选
						if(question.questionType===0){
							context.commit('clearChoosenAnswerList')
							context.commit('setChoosenAnswerList',)
							if(question.errorRecord==='A'){
								context.commit('setChoosenAnswerList',arr[0])
								context.commit('changeIsBeenChoosen',0)
							}
							if(question.errorRecord==='B'){
								context.commit('setChoosenAnswerList',arr[1])
								context.commit('changeIsBeenChoosen',1)
							}
							if(question.errorRecord==='C'){
								context.commit('setChoosenAnswerList',arr[2])
								context.commit('changeIsBeenChoosen',2)
							}
							if(question.errorRecord==='D'){
								context.commit('setChoosenAnswerList',arr[3])
								context.commit('changeIsBeenChoosen',3)
							}
							if(question.errorRecord==='E'){
								context.commit('setChoosenAnswerList',arr[4])
								context.commit('changeIsBeenChoosen',4)
							}
						}
						// 上一题是多选
						else{
							if(question.errorRecord.indexOf('A')!==-1){
								context.commit("addMutiChoosenAnswerSet",'A')
								context.commit('changeIsBeenChoosen',0)
							}
							if(question.errorRecord.indexOf('B')!==-1){
								context.commit("addMutiChoosenAnswerSet",'B')
								context.commit('changeIsBeenChoosen',1)
							}
							if(question.errorRecord.indexOf('C')!==-1){
								context.commit("addMutiChoosenAnswerSet",'C')
								context.commit('changeIsBeenChoosen',2)
							}
							if(question.errorRecord.indexOf('D')!==-1){
								context.commit("addMutiChoosenAnswerSet",'D')
								context.commit('changeIsBeenChoosen',3)
							}
							if(question.errorRecord.indexOf('E')!==-1){
								context.commit("addMutiChoosenAnswerSet",'E')
								context.commit('changeIsBeenChoosen',4)
							}
							context.commit('changeMutiChoosenAnswerList')
						}
					}
					
				}
			})
		},
		// 用户点击收藏后,收藏
		addFavorite(context){
			
			uni.showLoading({
				title:'正在加载'
			})
			uni.request({
				url:`${this.state.baseUrl}favorite/addfavorite`,
				data:{
					userId:this.state.userId,
					dictionaryId:this.state.questionInfo.dictionaryId,
					questionId:this.state.questionInfo.questionId,
					questionOrder:this.state.questionOrder
				},
				success:()=>{
					uni.hideLoading()
					context.commit('tapIsFavorite')
					uni.showToast({
						title: '收藏成功!',
						duration: 2000
					});
					
				}
			})
		},
		// 用户点击取消收藏后,取消收藏
		removeFavorite(context){
			uni.request({
				url:`${this.state.baseUrl}favorite/removefavorite`,
				data:{
					userId:this.state.userId,
					dictionaryId:this.state.questionInfo.dictionaryId,
					questionId:this.state.questionInfo.questionId,
					questionOrder:this.state.questionOrder
				},
				success:()=>{
					uni.hideLoading()
					context.commit('tapIsFavorite')
					uni.showToast({
						title: '取消收藏',
						duration: 2000
					});
					
				}
			})
		},
		// 从后台获取错题列表,并将题目注入到题目列表数组中
		getQuestionList(context){
			
			uni.request({
				url:`${this.state.baseUrl}record/errorbook`,
				data:{
					userId:this.state.userId,
					dicId:(this.state.choosenNumber+1),
					page:this.state.page,
					limit:6
					
				},
				success:(data)=>{
					// console.log(data.data.extend)
						for(let i=0;i<data.data.extend.pageInfo.size;i++){
							context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])
							// context.commit('addWrongQuestionIdList',data.data.extend.pageInfo.list[i].questionId)
							
						}
						context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
						
						context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
						context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
						context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
					
					

				}
			})
		},
		// 从后台获取收藏题目列表
		getFavoriteQuestionList(context){
			uni.request({
				url:`${this.state.baseUrl}favorite/favoritesbook`,
				data:{
					userId:this.state.userId,
					dicId:(this.state.choosenNumber+1),
					page:this.state.page,
					
					
				},
				success:(data)=>{
					// console.log(data.data.extend)
						for(let i=0;i<data.data.extend.pageInfo.size;i++){
							context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])
							// context.commit('addWrongQuestionIdList',data.data.extend.pageInfo.list[i].questionId)
							
						}
						context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
						
						context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
						context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
						context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
					
					
			
				}
			})
		},
		// 从后台获取历史记录列表,并将题目注入到题目列表数组中
		getHistoryQuestionList(context){
			
			uni.request({
				url:`${this.state.baseUrl}record/getallhistory`,
				data:{
					userId:this.state.userId,
					// dicId:(this.state.choosenNumber+1),
					page:this.state.page,
					limit:6
					
				},
				success:(data)=>{
					// console.log(data.data.extend)
						for(let i=0;i<data.data.extend.pageInfo.size;i++){
							context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])
							// context.commit('addWrongQuestionIdList',data.data.extend.pageInfo.list[i].questionId)
							
						}
						
						context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
						
						context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
						context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
						context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
					
					
		
				}
			})
		},
		// 从后台获取历史记录的图表数据
		getHistoryFinishPercentageList(context){
			
			uni.request({
				url:`${this.state.baseUrl}record/getallhistory`,
				data:{
					userId:this.state.userId,
					// dicId:(this.state.choosenNumber+1),
					page:this.state.page,
					limit:6
					
				},
				success:(data)=>{
					
						
						context.commit('changeFinishPercentageList',JSON.parse(JSON.stringify(data.data.extend.proportion)))
						
					
		
				}
			})
		},
		// 从后台获取搜索到的内容(题库搜索)
		getSearchContent(context,searchContent){
			uni.request({
				url:`${this.state.baseUrl}question/searchquestion`,
				data:{
					keyWord:searchContent,
					page:this.state.page,
				},
				success:(data)=>{
					for(let i=0;i<data.data.extend.pageInfo.size;i++){
						context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])
						
						
					}
					
					context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
					
					context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
					context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
					context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
				}
			})
		},
		// 从后台获取搜索到的内容(错题本搜索)
		getSearchErrorContent(context,searchContent){
			uni.request({
				url:`${this.state.baseUrl}record/getquestioninerrorsbykeyword`,
				data:{
					userId:this.state.userId,
					keyWord:searchContent,
					
				},
				success:(data)=>{
					for(let i=0;i<data.data.extend.question.length;i++){
						context.commit('insertQuestionList',data.data.extend.question[i])												
					}
					context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
					context.commit("changeQuestionListLength",data.data.extend.question.length)
					
					context.commit("changeWrongQuestionListLength",data.data.extend.questionIdArr.length)
				}
			})
		},
		// 从后台获取搜索到的内容(收藏夹搜索)
		getSearchFavoriteContent(context,searchContent){
			uni.request({
				url:`${this.state.baseUrl}favorite/getquestioninfavoritesbykeyword`,
				data:{
					userId:this.state.userId,
					keyWord:searchContent,
					
				},
				success:(data)=>{
					for(let i=0;i<data.data.extend.question.length;i++){
						context.commit('insertQuestionList',data.data.extend.question[i])												
					}
					context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)
					context.commit("changeQuestionListLength",data.data.extend.question.length)
					
					context.commit("changeWrongQuestionListLength",data.data.extend.questionIdArr.length)
				}
			})
		},
		// 从后台获取搜索到的内容(题库搜索)
		getSearchQuestionBankContent(context,searchContent){
			uni.request({
				url:`${this.state.baseUrl}question/searchquestioninmodel`,
				data:{
					page:this.state.page,
					limit:10,
					keyWord:searchContent,
					dicId:(this.state.choosenNumber+1),
					
				},
				success:(data)=>{
					for(let i=0;i<data.data.extend.pageInfo.size;i++){
						context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])														
					}						
					context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)						
					context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
					context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
					context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
										
				}
			})
		},
		// 从后台获取题库列表
		getQuestionBankList(context){
			
			uni.request({
				url:`${this.state.baseUrl}question/modelquestions`,
				data:{
					userId:this.state.userId,
					dicId:(this.state.choosenNumber+1),
					page:this.state.page,
					limit:10
					
				},
				success:(data)=>{
						for(let i=0;i<data.data.extend.pageInfo.size;i++){
							context.commit('insertQuestionList',data.data.extend.pageInfo.list[i])														
						}						
						context.commit('changeWrongQuestionIdList',data.data.extend.questionIdArr)						
						context.commit('changeHasNextPage',data.data.extend.pageInfo.hasNextPage)
						context.commit("changeQuestionListLength",data.data.extend.pageInfo.list.length)
						context.commit("changeWrongQuestionListLength",data.data.extend.pageInfo.total)
					
					
		
				}
			})
		},
	},
	mutations:{
		// 从本地存储中获取用户信息(头像,昵称)
		getUserInfo(state,userObj){
			state.userInfo = userObj
		},
		// 从本地存储中获取用户id
		getUserId(state,id){
			state.userId = id
		},
		// 更改登陆状态为true
		changeIsLogin(state){
			state.isLogin = true
		},
		// 更改登陆状态为false
		changeIsLoginToFalse(state){
			state.isLogin = false
		},
		changeNoChoosenOptionToFalse(state){
			state.noChoosenOption = false
		},
		changeNoChoosenOptionToTrue(state){
			state.noChoosenOption = true
		},
		changeIsSubmit(state){
			state.isSubmit = !state.isSubmit
		},
		changeCanBeChoosen(state){
			state.canBeChoosen = !state.canBeChoosen
		},
		// 此处获取的数据是从后台得到的
		SetIsSingle(state,bool){
			state.isSingle = bool
		},
		// 将所有不需要后台数据得到的状态初始化(适用于下一题和初始化答题)
		initState(state){
			state.isSubmit = false
			state.canBeChoosen = true
			state.noChoosenOption = true
			state.isWrongQuestionCorrect = false
			
			state.choosenAnswerList = []
			state.mutiChoosenAnswerSet = new Set()
			state.preChooseItem = -1
			state.questionInfo = {}
			state.itemList = []
			state.isFavorite = false
		},
		// 对状态进行恢复至上一题的状态(适用于上一题)
		recoverState(state){
			state.isSubmit = true
			state.canBeChoosen = false
			state.noChoosenOption = false
			state.questionInfo = {}
			state.itemList = []
			state.mutiChoosenAnswerSet = new Set()
			state.choosenAnswerList = []
			state.isFavorite = false
		},
		// 判断提交的错题答案是否正确,如果正确,使移出错题本的div出现
		judgeWrongQuestionIsCorrect(state){
			state.isWrongQuestionCorrect = true
		},
		// 指明所选选项的编号
		setChoosenNumber(state,value){
			state.choosenNumber = value
		},
		// 清空所选选项列表
		clearChoosenAnswerList(state){
			state.choosenAnswerList = []
		},
		// 更改所选选项列表
		setChoosenAnswerList(state,item){
			state.choosenAnswerList.unshift(item)
		},
		// 向多选选项列表中添加选项
		addMutiChoosenAnswerSet(state,optionName){
			state.mutiChoosenAnswerSet.add(optionName)
		},
		// 向多选选项列表中删除选项
		deleteMutiChoosenAnswerSet(state,optionName){
			 state.mutiChoosenAnswerSet.delete(optionName)
		 },
		 // 将多选选项集合转为多选选项数组
		changeMutiChoosenAnswerList(state){
			 state.mutiChoosenAnswerList = [...state.mutiChoosenAnswerSet]
		 },
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
		},
		// 更新在开启本次答题时,还剩多少题没做
		changeRestQuestionNumber(state){
			state.restQuestionNumber = state.totalQuestionNumber - state.finishQuestionNumber
		},
		// 
		// 对某种题目完成的数量+1
		addFinishQuestionNumber(state){
			state.finishQuestionNumber += 1
		},
		changeCorrectQuestionNumber(state,value){
			state.correctQuestionNumber = value
		},
		// 更新题目信息
		changeQuestionInfo(state,obj){
			state.questionInfo = obj
			
		},
		// 更新选项列表
		changeItemList(state,arr){
			state.itemList = arr
		},
		// 更新选项列表中对应项的选中状态
		changeIsBeenChoosen(state,index){
			state.itemList[index].isBeenChoosen = !state.itemList[index].isBeenChoosen
		},
		// 将选的值记录为上一次选的值
		changePreChooseItem(state,index){
			state.preChooseItem = index
		},
		//更改题目正确与否状态
		changeIsRight(state,num){
			state.isRight = num
		},
		// 更改是否是第一题状态
		changeIsFirstOne(state,bool){
			state.isFirstOne = bool
		},
		// 更改是否是最后一题状态
		changeIsLastOne(state,bool){
			state.isLastOne = bool
		},
		// 将单次刷题序号重置为1
		initQuestionOrder(state){
			state.questionOrder = 1
		},
		// 对单次刷题序号进行+1
		addQuestionOrder(state){
			state.questionOrder += 1
		},
		// 对单次刷题序号进行-1
		minusQuestionOrder(state){
			state.questionOrder -= 1
		},
		// 将单次刷题最新一题序号重置为1
		initCurrentQuestionOrder(state){
			state.currentQuestionOrder = 0
		},
		// 使单次刷题最新一题的序号+1
		addCurrentQuestionOrder(state){
			state.currentQuestionOrder += 1
		},
		// 对单次刷题正确的个数+1
		addCorrectNumber(state){
			state.correctNumber += 1
		},
		// 对单次刷题错误的个数+1
		addWrongNumber(state){
			state.wrongNumber += 1
		},
		// 在每次开始刷题时,初始化对错数量
		initCorrectWrongNumber(state){
			state.correctNumber = 0
			state.wrongNumber = 0
		},
		// 改变是否收藏的状态
		changeIsFavorite(state,bool){
			state.isFavorite = bool
		},
		// 切换是否收藏的状态(用于用户手动点击是否收藏)
		tapIsFavorite(state){
			state.isFavorite = !state.isFavorite
		},
		// 向题目列表中注入题目项
		insertQuestionList(state,item){
			state.questionList.push(item)
		},
		// 进入带有问题列表的页面时或切换问题种类时,初始化questionList
		initQuestionList(state){
			state.questionList = []
		},
		// 进入错题本,收藏夹时,将choosenNumber重置为0
		initChoosenNumber(state){
			state.choosenNumber = 0
		},
		// 改变choosenNumber的值
		changeChoosenNumber(state,value){
			state.choosenNumber = value
		},
		// 改变题目列表的数量的值
		changeQuestionListLength(state,value){
			state.questionListLength = value
		},
		// 初始化列表分页页数为1
		initPage(state){
			state.page = 1
		},
		// 让列表分页页数+1
		changePage(state){
			state.page += 1
		},
		// 改变是否有下一页
		changeHasNextPage(state,bool){
			state.hasNextPage = bool
		},
		// 初始化错题questionId列表
		initWrongQuestionIdList(state){
			state.wrongQuestionIdList = []
		},
		// 向错题questionId列表中添加questionId
		addWrongQuestionIdList(state,item){
			state.wrongQuestionIdList.push(item)
		},
		// 改变错题questionId列表
		changeWrongQuestionIdList(state,arr){
			state.wrongQuestionIdList = arr
			// console.log(state.wrongQuestionIdList)
		},
		// 获取点击的错题的index
		changeWrongQuestionIndex(state,index){
			state.wrongQuestionIndex = index
		},
		// 使点击的错题的index+1
		addWrongQuestionIndex(state){
			
			state.wrongQuestionIndex += 1
		},
		// 获取错题列表总题数
		changeWrongQuestionListLength(state,value){
			state.wrongQuestionListLength = value
		},
		changeRestWrongQuestionNumber(state){
			state.restWrongQuestionNumber = state.wrongQuestionListLength-state.wrongQuestionIndex
		},
		changeFinishPercentageList(state,arr){
			// for(let i=0;i<5;i++){
			// 	state.finishPercentageList.push(arr[i])
			// }
			state.finishPercentageList = arr
			// console.log(state.finishPercentageList)
			
		},
		// // 初始化搜索内容
		// initSearchContent(state){
		// 	state.searchContent = ''
		// },
		// // 获取搜索内容
		// getSearchContent(state,content){
		// 	state.searchContent = content
		// }
		
	}
})

class Item{
	constructor(optionName,title) {
	    this.optionName = optionName
		this.title = title
		this.isBeenChoosen = false
	}
}
