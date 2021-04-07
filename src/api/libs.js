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