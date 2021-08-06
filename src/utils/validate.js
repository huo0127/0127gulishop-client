import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_TW from "vee-validate/dist/locale/zh_TW";
Vue.use(VeeValidate);

//錯誤提示訊息本地化
VeeValidate.Validator.localize("zh_TW", {
  messages: {
    ...zh_TW.messages,
    //修改內痔規則的message，讓確認密碼與密碼相同
    is: (field) => `${field}必須與密碼相同`,
  },
  attributes: {
    //給校驗的field屬性名映射中文名稱
    phone: "手機號碼",
    code: "驗證碼",
    password: "密碼",
    password2: "確認密碼",
    isCheck: "協議",
  },
});

//自定義校驗規則
//定義協議必須打勾同意
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必須同意",
});
