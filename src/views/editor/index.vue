<!--
 * @Author: Shaoli
 * @Date: 2023-03-27 22:58:49
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-03-27 23:03:33
 * @Description: 请填写文件描述
-->
<template>
  <div class="specialPage">
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<script setup lang="ts" name="SpecialPage">
import { ref } from 'vue'
const text = ref<string>('')
</script>

<style scoped lang="less">
.specialPage {
  h2 {
    width: 100px;
    height: 200px;
  }
}
</style>
