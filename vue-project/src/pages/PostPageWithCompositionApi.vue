<template>
  <div>
    <h1>Page with post</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Search"
        v-focus
    />
    <div class="app_btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="isDialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading?.value"
    />
    <h3 v-else>Loading...</h3>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {ref} from "vue";
import MyButton from "@/components/UI/MyButton.vue";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";
export default {
  components: {
    MyButton,
    MyInput,
    PostForm,
    PostList
  },
  data() {
    return {
      isDialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'for name' },
        { value: 'body', name: 'for description' }
      ]
    }
  },
  setup(props) {
    const { posts, isPostLoading, totalPages } = usePosts(10);
    const { selectedSort,sortedPosts } = useSortedPosts(posts);
    const { sortedAndSearchedPosts, searchQuery } = useSortedAndSearchedPosts(sortedPosts);

    return {
      searchQuery,
      selectedSort,
      posts,
      sortedPosts,
      totalPages,
      sortedAndSearchedPosts,
      isPostLoading,
    }
  }
};

</script>

<style>
.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current_page {
  border: 2px solid teal;
}

</style>
