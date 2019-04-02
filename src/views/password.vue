<template>
  <div id="setPassword">
    <div class="breadcrumbOpt">
      <a class="breadcrumbLeft" href="/">首页</a>
      <a class="breadcrumbItem">重置密码</a>
    </div>
    <div class="setPass">
      <el-form :model="passForm" status-icon :rules="rules2" ref="passForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="初始密码" prop="passold":error="errorMsg">
          <el-input class="input-nuxt" type="password" v-model="passForm.passold" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input class="input-nuxt" type="password" v-model="passForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input class="input-nuxt" type="password" v-model="passForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="passwordBtn" type="primary" @click="submitForm('passForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import webHttp from '../methods/http.js'
  export default {
    data() {
      let validatePassold = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'))
        } else {
          callback()
        }
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.passForm.checkPass !== '') {
            this.$refs.passForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.passForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        passForm: {
          passold: '',
          pass: '',
          checkPass: ''
        },
        errorMsg: '',
        rules2: {
          passold: [
            { validator: validatePassold, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.passForm.passold)
            console.log(this.passForm.checkPass)
            this.errorMsg = ''
            webHttp.request({
              url: '/api/changePassword',
              method: 'POST',
              data: {
                phone: localStorage.getItem('phone'),
                oldPassword: this.passForm.passold,
                newPassword: this.passForm.checkPass
              },
              callback: (res) => {
                if(res.success){
                  this.$refs[formName].resetFields();
                  this.$notify.success({// 修改成功
                    title: '提示',
                    message: '密码修改成功！',
                    duration: 2000
                  })
                } else {
                  this.errorMsg = res.message
                  this.$notify.error({// 修改失败，显示提示语
                    title: '提示',
                    message: res.message,
                    duration: 2000
                  })
                }
              }
            })
          } else {
            return false
          }
        })
      }
    },
    components: {
      webHttp
    }
  }
</script>
<style lang='less'>
  #setPassword{
    .setPass{
      background-color: #fff;
      padding: 20px;
      margin: 0 20px;
    }
  }
  .input-nuxt{
    width: 270px;
    input{
      width: 225px;
      padding: 7px;
      line-height: 16px;
      border: 2px solid #cbcad8;
      background: #fff;
      border-radius: 3px;
      height: auto;
      &:focus{
        border-color: #57b382;
        outline: 0;
      }
    }
  }
  // .el-button--primary{
  //   background: #4fae7b!important;
  //   border-color: #4ba575!important;
  // }
  .passwordBtn {
    color: #fff;
    background: #57b382;
    border-color: #4ba575;
    border-bottom: 2px solid #4ba575;
    &:hover {
      color: #f2f2f2;
      background: #4fae7b;
    }
  }
</style>
