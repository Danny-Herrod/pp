# 📸 Carpeta de Imágenes

Esta carpeta contiene todas las imágenes del sitio web Xinocore.

## 📁 Estructura

```
images/
├── portfolio/      # Imágenes de proyectos (screenshots, mockups)
├── logos/         # Logo de Xinocore y logos de clientes
├── icons/         # Iconos personalizados y favicon
└── backgrounds/   # Imágenes de fondo (opcional)
```

## 📝 Instrucciones

### Para agregar imágenes de proyectos:

1. **Coloca las imágenes en** `portfolio/`
2. **Nombra los archivos de forma descriptiva:**
   - Ejemplo: `cafe-las-nubes-main.jpg`
   - Usa minúsculas y guiones

3. **Tamaños recomendados:**
   - Imágenes principales: 1200x900px
   - Miniaturas: 600x450px

4. **Optimiza las imágenes:**
   - Formato: JPG o WebP
   - Peso máximo: 200KB
   - Usa https://tinypng.com/ para comprimir

### Para agregar el logo:

1. **Coloca el logo en** `logos/`
2. **Nombre sugerido:** `xinocore-logo.png` o `xinocore-logo.svg`
3. **Formato:** PNG con transparencia o SVG
4. **Tamaño:** 200x200px

### Para agregar favicon:

1. **Coloca el favicon en** `icons/`
2. **Nombre:** `favicon.ico` o `favicon.png`
3. **Tamaño:** 32x32px o 16x16px

## 🔗 Cómo vincular imágenes

En HTML:
```html
<img src="assets/images/portfolio/mi-proyecto.jpg" alt="Descripción">
```

En projects.json:
```json
"image": "assets/images/portfolio/mi-proyecto.jpg"
```

## ✅ Checklist

- [ ] Las imágenes están en la carpeta correcta
- [ ] Los nombres de archivo son descriptivos
- [ ] Las imágenes están optimizadas (< 200KB)
- [ ] Las rutas en HTML/JSON están actualizadas

---

**Consulta `GUIA_DE_IMAGENES.md` en la raíz del proyecto para más detalles.**
