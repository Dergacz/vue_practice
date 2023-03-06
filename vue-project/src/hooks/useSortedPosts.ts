import {computed, ref, type Ref} from 'vue';

export const useSortedPosts = (posts: Ref) => {
  const selectedSort = ref('');
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]));
  });

  return {
    sortedPosts,
    selectedSort
  }
};