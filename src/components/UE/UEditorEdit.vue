<template>
  <div class = "ue">
    <div class = "article-details" >
      <div class = "article-type">
        <label for = ""><strong>类 型 ：</strong></label>
        <span>技术文章</span>
        <span class="article-type-shu">|</span>
        <el-radio v-model="articleInfo.original" class="article-type-radio" label="true">原创</el-radio>
        <el-radio v-model="articleInfo.original" class="article-type-radio" label="false">转载</el-radio>
      </div>
      <div class = "article-details-title" >
        <label for = ""><strong>标 题 ：</strong></label>
        <div class = "ueditor-input-box">
          <input type = "text" placeholder = "请输入文章标题" v-model = "articleInfo.title">
        </div>
      </div>
      <div class = "article-details-tag" >
        <label for = ""><strong>标 签 ：</strong></label>
        <div class = "ueditor-input-box">
          <el-checkbox-group 
            v-model="articleInfo.tags"
            :max="2">
            <el-checkbox v-for="tag in articleTags" :label="tag" :key="tag">{{tag}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class = "article-details-abstract" >
        <label for = ""><strong>前 言 ：</strong></label>
        <div class = "ueditor-input-box">
          <input type = "text" placeholder = "请输入文章前言" v-model = "articleInfo.abstract">
        </div>
      </div>
    </div>
    <!-- 编辑器 -->
    <div class = "editor-container">
      <div class = "editor-write">
        <script id = "editor" type = "text/plain" ></script>
      </div>
      <div class = "preview">
        <div v-html = "articleInfo.content">{{articleInfo.content}}</div>
      </div>
    </div>
    <!-- 文章发表 -->
    <div class = "article-handle">
      <div class = "publish">
        <!-- 保存草稿、发表、更新 -->
        <button @click = "save()" :disabled = "wating.disabled" v-if="article.publish == 'false'" class = "true-publish">{{wating.info.s}}</button>
        <button @click = "publish()" :disabled = "wating.disabled" v-if="article.publish == 'false'" class = "true-publish">{{wating.info.p}}</button>
        <button @click = "update()" :disabled = "wating.disabled" v-if="article.publish == 'true'" class = "true-publish">{{wating.info.u}}</button>
      </div>
    </div>
    <transition name = "publish">
      <div class = "publish-mask" v-show = "dialog.show">
        <div class = "mask-box">
          <h3>{{ dialog.info }}</h3>
          <button @click = "dialog = {show: false,info: ''}">确认</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import  "@/../static/UE/prism.css"
  import Prism from "@/../static/UE/prism.js"
  import webHttp from '../../methods/http.js'
  import util from '../../methods/util.js'
  export default {
    props: {
      config: {
        type: Object
      }
    },
    data() {
      return {
        editor: null,
        articleInfo: {original: "true",title: "",tags: [],abstract: "",content: ""},
        dialog: {show: false,info: ""},
        wating: {disabled: false,info: {u: "更新",s: "保存草稿", p: "发表"}},
        articleTags:[
          "CSS","html","JavaScript","nodejs","Vue","webpack","React","nginx","work","life","other"
        ],
        article: {}
      }
    },
    mounted() {
      webHttp.request({
        url: '/api/articleReview',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize,
          articleId: this.$route.query.article_id
        },
        callback: (res) => {
          this.article = res.article
          let _this = this
          require.ensure([],(require) => {
              require('@/../static/UE/ueditor.config.js')
              require('@/../static/UE/ueditor.all.min.js')
              require('@/../static/UE/lang/zh-cn/zh-cn.js')
              require('@/../static/UE/ueditor.parse.min.js')
          },"ue")
          .then(()=>{
            this.editor = UE.getEditor('editor', this.config) // 初始化UE
            //editor内容变化监听事件
            this.editor.addListener("contentChange",() => {
              _this.transformStr()
            })
            this.editor.addListener("ready",() => {
              _this.articleInfo.title = _this.article.title
              _this.articleInfo.abstract = _this.article.abstract
              _this.articleInfo.tags = _this.article.tag
              _this.editor.setContent(_this.article.content)

            })
          })
        }
      })
    },
    methods: {
      save () {// 保存草稿
        if(this.validate()){
          let _title = this.articleInfo.title,
              _tag1 = this.articleInfo.tags[0],
              _tag2 = this.articleInfo.tags[1] ? this.articleInfo.tags[1] : null,
              _abstract = this.articleInfo.abstract,
              _content = this.articleInfo.content,
              that = this,
              _type = '',
              _original = this.articleInfo.original === "true" ? "true" : "false"

            if(_tag1=='work'){
              _type = 'work'
            } else if(_tag1=='life') {
              _type = 'life'
            } else{
              _type = 'tech'
            }
          this.wating = {disabled: true,info: {u: "更新",s: "保存中...", p: "发表"}}
            
          webHttp.request({
            url: '/api/articleSave',
            method: 'POST',
            data: {
              articleId: this.article.articleId,
              title: _title,
              abstract: _abstract,
              original: _original,
              type: _type,
              tag1: _tag1,
              tag2: _tag2,
              content: _content,
              date: util.getNowFormatDate('yyyy-MM-dd HH:mm')
            },
            callback: (res) => {
              this.tableLoading = false
              if(res.success){
                that.editor.setContent("")//清空编辑器
                that.wating = {disabled: false,info: {u: "更新",s: "保存草稿", p: "发表"}}
                that.articleInfo = {original: "true",title: "",tags: [],content: "",abstract: ""}
                that.dialog = {show: true,info: "保存草稿成功！"}
              }
            }
          })
        }
      },
      update() {// 更新文章
        if(this.validate()){
          let _title = this.articleInfo.title,
              _tag1 = this.articleInfo.tags[0],
              _tag2 = this.articleInfo.tags[1] ? this.articleInfo.tags[1] : null,
              _abstract = this.articleInfo.abstract,
              _content = this.articleInfo.content,
              that = this,
              _type = '',
              _original = this.articleInfo.original === "true" ? "true" : "false"

            if(_tag1=='work'){
              _type = 'work'
            } else if(_tag1=='life') {
              _type = 'life'
            } else{
              _type = 'tech'
            }
          this.wating = {disabled: true,info: {u: "更新中...",s: "保存草稿", p: "发表"}}
            
          webHttp.request({
            url: '/api/draftsPublish',
            method: 'POST',
            data: {
              articleId: this.article.articleId,
              title: _title,
              abstract: _abstract,
              original: _original,
              type: _type,
              tag1: _tag1,
              tag2: _tag2,
              content: _content,
              date: util.getNowFormatDate('yyyy-MM-dd HH:mm')
            },
            callback: (res) => {
              this.tableLoading = false
              if(res.success){
                that.editor.setContent("")//清空编辑器
                that.wating = {disabled: false,info: {u: "更新",s: "保存草稿", p: "发表"}}
                that.articleInfo = {original: "true",title: "",tags: [],content: "",abstract: ""}
                that.dialog = {show: true,info: "更新文章成功！"}
              }
            }
          })
        }
      },
      publish: function(){//发表文章
        if(this.validate()){
          let _title = this.articleInfo.title,
              _tag1 = this.articleInfo.tags[0],
              _tag2 = this.articleInfo.tags[1] ? this.articleInfo.tags[1] : null,
              _abstract = this.articleInfo.abstract,
              _content = this.articleInfo.content,
              that = this,
              _type = '',
              _original = this.articleInfo.original === "true" ? "true" : "false"

            if(_tag1=='work'){
              _type = 'work'
            } else if(_tag1=='life') {
              _type = 'life'
            } else{
              _type = 'tech'
            }
          this.wating = {disabled: true,info: {u: "更新",s: "保存草稿", p: "发表中..."}}
            
          webHttp.request({
            url: '/api/draftsPublish',
            method: 'POST',
            data: {
              articleId: this.article.articleId,
              title: _title,
              abstract: _abstract,
              original: _original,
              type: _type,
              tag1: _tag1,
              tag2: _tag2,
              content: _content,
              date: util.getNowFormatDate('yyyy-MM-dd HH:mm')
            },
            callback: (res) => {
              this.tableLoading = false
              if(res.success){
                that.editor.setContent("")//清空编辑器
                that.wating = {disabled: false,info: {u: "更新",s: "保存草稿", p: "发表"}}
                that.articleInfo = {original: "true",title: "",tags: [],content: "",abstract: ""}
                that.dialog = {show: true,info: "文章发表成功！"}
              }
            }
          })
        }
      },
      getUEContent(){ // 获取内容方法
        return this.editor.getContent()
      },
      validate: function(){
        let _title = this.articleInfo.title,
            _tags = this.articleInfo.tags,
            _abstract = this.articleInfo.abstract,
            _content = this.articleInfo.content
        if(_title === ""){
            this.dialog = {show: true,info: "请填写文章标题"}
            return false
        }
        if(_tags.length === 0){
            this.dialog = {show: true,info: "请选择文章标签"}
            return false
        }
        if(_abstract === ""){
            this.dialog = {show: true,info: "请填写文章前言"}
            return false
        }
        if(_content.length === 0){
            this.dialog = {show: true,info: "内容不能为空"}
            return false
        }
        if(!this.dialog.info){
            return true
        }
      },
      transformStr(){
        let dom = document.createElement("div") 
        dom.innerHTML = this.getUEContent()
        let strArr = dom.getElementsByTagName("pre")
        for(let i = 0; i<strArr.length; i++){
          let el = strArr[i],
            preContent = el.innerHTML,
            code = document.createElement("code"),
            cls = "language-" + el.className.substring(6,el.className.indexOf(";"))
          let tempCls = el.className
          el.className = tempCls + " " +"line-numbers"
          code.className = cls    
          code.innerHTML = preContent
          let str =  code.outerHTML
          el.innerHTML = str    
        }
        this.articleInfo.content = dom.innerHTML
        this.$nextTick(function(){
          Prism.highlightAll()
        })
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style lang = "less">
  .edui-box{
    color: #000;
  }
  .article-details{
    color: #fff;
    padding: 0 15px 15px 15px;
  }
  .article-details-title,.article-details-tag,.article-details-abstract{
    display: flex;
    align-items: center;
    >label{
      display: inline-block;
      width: 70px;
    }
  } 
  .ueditor-input-box{
    padding: 5px;
    background: #ffffff;
    border-radius: 5px;
    color: #017E66;
    font-size: 12px;
    width: 100%;
    cursor: text;
    input{
      box-sizing: border-box;
      font-size: 12px;
      width: 100%;
      padding: 5px 0;
      border: none;
      outline: none;
    }
  }
  .article-type{
    padding: 10px 0;
    .article-type-shu{
      margin: 0 5px;
    }
    .article-type-radio{
      margin-right: 5px;
      >span{
        color: #fff!important;
        font-size: 12px!important;
      }
    }
  }
  .article-details-tag,.article-details-abstract{
    margin-top: 10px;
  }
  .editor-container{
    display: flex;
    padding: 10px;
  }
  .editor-write{
    width: 50%;
  }
  .preview{
    width: 50%;
    font-size: 14px;
    border-radius: 2px;
    margin-left: 10px;
    padding: 15px;
    overflow: scroll;
    background: #fff;
    line-height: 1.5;
    li{
      margin-left: 15px;
    }
    hr{
      margin: 15px 0;
      height: 0;
      border: 0;
      border-top: 1px solid #ccc;
    }
    img{
      max-width: 100%;
    }
  }
  .article-handle{
    button{
      border: 1px solid #4fae7b;
      border-radius: 5px;
      padding: 5px 10px;
      background: #4fae7b;
      cursor: pointer;
      color: #ffffff;
    }
    button:hover{
      opacity: .9;
    }
    button[disabled]{
      cursor: wait;
    }
  }
  .publish{
    padding: 0 10px 10px;
    text-align: right;
  }
  .publish-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 1000;
  }
  .mask-box{
    background: #ffffff;
    border-radius: 5px;
    margin: 150px auto;
    width: 30%;
    text-align: center;
    overflow: hidden; /*消除对父元素的margin-top绑架*/
    h3{
      margin-top: 50px;
      color: #E6A23C;
    }
    button{
      padding: 5px 10px;
      border: 1px solid #5bc0de;
      background: #5bc0de;
      margin: 50px 0 20px;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.9;
    }
  }
  .publish-enter-active,.publish-leave-active{
    transition: all ease .5s;
  }
  .publish-enter,.publish-leave-to{
    opacity: 0;
  }
  @media screen and(max-width: 767px){
    .mask-box{
      width: 80%;
    }
    .preview{
      display: none;
    }
    .editor-write{
      width: 100%!important;
    }
    .article-details-title label, .article-details-tag label,.article-details-abstract label{
      display: none;
    }
  }
</style>