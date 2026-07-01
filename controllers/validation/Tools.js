// controllers/validation/Tools.js

/**
 * Herramientas de validación y utilidad para el formulario
 */
class Tools {
    
    /**
     * Convierte un texto a mayúsculas
     */
    static aMayusculas(texto) {
        return texto ? texto.toUpperCase() : '';
    }

    /**
     * Limpia un campo de solo números
     */
    static limpiarNumeros(valor) {
        return valor ? valor.replace(/\D/g, '') : '';
    }

    /**
     * Limpia un campo de domicilio (permite letras, números, - y /)
     */
    static limpiarDomicilio(valor) {
        return valor ? valor.toUpperCase().replace(/[^A-Z0-9\-\/ ]/g, '') : '';
    }

    /**
     * Verifica si un string contiene solo números
     */
    static soloNumeros(valor) {
        return /^\d+$/.test(valor);
    }

    /**
     * Verifica si un string es un email válido
     */
    static esEmailValido(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    /**
     * Verifica si un string es una CURP válida
     */
    static esCURPValida(curp) {
        const regex = /^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}$/;
        return regex.test(curp.toUpperCase());
    }

    /**
     * Formatea un teléfono (solo números)
     */
    static formatearTelefono(telefono) {
        return telefono ? telefono.replace(/\D/g, '') : '';
    }

    /**
     * Obtiene el valor de un campo por ID
     */
    static obtenerValor(id) {
        const elemento = document.getElementById(id);
        return elemento ? elemento.value.trim() : '';
    }

    /**
     * Obtiene el texto seleccionado de un select por ID
     */
    static obtenerTextoSelect(id) {
        const select = document.getElementById(id);
        if (!select || select.selectedIndex < 0) return '';
        return select.options[select.selectedIndex].text.trim();
    }

    /**
     * Obtiene el valor de un radio button seleccionado
     */
    static obtenerRadio(nombre) {
        const radio = document.querySelector(`input[name="${nombre}"]:checked`);
        return radio ? radio.value : '';
    }

    /**
     * Muestra un mensaje de error en un campo
     */
    static mostrarError(campo, mensaje) {
        if (!campo) return;
        
        campo.classList.add('input-error');
        
        const contenedor = campo.closest('.form-group') || campo.parentElement;
        const mensajeError = contenedor?.querySelector('.error-mensaje');
        if (mensajeError) mensajeError.textContent = mensaje;
    }

    /**
     * Limpia el mensaje de error de un campo
     */
    static limpiarError(campo) {
        if (!campo) return;
        
        campo.classList.remove('input-error');
        
        const contenedor = campo.closest('.form-group') || campo.parentElement;
        const mensajeError = contenedor?.querySelector('.error-mensaje');
        if (mensajeError) mensajeError.textContent = '';
    }

    /**
     * Muestra una alerta flotante de solo números
     */
    static mostrarAlertaNumeros() {
        document.querySelectorAll('.alerta-numeros').forEach(alerta => alerta.remove());

        const alerta = document.createElement('div');
        alerta.className = 'alerta-numeros';
        alerta.textContent = 'Solo se aceptan números en este campo';
        document.body.appendChild(alerta);

        setTimeout(() => alerta.remove(), 2500);
    }

    /**
     * Desplaza la página al primer campo con error
     */
    static desplazarPrimerError() {
        const primerError = document.querySelector('.input-error');
        if (!primerError) return;

        const top = primerError.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    /**
     * Escapa caracteres HTML para prevenir XSS
     */
    static escaparHtml(valor) {
        return String(valor || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Convierte un texto a formato de título (mayúsculas)
     */
    static texto(valor, respaldo = 'No especificado') {
        const texto = valor || respaldo;
        return Tools.escaparHtml(String(texto).toUpperCase());
    }
}

if (typeof window !== 'undefined') {
    window.Tools = Tools;
}

console.log('✅ Tools cargado correctamente');