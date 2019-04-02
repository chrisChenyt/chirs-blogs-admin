<template>
    <div id="moveTitleCon">
        <div class="m-8"></div>
        <div class="m-9"><div class="masked1" id="sx8">cerp</div></div> 
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    #moveTitleCon{
        position: absolute;
        width: 100%;
        top: 22.5px;
        .m-8{
            width:462px;
            height:77px;
            position: absolute;
            right:28.5px;
            left:0;
            top:0;
            margin:0 auto;
            background: no-repeat url("assets/gif-8-1.png") left top;
            background-size:462px 77px;
            filter:alpha(opacity=30);
            opacity:0.30;  
            z-index:21;
        }
        .m-9{
            width:532px;
            height:77px;
            position: absolute;
            right:28.5px;
            left:0;
            margin:0 auto;
            font:41px/108px '微软雅黑';
            z-index:22;
            color:#f4ab20;
            text-align:center;
            line-height:77px;
        }
        .masked1{
            background-image: -webkit-linear-gradient(left, #0ee5ff, #f4ab20 50%, #0ee5ff 50%, #f4ab20 100%, #0ee5ff);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-background-size: 200% 100%;
            -webkit-animation: masked-animation 3s infinite linear;
        }
        @-webkit-keyframes masked-animation {
            0%  { background-position: 0 0;}
            100% { background-position: -100% 0;}
        }
    }
</style>
<script type="text/ecmascript-6">
</script>