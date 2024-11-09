import { object, string, number, date, InferType } from 'yup';

export const RolSchema  = object(
{
    id_rol: number().required(),
    rol_name :  string().required(),
    rol_description :  string().required(),
}
);