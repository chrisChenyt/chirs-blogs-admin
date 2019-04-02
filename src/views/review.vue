<template>
  <div>
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">查看文章</a>
    </div>
    <div class="tableMainHeader">
      <p class="lead"><em>查看文章（reviewArticle）</em>查看已发布在博客中的文章。</p>
    </div>
    <div class = "article-review">
      <div>
        <div class = "review-title"><h2>{{ article.title }}</h2></div>
        <div class = "review-tags">
          <h4>标签：</h4>
          <span v-for = "t in article.tag">{{ t }}</span>
        </div>
        <div class = "review-abstract">
          <h4>前言：</h4>
          <span>{{ article.abstract }}</span> 
        </div>
        <div class = "review-date">
          <h4>发表时间：</h4>
          <span>{{ article.date }}</span>
        </div>
        <div class = "review-content" v-html = "article.content">{{ article.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import  "@/../static/UE/prism.css"
  import Prism from "@/../static/UE/prism.js"
  import webHttp from '../methods/http.js'
	export default {
    data() {
      return {
        article: {}
      }
    },
    created() {
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
          this.$nextTick(function(){
            Prism.highlightAll()
          })
        }
      })
    },
		computed: {
		},
		methods: {
		}
	}
</script>
<style lang = "less">
	.article-review{
		box-sizing: border-box;
		padding: 20px;
		color: #404040;
		line-height: 1.8;
		width: 80%;
		margin: 20px auto 0;
		box-shadow: 0 0 1px rgba(0,0,0,0.8);
		border-radius: 2px;
	}
	.review-tags{
		h4{
			display: inline-block;
		}
		span{
			margin-right: 10px;
		}
	}
	.review-abstract,.review-content,.review-date{
		margin-top: 10px;
	}
	.review-abstract h4,.review-date h4{
		display: inline-block;
	}
	.review-title{
		margin-top: 10px;
		text-align: center;
	}
	.review-content {
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
	@media screen and(max-width: 767px){
		.article-review{
			margin-top: 10px;
			padding: 10px;
			width: 100%;
			pre{
				box-sizing: border-box;
			}
		}
	}
</style>