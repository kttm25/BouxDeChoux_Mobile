
import { ChilcareSchemaSchemaType } from "../models/createChidcare.model";
import CreateChildCareDto from "../models/createchildcare.dto";
import { LoginSchemaType } from "../models/login.model";
import { RegisterSchemaType } from "../models/register.model";
import User from "../models/user.model";
import HttpService from "./HttpService";
import CreateChildDTO from "../models/createchild.dto";

export default class ApiService {
    static async Login(loginDto: LoginSchemaType) {
        const response = await HttpService.postData("Auth/Login", "", loginDto)
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
        const response = await HttpService.getData("User", "", {})
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

    static async GetParentByChildCares(childcareId: string | number) {
        const response = await HttpService.getData("Manager/GetParentByChildCares", String(childcareId), {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get parents by childcare failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get parents by childcare error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetPersonalByChildCares(childcareId: string | number) {
        const response = await HttpService.getData("Manager/GetPersonalByChildCares", String(childcareId), {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get personals by childcare failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get personals by childcare error:", error.message);
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

    static async CreateEducator(educator: User, childcareId: string | number) {
        const response = await HttpService.postData("Manager/CreatePersonal", String(childcareId), educator)
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
    
    static async UpdateUser(user: User) {
        const response = await HttpService.putData("User", "", user)
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

    static async CreateParent(parent: User, childcareId: string | number) {
        const response = await HttpService.postData("Manager/CreateParent", String(childcareId), parent)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Create parent failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Create parent error:", error.message);
                throw error;
            });
        return response;
    }

    static async UpdateParent(parentId: string | number, parent: Partial<User>) {
        const response = await HttpService.putData("Parent", String(parentId), parent)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Update parent failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Update parent error:", error.message);
                throw error;
            });
        return response;
    }

    static async DeleteParent(parentId: string | number) {
        const response = await HttpService.deleteData("Parent", String(parentId), {})
            .then((res) => {
                if (!res || res.success === true) {
                    return res ?? { success: true };
                } else {
                    console.log("Delete parent failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Delete parent error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateChild(child: CreateChildDTO, childcareId: string | number) {
        console.log("Creating child with data:", child, "for childcare ID:", childcareId);
        const response = await HttpService.postData("Child/ByChildCare", String(childcareId), child)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Create child failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Create child error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetChildrenByChildcare(childcareId: string | number) {
        const response = await HttpService.getData("Child/GetAllByChilCare", String(childcareId), {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get children failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get children error:", error.message);
                throw error;
            });
        return response;
    }

    static async DeleteChild(childId: string | number) {
        const response = await HttpService.deleteData("Child", String(childId), {})
            .then((res) => {
                if (!res || res.success === true) {
                    return res ?? { success: true };
                } else {
                    console.log("Delete child failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Delete child error:", error.message);
                throw error;
            });
        return response;
    }
}