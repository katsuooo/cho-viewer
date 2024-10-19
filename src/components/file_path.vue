<template>
    <div>
      <!-- ファイルを選択するinputフィールド -->
      <input type="file" @change="onFileChange" accept=".json" />
  
      <!-- 読み込んだJSONデータを表示 -->
       <!--<pre v-if="jsonData">{{ jsonData }}</pre>-->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const emit = defineEmits(['data-sent']);

  // 読み込んだファイルのJSONデータを保存する変数
  //const jsonData = ref(null);
  
  // ファイルが選択されたときに呼び出される関数
  const onFileChange = (event) => {
    const file = event.target.files[0]; // 選択されたファイル
  
    // ファイルが選択されているか確認
    if (file) {
      const reader = new FileReader();
      
      // ファイル読み込みが完了したときの処理
      reader.onload = (e) => {
        try {
          // 読み込んだテキストをJSONに変換して保存
          const jsonData = JSON.parse(e.target.result);
          console.log(jsonData)
          emit('data-sent', jsonData); // 'data-sent' イベントを発火し、データを渡す
        } catch (error) {
          console.error('JSONの解析中にエラーが発生しました:', error);
        }
      };
  
      // ファイルをテキストとして読み込む
      reader.readAsText(file);
    }
  };
  </script>
  