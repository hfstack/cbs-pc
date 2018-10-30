<template>
  <div class="my-profile clearfix">
    <div class="avator fl">
      <img src="../../assets/images/my/head.png" class="img" alt="">
      <a class="upload-btn">Upload a Photo</a>
    </div>
    <div class="form-group fl">
      <div class="form-item">
        <p class="form-label">Full Name</p>
        <input type="text" class="form-control" v-model="params.name" placeholder="Full Name">
      </div>
      <div  class="form-item">
        <p class="form-label">Date Of Birth</p>
        <datepicker :value.sync="params.birth" lang="en"></datepicker>
      </div>
      <div  class="form-item">
        <p class="form-label">Gender</p>
        <input class="form-radio" ref="radio1" name="sex" value="men" type="radio"/><span class="radio-detail">Ms</span>
        <input class="form-radio" ref="radio2" name="sex"  value="femal" type="radio" /><span class="radio-detail">Mr</span>
        <input class="form-radio" ref="radio3" name="sex"  value=""  type="radio" /><span class="radio-detail">Privacy</span>
        
      </div>
      <div  class="form-item">
        <p class="form-label">Email</p>
        <input type="text" name="" id="" class="form-control" v-model="params.email">
      </div>
      <div  class="form-item">
        <p class="form-label">Password</p>
        <input type="psasword" name="" id="" class="form-control" v-model="params.password">
      </div>
      <div class="save-btn" @click="personalEdit">SAVE</div>
    </div>
  </div>
</template>
<script>
import datepicker from 'components/layout/Datepicker'
export default {
   data () {
    return {
      params: {
        birth: '',
        gender: 'Man',
        email: 'huanglongfei@1212.com',
        password: 'huanglongfei'
      },
      genders: [
        {
          name: 'Man',
          method: this.genderSelect
        },
         {
          name: 'Female',
          method: this.genderSelect
        }
      ],
      confirmModal: {
        show: false
      }
    };
  },
  components: {
    datepicker
  },
  mounted () {
    this.getUserInfo();
  },
  watch: {},
  methods: {
    getUserInfo() {
      // 表单校验
      this.request('PersonalInfo').then((res) => {
        if (res.status === 200 && res.content) {
          this.params = res.content;
        } else {
          this.$Messagebox({
            type: 'error',
            title: res.msg
          });
        }
      }, err => {
        this.$Messagebox({
          type: 'error',
          title: err
        });
      })
    },
    // 修改资料
    personalEdit() {
      const radios = this.$refs;
      for(let p in radios) {
        if(radios[p].checked) {
          this.params.sex = radios[p].value
        }
      }
      this.request('PersonalEdit', this.params).then((res) => {
        if (res.status === 200 && res.content) {
          this.$router.push({
            name: 'my'
          })
        } else {
          this.$Messagebox({
            type: res.msg,
            title: err
          });
        }
      }, err => {
        this.$Messagebox({
          type: res.msg,
          title: err
        });
      })
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';

.my-profile{
  .avator{
    width: 170px;
    margin: 0 36px;
    margin-top: 60px;
    .img{
      width: 140px;
      height: 140px;
      margin: 0 auto;
    }
    .upload-btn{
      width: 170px;
      height: 35px;
      border: 1px solid @orange;
      color:  @orange;
      line-height: 35px;
      display: block;
      text-align: center;
    }
  }
  .form-group{
    display: inline-block;
    width: 670px;
    padding-top:28px;
    .form-control{
      width: 100%;
      height: 40px;
      line-height: 40px;
      width:680px;
      border:1px solid rgba(221,221,221,1);
      border-radius:2px;
    }
    .form-label{
      width: 100%;
      margin: 24px 0px 10px;
      color: #000000;
    }
    .datepicker .form-control {
      width:212px;
      height:35px;
      background:rgba(248,248,248,1);
      border:1px solid rgba(221,221,221,1);
      border-radius:4px;
      padding-left: 10px;
    }
    .save-btn {
      width:150px;
      height:50px;
      background:rgba(249,108,23,1);
      border-radius:4px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      margin: 67px 0 46px 60px;
    }
    .form-radio {
      width: 20px;
      height: 20px;
      margin-top: -5px;
    }
    .radio-detail{
      display: inline-block;
      line-height: 40px;
      margin-left: 10px;
      margin-right: 15px;
    }
  }
}
</style>

