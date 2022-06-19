export function getDateDiff(dateTime) { // 将年月日转换为几小时前，几天前等等
	let dateTimeStamp = new Date(dateTime).getTime();
	let result = '';
	let minute = 1000 * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let halfamonth = day * 15;
	let month = day * 30;
	let year = day * 365;
	let now = new Date().getTime();
	let diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		return;
	}
	let monthEnd = diffValue / month;
	let weekEnd = diffValue / (7 * day);
	let dayEnd = diffValue / day;
	let hourEnd = diffValue / hour;
	let minEnd = diffValue / minute;
	let yearEnd = diffValue / year;
	if (yearEnd >= 1) {
		result = dateTime;
	} else if (monthEnd >= 1) {
		result = "" + parseInt(monthEnd) + "月前";
	} else if (weekEnd >= 1) {
		result = "" + parseInt(weekEnd) + "周前";
	} else if (dayEnd >= 1) {
		result = "" + parseInt(dayEnd) + "天前";
	} else if (hourEnd >= 1) {
		result = "" + parseInt(hourEnd) + "小时前";
	} else if (minEnd >= 1) {
		result = "" + parseInt(minEnd) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
};

//获取当前年月日
export function getYearYueDay() {
  // 获取当前日期
  var date = new Date();

  // 获取当前月份
  var nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  var strDate = date.getDate();

  // 添加分隔符“-”
  var seperator = "-";

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
  return nowDate
}