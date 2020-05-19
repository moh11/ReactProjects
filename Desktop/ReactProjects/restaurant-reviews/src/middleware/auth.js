import jwt_decode from "jwt-decode";

const Auth = {
    authenticate(token, userId, role) {
      localStorage.setItem("token", token);
    },
    isAuthenticated() {
        const token = Auth.getToken();
        const expAt = Auth.getTokenExpirationTime();
        return token && token.length > 0 && new Date().getTime()/1000 <= expAt;
    },
    getUserId() {
        const decoded = Auth.getDecodedToken(); 
        return decoded ? decoded._id : -1;
    },
    getToken() { 
        return localStorage.getItem("token");
    },
    getRole() {
        const decoded = Auth.getDecodedToken();
        return decoded ? decoded.role: "";
    },
    signout() {
      localStorage.clear();
    },
    getDecodedToken() {
       const token = localStorage.getItem("token"); 
       if(token && token.length > 0) {
           return jwt_decode(Auth.getToken());
       }
    },
    getTokenExpirationTime() {
        const decoded = Auth.getDecodedToken();
        return decoded ? decoded.exp: 0;
    }
};

export default Auth;