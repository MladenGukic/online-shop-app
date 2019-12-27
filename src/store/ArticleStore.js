import {articlesService} from '../services/ArticlesService'

export const ArticleModule = {
    actions: {
        addArticle(context, article) {
            return articlesService.add(article)
        }
    }
}