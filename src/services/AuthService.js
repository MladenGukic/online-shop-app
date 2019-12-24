import { HttpService } from './HttpService'

class AuthService extends HttpService {
    login(email, password) {
         return this.axios.post('/login', {email, password})
    }

    register(user) {
        return this.axios.post('/register', user)
    }
}

export const authService = new AuthService()