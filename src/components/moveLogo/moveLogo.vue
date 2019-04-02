<template>
    <div id="moveLogoCon">
        <div class="m-xz8 xzleft"></div>
        <div class="m-xz9"></div>
        <img src="../../assets/head.jpeg">
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    #moveLogoCon{
        position: absolute;
        top: 23px;
        left: 75px;
        >img{
            width: 75px;
            height: 75px;
            border-radius: 50%;
            padding: 15px;
        }
        .m-xz8 {
            width: 75px;
            height: 75px;
            position: absolute;right:0;left:0;top:0;
            z-index:8;
            filter:alpha(opacity=50);
            opacity:0.50;  
            background: no-repeat url("../../assets/gif-4.png") left top;
            background-size: 75px 75px;
            border-radius: 56px;
            transition:all .20s;
            animation:rotate 20s infinite linear;
        }
        .m-xz9 {
            width: 75px;
            height: 75px;
            position: absolute;right:0;left:0;top:0;
            z-index:8;
            filter:alpha(opacity=70); 
            opacity:0.70;  
            background: no-repeat url("../../assets/gif-5.png") left top;
            background-size: 75px 75px;
            border-radius: 56px;
            transition:all .6s;
            animation:rotate 6s infinite linear;
        }
        .xzleft{
            transform: rotateZ(720deg);
        }
        @keyframes rotate{
            100%{
                transform:rotate(0deg);
            }
            100%{
                transform:rotate(360deg);
            }
        }
    }
</style>

<script type="text/ecmascript-6">
</script>