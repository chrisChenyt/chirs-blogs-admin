const Sequelize = require('sequelize'); // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
// const Todolist = new Sequelize('mysql://root:chenyutong123@39.107.236.111/todolist',{
// const Todolist = new Sequelize('mysql://root:chenyutong123@localhost/todolist',{
const blogs = new Sequelize('mysql://root:chenyutong123@localhost/blogs',{
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {
  blogs // 将blogs暴露出接口方便Model调用
}