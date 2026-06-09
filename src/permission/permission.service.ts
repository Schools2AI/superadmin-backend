import {fetchPermissionsById,updateRolePermissions,fetchAllPermissions} from "../model/permission.model.ts"
class PermissionService{
    async getPermissionByRoleId(roleId: string){
        const permission = await fetchPermissionsById(roleId)
        return permission
    }
    async updatePermissions(roleId: number,
    permissionsToAdd: number[],
    permissionsToRemove: number[]){

        const updatedPermission = await updateRolePermissions(roleId,permissionsToAdd,permissionsToRemove)
        return updatedPermission
    }
    async getAllPermission(){
const permission = await fetchAllPermissions()
        return permission
    }
}

export default new PermissionService()