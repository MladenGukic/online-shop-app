import { HttpService } from './HttpService'

class ShopsService extends HttpService {
    getAll(name = '', page = 1) {
        return this.axios.get('/shops', { params: { name, page } })
    }

    get(id) {
        return this.axios.get(`/shops/${id}`)
    }

    add(shop) {
        return this.axios.post('/shops', shop)
    }

    setManager(manager_id, id) {
        return this.axios.patch(`/shops/${id}`, manager_id)
    }

    delete(id) {
        return this.axios.delete(`/shops/${id}`)
    }

}

export const shopsService = new ShopsService()