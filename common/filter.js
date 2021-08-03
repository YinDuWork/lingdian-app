export default function(Vue, options) {
	
	/**
	 * @description  手机号过滤器
	 * 格式 3 4 4  并且中间4位为*
	 */
	Vue.filter('mobile', (mobile) => {
		if (!mobile) {
			return '';
		}
		return mobile.replace(/^(\d{3})\d+(\d{4})$/, "$1 **** $2");
	})

	/**
	 * @description  时间过滤器
	 */
	Vue.filter('date', (time, format, isNullFormat) => {
		if (time) {
			let d = new Date(time);
			if (typeof(time) == "string") { //为字符串时间格式
				if (time.indexOf('-') > -1 || time.indexOf(':') > -1) {
					let arr = time.split(/[- : \/ \.]/);
					d = new Date(arr[0], (arr[1] - 1) || 0, arr[2] || 1, arr[3] || 0, arr[4] || 0, arr[5] || 0,
						arr[6] || 0);
				} else if (/^\d{0,}$/.test(time)) {
					time = parseInt(time);
					d = new Date(time);
				}
			}
			if (!d || d + '' == 'Invalid Date') {
				return time;
			}
			let Y = d.getFullYear();
			let Mo = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
			let D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			let H = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
			let Mi = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			let S = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			let SS = '';
			if (d.getMilliseconds() < 10) {
				SS = '00' + d.getMilliseconds();
			} else if (d.getMilliseconds() < 100) {
				SS = '0' + d.getMilliseconds();
			} else {
				SS = d.getMilliseconds();
			}
			if (format) {
				return format.replace("yyyy", Y)
					.replace("MM", Mo)
					.replace("dd", D)
					.replace("HH", H)
					.replace("mm", Mi)
					.replace("ss", S)
					.replace("SSS", SS)
			} else { //default format   'yyyy-MM-dd HH:mm:ss'
				return Y + '-' + Mo + '-' + D + ' ' + H + ':' + Mi + ':' + S;
			}
		} else {
			if (isNullFormat) {
				return isNullFormat
			}
			return "";
		}
	});

	/**
	 * @description  数字过滤器
	 * 根据传入字符串,获取到固定位数的小数
	 */
	Vue.filter('number', (figure, num = 2) => {
		if (typeof figure == "undefined") {
			return;
		}
		var n = parseFloat(figure) || 0;
		return n.toFixed(num);

	});
	/**
	 * @description  金额
	 * 根据传入字符串,获取到固定位数的小数 并且前面的金额为隔三位一个逗号
	 */
	Vue.filter('money', (figure, num = 2) => {
		if (typeof figure == "undefined") {
			return;
		}
		var val = parseFloat(figure) || 0;
		val = val.toFixed(num);
		val = val.toString();
		let index = val.indexOf('.') == -1 ? val.length : val.indexOf('.');
		let j = 0;
		let m = val.slice(index);
		for (let i = index - 1; i >= 0; i--) {
			j++;
			m = val[i] + m;
			if (j % 3 == 0 && i != 0 && val[i - 1] != '-') {
				m = ',' + m;
			}
		}
		return m;
	});
	/**
	 * @description  身份证过滤器
	 * 格式 4 4 4 4 并且前面的都是*号  只有最后四位是显示
	 */
	Vue.filter('idno', (idno) => {
		if (!idno) {
			return '';
		}
		return idno.replace(/^(\d{3})\d+([\dxX]{3})$/, "$1************$2");
	});
	/**
	 * @description  数组拼接
	 */
	Vue.filter('joinSplicing', (str, symbol) => {
		if (!str.length) {
			return '--';
		}
		return str.join(symbol);
	})
}
