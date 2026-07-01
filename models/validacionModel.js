// models/ValidacionModel.js

class ValidacionModel {
    /**
     * Valida un campo vacío
     */
    static esCampoVacio(valor) {
        return !valor || valor.trim() === '';
    }

    /**
     * Valida que un select no tenga la opción por defecto
     */
    static esSeleccionInvalida(valor) {
        return !valor || valor === 'SELECCIONA' || valor === '';
    }

    /**
     * Valida el formato de CURP (SOLO longitud y obligatorio, SIN formato inválido)
     */
    static validarCURP(curp) {
        if (!curp || curp.trim() === '') {
            return { valido: false, mensaje: 'La CURP es obligatoria' };
        }
        
        const curpLimpio = curp.trim().toUpperCase();
        if (curpLimpio.length !== 18) {
            return { valido: false, mensaje: 'La CURP debe tener exactamente 18 caracteres' };
        }
        
        // ✅ SOLO VALIDA LONGITUD - NO VALIDA FORMATO
        return { valido: true, mensaje: 'CURP válida' };
    }

    /**
     * Valida el formato de email
     */
    static validarEmail(email) {
        if (!email || email.trim() === '') {
            return { valido: false, mensaje: 'El correo electrónico es obligatorio' };
        }
        
        if (!email.includes('@')) {
            return { valido: false, mensaje: 'El correo electrónico debe contener "@"' };
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return { valido: false, mensaje: 'Formato de correo electrónico inválido' };
        }
        
        return { valido: true, mensaje: 'Correo válido' };
    }

    /**
     * Valida un teléfono (solo números, 7-15 dígitos)
     */
    static validarTelefono(telefono) {
        if (!telefono || telefono.trim() === '') {
            return { valido: false, mensaje: 'El teléfono es obligatorio' };
        }
        
        const telefonoLimpio = telefono.replace(/\D/g, '');
        if (telefonoLimpio.length < 7 || telefonoLimpio.length > 15) {
            return { valido: false, mensaje: 'El teléfono debe tener entre 7 y 15 dígitos' };
        }
        
        return { valido: true, mensaje: 'Teléfono válido' };
    }

    /**
     * Valida código postal (5-10 dígitos)
     */
    static validarCP(cp) {
        if (!cp || cp.trim() === '') {
            return { valido: false, mensaje: 'El código postal es obligatorio' };
        }
        
        const cpLimpio = cp.replace(/\D/g, '');
        if (cpLimpio.length < 5 || cpLimpio.length > 10) {
            return { valido: false, mensaje: 'El código postal debe tener entre 5 y 10 dígitos' };
        }
        
        return { valido: true, mensaje: 'Código postal válido' };
    }

    /**
     * Valida promedio (0-10)
     */
    static validarPromedio(promedio) {
        if (!promedio || promedio.trim() === '') {
            return { valido: false, mensaje: 'El promedio es obligatorio' };
        }
        
        const num = parseFloat(promedio);
        if (isNaN(num)) {
            return { valido: false, mensaje: 'Debe ser un número válido' };
        }
        
        if (num < 0 || num > 10) {
            return { valido: false, mensaje: 'El promedio debe estar entre 0 y 10' };
        }
        
        return { valido: true, mensaje: 'Promedio válido' };
    }

    /**
     * Valida fecha de nacimiento
     */
    static validarFecha(fecha) {
        if (!fecha || fecha.trim() === '') {
            return { valido: false, mensaje: 'La fecha de nacimiento es obligatoria' };
        }
        
        let partes;
        let dia, mes, anio;
        
        if (fecha.includes('/')) {
            partes = fecha.split('/');
            if (partes.length === 3) {
                dia = parseInt(partes[0]);
                mes = parseInt(partes[1]) - 1;
                anio = parseInt(partes[2]);
            }
        } else if (fecha.includes('-')) {
            partes = fecha.split('-');
            if (partes.length === 3) {
                anio = parseInt(partes[0]);
                mes = parseInt(partes[1]) - 1;
                dia = parseInt(partes[2]);
            }
        }
        
        if (!dia || !mes || !anio) {
            return { valido: false, mensaje: 'Formato de fecha inválido' };
        }
        
        const fechaObj = new Date(anio, mes, dia);
        if (fechaObj.getFullYear() !== anio || fechaObj.getMonth() !== mes || fechaObj.getDate() !== dia) {
            return { valido: false, mensaje: 'Fecha inválida' };
        }
        
        const hoy = new Date();
        if (fechaObj > hoy) {
            return { valido: false, mensaje: 'La fecha no puede ser futura' };
        }
        
        return { valido: true, mensaje: 'Fecha válida' };
    }

    /**
     * Valida que el campo no esté vacío
     */
    static validarRequerido(valor, nombreCampo = 'Campo') {
        if (!valor || valor.trim() === '' || valor === 'SELECCIONA') {
            return { valido: false, mensaje: `${nombreCampo} es obligatorio` };
        }
        return { valido: true, mensaje: 'Campo válido' };
    }
}

if (typeof window !== 'undefined') {
    window.ValidacionModel = ValidacionModel;
}

console.log('✅ ValidacionModel cargado correctamente');