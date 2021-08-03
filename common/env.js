const REGEX={  //系统所有正则表达式
	loginPwd:{
		regex:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
		msg:'请输入8-20位字母+数字组合密码'
	},
	mobile:{
		regex:/^((1[3|4|5|8|9])\d{9})$|^((17[0|1|2|3|5|6|7|8])\d{8})$|^((16[6])\d{8})$/,
		msg:'手机号格式错误，请重新填写'
	},
	nickname:{
		regex:function(){
			return new RegExp()//返回空正则可以匹配所有
		},
		msg:'请输入正确的昵称'
	},//连续四个数字
	email:{
		regex:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
		msg:'请输入正确的邮箱地址'
	},
	noHtml:{
		regex:new RegExp(/[(\@)(\#)(\$)(\^)(\&)(\*)(\[)(\])(\{)(\})(\|)(\\)(\')(\/)(\<)(\>)(\)]+/),
		msg:'不能输入特殊字符！'
	},
	fixedPhone:{
		regex:/0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/,
		msg:'请输入正确格式的固定电话。如：021-2356984'
	},
	chinese:{
		regex:/^[\u4e00-\u9fa5]{0,}$/,
		msg:'只能是汉字'
	},
	positiveInteger:{
		regex:/^[1-9]\d*$/,
		msg:'只能是正整数'
	},
	patrn:{
		regex:/^[0-9]*$/,
		msg:'纯数字'
	},
	special:{
		regex:new RegExp("[`~!#$^&*()=|{}''\\[\\].<>/?~#……&*|{}‘']") ,
   		msg:'不能输入特殊字符'
	},
}

export {
	REGEX
}
