module.exports = function(sequelize, DataTypes) {
  return sequelize.define('msgboard', {
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
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reply: {
      type: DataTypes.JSON,
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
        return this.name+'在 '+this.date+' 给你留言啦~~~'
      },
      allowNull: true
    },
  }, {
    tableName: 'msgboard'// 表名
  });
};
