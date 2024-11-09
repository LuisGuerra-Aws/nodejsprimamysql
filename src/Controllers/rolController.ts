import { deserializeJsonResponse } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { getRolesService, getRolService, createRolService, updateRolService, deleteRolService } from '../Services/rolService';
import { RolSchema } from '../models/schemas/RolSchema';
import * as y from 'yup';
import { Rol } from '../models/Rol';

export const getRoles = async ( req: Request, res: Response) => {

    const jsonRoles = getRolesService(); 

    return res.Json(jsonRoles);

};

export const getRol = async ( req: Request, res: Response) => {
    const { idtext } = req.params;

    const id = parseInt( idtext, 10);
    
    const jsonRol = getRolService(id); 

    return res.Json(jsonRol);

};

export const createRol  = async ( req: Request, res: Response) => {

    try {
        const payload = RolSchema.validateSync(req.body, {abortEarly : false, stripUnknown: true});
        var rolinsert = Rol;
        rolinsert.rol_name = payload.rol_name;
        rolinsert.rol_description = payload.rol_description;
        
        const rol = createRolService(rolinsert);

        if (rol != null)
        {
            return res.status(400).json( {message : 'Error en inserción'})
        }
        else {
            return res.status(201).json( {data : rol});
        }
    }
    catch (e ){
        const error = e as y.ValidationError;
        return res.status(400).json({ errors: error.errors });
    }

    
};

export const updateRol  = async ( req: Request, res: Response) => {

    try {
        const payload = RolSchema.validateSync(req.body, {abortEarly : false, stripUnknown: true});
        var rolUpdate = Rol;
        rolUpdate.rol_name = payload.rol_name;
        rolUpdate.rol_description = payload.rol_description;
        
        const rol = updateRolService(rolUpdate);

        if (rol != null)
        {
            return res.status(400).json( {message : 'Error en Actualización'})
        }
        else {
            return res.status(201).json( {data : rol});
        }
    }
    catch (e ){
        const error = e as y.ValidationError;
        return res.status(400).json({ errors: error.errors });
    }
  
};

export const deleteRol = async ( req: Request, res: Response) => {
    const { idtext } = req.params;

    const id = parseInt( idtext, 10);
    
    const booleano = deleteRolService(id);
    if (booleano)
        return res.status(204).send();
    else
        return res.status(404).json( {message : 'No encontrado para eliminar'})

};