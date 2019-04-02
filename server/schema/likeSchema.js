module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,// 字段类型
      allowNull: false,// 是否允许为NULL
      autoIncrement: true,
      primaryKey: true// 主键
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    read: {
      type: DataTypes.CHAR(20),
      allowNull: true
    }
  }, {
    tableName: 'like'// 表名
  });
};
