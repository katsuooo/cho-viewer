<template>
  <div>
    <h1>帳簿viewer</h1>
    <file_path @data-sent="allRead" />
    <div class="row">
        <div class="col-6">
            <one :all="read_alld"/>
        </div>
        <div class="col-6">
            <one :all="read_alld" />
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import file_path from '@/components/file_path.vue'
import all from '@/viewer/all.vue'
import one from '@/viewer/one.vue'
const read_alld = ref([])

/*
const allRead = (alld) => {
    console.log('data_sent-event')
    read_alld.value = alld
}*/
function allRead(alld){
    console.log('data_sent-event')
    read_alld.value = alld
}

</script>

<style>
/* CSS Gridで2分割 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2つの要素がそれぞれ50%幅 */
  width: 100%;
  height: 100vh; /* 画面の高さ全体をカバー */
}

.grid-left, .grid-right {
    flex-basis: 50%; /* 各列が50%の幅を持つ */
  padding: 10px;
  box-sizing: border-box;
}

.grid-left {
  background-color: #f0f0f0;
}

.grid-right {
  background-color: #ffffff;
}
</style>