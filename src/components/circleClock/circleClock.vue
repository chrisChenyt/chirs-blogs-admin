<template>
    <div id="clockCon">
        <div class="m-16"></div>
        <div class="m-17"></div>
        <div class="m-18 xzleft"></div>
        <div class="m-19"></div>
        <div class="m-20 xzleft"></div>
        <div class="m-21"></div>
        <div class="m-22"></div>
        <div class="m-23 xzleft"></div>
        <div class="m-24" id="localtime"></div>
        <div class="m-11">
            <div class="m-k-1"><div class="t1"></div></div>
            <div class="m-k-2"><div class="t2"></div></div>
            <div class="m-k-3"><div class="t3"></div></div>
            <div class="m-k-4"><div class="t4"></div></div>
            <div class="m-k-5"><div class="t5"></div></div>
            <div class="m-k-6"><div class="t6"></div></div>
            <div class="m-k-7"><div class="t7"></div></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
            }
        },
        mounted(){
            //获取当前时间带跳动
            function showLocale(objD){
                var str,colorhead,colorfoot;
                var yy = objD.getYear();
                if(yy<1900) yy = yy+1900;
                var MM = objD.getMonth()+1;
                if(MM<10) MM = '0' + MM;
                var dd = objD.getDate();
                if(dd<10) dd = '0' + dd;
                var hh = objD.getHours();
                if(hh<10) hh = '0' + hh;
                var mm = objD.getMinutes();
                if(mm<10) mm = '0' + mm;
                var ss = objD.getSeconds();
                if(ss<10) ss = '0' + ss;
                var ww = objD.getDay();
                if  ( ww==0 )  colorhead="";
                if  ( ww > 0 && ww < 6 )  colorhead="";
                if  ( ww==6 )  colorhead="";
                // if  (ww==0)  ww="星期日";
                // if  (ww==1)  ww="星期一";
                // if  (ww==2)  ww="星期二";
                // if  (ww==3)  ww="星期三";
                // if  (ww==4)  ww="星期四";
                // if  (ww==5)  ww="星期五";
                // if  (ww==6)  ww="星期六";
                colorfoot=""
                str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "  " + colorfoot;
                return(str);
            }
            function tick(){
                var today;
                today = new Date();
                var timer;
                if(document.getElementById("localtime").innerHTML != null){
                    document.getElementById("localtime").innerHTML = showLocale(today);
                    timer = setTimeout(tick, 1000);
                } else{
                    clearTimeout(timer)
                }
            }
            tick();
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    #clockCon{
        position: absolute;
        width: 322.5px;
        height: 375px;
        right: 0;
        bottom: 0;
        *{overflow:hidden;}
        .xzleft{
            -webkit-transform: rotateZ(720deg);
            -moz-transform: rotateZ(720deg);
            -o-transform: rotateZ(720deg);
            -ms-transform: rotateZ(720deg);
            transform: rotateZ(720deg);
        }
        .m-16{
            width:187.5px;
            height:187.5px;
            z-index:30;
            background: no-repeat url("assets/gif-13-1.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
        }
        .m-17{
            width:187.5px;
            height:187.5px;
            z-index:21;
            filter:alpha(opacity=50);
            opacity:0.50;  
            background: no-repeat url("assets/gif-13-2.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            transition:all .0.6s;
            animation:rotate 0.6s infinite linear;
        }
        .m-18{
            width:187.5px;
            height:187.5px;
            z-index:25;
            background: no-repeat url("assets/gif-13-3.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            -moz-transition:all .15s;
            -webkit-transition:all .15s;
            transition:all .15s;
            -moz-animation:rotate 15s infinite linear;
            -webkit-animation:rotate 15s infinite linear;
            animation:rotate 15s infinite linear;
        }
        .m-19{
            width:187.5px;
            height:187.5px;
            z-index:22;
            filter:alpha(opacity=70); 
            -moz-opacity:0.70; 
            opacity:0.70;  
            background: no-repeat url("assets/gif-13-4.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            -moz-transition:all .2s;
            -webkit-transition:all .2s;
            transition:all .2s;
            -moz-animation:rotate 2s infinite linear;
            -webkit-animation:rotate 2s infinite linear;
            animation:rotate 2s infinite linear;
        }
        .m-20{
            width:187.5px;
            height:187.5px;
            z-index:21;
            filter:alpha(opacity=50); 
            -moz-opacity:0.50; 
            opacity:0.50;  
            background: no-repeat url("assets/gif-13-5.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            -moz-transition:all .0.8s;
            -webkit-transition:all .0.8s;
            transition:all .0.8s;
            -moz-animation:rotate 0.8s infinite linear;
            -webkit-animation:rotate 0.8s infinite linear;
            animation:rotate 0.8s infinite linear;
        }
        .m-21{
            width:187.5px;
            height:187.5px;
            z-index:21;
            filter:alpha(opacity=50); 
            -moz-opacity:0.50; 
            opacity:0.50;  
            background: no-repeat url("assets/gif-13-6.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            transition:all .0.3s;
            animation:rotate 0.3s infinite linear;
        }
        .m-22{
            width:187.5px;
            height:187.5px;
            z-index:21;
            filter:alpha(opacity=80); 
            -moz-opacity:0.80; 
            opacity:0.80;  
            background: no-repeat url("assets/gif-13-7.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            transition:all .25s;
            animation:rotate 25s infinite linear;
        }
        .m-23{
            width:187.5px;
            height:187.5px;
            z-index:21;
            filter:alpha(opacity=80); 
            -moz-opacity:0.80; 
            opacity:0.80;  
            background: no-repeat url("assets/gif-13-8.png") left top;
            background-size:187.5px 187.5px;
            position:absolute;top:60px;left:22.5px;right:0;
            border-radius: 175px;
            transition:all .0.3s;
            animation:rotate 0.3s infinite linear;
        }
        .m-24{
            width:auto;
            height:37.5px;
            z-index:40;
            filter:alpha(opacity=50);
            -moz-opacity:0.50;
            opacity:0.50;
            position:absolute;top:300px;left:34px;
            text-shadow:#9C0 0px 1px 2px;
            font:30px/21px 'ds-digitalbold';
            color:#3CF;
        }
        @-moz-keyframes rotate{
            100%{
                -moz-transform:rotate(0deg);
            }
            100%{
                -moz-transform:rotate(360deg);
            }
        }
        @-webkit-keyframes rotate{
            100%{
                -webkit-transform:rotate(0deg);
            }
            100%{
                -webkit-transform:rotate(360deg);
            }
        }
        @keyframes rotate{
            100%{
                transform:rotate(0deg);
            }
            100%{
                transform:rotate(360deg);
            }
        }
        .m-11{
            width:313.5px;
            height:357px;
            background:url(assets/gif-10.png);
            background-size: 313.5px 357px;
            position: absolute;top:0;right:0;left:0;
            z-index:5;
            filter:alpha(opacity=50);
            opacity:0.50;

            @keyframes myfirst
            {
                0%   {right:0px; top:0px;width:0px;height:25.5px;}
                100% {right:0px; top:0px;width:75px;height:25.5px;}
            }

            .m-k-1{width:43.5px;height:25.5px;position:absolute;top:14.25px;right:28.5px;z-index:6;
                .t1{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#37dad7; 
                    animation:myfirst 0.3s linear 0.5s infinite alternate;
                    -moz-animation:myfirst 0.3s linear 0.5s infinite alternate;
                    -webkit-animation:myfirst 0.3s linear 0.5s infinite alternate;
                    -o-animation:myfirst 0.3s linear 0.5s infinite alternate;
                }
            }
            .m-k-2{width:43.5px;height:25.5px;position:absolute;top:49.5px;right:28.5px;z-index:6;
                .t2{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#8cd6b7; 
                    animation:myfirst 0.18s linear 0.18s infinite alternate;
                    -moz-animation:myfirst 0.18s linear 0.18s infinite alternate;
                    -webkit-animation:myfirst 0.18s linear 0.18s infinite alternate;
                    -o-animation:myfirst 0.18s linear 0.18s infinite alternate;
                }
            }
            .m-k-3{width:43.5px;height:25.5px;position:absolute;top:84.75px;right:28.5px;z-index:6;
                .t3{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#6ccea5; 
                    animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -moz-animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -webkit-animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -o-animation:myfirst 0.2s linear 0.2s infinite alternate;
                }
            }
            .m-k-4{width:43.5px;height:25.5px;position:absolute;top:120.75px;right:28.5px;z-index:6;
                .t4{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#abd281; 
                    animation:myfirst 0.15s linear 0.15s infinite alternate;
                    -moz-animation:myfirst 0.15s linear 0.15s infinite alternate;
                    -webkit-animation:myfirst 0.15s linear 0.15s infinite alternate;
                    -o-animation:myfirst 0.15s linear 0.15s infinite alternate;
                }
            }
            .m-k-5{width:43.5px;height:25.5px;position:absolute;top:155.25px;right:28.5px;z-index:6;
                .t5{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#a0b653; 
                    animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -moz-animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -webkit-animation:myfirst 0.2s linear 0.2s infinite alternate;
                    -o-animation:myfirst 0.2s linear 0.2s infinite alternate;
                }
            }
            .m-k-6{width:43.5px;height:25.5px;position:absolute;top:190.5px;right:28.5px;z-index:6;
                .t6{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#d3b342; 
                    animation:myfirst 0.08s linear 0.08s infinite alternate;
                    -moz-animation:myfirst 0.08s linear 0.08s infinite alternate;
                    -webkit-animation:myfirst 0.08s linear 0.08s infinite alternate;
                    -o-animation:myfirst 0.08s linear 0.08s infinite alternate;
                }
            }
            .m-k-7{width:43.5px;height:25.5px;position:absolute;top:225.75px;right:28.5px;z-index:6;
                .t7{
                    width:0px;
                    height:34px;
                    float:right;
                    background:red;
                    position:relative;
                    background:#f4ae28; 
                    animation:myfirst 0.4s linear 0.4s infinite alternate;
                    -moz-animation:myfirst 0.4s linear 0.4s infinite alternate;
                    -webkit-animation:myfirst 0.4s linear 0.4s infinite alternate;
                    -o-animation:myfirst 0.4s linear 0.4s infinite alternate;
                }
            }

        }

    }
</style>