
import { ChilcareSchemaSchemaType } from "../models/createChidcare.model";
import CreateChildCareDto from "../models/createchildcare.dto";
import { LoginSchemaType } from "../models/login.model";
import { RegisterSchemaType } from "../models/register.model";
import User from "../models/user.model";
import HttpService from "./HttpService";

export default class ApiService {
    static async Login(loginDto: LoginSchemaType) {
        const response = await HttpService.postData("auth/login", "", loginDto)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Login failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Login error:", error.message);
                throw error;
            });
        return response;
    }
    
    static async GetUser() {
        const response = await HttpService.getData("user", "", {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get user failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get user error:", error.message);
                throw error;
            });
        return response;
    }
    
    static async GetChildCares() {
        const response = await HttpService.getData("ChildCare", "", {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get childcare failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get childcare error:", error.message);
                throw error;
            });
        return response;
    }
    
    static async GetChildCareUsers() {
        const response = await HttpService.getData("Manager/GetChildCaresUsers", "", {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get ChildCareUsers failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get ChildCareUsers error:", error.message);
                throw error;
            });
        return response;
    }
    
    static async Logout() {
        const response = await HttpService.getData("Auth/Logout", "", {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Logout failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Logout error:", error.message);
                throw error;
            });
        return response;
    }

    static async RegisterManger(registerDto: RegisterSchemaType) {
        const response = await HttpService.postData("Manager/CreateManager", "", registerDto)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Register failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Register error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateEducator(educator: User, childcareId: string) {
        const response = await HttpService.postData("Manager/CreatePersonal", childcareId, educator)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Register failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Register error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateParent(parent: User, childcareId: string) {
        const response = await HttpService.postData("Manager/CreateParent", childcareId, parent)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Register failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Register error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateChildCare(createChildcareDto: CreateChildCareDto) {
        const response = await HttpService.postData("ChildCare", "", createChildcareDto)
            .then((res) => {
                console.log("Create childcare response:", res);
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Create childcare failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Create childcare error:", error.message);
                throw error;
            });
        return response;
    }
}