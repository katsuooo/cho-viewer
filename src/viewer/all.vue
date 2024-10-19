<template>
    <div>
      <table border="1" cellpadding="10" class="table table-sm" style="font-size:12px;">
        <thead>
          <tr>
            <th>date</th>
            <th>適用</th>
            <th>勘 定 </th>
            <th>金額</th>
            <th>相手勘定</th>
            <th>memo</th>
          </tr>
        </thead>
        <tbody>
          <!-- v-for を使ってJSON配列をループし、テーブル行を生成 -->
          <tr v-for="(a, index) in sortedAll" :key="index">
            <td :class="getKanjouClass(a.kanjou)">{{ a.date }}</td>
            <td :class="getKanjouClass(a.kanjou)" style="max-width:120px;">{{ a.tekiyou }}</td>
            <td :class="getKanjouClass(a.kanjou)" style="white-space:nowrap;">{{ a.kanjou }}</td>
            <td :class="getKanjouClass(a.kanjou)">{{ a.val }}</td>
            <td :class="getKanjouClass(a.kanjou)">{{ a.aite }}</td>
            <td :class="getKanjouClass(a.kanjou)">{{ a.memo }}</td>
          </tr>
        </tbody>
      </table>
    </div>  
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import getKanjouClass from '@/components/getKanjouClass.js'  
  // props を定義
  const props = defineProps({
    all: {
      type: Array,
      default: []
    }
  });
  
  // ソート方向を保持するための変数
  const isAscending = ref(true);
  
  // ソート後の配列を返すcomputedプロパティ
  const sortedAll = computed(() => {
    return [...props.all].sort((a, b) => {
      // 日付を文字列からDateオブジェクトに変換して比較
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      // 昇順と降順を切り替え
      return isAscending.value ? dateA - dateB : dateB - dateA;
    });
  });
  </script>
  <style scoped>
  /* 勘定科目ごとの背景色 */
 .bg-deposit {
   background-color: lightgreen;
 }
 
 .bg-cash {
   background-color: lightyellow;
 }
 
 .bg-owner-loan {
   background-color: lightblue;
 }
 
 .bg-owner-borrow {
   background-color: lightcoral;
 }
 
 .bg-receivable {
   background-color: lightcyan;
 }
 
 .bg-payable {
   background-color: lightpink;
 }
 
 .bg-misc {
   background-color: lightgray;
 }
 
 .bg-tools {
   background-color: lightsteelblue;
 }
 
 .bg-depreciation {
   background-color: lightgoldenrodyellow;
 }
 
 .bg-supplies {
   background-color: lightseagreen;
   color: white;
 }
 
 .bg-meeting {
   background-color: #fbf7f7;
   /*background-color:rgb(207, 159, 255)*/
 }
 

th {
  white-space: nowrap;
  overflow: hidden; /* テキストがあふれる場合に隠す */
  text-overflow: ellipsis; /* テキストを省略記号で表示 */
}

  </style>
  