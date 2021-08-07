<template>
  <div class="pagination">
    <!-- 上一頁並不是甚麼時候都可以點，當前頁就是第一頁的時候，那麼就應該禁用不能點擊 -->
    <button
      :disabled="currentPageNo === 1"
      @click="$emit('changePageNo', currentPageNo - 1)"
    >
      上一頁
    </button>
    <!-- 這個1不是永遠可以顯示，因為我們下面會顯示連續頁碼，如果連續頁面剛好就是1-5，那麼這
          個1就不要了，要不然就重複了。 -->
    <!-- 這個1要顯示，那麼start就不能是1，不能是1就一定大於1。 -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo', 1)">
      1
    </button>
    <!-- 這個三點也不是永遠可以顯示的，當start的執筆2大的時候，這個三點永遠顯示 -->
    <button v-if="startEnd.start > 2">…</button>

    <!-- 這裡是用來顯示連續頁 -->
    <!-- vfor遍歷的時候，可以遍歷一個數組，還可以遍歷一個數字 -->
    <!-- vfor可以和vif同時使用，vfor優先級比vif高 (面試題原題) -->
    <button
      :class="{ active: currentPageNo === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo', page)"
    >
      {{ page }}
    </button>

    <!-- 這個三點也不是永遠顯示的，當end筆總頁碼-1還要小，後面的三點才會顯示 -->
    <button v-if="startEnd.end < totalPageNo - 1">…</button>
    <button
      v-if="startEnd.end < totalPageNo"
      @click="$emit('changePageNo', totalPageNo)"
    >
      {{ totalPageNo }}
    </button>
    <button
      :disabled="currentPageNo === totalPageNo"
      @click="$emit('changePageNo', currentPageNo + 1)"
    >
      下一頁
    </button>

    <button style="margin-left:30px">共 {{ total }} 條</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // props:[],
  props: {
    currentPageNo: Number,
    total: {
      type: Number,
      default: 0,
      /*
        必須給個默認值，否則會報一個錯誤，說total是undefined。
        seachInfo是根據請求回來的數據，請求回來的數據是需要時間的。當
        searchInfo沒回來的時候就是空對象，因此傳遞過來就是undefined。
      */
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    continueNo: {
      type: Number,
      required: true,
    },
  },
  //計算總頁碼
  computed: {
    totalPageNo() {
      let { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    //計算連續頁的起始位置和結束位置
    startEnd() {
      let { currentPageNo, continueNo, totalPageNo } = this;
      let start = 0;
      let end = 0;

      if (continueNo >= totalPageNo) {
        //假設傳遞的連續頁數比我最大的頁碼還要大，代表我根本沒有那麼多連續頁
        start = 1;
        end = totalPageNo;
      } else {
        //正常情況
        start = currentPageNo - Math.floor(continueNo / 2);
        end = currentPageNo + Math.floor(continueNo / 2);

        //非正常情況
        if (start <= 0) {
          //在左側非正常情況，需要把計算的start和end修正一下
          (start = 1),
            //end +=1 - start
            (end = continueNo);
        }
        if (end > totalPageNo) {
          //在右側非正常情況，需要把計算的start和end修正一下
          end = totalPageNo;
          start = totalPageNo - continueNo + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
