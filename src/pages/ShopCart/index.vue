<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="updateOneChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(cart, -1, true)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum(cart, $event.target.value * 1, false)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(cart, 1, true)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 
            v-model
              單個複選框，綁定的是布爾值，:checked屬性
              多個複選框，綁定value值，用數組收集value值
         -->
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartInfo();
  },
  methods: {
    getShopCartInfo() {
      this.$store.dispatch("getShopCartInfo");
      //這邊不需要根據請求成功或失敗有後續的操作，所以我們沒必要去拿結果
      //只需要發請求，讓數據存儲vuex裡面
    },

    //修改購物車商品數量
    async changeCartNum(cart, disNum, flag) {
      //disNum 如果是點擊加號或減號，我們傳遞過來的是1和-1，是變化的量
      //disNum 如果是輸入框change傳過來的，那麼這個disNum是最終的量
      //flag 是用於判斷用戶是點擊加號減號進來的還是輸入框失去焦點進來的
      let originNum = cart.skuNum;

      if (flag) {
        //證明是點擊加號減號進來的，我們要保證最終的總數必須至少是1
        //獲取原來本身的數量
        if (originNum + disNum < 1) {
          //證明原本的數量變化之後，比1還小，那麼我們應該修正disNum
          //如果最終比1還小，那麼disNum就應該就應該修正，修正的結果讓他們剛好是1
          disNum = 1 - originNum;
        }
      } else {
        //證明這個裡面傳遞是input輸入的值，disNum他代表最終的值
        //disNum此時代表的是最終的值
        if (disNum < 1) {
          //disNum此時代表的是變化的量
          disNum = 1 - originNum;
        } else {
          //等號左邊的disNum代表的是變化的量，等號右邊的disNum代表是最終的
          disNum = disNum - originNum;
        }
      }
      //經歷了上面的if-else，到這裡disNum肯定是變化的量，不管是點擊加減號還是輸入框輸入，都是正確的變化的量
      //發請求修改數量
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum, //disNum剛計算出來的變化的量
        });
        alert("修改成功");
        //如果請求成功重新獲取購物車列表數據
        this.getShopCartInfo();
      } catch (error) {
        alert(error.message);
      }
    },

    //修改購物車選中狀態，單個修改
    async updateOneChecked(cart) {
      try {
        //發請求修改
        await this.$store.dispatch("updateCartIsCheck", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        //成功就重新獲取列表數據
        alert("修改成功");
        this.getShopCartInfo();
        //失敗就提示
      } catch (error) {
        alert(error.message);
      }
    },

    //刪除單個購物車數據
    async deleteOne(cart) {
      try {
        await this.$store.dispatch("deleteShopCart", cart.skuId);
        alert("刪除成功");
        this.getShopCartInfo();
      } catch (error) {
        alert("刪除失敗" + error.message);
      }
    },

    //刪除多個購物車數據
    async deleteAll() {
      try {
        await this.$store.dispatch("deleteShopCartAll");
        alert("刪除多個成功");
        this.getShopCartInfo();
      } catch (error) {
        alert("刪除多個失敗" + error.message);
      }
    },
  },

  computed: {
    ...mapGetters(["cartInfo"]),

    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },

    //統計已選的件數
    checkedNum() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },

    //統計總價
    allMoney() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum * item.skuPrice;
        }
        return prev;
      }, 0);
    },

    //計算全選數據
    isCheckAll: {
      get() {
        //讀取的
        return this.cartInfoList.every((item) => item.isChecked);
      },
      async set(val) {
        //修改的
        //val獲取到的是用戶點擊全選之後，多選框的checked屬性值，是個布爾值
        //在這裡我們發請求，修改所有的購物車的選中狀態
        // this.$store.dispatch("updateCartIsCheckAll", val ? 1 : 0); 就是Promise.all返回的新的promise
        try {
          const result = await this.$store.dispatch(
            "updateCartIsCheckAll",
            val ? 1 : 0
          );
          console.log(result); //(4) ["ok", "ok", "ok", "ok"]
          alert("修改成功");
          this.getShopCartInfo();
        } catch (error) {
          alert("修改錯誤" + error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
