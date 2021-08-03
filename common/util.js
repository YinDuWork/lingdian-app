/**
 * 日期格式化
 */
const dateFormat = (date, fmt) => {
	date = date || new Date();
	date = typeof date !== 'object' ? new Date(date) : date;
	fmt = fmt || 'yyyy-MM-dd';
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
	return fmt;
}
const getUUID = () => {
	try {
	    let uuid = uni.getStorageSync('UUID');
		if (!uuid) {
			let s = [];
			let hexDigits = "0123456789abcdef";
			for (let i = 0; i < 36; i++) {
			  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";
			   
			uuid = s.join("");
			uni.setStorageSync('UUID', uuid);
		}
		return uuid;
	} catch (e) {
	    console.log('【获取uuid失败】')
		return '';
	}
};
export {
	dateFormat,
	getUUID,
}
