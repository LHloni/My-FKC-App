import http from "../http-common";

class fkcDataService{

    login(credentials){
        return http.get("/user/login",{
            params : 
            { emailOrNumber: credentials.emailOrNumber,
        password: credentials.password}});
    }

    register(data){
        return http.post("/user/register",data);
    }


}

export default new fkcDataService();