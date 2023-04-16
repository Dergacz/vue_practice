<template>
  <navbar></navbar>
  <div class="app">
    <router-view>

    </router-view>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import Navbar from "@/components/UI/Navbar.vue";

export default defineComponent({
  components: {Navbar}
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app_btns {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
