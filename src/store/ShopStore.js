import { shopsService } from '../services/ShopsService'

export const ShopModule = {
    state: {
        shops: [],
        shop: {},
        shopErrors: {name: '', logoUrl: ''},
        pages: '',
        name: ''
    },

    mutations: {
        setShops(state,shops) {
            state.shops = shops
        },
        setShop(state, shop) {
            state.shop = shop
        },

        setShopErrors(state, errors) {
            state.shopErrors = errors
        },

        setNextPage(state, page) {
            state.pages = page
        },

        setName(state, name) {
            state.name = name
        }
    },

    actions: {
        fetchShops(context, {name, page}) {
            return shopsService.getAll(name, page)
            .then(
                response => {
                    context.commit('setName', name)
                    console.log(response.data) //eslint-disable-line
                    context.commit('setShops', response.data.data)
                    context.commit('setNextPage', response.data)
            })
        },

        fetchShop(context, id) {
            return shopsService.get(id)
            .then(
                response => {context.commit('setShop', response.data)
            })
        },

        addShop(context, shop)  {
            return shopsService.add(shop)
            .catch(error => context.commit('setShopErrors',error.response.data.errors))
        },
    },

    getters: {
        shops(state) {
            return state.shops
        },

        shop(state) {
            return state.shop
        },

        shopErrors(state) {
            return state.shopErrors
        },

        pages(state) {
            console.log(state.pages) //eslint-disable-line
            return state.pages
        },

        name(state) {
            return state.name
        }
    }
}