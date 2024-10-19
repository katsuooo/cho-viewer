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
          <tr v-for="(a, index) in sortedFilteredAll" :key="index">
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
  import getKanjouClass from '@/components/getKanjouClass.js';
  
  // props を定義
  const props = defineProps({
    all: {
      type: Array,
      default: () => []
    }
  });
  
  // ユーザーが選択した勘定科目
  const selectedAccount = ref(""); // デフォルトは何も選択されていない
  
  // フィルタリング後のデータを返すcomputedプロパティ
  const filteredAll = computed(() => {
    let filtered = props.all;
  
    // 勘定科目が選択されている場合にフィルタリング
    if (selectedAccount.value) {
      filtered = filtered.filter(item => {
        return item.kanjou === selectedAccount.value || item.aite === selectedAccount.value;
      });
    }
    
    return filtered;
  });
  
  // 日付の形式を変換する関数
  function formatDate(yyyymmdd) {
    const year = yyyymmdd.substring(0, 4);
    const month = yyyymmdd.substring(4, 6);
    const day = yyyymmdd.substring(6, 8);
    return `${year}-${month}-${day}`;  // YYYY-MM-DD 形式に変換
  }
  
  // 日付順にソートされたデータ
  const sortedFilteredAll = computed(() => {
    return filteredAll.value.slice().sort((a, b) => {
      return new Date(formatDate(a.date)).getTime() - new Date(formatDate(b.date)).getTime();
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
  }
  </style>
  