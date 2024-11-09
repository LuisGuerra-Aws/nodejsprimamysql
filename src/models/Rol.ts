 export const  Rol =  {
    id_rol: 0,
    rol_name : '',
    rol_description : '',

    getName : function() {
        return this.rol_name;
    },

    getDescription : function() {
        return this.rol_description; 
    },

    getIdRol : function() {
        return this.id_rol;
    },

    getRol : function() {
        return this;
    }

};



