const requestMaker = function(baseURL,header){
	return function(options){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:`${baseURL}${options.path}`,
				method:options.method||'GET',
				data:options.data||'',
				header,
				success(res) {
					if(res.statusCode==200){
						resolve(res.data)
					}else{
						reject(res)
					}
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	
}

// class request{
// 	constructor(baseURL) {
// 	    this.baseURL = baseURL
// 	}
// 	make(){
// 		return 
// 	}
// }