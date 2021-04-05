var todolistDB = window.indexedDB.open('todolist', '3');
console.log(todolistDB);
export function indexDBError(cb) {
    return new Promise(function (resolve, reject) {
        todolistDB.onerror = function (event) {
            console.log('数据库打开报错');
            if (cb && typeof cb === 'function') {
                resolve(db)
            }
        };
    })
}

todolistDB.onerror = function (event) {
    console.log('数据库打开报错');
};

todolistDB.onsuccess = function (event) {
    db = todolistDB.result;
    console.log('indexdb成功');
};

let db = null;

export function indexDBSuccess(cb) {
    return new Promise(function (resolve, reject) {
        if (cb && typeof cb === 'function') {
            resolve(cb(db))
        }
    });
}

todolistDB.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore;
    if (!db.objectStoreNames.contains('todolist')) {
        objectStore = db.createObjectStore('todolist', { keyPath: 'id', autoIncrement: true });
        // 标题
        objectStore.createIndex('title', 'title', { unique: false });
        // 创建时间
        objectStore.createIndex('create_time', 'create_time', { unique: true });
        // 状态 - 是否完成
        objectStore.createIndex('status', 'status', { unique: false });
        // 类型
        objectStore.createIndex('type', 'type', { unique: false });
        // 日程时间
        objectStore.createIndex('schedule_time', 'schedule_time', { unique: false });
        // 项目名称
        objectStore.createIndex('project_name', 'project_name', { unique: false });
        // 备注
        objectStore.createIndex('remark', 'remark', { unique: false });
    }
}

export function readAll(status = "") {
    var transaction = db.transaction(['todolist']);
    var objectStore = transaction.objectStore('todolist');

    return new Promise((resolve, reject) => {
        const dataAll = [];
        objectStore.openCursor().onerror = function (event) {
            console.log('事务失败');
        };

        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                if (status) {
                    dataAll.push(cursor.value.status === status ? cursor.value : null);
                } else {
                    dataAll.push(cursor.value);
                }
                cursor.continue();
            } else {
                resolve(dataAll);
                console.log('没有更多数据了！');
            }
        };
    })
}

export function add(data) {
    return new Promise((resolve, reject) => {
        try {
        var todolistDB = db.transaction(['todolist'], 'readwrite')
            .objectStore('todolist')
            .add(data);
        todolistDB.onsuccess = function (event) {
            console.log('数据写入成功');
            resolve('数据写入成功')
        };

        todolistDB.onerror = function (event) {
            console.log('数据写入失败');
            reject(event)
        }
    } catch (error) {
        console.log(error);
    }
    })
}

export function remove(id = -1) {
    var transaction = db.transaction(['todolist']);
    return new Promise((resolve, reject) => {
        if (id < 0) reject('删除失败')
        const dataAll = [];
        var request = db.transaction(['todolist'], 'readwrite')
            .objectStore('todolist')
            .delete(id);

        request.onsuccess = function (event) {
            console.log('数据删除成功');
            resolve(id)
        };
    })
}

export function update(data) {
    var request = db.transaction(['todolist'], 'readwrite')
        .objectStore('todolist')
        .put(data);

    request.onsuccess = function (event) {
        console.log('数据更新成功');
    };

    request.onerror = function (event) {
        console.log('数据更新失败');
    }
}