<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForProps="searchForProps"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 第一步；先把背景色動態顯示搞定 -->
              <!-- 第二步；再把圖標可以動態顯示 -->
              <!-- 
                1、用啥圖標
                2、圖標甚麼時候出現？    和背景色一樣，誰有背景色，那麼誰就有圖標
                3、圖標向上還是向下?     和數據排序類型相關asc和desc
              
               -->
              <ul class="sui-nav">
                <!-- <li
                  :class="{ active: searchParams.order.split(':')[0] === '1' }"
                > -->
                <li :class="{ active: sortFlag === '1' }">
                  <a href="javascript:;" @click="changeSort('1')">
                    综合

                    <!-- 鉤子標籤，i標籤其實就代表我們的圖標 -->
                    <i
                      v-if="sortFlag === '1'"
                      class="iconfont"
                      :class="{
                        iconDownarrow: sortType === 'desc',
                        iconUparrow: sortType === 'asc',
                      }"
                    >
                    </i>
                  </a>
                </li>
                <li :class="{ active: sortFlag === '2' }">
                  <a href="javascript:;" @click="changeSort('2')">
                    價格
                    <i
                      v-if="sortFlag === '2'"
                      class="iconfont"
                      :class="{
                        iconDownarrow: sortType === 'desc',
                        iconUparrow: sortType === 'asc',
                      }"
                    >
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/' + goods.id">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>

                    <!-- <img :src="goods.defaultImg" />
                    <a href="item.html" target="_blank"> </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/' + goods.id">
                      {{ goods.title }}
                    </router-link>
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    > -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="fr page"> -->
          <Pagination
            :currentPageNo="searchParams.pageNo"
            :total="searchInfo.total"
            :pageSize="searchParams.pageSize"
            :continueNo="5"
            @changePageNo="changePageNo"
          >
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //這個對象我們稱作初始化所有的搜索參數, 只不過一上來所有的搜索條件, 全部都是空的
        //今後只要是作為搜索條件的, 所有相關數據, 全部先在這個對象內部初始化好
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",

        //默認的搜索條件
        order: "1:asc", //排序規則, 排序是後台排序的, 我們搜索的時候得給後臺一個默認的排序規則
        pageNo: 1, //搜索第幾頁的商品, 分頁也是後台做好的, 我們也是得告訴後台我們要幾頁數據
        pageSize: 10, //每頁多少個商品, 告訴後台, 每頁回來多少個商品, 默認10個
      },
    };
  },
  //按照三級分類和關鍵字進行搜索
  beforeMount() {
    //再點擊三級分類或者點擊搜索按鈕跳轉過來發請求之前, 把對應的三級分類名稱和id或者關鍵是keyword,拿到添加到searchParams對應的搜索項中
    //淺拷貝

    // let {
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    // } = this.$route.query;

    // let { keyword } = this.$route.params;

    // let searchParams = {
    //   ...this.searchParams,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    //   keyword,
    // }; //這樣可以保證, searchParams: 裡面一定包含了我點擊傳遞過來的搜索條件, 沒有就是undefined

    // this.searchParams = searchParams;
    this.handleSearchParams();
  },

  mounted() {
    //點擊跳轉過來, 是在這裡發請求
    this.getSearchInfo();
  },
  methods: {
    getSearchInfo() {
      //dispatch 如果傳遞多個參數, 那麼多個參數必須構成一個對象去傳遞
      //也就是說 dispatch只能傳遞一個參數
      // this.$store.dispatch("getSearchInfo", {});
      //這裡剛開始傳空對象只是為了獲取數據展示頁面
      //但是我們點擊三級分類跳轉那麼搜索條件就應該是三級分類的id和分類的名稱
      //點擊搜索按鈕跳轉那麼搜索條件就應該是自己輸入的關鍵字
      //所以這個請求, 參數不應該是空對象
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },

    //封裝方法
    handleSearchParams() {
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;

      let { keyword } = this.$route.params;

      let searchParams = {
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      }; //這樣可以保證, searchParams: 裡面一定包含了我點擊傳遞過來的搜索條件, 沒有就是undefined

      //賦值this.searchParams之前，最好把屬性為空串的屬性去掉。
      /*
        for循環； for..in forEach for...of
        for循環是js當中最簡單遍歷的方法，主要是針對數組進行遍歷，效率不高，但可以使用
          continue和break。
        for..in ；主要是用來遍歷對象的(遍歷對象的可枚舉屬性)，效率最低，原因是因為不但要
          遍歷自身的屬性還要遍歷原型。
        forEach ：是數組的一個方法，主要也是用來遍歷數組的，效率最高，但是不可以使用
           continue和break。
        for..of ：是es6裡面新加的一種遍歷方法(前提是可迭代對象)，效率沒有forEach(比其他的
          要高)，也可以使用continue和break，for..of只能針對可迭代對象。

        遍歷對象最快的方法也是使用forEach，是把對象屬性轉化為數組然後遍歷。
        Object.keys(searchParams) 是把一個對象轉化為數組，這個數組當中存儲的是這個對象的
          所有屬性。
        let obj = {
          name: 'zhaoliying',
          age:33,
          height:168
        }
        Object.keys(obj) ; // ['name','age','height']
        以後看到這個東西 Object.keys() ，就是為了讓對象可以使用forEach方法來高效遍歷。

      */
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") {
          delete searchParams[key];
        }
      });

      this.searchParams = searchParams;
    },
    //刪除分類名稱搜索條件, 重新發送請求
    removeCategoryName() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      // this.getSearchInfo();
      //這裡刪除不會動我的原來路徑, 所以這樣發請求不行, 我們得讓路徑發生變化
      // this.$router.push({ name: "search", params: this.$route.params });

      this.searchParams.pageNo = 1;

      this.$router.replace({ name: "search", params: this.$route.params });
      //目的是讓路徑變化
      // 然後路徑變化了, 為什麼就發送請求了? 而且參數也對了?
      //這裡發請求依賴的是watch裡面的代碼
    },

    //刪除關鍵字搜索條件, 重新發送請求
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.$bus.$emit("clearKeyword"); //通知header清空關鍵字
      // this.getSearchInfo();
      // this.$router.push({ name: "search", query: this.$route.query });

      this.searchParams.pageNo = 1;
      this.$router.replace({ name: "search", query: this.$route.query });
      // 然後路徑變化了, 為什麼就發送請求了? 而且參數也對了?
      //這裡發請求依賴的是watch裡面的代碼
    },

    //用戶點擊品牌後, 根據品牌搜索重新發送請求
    searchForTrademark(trademark) {
      //trademark最終參數要去參考接口文檔 "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },

    //刪除品牌搜索條件後, 重新發送請求
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.searchParams.pageNo = 1;
      this.getSearchInfo();
    },

    //用戶點擊平台屬性值, 根據平台屬性搜索重新發送請求 : ["属性ID:属性值:属性名"]
    searchForProps(attrValue, attr) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;

      //你得判斷數組當中是否已經存在當前這個屬性, 如果有了就不要再去發請求了
      //數組方法(高級方法)
      //every some reduce filter map
      //功能 參數 返回值
      //some
      //功能: 只要數組當中有一個和條件一樣, 返回true, 如果都沒有, false
      //參數: 參考filter回調函數
      //返回值: 布爾值

      //every
      //功能: 數組當中必須全部都和條件一樣, 返回true, 有一個不一樣就false
      //參數: 參考filter
      //返回值: 返回布爾值

      let isRepeart = this.searchParams.props.some((item) => item === prop);
      if (isRepeart) {
        //證明已經存在這個屬性, 發過請求了, 就別再繼續發了
        return;
      }
      this.searchParams.pageNo = 1;
      this.searchParams.props.push(prop);
      this.getSearchInfo();
    },

    //用戶刪除某個屬性值搜索條件, 重新發送請求
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;

      this.getSearchInfo();
    },

    //點擊綜合或者價格排序的回調
    changeSort(sortFlag) {
      //首先判斷用戶點擊的是不是和原來的排序標誌一樣
      //獲取到原來的排序標誌和排序類型
      // let originSortFlag = this.searchParams.order.split(":")[0];
      let originSortFlag = this.sortFlag;
      let originSortType = this.sortType;
      let newOrder = "";
      //判斷用戶點擊的是不是還是原來的
      if (sortFlag === originSortFlag) {
        //假設用戶點的排序標誌和原來的是一樣的，證明點擊的還是同一個排序，那麼我們需要把排序類型改變
        newOrder = `${originSortFlag}:${
          originSortType === "asc" ? "desc" : "asc"
        }`;
      } else {
        //假設用戶點擊的排序標誌和原來的是不一樣的，證明點的不是同一個排序，那麼我們需要把排序標誌改變，排序類型默認
        newOrder = `${sortFlag}:desc`;
      }

      this.searchParams.order = newOrder; //把排序規則的數據修改
      this.searchParams.pageNo = 1;
      this.getSearchInfo(); //重新發送請求獲取新排序的數據顯示
    },

    //分頁器點擊切換頁碼時，觸發的自定義回調
    changePageNo(page) {
      this.searchParams.pageNo = page;
      this.getSearchInfo();
    },
  },

  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      searchInfo: (state) => state.search.searchInfo,
    }),
    //優化代碼
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },
    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },

  watch: {
    $route(newVal, oldVaL) {
      this.handleSearchParams();
      this.getSearchInfo();
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
