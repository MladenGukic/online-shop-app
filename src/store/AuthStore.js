import {authService } from './../services/AuthService'

export const AuthModule = {
    state: {
        token: localStorage.getItem('token'),
        errors: null,
        registerErrors: {email: '', password: ''},
        user: localStorage.getItem('user')
    },

    mutations: {
        setToken(state, token) {
            state.token = token
        },

        setErrors(state, errors) {
            state.errors = errors
        },

        setRegisterErrors(state, errors) {
            state.registerErrors = errors
        },

        setUser(state, user) {
            state.user = user
        }
    },

    actions: {
        async login(context, {email, password}) {
            try {
                const response = await authService.login(email, password)
                context.commit('setToken', response.data.token)
                context.commit('setUser', JSON.stringify(response.data.user))
                localStorage.setItem('user', JSON.stringify(response.data.user))
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
            localStorage
        },

        async register(context, user) {
            try { 
                 const response = await authService.register(user)
                 context.commit('setRegisterErrors', {email: '', password: ''})
                 return response
            } catch(exception) {
                console.log(exception.response.data.errors) //eslint-disable-line
                context.commit('setRegisterErrors', exception.response.data.errors)
            }
        },
    },

    getters: {
        isUserAuthenticated(state) {
            return !!state.token
        },

        errors(state) {
            return state.errors
        },
        
        registerErrors(state) {
            return state.registerErrors
        },

        user(state) {
            return JSON.parse(state.user)
        }
    }
}