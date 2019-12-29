import { HttpService } from './HttpService'

class CommentsService extends HttpService {

    getComments() {
        return this.axios.get('/comments')
    }

    addComment(comment) {
        return this.axios.post('/comments', comment)
    }

    delete(id) {
        return this.axios.delete(`/comments/${id}`)
    }
}

export const commentsService = new CommentsService()