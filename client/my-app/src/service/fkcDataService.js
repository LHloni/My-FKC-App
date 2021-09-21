import http from "../http-common";

class fkcDataService{

    login(){
        return http.get("/user/login");
    }


}

export default new fkcDataService();