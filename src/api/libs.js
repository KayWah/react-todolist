export const findTodoIndex = (data, id) => {
    return data.findIndex(item => {
        return item.id === id;
    })
}