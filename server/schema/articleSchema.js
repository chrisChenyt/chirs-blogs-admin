/* jshint indent: 2 */
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    articleId: {
      type: DataTypes.INTEGER(11).UNSIGNED,// 字段类型
      allowNull: false,// 是否允许为NULL
      autoIncrement: true,
      primaryKey: true// 主键
    },
    original: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    abstract: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publish: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    type: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    tag: {
      type: DataTypes.JSON,
      get() {
        let tagArray = null;
        if(this.tag1 && this.tag2){
          tagArray = [this.tag1,this.tag2]
        }else if(this.tag1 && !this.tag2){
          tagArray = [this.tag1]
        }else if(!this.tag1 && this.tag2){
          tagArray = [this.tag2]
        } else if(!this.tag1 && !this.tag2) {
          tagArray = null
        }
        return tagArray
      },
      allowNull: true
    },
    tag1: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    tag2: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    commentNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    likeNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    pv: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date: {
      type: DataTypes.CHAR(100),
      // get() {
      //   return moment(this.getDataValue('date')).utcOffset(0).format('YYYY-MM-DD HH:mm');
      // },
      allowNull: true
    },
  }, {
    tableName: 'article'// 表名
  });
};
