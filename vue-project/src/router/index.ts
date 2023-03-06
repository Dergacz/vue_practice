import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue';
import PostPage from '@/pages/PostPage.vue';
import PostPageId from '@/pages/PostPageId.vue';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';
import PostPageWithCompositionApi from '@/pages/PostPageWithCompositionApi.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/posts',
      component: PostPage
    },
    {
      path: '/posts/:id',
      component: PostPageId
    },
    {
      path: '/store',
      component: PostPageWithStore
    },
    {
      path: '/composition',
      component: PostPageWithCompositionApi
    },
  ]
})

export default router
