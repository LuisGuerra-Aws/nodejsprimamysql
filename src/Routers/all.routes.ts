import { Router } from 'express';

import { createRol, deleteRol, getRol, getRoles, updateRol } from '../Controllers/rolController';

export const allRoutes = () => {
    const router = Router();

    router.post('/api/rol', createRol);
    router.get('/api/rol', getRoles);
    router.get('/api/rol/:id',getRol);
    router.put('/api/rol', updateRol);
    router.delete('/api/rol/:id', deleteRol)

    return router;
}