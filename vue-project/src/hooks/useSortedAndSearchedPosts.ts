import {computed, ref, type ComputedRef} from 'vue';

interface IPost {
  title: string;
  body: string;
}

export const useSortedAndSearchedPosts = (sortedPosts: ComputedRef<IPost[]>) => {
  const searchQuery = ref('');
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  }
};