<template>
  <div v-if="posts.length > 0" class="post-list">
    <h3>Post List</h3>
    <transition-group name="post-item">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    List is empty
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>

.post-list {
  margin-top: 15px;
}

.post-item {
  display: inline-block;
  margin-right: 10px;
}

.post-item-enter-active,
.post-item-leave-active {
  transition: all 0.4s ease;
}

.post-item-enter-form,
.post-item-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-item-move {
  transition: 0.4s ease;
}

</style>