// 性别
const SEX = [{
	title: '男',
	value: '1'
}, {
	title: '女',
	value: '0'
}];
// 国籍
const COUNTRY = [{
		title: '中国',
		value: '1'
	}, {
		title: '美国',
		value: '2'
	}, {
		title: '日本',
		value: '3'
	}, {
		title: '韩国',
		value: '4'
	},
	{
		title: '印度',
		value: '5'
	}, {
		title: '土耳其',
		value: '6'
	}, {
		title: '英国',
		value: '7'
	}, {
		title: '加拿大',
		value: '8'
	},
	{
		title: '俄罗斯',
		value: '9'
	}, {
		title: '巴西',
		value: '10'
	}, {
		title: '乌克兰',
		value: '11'
	}, {
		title: '白俄罗斯',
		value: '12'
	},
	{
		title: '意大利',
		value: '13'
	}, {
		title: '法国',
		value: '14'
	}
];
// 模特类型
const MODEL_TYPE = [{
		title: '甜美可爱',
		value: '1'
	}, {
		title: '潮酷个性',
		value: '2'
	}, {
		title: '阳光',
		value: '3'
	}, {
		title: '运动肌肉',
		value: '4'
	},
	{
		title: '内衣',
		value: '5'
	}, {
		title: '知性',
		value: '6'
	}, {
		title: '成熟',
		value: '7'
	}, {
		title: '性感',
		value: '8'
	},
	{
		title: '高级',
		value: '9'
	}, {
		title: '无性别',
		value: '10'
	}, {
		title: '单眼皮',
		value: '11'
	}, {
		title: '黑人',
		value: '12'
	}, {
		title: '混血',
		value: '13'
	}, {
		title: '女人',
		value: '14'
	}, {
		title: '短发',
		value: '15'
	}
];
// 地区
const AREA = [{
	title: '北京',
	value: '1'
}, {
	title: '上海',
	value: '2'
}, {
	title: '广州',
	value: '3'
}, {
	title: '深圳',
	value: '4'
}, {
	title: '其他',
	value: '5'
}];
const countIncre = (min, max, type) => {
	type = type || 'object';
	let arr = [];
	for (let i = min, len = max; i <= len; i++) {
		if (type==='object') {
			arr.push({title: i, value: i});
		} else {
			arr.push(i);
		}
	}
	return arr;
}
// 价格单位
const PRICE_UNIT = ['天', '小时', '件'];
// 身高 60cm-195cm
const HEIGHT = countIncre(60, 195);
// 体重
const WEIGHT = countIncre(10, 150);
// 三围
let BWHItem = countIncre(40, 150, 'string');
const BWH = [BWHItem, BWHItem, BWHItem];
// 鞋码
const SHOESIZE = countIncre(20, 50);
// 衣服尺码
const CLOTHINGSIZE = countIncre(40, 150);
export {
	SEX,
	COUNTRY,
	MODEL_TYPE,
	AREA,
	HEIGHT,
	WEIGHT,
	BWH,
	SHOESIZE,
	CLOTHINGSIZE,
	PRICE_UNIT
}
