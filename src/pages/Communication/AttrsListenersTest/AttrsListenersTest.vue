<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
    <br />
    <!-- 以上三個按鈕，只有圖標，沒有文字，我們要讓鼠標懸停出現文件提示，
         那麼就需要對上面的el-button組件進行二次封裝，封裝成一個可以彈出
         提示消息的自己的組件。 -->

    <!-- 添加冒號只是為了綁定動態數據，而所有的組件標籤的屬性都會props傳
          到子組件內部。 -->
    <!-- <HintButton xxx="123" :yyy="'abc'" @heihei="test"></HintButton> -->

    <HintButton
      type="primary"
      icon="el-icon-plus"
      size="mini"
      title="新增"
    ></HintButton>
    <HintButton
      type="danger"
      icon="el-icon-delete"
      size="mini"
      title="刪除"
    ></HintButton>
    <HintButton
      type="warning"
      icon="el-icon-edit"
      size="mini"
      title="修改"
    ></HintButton>

    <el-button type="info">查看</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from '@/pages/Communication/AttrsListenersTest/HintButton'
export default {
  name: 'AttrsListenersTest',
  components:{HintButton},

  methods: {
test(){}

  },
}
</script>
