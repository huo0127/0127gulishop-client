<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderNum
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      orderNum: "",
      payInfo: {},
      payStatus: 0,
    };
  },
  mounted() {
    this.getPayInfo();
  },
  beforeMount() {
    this.orderNum = this.$route.query.orderNum;
  },
  methods: {
    async getPayInfo() {
      const result = await this.$API.reqPayInfo(this.orderNum);
      if (result.code === 200) {
        this.payInfo = result.data;
      }
    },

    //點擊立即支付的回調
    async pay() {
      //第一步：根據支付訊息codeUrl生成二微碼進行談框展示
      try {
        //生成二微碼圖片鏈接成功
        let imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl);

        //把生成的二維碼圖片鏈接進行展示
        this.$alert(`<img src="${imgUrl}"/>`, "請使用微信掃描支付", {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showCancelButton: true,
          confirmButtonText: "我已成功支付",
          cancelButtonText: "支付遇到問題",
          center: true,
          //beforeClose一旦被設定，那麼消息盒子關閉不關閉，我們可以在這裡面進行控制
          beforeClose: (action, instance, done) => {
            //aciton代表用戶點擊的是哪個按鈕 'confirm確定按鈕'   'cancel取消'  'close關閉'
            if (action === "confirm") {
              //! 正常代碼邏輯
              //代表用戶點擊的是確定
              //判斷如果沒有支付
              // if (!this.payStatus) {
              //   //第一步：提示
              //   this.$message.info(
              //     "請確認支付成功，成功後自動跳轉到支付成功頁面"
              //   );
              // }

              //!後門
              clearInterval(this.timer);
              this.timer = null;
              done();
              this.$router.push("/paysuccess");
            } else if (action === "cancel") {
              //代表用戶點擊的是取消
              // this.$message.success;  綠色提示
              // this.$message.info;     灰色提示
              // this.$message.error;    紅色提示
              // this.$message.warning;  橙色提示

              //第一步：提示
              this.$message.warning("支付問題請聯繫克服人員");

              //第二步：清除定時器
              //clearInterval只是清除了定時器，不讓管理模塊當中定時器生效
              clearInterval(this.timer);
              //把之前設置定時器的編號ID也一併清除掉
              this.timer = null;

              // 第三步：關閉消息盒子
              done(); //調用就關，沒調不關
            }
          },
        })
          .then(() => {})
          .catch(() => {});
        // .then() 是對應點擊確定之後的操作
        // 如果採用這兩個去操作，都會強制關閉我們的彈出框msgBox
        // 而我們現在並不是要直接關閉，是需要判斷用戶是不是支付了，才決定關閉還步關閉

        // .catch 是對應點擊確定之後的操作

        //輪詢：隔兩秒發一個請求，為了讓後台給我返回這個訂單的支付狀態
        //用以判斷用戶到底是支付了還是沒支付
        if (!this.timer) {
          //這裡必須添加判斷，確保這個訂單支付輪詢只開啟一個定時器。
          this.timer = setInterval(async () => {
            const result = await this.$API.reqPayStatus(this.orderNum);
            if (result.code === 200) {
              //支付狀態是成功的
              //第一步：把成功的標識儲存起來用於用戶點擊按鈕的時候進行判斷
              this.payStatus = 200;

              //第二步：提示支付成功
              this.$message.success("支付成功");

              //第三步：關閉定時器
              //clearInterval只是清除了定時器，不讓管理模塊當中定時器生效
              clearInterval(this.timer);
              //把之前設置定時器的編號ID也一併清除掉
              this.timer = null;

              //第四步：跳轉之前關閉彈出框
              this.$msgbox.close();

              //第五步：跳轉到支付成功頁面
              this.$router.push("/paysuccess");
            }
          }, 2000);
        }
      } catch (error) {
        //生成二微碼圖片鏈接失敗
        this.$message.error("生成二維碼鏈接失敗" + error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
