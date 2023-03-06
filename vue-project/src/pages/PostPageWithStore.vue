<template>
  <div>
    <h1>Page with post</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search"
        v-focus
    />
    <div class="app_btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="isDialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <h3 v-else>Loading...</h3>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    MyInput,
    PostForm,
    PostList
  },
  data() {
    return {
      isDialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.posts.push(post);
      this.isDialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.isDialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      totalPages: state => state.post.totalPages,
      page: state => state.post.page,
      limit: state => state.post.limit,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
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
