import moment from "moment";

export const findTodoIndex = (data, id) => {
    return data.findIndex(item => {
        return item.id === id;
    })
}

export const isToday = (timestampArray, type) => {
    let arr = []
    // eslint-disable-next-line default-case
    switch (type) {
        case 'today':
            arr = timestampArray.filter(timestamp => {
                return moment(moment(parseInt(timestamp.schedule_time)).format('YYYY/MM/DD hh:mm:ss')).isSame(new Date().toDateString(), 'day')
            })
            break;
        case 'history':
            arr = timestampArray.filter(timestamp => {
                return moment(moment(parseInt(timestamp.schedule_time)).format('YYYY/MM/DD hh:mm:ss')).isBefore(new Date().toDateString(), 'day')
            })
            break;
        case 'all':
            arr = JSON.parse(JSON.stringify(timestampArray))
            break;
    }
    return arr
}

export const filterChartData = (timestampArray, type) => {
    let arr = {};
    let chareData = []
    timestampArray.map(item => {
        const _time = moment(parseInt(item.schedule_time)).format('YYYY/MM/DD');
        item.schedule_time ? arr[_time] ? arr[_time] = arr[_time]++ : arr[_time] = 1 : arr['无时间'] ? arr['无时间'] = arr['无时间']++ : arr['无时间'] = 1
    })
    Object.keys(arr).map(item => {
        chareData.push({
            timer: item,
            num: arr[item]
        })
    })
    console.log(chareData);
    return chareData
}