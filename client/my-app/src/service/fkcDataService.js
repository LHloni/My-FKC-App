import http from "../http-common";

class fkcDataService{

    login(credentials){
        // console.log("HERE");
        // console.log( credentials.emailOrNumber+" , "+credentials.password);
        return http.get("/user/login",{params : { emailOrNumber: credentials.emailOrNumber,
        password: credentials.password}});
    }


}

export default new fkcDataService();