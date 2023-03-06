<template>
  <div>
    <form @submit.prevent>
      <h4>Create post</h4>
      <my-input
          v-focus
          v-model="post.title"
          placeholder="Name"
      />
      <my-input
          v-model="post.body"
          placeholder="Description"
      />
      <my-button
          @click="createPost"
      >
        Create
      </my-button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  },
  watch: {
    post: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>