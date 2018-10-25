<template>
  <div>
    <headers></headers>
    <div class="setnewpwd-page">
       <p class="title">CREATE A NEW PASSWORD</p>
      <div class="form-item">
        <i class="iconfont input-icon"></i>

        <input type="text" class="input-control" v-model="email" placeholder="Frequent Email Address" v-validate="fields.email" data-vv-name="email" data-vv-validate-on="none">
        <invalidtip  :show="verrors.has('email')">{{verrors.first('email')}}</invalidtip>
      </div>
      <div class="form-item">
        <i class="iconfont input-icon"></i>
        <input type="text" class="input-control" v-model="email" placeholder="New Password" v-validate="fields.email" data-vv-name="email" data-vv-validate-on="none">
        <invalidtip  :show="verrors.has('email')">{{verrors.first('email')}}</invalidtip>
      </div>
      <div class="form-item">
        <i class="iconfont input-icon"></i>

        <input type="text" class="input-control" v-model="email" placeholder="Re-Enter Password" v-validate="fields.email" data-vv-name="email" data-vv-validate-on="none">
        <invalidtip  :show="verrors.has('email')">{{verrors.first('email')}}</invalidtip>
      </div>
      <div class="submit-btn" @click="send">Submit</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      fields: {
        email: {
          required: true,
          regex: /(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{2,47}$/
        }
      }
    }
  },
  methods: {
    send() {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        };
        this.request('PwdReset', {
          email: this.email
        }).then((res) => {
          if (res.status === 200) {
            this.$router.push({
              name: 'forgetSendSuccess',
              query: {
                email: this.email
              }
            })
          } else {
            messagebox({
              title: res.msg || '网络错误',
              type: 'error'
            })
          }
        }).catch(res => {
          messagebox({
            title: res.msg || '网络错误',
            type: 'error'
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
html, body{
  background: #fff;
}
.setnewpwd-page{
  background-color: #fff;
  padding-top: 90px;
  margin: 0 auto;
  .title{
    font-size: 30px;
    color: #222222;
  }
  .form-item{
    width: 556px;
    position: relative;
    margin: 0 auto;
    .input-icon{
      position: absolute;
      left:20px;
      top: 48px;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  }
  .input-control {
    width: 556px;
    height: 56px;
    padding: 0 56px;
    border:1px solid rgba(221,221,221,1);
    margin-top: 30px;
  }
  .submit-btn {
    width:250px;
    height:50px;
    line-height: 50px;
    background:#DE525E;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    cursor: pointer;
  }
  .invalid{
    text-align: left;
    margin-top: 10px;
  }
}
</style>

