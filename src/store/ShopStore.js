import { shopsService } from '../services/ShopsService'

export const ShopModule = {
    state: {
        shops: [],
        shop: {},
        shopErrors: {name: '', logoUrl: ''}
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
        }
    },

    actions: {
        fetchShops(context, name) {
            return shopsService.getAll(name)
            .then(
                response => {
                    context.commit('setShops', response.data)
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
        }
    }
}