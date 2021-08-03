import Vue from 'vue'
let vm = new Vue();
const fetch = ((url, data = {}) => {
	return new Promise((resolve, reject) => {
		vm.$http.post(url, data).then(res=>{
			if(res.head && res.head.errcode == "E00000000000"){
				resolve(res);
			}else{
				vm.toast(res.head.showmsg||res.head.errmsg);
				reject(res);
			}
		}).catch(err=>{
			reject(err);
		});
	});
});
export {
	fetch
}