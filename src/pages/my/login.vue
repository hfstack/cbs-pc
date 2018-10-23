<template>
  <div class="my-login">
    <headers></headers>
    <div class="sign-register clearfix">
      <div class="sign login-item fl">
        <p class="title">Sign In</p>
        <div class="form-item">
          <i class="iconfont"></i><input type="text" placeholder="email">
        </div>
        <div class="form-item">
          <i class="iconfont"></i><input type="text"  placeholder="password">
        </div>
        <div class="sign-btn">Sign In</div>
        <p class="forget-pwd">Forgot Your Password?</p>
      </div>
      <div class="register login-item fr">
        <p class="title">Create an account</p>
        <div class="form-item">
          <i class="iconfont"></i><input type="text"  placeholder="Frequent Email Address">
        </div>
        <div class="form-item">
          <i class="iconfont"></i><input type="text" placeholder="password">
        </div>
         <div class="form-item">
          <i class="iconfont"></i><input type="text" placeholder="Re-Enter Password">
        </div>
        <p class="check">I agree to the Privacy Policy.</p>
        <p class="check">I'd like to receive exclusive offers and latest news by email.</p>
        <div class="register-btn">Register</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {

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
    .login-item{
      width: 475px;
      .title{
        margin: 20px 0 30px;
        text-align: left;
      }
      .form-item{
        height: 56px;
        line-height: 56px;
        padding: 0 20px;
        i {
          font-size: 20px;
        }
        input {
          padding:0 13px;
          color: #939399;
          height: 52px;
          width: 100%;
          float: left;
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
      }
      .forget-pwd{
        color: #939399;
        font-size: 16px;
        margin-top: 10px;
        text-align: left;
      }
    }
    .register{
      padding-left: 60px;
      border-left: 1px solid #DDDDDD;
      .check {
        text-align: left;
        font-size: 14px;
        font-weight: bold;
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
      }
    }
  }
}
</style>

