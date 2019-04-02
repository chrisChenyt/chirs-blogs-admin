module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    commentId: {
      type: DataTypes.INTEGER(11).UNSIGNED,// 字段类型
      allowNull: false,// 是否允许为NULL
      autoIncrement: true,
      primaryKey: true// 主键
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aritcleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    reply: {
      type: DataTypes.JSON,
      allowNull: true
    },
    like: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    read: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    newsTitle: {
      type: DataTypes.CHAR(255),
      get(){
        return this.name+'在 '+this.date+' 评论了你的文章 ---《'+this.title+'》'
      },
      allowNull: true
    },
  }, {
    tableName: 'comment'// 表名
  });
};
