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
        v-if="!isPostLoading"
    />
    <h3 v-else>Loading...</h3>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div-->
    <!--        class="page_wrapper"-->
    <!--    >-->
    <!--      <div-->
    <!--          class="page"-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          :class="{-->
    <!--            'current_page': pageNumber === page-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  components: {
    MyInput,
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      isDialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      totalPages: 0,
      page: 1,
      limit: 10,
      sortOptions: [
        { value: 'title', name: 'for name' },
        { value: 'body', name: 'for description' }
      ]
    }
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert(e.message);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(e.message);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
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
