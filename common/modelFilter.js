// 模特筛选条件
const modelFilters = [{
		title: '性别',
		key: 'sex',
		type: 'option',
		detailList: [
			{
				title: '不限',
				value: ''
			}
		]
	},
	{
		title: '国籍',
		key: 'country',
		isMutiple: true,
		type: 'option',
		detailList: [
			{
				title: '不限',
				value: ''
			}
		]
	},
	{
		title: '类型',
		key: 'type',
		isMutiple: true,
		type: 'option',
		detailList: [
			{
				title: '不限',
				value: ''
			}
		]
	},
	{
		title: '地区',
		key: 'area',
		isMutiple: true,
		type: 'option',
		detailList: [
			{
				title: '不限',
				value: ''
			}
		]
	},
	{
		title: '年龄', // 8个月-80岁
		key: 'ageRange',
		type: 'range',
		value: [8, 960],
		min: 8,
		max: 960,
		step: 1,
		formatter: function (val) {
			if (val < 12) {
				return `${val}个月`;
			} else {
				let age = parseInt(val / 12);
				return `${age}岁`;
			}
		}
	},
	{
		title: '价格区间', // 0-5万
		key: 'priceRange',
		type: 'range',
		value: [0, 50000],
		min: 0,
		max: 50000,
		step: 100,
		formatter: function (val) {
			return `￥${val}`;
		}
	},
	{
		title: '身高区间', // 60cm-195cm
		key: 'heightRange',
		type: 'range',
		value: [60, 195],
		min: 60,
		max: 195,
		step: 1,
		formatter: function (val) {
			return `${val}cm`;
		}
	},
];
export {
	modelFilters
}
