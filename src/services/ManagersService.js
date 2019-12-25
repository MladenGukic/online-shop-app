import { HttpService } from './HttpService'

class ManagersService extends HttpService  {
        
    getAll(first_name = '') {
        return this.axios.get('/managers', {params:{first_name}})
    }

    get(id) {
        return this.axios.get(`/managers/${id}`)
    }

    add(manager) {
        return this.axios.post('/managers', manager)
    }
}

export const managersService = new ManagersService()