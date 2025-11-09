/**
 * Configuración Global de Xinocore
 * @version 1.0.0
 * @description Configuraciones generales del sitio web
 */

const XinocoreConfig = {
    /**
     * Modo de desarrollo
     * true = Mostrar logs en consola
     * false = Ocultar todos los logs (modo producción)
     */
    development: false,

    /**
     * Información de contacto
     */
    contact: {
        phone: '+50587248446',
        email: 'Dannyherrod@xinocore.com',
        location: 'Jinotega, Nicaragua'
    },

    /**
     * Configuración de animaciones
     */
    animations: {
        enabled: true,
        duration: 1000
    },

    /**
     * Configuración de fuente de datos de proyectos
     * IMPORTANTE: Reemplaza los valores de GitHub con tu información
     */
    projects: {
        github: {
            // Reemplaza con tu nombre de usuario de GitHub
            username: 'Danny-Herrod',
            // Reemplaza con el nombre de tu repositorio
            repository: 'xinocore-projects-data',
            // Nombre del archivo JSON en el repositorio
            file: 'data.projects.json',
            // Rama principal (generalmente 'main' o 'master')
            branch: 'main',
            // Cache busting: agrega timestamp para evitar caché
            cacheBusting: true,
            // URL se construye automáticamente con cache-busting
            get url() {
                const baseUrl = `https://raw.githubusercontent.com/${this.username}/${this.repository}/${this.branch}/${this.file}`;
                // Agregar timestamp como query parameter para evitar caché
                if (this.cacheBusting) {
                    return `${baseUrl}?t=${Date.now()}`;
                }
                return baseUrl;
            }
        }
    }
};

/**
 * Sistema de Logging Controlado
 * Desactiva automáticamente los console.log en producción
 */
(function() {
    'use strict';

    if (!XinocoreConfig.development) {
        // Guardar referencias originales
        const noop = function() {};

        // Desactivar todos los métodos de console
        console.log = noop;
        console.warn = noop;
        console.error = noop;
        console.info = noop;
        console.debug = noop;
        console.trace = noop;
        console.dir = noop;
        console.dirxml = noop;
        console.group = noop;
        console.groupEnd = noop;
        console.time = noop;
        console.timeEnd = noop;
        console.assert = noop;
        console.profile = noop;

        // Mensaje único en consola
        console.clear("Espero que tengas un buen dia :3");
    }
})();

/**
 * Helper para logging condicional
 * Usa esta función en lugar de console.log directo
 */
window.devLog = function(...args) {
    if (XinocoreConfig.development) {
        console.log(...args);
    }
};

/**
 * Helper para warnings condicionales
 */
window.devWarn = function(...args) {
    if (XinocoreConfig.development) {
        console.warn(...args);
    }
};

/**
 * Helper para errors condicionales
 */
window.devError = function(...args) {
    if (XinocoreConfig.development) {
        console.error(...args);
    }
};
