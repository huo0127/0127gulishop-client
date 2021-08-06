<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link to="/login">登陆</router-link>
          <!-- <a href="login.html" target="_blank">登陆</a> -->
        </span>
      </h3>
      <div class="content">
        <label>手機號碼:</label>
        <!-- 
          表單類元素當中必須要使用name屬性指定驗證的字段名稱
         -->
        <input
          placeholder="请输入你的手機號碼"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <!-- 獲取phone字段驗證錯誤的提示訊息 -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span> -->
      </div>

      <div class="content">
        <label>驗證碼:</label>
        <input
          placeholder="请输入驗證碼"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <!-- 獲取code字段驗證錯誤的提示訊息 -->
        <span class="error-msg">{{ errors.first("code") }}</span>
        <!-- <input type="text" placeholder="请输入验证码" v-model="code" /> -->
        <button style="height:38px;width:100px" @click="getCode">
          獲取驗證碼
        </button>
      </div>

      <div class="content">
        <label>登录密码:</label>
        <input
          placeholder="请输入密碼"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9 A-Z a-z]{6,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <!-- 獲取password字段驗證錯誤的提示訊息 -->
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>確認密碼:</label>
        <input
          placeholder="请输入確認密碼"
          v-model="password2"
          name="password2"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password2') }"
        />
        <!-- 獲取password字段驗證錯誤的提示訊息 -->
        <span class="error-msg">{{ errors.first("password2") }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="isChecked"
          name="isChecked"
          v-validate="{ agree: true }"
          :class="{ invalid: errors.has('isChecked') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- 獲取password字段驗證錯誤的提示訊息 -->
        <span class="error-msg">{{ errors.first("isChecked") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      password2: "",
      code: "",
      isCheck: true,
    };
  },
  methods: {
    //點擊按鈕獲取註冊的驗證碼
    //發請求獲取驗證碼之後，存儲驗證碼在state
    //請求成功，自動把驗證碼填寫ok
    async getCode() {
      try {
        //成功了，code已經存儲到state裡面的code當中
        await this.$store.dispatch("getCode", this.phone);
        this.code = this.$store.state.user.code;
      } catch (error) {
        alert("獲取驗證碼失敗");
      }
    },

    //點擊註冊按鈕的邏輯
    async register() {
      //點擊完成註冊首先對所有的表單項做整體驗證，驗證通過返回的true，沒通過返回false
      const success = await this.$validator.validateAll();
      if (success) {
        //發請求把收集的數據，作為參數傳遞給後臺存儲數據庫
        let { phone, password, code } = this;
        try {
          //註冊成功
          await this.$store.dispatch("userRegister", {
            phone,
            password,
            code,
          });
          //註冊成功後續
          alert("註冊成功，前往登入頁面。");
          this.$router.push("/login");
        } catch (error) {
          //註冊失敗
          alert("用戶註冊失敗" + error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
