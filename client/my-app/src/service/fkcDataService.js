import http from "../http-common";

class fkcDataService{

    login(credentials){
        return http.get("/user/login",{
            params : 
            { emailOrNumber: credentials.emailOrNumber,
        password: credentials.password}});
    }


}

export default new fkcDataService();