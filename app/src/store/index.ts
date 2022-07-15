import { createStore } from "vuex";
import { fetchArticles } from "@/api";
import { Article } from "@/models/Article";


export default createStore({
  state: {
    articles: [] as Article[]
  },
  getters: {
    getArticles(state) {
      return state.articles;
    }
  },
  mutations: {
    addArticle(state, article: Article) {
      state.articles.push(article);
    },
    setArticles(state, articles: Article[]) {
      state.articles = articles;
    },
    deleteArticle(state, article: Article) {
      const articleIndex = state.articles.indexOf(article);
      state.articles.splice(articleIndex);
    }
  },
  actions: {
    async loadArticles({commit}) {
      const articles: Article[] = await fetchArticles();
      commit('setArticles', articles);
    },
  },
  modules: {},
});
