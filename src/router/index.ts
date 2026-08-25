import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import EmptyView from "@/views/EmptyView.vue";
import MarkdownView from "@/views/MarkdownView.vue";
import { contentDocuments } from "@/content/registry";

const contentRoutes: RouteRecordRaw[] = contentDocuments.map((document) => ({
  path: document.route,
  name: `document-${document.id}`,
  component: MarkdownView,
  props: { documentId: document.id },
  meta: {
    documentId: document.id,
    label: document.label,
  },
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "default",
      component: EmptyView,
    },
    ...contentRoutes,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home",
    },
  ],
});

export default router;
