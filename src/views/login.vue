<template>
    <div class="windowsCon">
        <starSky></starSky>
        <clock></clock>
        <movePro></movePro>
        <moveLogo></moveLogo>
        <moveTitle></moveTitle>
        <div id="loginBoxCon">
            <div id="loginBox" style="display:none;">
                <div id="formBox" class="page-content fadeIn">
                    <div>
                        <p class="login_label">手机号</p>
                        <div class="rain phone_rain unfocus start">
                            <div class="border phone_border unfocus start">
                                <input v-model="phone" class="input phone_input" type="text" maxlength="11">
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="login_label">密码</p>
                        <div class="rain password_rain unfocus start">
                            <div class="border password_border unfocus start">
                                <input v-model="password" class="input password_input" type="password" maxlength="20">
                            </div>
                        </div>
                    </div>
                    <div><span class="login_btn" @click="login">登录</span></div>
                </div>
                <!-- 四角圆圈 -->
                <div class="circleBase circle-1 xzleft"></div>
                <div class="circleBase circle-2"></div>
                <div class="circleBase circle-3"></div>
                <div class="circleBase circle-4 xzleft"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import starSky from '../components/starSky/starSky.vue'
    import clock from '../components/circleClock/circleClock.vue'
    import movePro from '../components/movePro/movePro.vue'
    import moveLogo from '../components/moveLogo/moveLogo.vue'
    import moveTitle from '../components/moveTitle/moveTitle.vue'
    import webHttp from '../methods/http.js'
    import util from '../methods/util.js'
    export default {
        data(){
            return{
                phone: '',
                password: '',
            }
        },
        mounted() {
            // 登录框动画
            $("#loginBox").show();
            // 输入框边框
            var $phone_input = $('#formBox .phone_input'),
                $password_input = $('#formBox .password_input');
            var $phone_rainbow_and_border = $('.phone_rain, .phone_border'),
                $password_rainbow_and_border = $('.password_rain, .password_border');
            
            $phone_input.bind('focus', function(){
                $phone_rainbow_and_border.addClass('end').removeClass('unfocus start');
            });
            $phone_input.bind('blur', function(){
                $phone_rainbow_and_border.addClass('unfocus start').removeClass('end');
            });

            $password_input.bind('focus', function(){
                $password_rainbow_and_border.addClass('end').removeClass('unfocus start');
            })
            $password_input.bind('blur', function(){
                $password_rainbow_and_border.addClass('unfocus start').removeClass('end');
            })
        },
        components: {
            starSky, clock, movePro, moveLogo, moveTitle
        },
        methods:{
            login(){
                if (!util.checkMobile(parseInt(this.phone))) {//手机号格式是否正确
                    this.$notify.error({
                        title: '提示',
                        message: '您输入的手机号有误',
                        duration: 2000
                    })
                } else {
                    webHttp.request({
                        url: '/auth/login',
                        method: 'POST',
                        data: {
                            phone: this.phone,
                            password: this.password
                        },
                        callback: (res) => {
                            if(res.success){ // 如果成功
                                localStorage.setItem('token',res.token); // 用localStorage把token存下来
                                localStorage.setItem('name',jwt.decode(res.token).name); // 把用户名存下来
                                localStorage.setItem('phone',jwt.decode(res.token).phone); // 把手机号存下来
                                this.$notify.success({// 登录成功，显示提示语
                                    title: '提示',
                                    message: '登录成功！',
                                    duration: 2000
                                })
                                this.$router.push({name: 'newMsg'}) // 进入首页，登录成功
                            }else{
                                this.$notify.error({
                                    title: '提示',
                                    message: res.message, // 登录失败，显示提示语
                                    duration: 2000
                                })
                                localStorage.setItem('token',null); // 将token清空
                            }
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .windowsCon{
        width: 100%;
        height: 100vh;
        position: relative;
        #loginBoxCon{
            width: 100%;
            position: absolute;
            top: 127.5px;
        }
        #loginBox{
            width: 510.5px;
            height: 465px;
            background: url('../assets/loginBlackBg.png') no-repeat;
            background-size: 100% 100%;
            transition-duration: 1s;
            border-radius: 6px;
            animation: 1.5s open ease-in-out forwards;
            transform-style: preserve-3d;
            transition-property: height, width;
            margin: 0 auto;
            padding: 152.8px 116.3px 138.78px 102.88px;
            #formBox{
                width: 100%;
                height: 100%;
                padding: 13.5px 11px 0 13px;
                .login_label{
                    color: #19a9da;
                    font: 15px/13.5px '楷体';
                    padding-left: 4.5px;
                }
                .login_btn{
                    cursor: pointer;
                    user-select: none;
                    font-size: 15px;
                    display: block;
                    text-align: center;
                    color: #999;
                    padding: 5px 8px;
                    border: 1px solid #000;
                    font-weight: lighter;
                    border-radius: 11.25px;
                    background: #45484d;
                    background: -moz-linear-gradient(top, #222 0%, #111 100%);
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#222), color-stop(100%,#111));
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#22222', endColorstr='#11111',GradientType=0 );
                    -moz-box-shadow: 0px 1px 1px #000, 0px 1px 0px rgba(255,255,255,.3) inset;
                    -webkit-box-shadow: 0px 1px 1px #000, 0px 1px 0px rgba(255,255,255,.3) inset;
                    box-shadow: 0px 1px 1px #000,0px 1px 0px rgba(255,255,255,.3) inset;
                    text-shadow: 0 1px 1px #000;
                    outline: none;
                    width:60px;
                    margin:4.5px 0 0 4.5px;
                }
                .input{
                    width: 100%;
                    border-radius: 3.75px;
                    background: #111;
                    box-shadow: 0px 0px 4px #000 inset;
                    font-size: 20px;
                    color: #9C0;
                    font-family: 'nasalizationregular';
                    letter-spacing: 1px;;
                    padding-left: 8px;
                }
                
                .rain{
                    padding: 7.5px 9px 9px 7.5px;
                    box-shadow: 6px 6px 6px rgba(0,0,0,1) inset, -6.75px -6.75px 6px rgba(0,0,0,1) inset;
                }

                .border{
                    padding: 1px;
                    border-radius: 3.75px;
                }

                .border,
                .rain,
                .border.start,
                .rain.start{
                    background-repeat: repeat-x, repeat-x, repeat-x, repeat-x;
                    background-position: 0 0, 0 0, 0 0, 0 0;
                    background-image: -moz-linear-gradient(left, #09BA5E 0%, #00C7CE 15%, #3472CF 26%, #00C7CE 48%, #0CCF91 91%, #09BA5E 100%);
                    background-image: -webkit-gradient(linear, left top, right top, color-stop(1%,rgba(0,0,0,.3)), color-stop(23%,rgba(0,0,0,.1)), color-stop(40%,rgba(255,231,87,.1)), color-stop(61%,rgba(255,231,87,.2)), color-stop(70%,rgba(255,231,87,.1)), color-stop(80%,rgba(0,0,0,.1)), color-stop(100%,rgba(0,0,0,.25)));
                    background-color: #39f;
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00BA1B', endColorstr='#00BA1B',GradientType=1 );
                }
                .border.end,
                .rain.end{
                    -moz-transition-property: background-position;  
                    -moz-transition-duration: 30s;
                    -moz-transition-timing-function: linear;
                    -webkit-transition-property: background-position;  
                    -webkit-transition-duration: 30s;  
                    -webkit-transition-timing-function: linear;
                    -o-transition-property: background-position;  
                    -o-transition-duration: 30s;  
                    -o-transition-timing-function: linear;
                    transition-property: background-position;  
                    transition-duration: 30s;  
                    transition-timing-function: linear;
                    background-position: -5400px 0, -4600px 0, -3800px 0, -3000px 0;    
                }
                @-webkit-keyframes colors {
                    0% {background-color: #39f;}
                    15% {background-color: #F246C9;}
                    30% {background-color: #4453F2;}
                    45% {background-color: #44F262;}
                    60% {background-color: #F257D4;}
                    75% {background-color: #EDF255;}
                    90% {background-color: #F20006;}
                    100% {background-color: #39f;}
                }
                .border,.rain{
                    -webkit-animation-direction: normal;
                    -webkit-animation-duration: 20s;
                    -webkit-animation-iteration-count: infinite;
                    -webkit-animation-name: colors;
                    -webkit-animation-timing-function: ease;
                }

                .border.unfocus{
                    background: #333 !important;    
                    box-shadow: 0px 0px 11.25px rgba(255,255,255,.2);
                    -webkit-animation-name: none;
                }
                .rain.unfocus{
                    background: #000 !important;    
                    -webkit-animation-name: none;
                }
            }
            @keyframes open {
                0% {
                    transform: scale(0) rotateX(360deg);
                    height: 225px;
                    width: 225px;
                }
                50% {
                    transform: none;
                    height: 225px;
                }
                75% {
                    height: 465px;
                    width: 225px;
                }
                100% {
                    width: 510.5px;
                }
            }
            .circleBase {
                width: 30px;
                height: 30px;
                position: absolute;
                z-index: 15;
                filter: alpha(opacity=50);
                opacity: 0.50;
                background: no-repeat url(../assets/gif-6-9.png) left top;
                background-size: 30px 30px;
                border-radius: 18.75px;
                transition: all .0.5s;
                animation: rotate 0.5s infinite linear;
            }
            .circle-1{
                top: 18.75px;
                left: 7.5px;
            }
            .circle-2{
                top: 18.75px;
                right: 33.75px;
            }
            .circle-3{
                bottom: 3.75px;
                right: 33.75px;
            }
            .circle-4{
                bottom: 3.75px;
                left: 7.5px;
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
            .page-content {
                transition-duration: 1s;
                opacity: 0;
            }

            .fadeIn {
                animation: 1s fadeIn cubic-bezier(0.015, 0.695, 0.34, 1.365) forwards;
                animation-delay: 1.5s;
            }

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(22.5px);
                }
                100% {
                    opacity: 1;
                    transform: none;
                }
            }
        }
    }
</style>