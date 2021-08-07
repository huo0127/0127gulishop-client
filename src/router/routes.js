// import Home from "@/pages/Home";
//import函數可以讓文件單獨打包，並且動態加載
const Home = () => import("@/pages/Home");
const Search = () => import("@/pages/Search");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
const Pay = () => import("@/pages/Pay");
const PaySuccess = () => import("@/pages/PaySuccess");
const Center = () => import("@/pages/Center");
const GroupOrder = () => import("@/pages/Center/GroupOrder");
const MyOrder = () => import("@/pages/Center/MyOrder");

// import Search from "@/pages/Search";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import GroupOrder from "@/pages/Center/GroupOrder";
// import MyOrder from "@/pages/Center/MyOrder";

/*
  使用 import from 這樣的方式是同步執行，將所有的路由組件一次性打包在一個大的文件當中。這樣打包之後，打包出來的文件體積比較大，當瀏覽器在訪問這個文件加載的時候，效率不高。
  所以我們就要想辦法將所有的路由組件，分別打包為小的文件。
  瀏覽器在訪問那個組件的時候，再去加載哪一個小的文件，效率就會提升。

  !這個過程就是我們所說的路由懶加載
*/

export default [
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      // 只有从支付页面才能跳转到支付成功页面
      if (from.path === "/pay") {
        next();
      } else {
        alert("只有从支付页面才能跳转到支付成功页面");
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      //只有从支付页面才能跳转到支付成功页面
      if (from.path === "/trade") {
        next();
      } else {
        alert("只有从支付页面才能跳转到支付成功页面");
        next("/");
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      // 只有从购物车界面才能跳转到交易页面（创建订单）
      if (from.path === "/shopcart") {
        next();
      } else {
        alert("只有从购物车界面才能跳转到交易页面（创建订单）");
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      // 只有携带了 skuNum 和 sessionStorage 内部有 skuInfo 数据 才能看到添加购物车成功的界面
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
      if (skuNum && skuInfo) {
        next();
      } else {
        alert("必須攜帶skuNum參數，也必須儲存skuInfo");
        // next("/");
        next(false); //甚麼都不做
      }
    },
  },
  {
    path: "/detail/:goodsId",
    component: Detail,
  },
  {
    path: "/home",
    component: Home,
    //component後面可以視一個組件，也可以是一個函數
    //這個函數當用戶第一次訪問HOME組件的時候，就會執行HOME函數
  },
  {
    path: "/search/:keyword?", // 加 ? 代表我的params可傳可不傳
    component: Search,
    name: "search", //命名路由

    //理解過程
    // params:{
    //   keyword:'abc'
    // }
    // query:{
    //   keyword1:'ABC'
    // }
    // props: //這個props是我們在路由組件中, 操作params參數和query參數的簡化方法
    // props: true, //會默認的把傳遞過來的params參數, 額外的映射為組件當中的屬性去操作
    // props: {
    //   username: "zhaoliying", //傳第一個對象, 傳遞的是額外你需要的靜態數據, 不需要就不用
    // },
    props: (route) => {
      return {
        keyword: route.params.keyword,
        keyword1: route.query.keyword1,
      };
    },
  },
  {
    path: "/login",
    component: Login,
    //路由對象中的原配置項, 可以配置我們所需要的任何數據
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/register",
    component: Register,
    //路由對象中的原配置項, 可以配置我們所需要的任何數據
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/",
    redirect: "/home",
  },
];
