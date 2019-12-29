import { commentsService } from '../services/CommentsService'

    export const CommentModule = {
        state: {
            comments: [],
            commentErrors: {}
        },

        mutations: {
            setComments(state, comments) {
                state.comments = comments
            },

            setCommentErrors(state, errors) {
                state.commentErrors = errors
            }
        },

        actions: {
            fetchComments(context) {
                return commentsService.getComments()
                .then(response => {
                    context.commit('setComments', response.data)
                })
            },

            async addComment(context, comment) {
                 try{
                     await commentsService.addComment(comment)
                     context.commit('setCommentErrors', false)
                     return context.dispatch('fetchComments')
                 }catch(exception) {
                    context.commit('setCommentErrors', exception.response.data.errors)
                 }
            },

            async deleteComment(context, id) {
                await commentsService.delete(id)
                return context.dispatch('fetchComments')
            }
        },

        getters: {
            comments(state) {
                return state.comments
            },

            commentErrors(state) {
                return state.commentErrors
            }
        }
    }