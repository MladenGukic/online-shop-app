import {authService } from './../services/AuthService'

export const AuthModule = {
    state: {
        token: localStorage.getItem('token'),
        errors: {email: '', password_confirm: ''}
    },

    mutations: {
        setToken(state, token) {
            state.token = token
        },

        setErrors(state, errors) {
            state.errors = errors
        }
    },

    actions: {
        async login(context, {email, password}) {
            try {
                const response = await authService.login(email, password)
                context.commit('setToken', response.data.token)
                context.commit('setErrors', null)
                authService.setHeaders({
                    Authorization: `Bearer ${response.data.token}`
                })
                localStorage.setItem('token', response.data.token)
            } catch(exception) {
                context.commit('setErrors', exception.response.data.error)
            }
        },

        logout(context) {
            context.commit('setToken', null)
            localStorage.setItem('token', '')
        },

        async register(context, user) {
            try { 
                 const response = await authService.register(user)
                 return response
            } catch(exception) {
                console.log(exception.response.data.errors) //eslint-disable-line
                context.commit('setErrors', exception.response.data.errors)
            }
        }
    },

    getters: {
        isUserAuthenticated(state) {
            return !!state.token
        },

        errors(state) {
            return state.errors
        }
    }
}