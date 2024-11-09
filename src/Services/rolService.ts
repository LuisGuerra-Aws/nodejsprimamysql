import { prismaClient } from '../Repository/database';
import { Rol } from '../models/Rol';

export const getRolesService = async ( ) =>{
    const roles = await prismaClient.roles.findMany(
        {
            orderBy: { 
                    rol_name: 'asc'
                },
        }
    );
    return ( { data: roles });
};

const findbyRolId( id : number) => {
    const rol = await prismaClient.roles.findUnique(
        {
            where : {
                 id_rol : id,
            }
        }
    );
    return rol; 
};

export const getRolService = async ( id : number) =>{
    const rol = findbyRolId(id);
    return ( { data: rol });
};

export const createRolService = async ( rol : typeof Rol) => {
    var rolInsert;
    if (    (rol.rol_description != null    ) 
        &&  (rol.rol_description.length > 0 )
        &&  (rol.rol_name != null ) 
        &&  (rol.rol_name.length > 0) 
    ) {

        try{
            rolInsert =  await prismaClient.roles.create(
                {
                    data : { 
                        id_rol : rol.id_rol,
                        rol_name : rol.rol_name,
                        rol_description : rol.rol_description
                     },
                }
                );
            }
        catch (e){
            const error = e.error;
            rolInsert = null;
            /*
            rolInsert.id_rol = null;
            rolInsert.rol_name = 'Inserción NO Realizada, Error Function';
            rolInsert.rol_description = 'Inserción NO Realizada, Error Function';
            */
           }

    } else {
        rolInsert = null;
        /*
        rolInsert.id_rol = null;
        rolInsert.rol_name = 'Inserción NO Realizada, datos Obligatorios con Nulo';
        rolInsert.rol_description = 'Inserción NO Realizada, datos Obligatorios con Nulo';
        */
    }
    
    return rolInsert;

};

export const updateRolService = async ( rol : typeof Rol) => {

    const rolExist = findbyRolId(rol.id_rol);

    if (rolExist){
        if (rol.getName() != null)
            rolExist.rol_name = rol.getName();
        if (rol.getDescription != null)
            rolExist.rol_description = rol.getDescription();

        const rolUpdate = await prismaClient.roles.update(
            {
                where : {
                    id_rol : rol.getIdRol(),
                },
                data : { 
                    rol_name : rolExist.getName(),
                    rol_description : rolExist.getDescription()
                 },
            }
        );
        return rolUpdate;

    } else {
        return null;
    }



};

export const deleteRolService( id : number) => {

    const rolExist = findbyRolId(id);

    if (rolExist){
        const rol = await prismaClient.roles.delete(
        {
            where : {
                 id_rol : id,
            }
        }
        );
        return true;
    }
    else {
        return false;
    }
     
};
