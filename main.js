// Aquí puedes agregar funcionalidades como filtrado de productos, animaciones, etc.
// 1. Definimos las constantes y variables

const productos = [
    {
        "id": 1,
        "nombre": "Estatua de león",
        "descripcion": "Estatua de león impresa en 3D, material resistente.",
        "categoria": "decoración",
        "precio": 45.99,
        "imagen": "./img/imagen.webp"
    },
    {
        "id": 2,
        "nombre": "Soporte para celular",
        "descripcion": "Soporte ajustable para varios modelos de celular.",
        "categoria": "accesorios",
        "precio": 10.49,
        "imagen": "./img/imagen.webp"
    },
    {
        "id": 3,
        "nombre": "Caja joyero",
        "descripcion": "Caja con diseño ornamental, ideal para guardar joyas pequeñas.",
        "categoria": "decoración",
        "precio": 20.75,
        "imagen": "./img/imagen.webp"
    },
    {
        "id": 4,
        "nombre": "Funda de cámara",
        "descripcion": "Funda resistente para proteger cámaras DSLR.",
        "categoria": "accesorios",
        "precio": 15.89,
        "imagen": "./img/imagen.webp"
    }
];

const areaProductos = document.getElementById('areaProductos');
const filtroCategoria = document.getElementById('filtroCategoria');
const ordenarPrecio = document.getElementById('ordenarPrecio');

// 2. Definimos las funciones

function mostrarProductos(categoria = 'todos') {
    let productosFiltrados = productos;

    if (categoria !== 'todos') {
        productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    }

    let htmlProductos = productosFiltrados.map(producto => {
        return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><strong>Precio: $${producto.precio}</strong></p>
                        <button class="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    areaProductos.innerHTML = htmlProductos;
}

function mostrarSeccion(id) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.contenido');
    secciones.forEach(seccion => {
        seccion.classList.add('oculto');
    });

    // Mostrar la sección seleccionada
    document.getElementById(id).classList.remove('oculto');
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('activo');
}

// 3. Event listeners y acciones al cargar la página

document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, muestra todos los productos
    mostrarProductos();

    // Generar opciones de filtro según las categorías de los productos
    const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
    categoriasUnicas.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.innerText = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        filtroCategoria.appendChild(option);
    });

    // Event listeners
    filtroCategoria.addEventListener('change', (event) => {
        mostrarProductos(event.target.value);
    });

    ordenarPrecio.addEventListener('change', (event) => {
        if (event.target.value === 'ascendente') {
            productos.sort((a, b) => a.precio - b.precio);
        } else {
            productos.sort((a, b) => b.precio - a.precio);
        }
        mostrarProductos(filtroCategoria.value);  // Mostrar productos con el orden actual y el filtro aplicado
    });
});

mostrarSeccion('home');