/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,// 字段类型
      allowNull: false,// 是否允许为NULL
      autoIncrement: true,
      primaryKey: true// 主键
    },
    phone: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.CHAR(200),
      allowNull: true
    },
    state: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    rule: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: true
    },
    user_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qq: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    mailbox: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    introduce: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
  }, {
    tableName: 'user'// 表名
  });
};
