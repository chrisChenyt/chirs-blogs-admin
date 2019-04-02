<template>
    <div id="moveProCon">
        <div class="m-10"></div>
        <div class="m-14"><div class="ss"></div></div>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    #moveProCon{
        position: absolute;
        bottom: 112.5px;
        .m-10{
            width:338.25px;
            height:60.75px;
            background:url(../../assets/gif-9.png);
            background-size:338.25px 60.75px;
            position:absolute;top:0;left:0;right:0;
            z-index:5;
        }
        .m-14{
            width:73.5px;
            height:22.5px;
            overflow:hidden;
            border-radius:15px;
            position: absolute;
            top: 27px;
            left: 250.5px;
            filter:alpha(opacity=80); 
            -moz-opacity:0.80; 
            opacity:0.80;
            .ss{
                width:0px;
                height:26.25px;
                position:relative;
                background-color:#F60; 
                animation:myfirst 1s linear 1s infinite alternate;
                -moz-animation:myfirst 1s linear 1s infinite alternate;
                -webkit-animation:myfirst 1s linear 1s infinite alternate;
                -o-animation:myfirst 1s linear 1s infinite alternate;
            }
            @keyframes myfirst
            {
                0%   {right:0px; top:0px;width:0px;height:26.25px;}
                100% {background-color:#FC0; right:0px; top:0px;width:135px;height:26.25px;}
            }
        }

    }
</style>
<script type="text/ecmascript-6">
    
    export default {
        data(){
            return{
            }
        },
        mounted() {
        },
        components: {
        },
        methods:{
        }
    }
</script>