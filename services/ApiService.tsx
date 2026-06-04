
import { ChilcareSchemaSchemaType } from "../models/createChidcare.model";
import CreateChildCareDto from "../models/createchildcare.dto";
import { LoginSchemaType } from "../models/login.model";
import { RegisterSchemaType } from "../models/register.model";
import User from "../models/user.model";
import HttpService from "./HttpService";
import CreateChildDTO from "../models/createchild.dto";
import CreateRoomDTO from "../models/createroom.dto";
import AssignEducatorDTO from "../models/assigneducator.dto";
import UpdateEducatorHoursDTO from "../models/updateeducatorhours.dto";
import CreateDailyReportDTO from "../models/createDailyReport.dto";
import UpdateDailyReportDTO from "../models/updateDailyReport.dto";

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

    static async GetRoomsByChildCare(childcareId: string | number) {
        const response = await HttpService.getData("Room/ByChildCare", String(childcareId), {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get rooms failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get rooms error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetRoomById(roomId: string | number) {
        const response = await HttpService.getData("Room", String(roomId), {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get room details failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get room details error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateRoom(childcareId: string | number, room: CreateRoomDTO) {
        const response = await HttpService.postData("Room/ByChildCare", String(childcareId), room)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Create room failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Create room error:", error.message);
                throw error;
            });
        return response;
    }

    static async UpdateRoom(roomId: string | number, room: CreateRoomDTO) {
        const response = await HttpService.putData("Room", String(roomId), room)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Update room failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Update room error:", error.message);
                throw error;
            });
        return response;
    }

    static async DeleteRoom(roomId: string | number) {
        const response = await HttpService.deleteData("Room", String(roomId), {})
            .then((res) => {
                if (!res || res.success === true) {
                    return res ?? { success: true };
                } else {
                    console.log("Delete room failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Delete room error:", error.message);
                throw error;
            });
        return response;
    }

    static async AssignEducatorToRoom(roomId: string | number, dto: AssignEducatorDTO) {
        const response = await HttpService.postData(`Room/${String(roomId)}/AssignEducator`, "", dto)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Assign educator failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Assign educator error:", error.message);
                throw error;
            });
        return response;
    }

    static async UnassignEducatorFromRoom(roomId: string | number, educatorId: string) {
        const response = await HttpService.deleteData(`Room/${String(roomId)}/UnassignEducator`, String(educatorId), {})
            .then((res) => {
                if (!res || res.success === true) {
                    return res ?? { success: true };
                } else {
                    console.log("Unassign educator failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Unassign educator error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetRoomEducators(roomId: string | number) {
        const response = await HttpService.getData(`Room/${String(roomId)}/Educators`, "", {})
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Get room educators failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Get room educators error:", error.message);
                throw error;
            });
        return response;
    }

    static async UpdateRoomEducatorHours(roomId: string | number, dto: UpdateEducatorHoursDTO) {
        const response = await HttpService.putData(`Room/${String(roomId)}/UpdateEducatorHours`, "", dto)
            .then((res) => {
                if (res.success === true) {
                    return res;
                } else {
                    console.log("Update educator hours failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Update educator hours error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetExternalActivities() {
        const response = await HttpService.getData("Report/ExternalActivities", "", {})
            .then((res) => {
                if (res?.success === true) {
                    return res;
                } else {
                    console.log("Get external activities failed:", res?.message);
                    throw new Error(res?.message ?? "Get external activities failed");
                }
            })
            .catch((error) => {
                console.log("Get external activities error:", error.message);
                throw error;
            });
        return response;
    }

    static async GetDailyReportsByChild(childId: string | number) {
        const response = await HttpService.getData("Report/Child", String(childId), {})
            .then((res) => {
                if (res?.success === true) {
                    return res;
                } else {
                    console.log("Get daily reports failed:", res?.message);
                    throw new Error(res?.message ?? "Get daily reports failed");
                }
            })
            .catch((error) => {
                console.log("Get daily reports error:", error.message);
                throw error;
            });
        return response;
    }

    static async CreateDailyReport(childId: string | number, dto: CreateDailyReportDTO) {
        const response = await HttpService.postData("Report/Child", String(childId), dto)
            .then((res) => {
                if (res?.success === true) {
                    return res;
                } else {
                    console.log("Create daily report failed:", res?.message);
                    throw new Error(res?.message ?? "Create daily report failed");
                }
            })
            .catch((error) => {
                console.log("Create daily report error:", error.message);
                throw error;
            });
        return response;
    }

    static async UpdateDailyReport(reportId: string | number, dto: UpdateDailyReportDTO) {
        const response = await HttpService.putData("Report", String(reportId), dto)
            .then((res) => {
                if (res?.success === true) {
                    return res;
                } else {
                    console.log("Update daily report failed:", res?.message);
                    throw new Error(res?.message ?? "Update daily report failed");
                }
            })
            .catch((error) => {
                console.log("Update daily report error:", error.message);
                throw error;
            });
        return response;
    }

    static async DeleteDailyReport(reportId: string | number) {
        const response = await HttpService.deleteData("Report", String(reportId), {})
            .then((res) => {
                if (!res || res.success === true) {
                    return res ?? { success: true };
                } else {
                    console.log("Delete daily report failed:", res.message);
                    throw new Error(res.message);
                }
            })
            .catch((error) => {
                console.log("Delete daily report error:", error.message);
                throw error;
            });
        return response;
    }
}