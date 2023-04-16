import axios from 'axios';

interface IPost {
  title: string;
  body: string;
}

interface IPostModule {
  posts: IPost[];
  isPostLoading: boolean;
  selectedSort: string;
  searchQuery: string;
  totalPages: number;
  page: number;
  limit: number;
  sortOptions: {
    value: string;
    name: string;
  }[];
}

export const postModule = {
  state: (): IPostModule => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state: { posts: any; selectedSort: string | number; }) {
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
    },
    sortedAndSearchedPosts(state: IPostModule, getters: { sortedPosts: any[]; }) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }
  },
  mutations: {
    setPosts(state: IPostModule, posts: IPost[]) {
      state.posts = posts;
    },
    setLoading(state: IPostModule, bool: boolean) {
      state.isPostLoading = bool;
    },
    setSelectedSort(state: IPostModule, param: string) {
      state.selectedSort = param;
    },
    setSearchQuery(state: IPostModule, param: string) {
      state.searchQuery = param;
    },
    setTotalPages(state: IPostModule, totalPage: number) {
      state.totalPages = totalPage;
    },
    setPage(state: IPostModule, page: number) {
      state.page = page;
    },
  },
  actions: {
    async fetchPosts({ state, commit }: any) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (e) {
        alert("Error");
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({ state, commit }: any) {
      try {
        commit('setPage', state.page += 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        alert('Error');
      }
    },
  },
  namespaced: true,
}
