<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ item_on: currentIndex === index }"
                @mouseenter="moveInItem(index)"
              >
                <h3>
                  <!-- = 右側, 只要出現[], 就代表一個新的數組來了
                      只要出現{}, 就代表一個新的對象來了
                      只要出現function就代表一個新的函數來了
                 -->

                  <!-- <a href="">{{ c1.categoryName }}</a> -->
                  <!-- 第一種寫法: 所有a標籤換成router-link的話會卡, 導致內存當中組件很多,
                所以效率不高 -->

                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      category1Id: c1.categroyId,
                      categoryName: c1.categoryName,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->

                  <!-- 
                    把聲明式導航改成編程式導航, click事件點擊之後, 是需要調用函數的, 同樣每個a標籤都添加了點擊事件, 那麼內存中就會定義很多函數, 內存占用也是比較大的, 效率雖然比聲明式導航強, 但還是不夠好 
                  -->
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        category1Id: c1.categroyId,
                        categoryName: c1.categoryName,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->

                  <!-- 
                    事件委派: 找公共的離自己最近的祖先元素, 這個祖先元素只有一個 
                      如果不用事件委派, 每個子組件都有自己的函數
                      如果用事件委派, 每個子組件都沒有自己的函數, 用的是父組件的函數,
                        函數只有一個, 最終全部都子組件都只對應這個函數 
                  -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <a href="">{{ c2.categoryName }}</a> -->
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            category2Id: c2.categroyId,
                            categoryName: c2.categoryName,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->
                        <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              category2Id: c2.categroyId,
                              categoryName: c2.categoryName,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- <a href="">{{ c3.categoryName }}</a> -->
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              category3Id: c3.categroyId,
                              categoryName: c3.categoryName,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->
                          <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                category3Id: c3.categroyId,
                                categoryName: c3.categoryName,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import _ from "lodash"; // 這樣引入會把整個lodash全部引入, 把包後體積比較大
import throttle from "lodash/throttle";
export default {
  name: "",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  //組件掛載完成的時候, 就馬上發請求獲取數據, 存儲到vuex裡面,而不是直接在vue組件裡面
  mounted() {
    //dispatch是分發和觸發的意思, 和emit相同
    //本質其實就是在調用指定的action函數

    //如果發請求在這這發, 只要home和search切換, 每一次
    //home和search內部都需要重新創建typeNav組件, mounted就會重新執行
    //請求就會重複發, 而三級分類列表數據是一樣的, 沒必要發那麼多次
    // this.$store.dispatch("getCategoryList");

    if (this.$route.path !== "/home") {
      //證明這個組件是在search裡面的, 需要一上來就隱藏sort
      this.isShow = false;
    }
  },
  methods: {
    // _.throttle(renewToken, 300000, { 'trailing': false })

    // 沒有節流的時候
    // moveInItem(index) {
    //   this.currentIndex = index;
    //   console.log(index);
    // },

    // 節流的時候, 傳遞的參數不能是箭頭函數, 因為箭頭函數內部this不是組件對象
    moveInItem: throttle(
      function(index) {
        this.currentIndex = index;
        // console.log(index);
      },
      20,
      { trailing: false }
    ),
    //事件委託click的回調函數
    toSearch(event) {
      //event是甚麼? 就是瀏覽器調用函數傳遞過來的事件對象, 代表你傳遞的$event, 只能在模板裡面出現
      let targetNode = event.target; //獲取我們的目標元素(真正發生事件的元素)
      // console.log(targetNode);

      let data = targetNode.dataset; //獲取當前目標元素身上的data-屬性...組成的對象
      // console.log(data);
      //怎麼知道點擊的是不是a標籤
      //如果是a標籤, 那麼data一定是有categoryname的
      //如果點的不是a標籤, 那麼data就沒有categoryname

      //參數怎麼攜帶, 要攜帶那些東西的參數?
      //如果點擊的是a標籤, 那麼參數已經帶過來了, 就在我們的data當中

      let { category1id, category2id, category3id, categoryname } = data;

      if (categoryname) {
        //category存在就證明點擊的就是a標籤
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };

        //確定是一級還是二級還是三級的id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //找到所有的query參數以後, 最後把query放到location裡面
        location.query = query;

        //最終把location對象就構造好了, 跳轉
        //跳轉之前, 要合併原來過來時候帶的params參數
        //看看之前過來有沒有params參數, 有的話一起帶上
        if (this.$route.params) {
          location.params = this.$route.params;
        }

        //如果是從home跳search，就push
        //如果是search跳search，就replace
        if (this.$route.path !== "/home") {
          this.$router.replace(location);
        } else this.$router.push(location);
      }
    },
    moveOutDiv() {
      this.currentIndex = -1;
      //移出外部我們自己添加的div, 得去判斷是在home頁面移出還是在search頁面移出
      if (this.$route.path !== "/home") {
        //證明這個組件是在search裡面的, 需要一上來就隱藏sort
        this.isShow = false;
      }
    },
    /*
      event是事件對象
      每次觸發事件的時候, 系統(瀏覽器內核)都會把這一次觸發事件相關的所有訊息, 封裝成一個對象, 在瀏覽器調用回調函數的時候, 自動傳遞給回調函數的第一個形餐

      回調函數: 自己定義的, 自己沒調用, 最後執行了
    */
  },

  computed: {
    /*
      函數內部可以是數組也可以是對象
      是數組必須滿足條件:
        1. 數據直接就是總的state當中的數據, 不能是模塊裡面的
        2. 數組當中的名字必須和state當中的名字一致
        ...mapState(['categoryList'])
        不能這樣寫, 因為categoryList, 不是state.categoryList, 而是state.    home.categoryList
  */
    ...mapState({
      //必須使用對象, 而且返回的是state.home.categoryList
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.sort-enter {
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to {
        height: 461px;
        opacity: 1;
      }
      &.sort-enter-active {
        transition: all 0.5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 616px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
