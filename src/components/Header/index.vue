<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link to="register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank"> -->
        <!-- <img src="./images/logo.png" alt="" /> -->
        <!-- </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    toSearch() {
      /*
        一、路由傳參類: params參數和query參數
            params參數是屬於路徑的一部份, 路由當中匹配的時候, 是要照顧到這個參數的
            query參數是在路徑後面, 以 ? 分割 , ? 後面的 a = b & c = d 就是你的query參數
            query參數是不屬於路徑的一部份, 路由匹配的時候, 不需要關心我這個參數
        路由路徑帶參數的三種寫法
        1. 字符串寫法
         this.$router.push(
        "/Search/" + this.keyword + "?keyword1=" + this.keyword.toUpperCase()
        2. 模板字符串
         this.$router.push(
        `/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`
        3.對象寫法(重點)
        this.$router.push({
        name: "search",
        params: { keyword: this.keyword },
        query: { keyword1: this.keyword.toUpperCase() },
      });
      );
      );
      */
      /*
      面試1
          指定params参数时可不可以用path和params配置的组合?（对象写法）
          如果傳遞的參數只有query參數, 沒有params參數, 那麼我們可以不用name, 可以使用path
          如果傳遞的參數包含params參數, 就不能使用path去配合, 只能用name去配合
      總結
          對象寫法, 最好以後寫name, 因為name既能跟params配合也可以跟query配合
          而path只能跟query配合, 不能跟params
      */
      // this.$router.push({
      //  // path: "/search",
      //   name: "search",
      //   params: { keyword: this.keyword },
      //   query: { keyword1: this.keyword.toUpperCase() },
      // });
      /*
      面試2 
          如何讓params可傳可不傳
          在路由當中配置佔位符加上問號 路由配置path路徑後面佔位後加 ?
      */
      /*
      面試3
          如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
      解決方法
          1. 不傳params參數 (不太好)
          2. 首先必須在params參數可傳可不傳的前提下, 當傳遞的參數是空串的時候, 
             傳遞成undefined, 就不會出問題

        this.$router.push({
        name: "search",
        params: { keyword: "" || undefined },
        query: { keyword1: this.keyword.toUpperCase() },
      });
      */
      // 面试问题4: 路由组件能不能传递props数据?
      // 	可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
      // 实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })

      // 面試問題5: vue-router使用的是3.1.0以上的版本, 如果多次使用編程式導航, 而參數沒有產生變化, 會報NavigatitonDuplactaed的警告錯誤
      // 解決方法1: 但是不好
      // this.$router.push(
      //   {
      //     name: "search",
      //     params: { keyword: this.keyword || undefined },
      //     query: { keyword1: this.keyword.toUpperCase() },
      //   }.catch(() => {})
      // );
      // 解決方法2 : 修改路由器對象, 原型的方法

      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        // query: { keyword1: this.keyword.toUpperCase() },
      };

      //跳轉之前一樣的, 也得判斷之前過來有沒有帶query參數, 有的話一起帶上(合併參數)
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      this.$router.push(location);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
