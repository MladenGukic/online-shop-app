import { HttpService } from './HttpService'

class ArticlesService extends HttpService {
    add(article) {
        return this.axios.post('/articles', article)
    }
}

export const articlesService = new ArticlesService()