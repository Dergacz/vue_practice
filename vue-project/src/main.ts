import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI';
import Vintersection from '@/directives/VIntersection';
import directives from '@/directives';
import store from '@/store';

const app = createApp(App);

app.use(router);
app.use(store);

components.forEach(component => {
  app.component(component.name, component);
});

directives.forEach(directive => {
  app.directive(directive.name, directive);
});

app.directive('intersection', Vintersection);

app.mount('#app');
