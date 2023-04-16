<template>
  <div class="navbar">
    <h2>Vue course</h2>
    <div class="navbar_btns">
      <my-button
          style="margin: 0 15px 0 0"
          @click="$router.push('/posts')"
      >
        Posts
      </my-button>
      <my-button
          style="margin: 0 15px 0 0"
          @click="$router.push('/store')"
      >
        Store
      </my-button>
      <my-button
          style="margin: 0 15px 0 0"
          @click="$router.push('/composition')"
      >
        Composition
      </my-button>
      <my-button
          style="margin: 0"
          @click="$router.push('/')"
      >
        Back
      </my-button>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar_btns {
  margin-left: auto;
}
</style>