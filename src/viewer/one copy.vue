<template>
    <div>
      <!-- 勘定科目を選択するセレクタ -->
      <label for="account-select">勘定科目を選択:</label>
      <select id="account-select" v-model="selectedAccount">
        <option disabled value="">勘定科目を選択してください</option>
        <option value="事業主貸">事業主貸</option>
        <option value="事業主借">事業主借</option>
        <option value="預金">預金</option>
        <option value="元入金">元入金</option>
        <option value="現金">現金</option>
        <option value="売掛金">売掛金</option>
        <option value="未払金">未払金</option>
        <option value="雑費">雑費</option>
        <option value="工具器具備品">工具器具備品</option>
        <option value="減価償却費">減価償却費</option>
        <option value="消耗品費">消耗品費</option>
        <option value="会議費">会議費</option>
      </select>
  
      <table border="1" cellpadding="10" class="table table-sm" style="font-size:12px;">
        <thead>
          <tr>
            <th>date</th>
            <th>項目</th>
            <th>勘定</th>
            <th>金額</th>
            <th>相手勘定</th>
            <th>memo</th>
          </tr>
        </thead>
        <tbody>
          <!-- フィルタリングされたデータを表示 -->
          <tr v-for="(a, index) in filteredAll" :key="index" >
            <td :class="getKanjouClass(a.kanjou)">{{ a.date }}</td>
            <td :class="getKanjouClass(a.kanjou)" style="max-width:120px;">{{ a.tekiyou }}</td>
            <td  :class="getKanjouClass(a.kanjou)" style="white-space:nowrap;">{{ a.kanjou }}</td>
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
      default: () => []
    }
  });
  
  // ユーザーが選択した勘定科目
  const selectedAccount = ref("預金"); // デフォルトは何も選択されていない
  
  // フィルタリング後のデータを返すcomputedプロパティ
  const filteredAll = computed(() => {
    if (!selectedAccount.value) {
      return props.all; // セレクタで何も選ばれていない場合、すべて表示
    }
    
    return props.all.filter(item => {
      // 勘定か相手勘定が選択された勘定科目と一致する場合
      return item.kanjou === selectedAccount.value || item.aite === selectedAccount.value;
    });
  });
/**
 * 勘定に背景
 * @param kanjou 
 */
/*
 function getKanjouClass(kanjou) {
    console.log(kanjou)
  switch (kanjou) {
    case '預金':
        console.log('預金match')
      return 'bg-deposit';
    case '現金':
      return 'bg-cash';
    case '事業主貸':
      return 'bg-owner-loan';
    case '事業主借':
      return 'bg-owner-borrow';
    case '売掛金':
      return 'bg-receivable';
    case '未払金':
      return 'bg-payable';
    case '雑費':
      return 'bg-misc';
    case '工具器具備品':
      return 'bg-tools';
    case '減価償却費':
      return 'bg-depreciation';
    case '消耗品費':
      return 'bg-supplies';
    case '会議費':
      return 'bg-meeting';
    // その他の勘定科目も追加可能
    default:
      return 'bg-deposit';
  }
}
  */
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
  /*background-color: lightviolet;*/
}

  </style>
  