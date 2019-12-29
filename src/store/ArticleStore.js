import { articlesService } from '../services/ArticlesService'

export const ArticleModule = {

    state: {
        articleErrors: null
    },

    mutations: {
        setArticleErrors(state, errors) {
            state.articleErrors = errors
        }
    },


    actions: {
        async addArticle(context, article) {
            try {
                await articlesService.add(article)
                return context.commit('setArticleErrors', null)
            }
            catch (exception) {
                return context.commit('setArticleErrors', exception.response.data.errors)
            }
        }
    },

    getters: {
        articleErrors(state) {
            return state.articleErrors
        }
    }
}