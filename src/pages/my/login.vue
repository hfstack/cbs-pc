<template>
  <div class="my-login">
    <headers></headers>
    <div class="sign-register clearfix">
      <div class="sign login-item fl">
        <p class="title">Sign In</p>
        <div class="form-item">
          <i class="iconfont email">&#xe60f;</i><input type="text" placeholder="email" v-model="loginEmail">
        </div>
        <div class="form-item">
          <i class="iconfont pwd">&#xe616;</i><input type="password"  placeholder="password"  v-model="loginPwd">
        </div>
        <invalidtip  :show="loginError">{{loginError}}</invalidtip>
        <div class="sign-btn" @click="login">Sign In</div>
        <p class="forget-pwd"><router-link :to="{name: 'forgetpwd'}">Forgot Your Password?</router-link></p>
      </div>
      <div class="register login-item fr">
        <p class="title">Create an account</p>
        <div class="form-item">
          <i class="iconfont email">&#xe60f;</i><input type="text" @focus="clearError" placeholder="Frequent Email Address" v-model="params.email"  v-validate="fields.email" data-vv-name="email" data-vv-validate-on="none">
        </div>
        <invalidtip  :show="verrors.has('email')">{{verrors.first('email')}}</invalidtip>
        <div class="form-item">
          <i class="iconfont pwd">&#xe616;</i><input type="password" @focus="clearError" placeholder="password"  v-model="params.password" v-validate="fields.password" data-vv-name="password" @keyup.enter="login">
        </div>
        <invalidtip :show="verrors.has('password')">{{verrors.first('password')}}</invalidtip>
        <div class="form-item">
          <i class="iconfont pwd">&#xe616;</i><input type="password" placeholder="Re-Enter Password" v-model="repwd">
        </div>
        <invalidtip  :show="pwdError">Two passwords are inconsistent</invalidtip>
        <invalidtip  :show="rerror">{{rerror}}</invalidtip>
        <p class="check"><checkbox :checked.sync="protocol"></checkbox> agree to the Privacy Policy.</p>
        <p class="check"><checkbox :checked.sync="params.subscribe"></checkbox>I'd like to receive exclusive offers and latest news by email.</p>
        <div class="register-btn" @click="register">Register</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        touristToken: window.localStorage.getItem('userToken') ||　'',
        email: '',
        password: '',
        subscribe: false
      },
      receive: false,
      repwd: '',
      pwdError: false,
      rerror: '',
      protocol: false,
      loginError: '',
      loginEmail: '',
      loginPwd: '',
      fields: {
        email: {
          required: true,
          regex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        },
        password: {
          required: true
        }
      }
    }
  },
  methods: {
    clearError: function() {
      this.verrors.clear();
      this.rerror = '';
      this.pwdError = false;
    },
    register() {
      
      this.pwdError = false;
      this.rerror = '';
      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        };
        if(this.params.password !== this.repwd) {
          this.pwdError = true;
          return;
        }
        if(!this.protocol) {
          this.rerror = 'Please agree to our Privacy Policy';
          return;
        }
        this.request('UsersRegister', this.params).then((res) => {
          if(res.status === 200) {
            window.localStorage && window.localStorage.setItem('userToken', res.content.token);
            window.localStorage && window.localStorage.setItem('userEmail', res.content.email);
            this.$router.push({
              name: 'myAccount'
            })
          } else {
            // this.$Messagebox({
            //   title: res.msg,
            //   type: 'error'
            // })
          }
        }, err => {
          // this.$Toast(err)
        })
      })
      
    },
    login() {
      this.rerror = '';
      this.loginError = '';
      if(!this.loginEmail) { 
        this.loginError = 'The email field is required.';
        return false;
      }
      if(!this.fields.email.regex.test(this.loginEmail)) {
        this.loginError = 'The email field format is invalid.';
        return false;
      }
      this.request('UsersLogin', {
        email: this.loginEmail,
        password: this.loginPwd
      }).then((res) => {
        if(res.status === 200 && res.content) {
          const userName = (res.content.first_name || '') + (res.content.last_name || '');
          window.localStorage && window.localStorage.setItem('userToken', res.content.token);
          window.localStorage && window.localStorage.setItem('userName', userName);
          window.localStorage && window.localStorage.setItem('userEmail',res.content.email);
          this.$router.push({
            name: 'myAccount'
          })
        } else {
          this.loginError = res.msg;
        }
      })
    }
  }
}
</script>

<style lang="less">
.my-login{
  background-color: #fff;
  .sign-register{
    width: 950px;
    margin: 0 auto;
    margin-top: 90px;
    padding-bottom: 40px;
    .login-item{
      width: 475px;
      .title{
        margin: 20px 0 30px;
        text-align: left;
        font-weight: bold;
      }
      .form-item{
        height: 56px;
        line-height: 56px;
        display: flex;
        i {
          font-size: 21px;
          display: inline-block;
          padding-left: 20px;
          // border: 1px solid red;
        }
        input {
          padding:0 13px;
          color: #939399;
          height: 54px;
          flex-grow: 1;
          // border: 1px solid red;
        }
        width: 416px;
        border:1px solid rgba(221,221,221,1);
        margin-bottom: 30px;
      }
      .sign-btn {
        height: 50px;
        width: 250px;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        color: #000000;
        background:linear-gradient(0deg,rgba(226,226,226,1) 0%,rgba(254,254,254,1) 100%);
        border:1px solid rgba(147,147,153,1);
        cursor: pointer;
      }
      .forget-pwd{
        color: #939399;
        font-size: 16px;
        margin-top: 10px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .register{
      padding-left: 60px;
      border-left: 1px solid #DDDDDD;
      .check {
        text-align: left;
        font-size: 14px;
        margin-top: 26px;
      }
      .register-btn{
        width:250px;
        height:50px;
        background:rgba(222,82,94,1);
        border-radius:4px;
        color: #fff;
        line-height: 50px;
        margin-top: 47px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>

