import type { Request, Response } from "express"
import PermissionService from "./permission.service.ts"

export async function getPermissions(req : Request,res : Response){
    const roleId =String(req.query.roleId) //|| req.user.roleId
    const data  = await PermissionService.getPermissionByRoleId(roleId)
    

    res.status(200).json({data, success: true})
}

export async function updatedPermission(req : Request,res : Response){
    const {roleId ,permissionsToAdd , permissionsToRemove} = req.body
    const data  = await PermissionService.updatePermissions(roleId,permissionsToAdd , permissionsToRemove)
    res.status(200).json({data, success: true})
}

export async function getAllPermissions(req : Request,res : Response) {
    const data  = await PermissionService.getAllPermission()
    res.status(200).json({data, success: true})
}   