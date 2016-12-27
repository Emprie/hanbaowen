// 我们封装一下，对mongodb的操作,使其简化
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let url = 'mongodb://127.0.0.1:27017/newdb'
exports.configUrl = function(newurl) {
    url = newurl
}


// 1.封装插入的方法
/**
 * @param  collectionName 集合名
 * @param  data           我们要插入的数据｛｝
 * @param  callback       回调
 */
exports.insert = function(collectionName, data, callback) {
    // a.建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)

        // c.操作
        obj.insert(data, function(err, result) {
            // 当操作成功之后再进行回调!
            // d 关半连接
            db.close()
            callback(err, result)
        })
    })
}

/**
 * 2.删除数据
 * @param    collectionName 集合名
 * @param   data          删除的条件
 * @param  {Function} callback       回调
 */
exports.delete = function(collectionName, data, callback) {
    // a.建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)

        // c.操作
        obj.deleteMany(data, function(err, result) {
            // d 关半连接
            db.close()
            callback(err, result)
        })
    })
}

/**
 * 更新数据，更新所以满足条件的数据
 * @param  {[type]}   collectionName 集合名
 * @param  {[type]}   data           条件
 * @param  {[type]}   content        更新的数据
 * @param  {Function} callback       回调
 */
exports.update = function(collectionName, data, content, callback) {
    //a 建立链接
    MongoClient.connect(url, function(err, db) {
        // b.得到集合对象
        const obj = db.collection(collectionName)
            // c.操作
        obj.updateMany(data, { $set: content }, function(err, result) {
            // d 关闭连接
            db.close()
            callback(err, result)
        })
    })
}

// content = {}
exports.find = function(collectionName, content, callback) {
    // a.
    MongoClient.connect(url, function(err, db) {
        //b 
        const obj = db.collection(collectionName)
            // c操作
        const result = obj.find(content)
        result.toArray(function(err, data) {
            // d
            db.close()
            callback(err, data)
        })
    })
}

// 分页查找数据// 第几页，每页多少条
exports.findPage = function(collectionName,start,count, content, callback) {
  // 如果参数不对的话，给一个默认值
  // start = 0, count = 3

    // a.
    MongoClient.connect(url, function(err, db) {
        //b 
        const obj = db.collection(collectionName)
            // c操作
        let result = obj.find(content)
        result.skip(start) // 查的时候略过前1条 // start: 0
        .limit(count) // 限制只查询2条数据
        .toArray(function(err, data) {
                // d
                db.close()
                callback(err, data)
            })
    })
}

//////////// 以下是测试代码
// exports.findPage('user',1,1, {}, function(err, data) {console.log(data)})


// exports.update('user',{age:18},{age:19},function(err, result){
//   console.log(result) ///  modifiedCount
// })


// exports.insert('tmp',{age:18,name:'小明明'},function(err, result){
//   console.log(result)
// })
// exports.insert('tmp',{age:19,name:'小明明'},function(err, result){
//   console.log(123)
//   console.log(result)
// })
