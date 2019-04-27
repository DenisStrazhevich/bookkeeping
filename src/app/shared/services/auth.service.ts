export class AuthService {

    private isAutenticated = false;

    login() {
        this.isAutenticated = true;
    }

    logout() {
        this.isAutenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.isAutenticated;
    }
}
