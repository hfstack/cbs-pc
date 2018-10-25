<template>
  <div>
    <headers></headers>
    <div class="sendEmail-page">
      <p class="title">Check your email</p>
      <p class="desc">An email has been sent to the provided email address.</span></p>
      <p class="desc">If you requested a new password but didn't receive your password-reset email:</p>
      <p class="desc">1. Check the spam or junk mail folder in your email account.</p>
      <p class="desc">2. Try to <a href="javascript:;"@click="resend" style="color: #0069D9; text-decoration: underline">reset your password</a> again.</p>
      <p class="desc">3. If you still don't receive the email after requesting a password reset, wait 24 hours and try again.</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      confirmModal: {
        show: false,
        title: '',
        content: '',
        onText: 'yes',
        action: () => {}
      }
    }
  },
  mounted() {
    this.email = this.$route.query.email || ''
  },
  methods: {
    // 重发
    resend() {
      this.confirmModal = {
        show: true,
        type: 'alert',
        title: '',
        onText: 'ok',
        content: `we've send an email to ${this.email} with this instructions to you rsent you password`,
        action: this.resendCB
      }
    },
    resendCB() {
      this.request('PwdReset', {
        email: this.email
      }).then((res) => {
        if (res.status === 200) {
          this.confirmModal.show = false;
        }
      })
    }
  }
}
</script>
<style lang="less">
html, body{
  background: #fff;
}
.sendEmail-page{
  padding-top: 100px;
  background-color: #fff;
  .title{
    font-size: 30px;
    color: #000;
    text-align: center;
    margin-bottom: 50px;
  }
  .desc{
    width: 702px;
    margin: 0 auto;
    color: #222222;
    text-align: left;
    font-size: 16px;
    line-height: 32px;
  }
}
</style>

