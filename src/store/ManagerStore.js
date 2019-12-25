import {managersService} from '../services/ManagersService'

export const ManagerModule = {
    state: {
        managers: [],
        manager: {},
        managerErrors: null 
    },

    mutations: {
        setManagers(state, managers) {
            state.managers = managers
        },

        setManager(state, manager) {
            state.manager= manager
        },

        setManagerErrors(state, errors) {
            state.managerErrors = errors
        }
    },

    actions: {
        fetchManagers(context, first_name) {
            return managersService.getAll(first_name)
            .then(
                response => {context.commit('setManagers', response.data)
            })
        },

        fetchManager(context, id) {
            return managersService.get(id)
            .then(
                response => {context.commit('setManager', response.data)}
            )
        },

        addManager(context, manager) {
            return managersService.add(manager)
            .catch(response => context.commit('setManagerErrors', response.data.errors))
        }
    },

    getters: {
        managers(state) {
            return state.managers
        },

        manager(state) {
            return state.manager
        },

        managerErros(state) {
            return state.managerErrors
        }
    }
}