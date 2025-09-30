const frutasTienda = [
    {
        id:1,
         nombre:"anana",
          precio: 1150,
          ruta_img: "img/anana.jpg"
     },
    {
        id:2,
         nombre:"arandano", 
         precio: 1550, 
         ruta_img: "img/arandano.jpg"
     },
     {
        id:3, 
        nombre:"banana", 
        precio: 850, 
        ruta_img: "img/banana.jpg"
     },
     {
        id:4, 
        nombre:"frambuesa", 
        precio: 1500, 
        ruta_img: "img/frambuesa.png"
     },
     {
        id:5, 
        nombre:"frutilla", 
        precio: 1500, 
        ruta_img: "img/frutilla.jpg"
     },
     {
        id:6, 
        nombre:"kiwi", 
        precio: 980, 
        ruta_img: "img/kiwi.jpg"
     },
     {
        id:7, 
        nombre:"mandarina", 
        precio: 1500, 
        ruta_img: "img/mandarina.jpg"
     },
     {
        id:8, 
        nombre:"manzana", 
        precio: 850, 
        ruta_img: "img/manzana.jpg"
     },
     {
        id:9, 
        nombre:"naranja", 
        precio: 950, 
        ruta_img: "img/naranja.jpg"
     },
     {
        id:10, 
        nombre:"pera", 
        precio: 1250, 
        ruta_img: "img/pera.jpg"
     },
     {
        id:11, 
        nombre:"pomelo-amarillo", 
        precio: 950, 
        ruta_img: "img/pomelo-amarillo.jpg"
     },
     {
        id:12, 
        nombre:"pomelo-rojo", 
        precio: 1050, 
        ruta_img: "img/pomelo-rojo.jpg"
     },
     {
        id:13, 
        nombre:"sandia", 
        precio: 1500, 
        ruta_img: "img/sandia.jpg"
     }
];


/*-------------------------
variables de globales
---------------------------*/ 
const carrito = [];


/*-------------------------
variables de DOM
---------------------------*/ 

const barraBusqueda = document.getElementById("barra-busqueda");

/* const btnOrdenNombre = document.getElementById("orden-nombre");

const btnOrdenPrecio = document.getElementById("orden-precio");
 */
const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const nav = document.getElementById("menu");


/*-------------------------
escuchadores de eventos
---------------------------*/ 

barraBusqueda.addEventListener("input", filtrarProducto);/*el input se utiliza si se desea copiar y pegar, ya que al utilizar keyup o keydown al pegar no dispara el evento */

/* btnOrdenNombre.addEventListener("click", () => ordenarProductos("nombre"));

btnOrdenPrecio.addEventListener("click", () => ordenarProductos("precio")); */

function mostrarLista(array){
    let htmlProductos = "";
    array.forEach(fruta=>{ 
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}$</p>
            <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `
    })
    contenedorProductos.innerHTML = htmlProductos;

}

function imprimirDatosAlumno() {
    // objeto alumno
    const alumno = {
        dni: "30618227",
        nombre: "Matías",
        apellido: "Schirone"
    };

    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    // 3. Insertar en el nav del HTML
    if (nav) {
        nav.innerHTML += `<p>${alumno.nombre} ${alumno.apellido}</p>`;
    }
}

function mostrarTitulo() {
    // Creamos el HTML del título y botones directamente con onclick
    let htmlTitulo = `
        <div class="titulo-seccion">
            <h2>Nuestras frutas</h2>
            <div class="botones-orden">
                <button onclick="ordenarProductos('nombre')">Ordenar por Nombre</button>
                <button onclick="ordenarProductos('precio')">Ordenar por Precio</button>

            </div>
        </div>
    `;

    // Insertamos el HTML generado en el contenedor correspondiente
    const contenedorTitulo = document.getElementById("contenedor-titulo");
    if (contenedorTitulo) {
        contenedorTitulo.innerHTML = htmlTitulo;
    }

    console.log("Se ha renderizado el título y los botones de orden.");
}


function filtrarProducto(){
    let valorBusqueda = barraBusqueda.value.toLowerCase();

    /*las arrow function de una sola linea no llevan llaves y el return esta implicito */

    let productosFiltrados = frutasTienda.filter(fruta => fruta.nombre.toLowerCase().includes(valorBusqueda));

    mostrarLista(productosFiltrados);

    console.log(barraBusqueda);
    console.log(valorBusqueda);
    console.log(productosFiltrados);
}

function agregarAlCarrito(idFruta){
    console.log(`Íd: ${idFruta} agregado al carrito`);

    carrito.push(frutasTienda.find(fruta => fruta.id === idFruta));
    console.log(carrito);


    mostrarCarrito();
    guardarCarrito();
}

function mostrarCarrito(){
    let htmlCarrito = "<h2>Carrito</h2><ul>";
    let totalCarrito = 0;// variable para sumar el precio total del carrito   

    carrito.forEach((fruta, index) => {
        htmlCarrito += 
        `<li class="bloque-libro">
            <p class="nombre-libro">${fruta.nombre}, ${fruta.precio}$</p>
            <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">eliminar</button>
        </li>`;
        totalCarrito += fruta.precio; // sumar precios
    });

    htmlCarrito += `</ul>`;
/* si hay productos muestra el total, y el boton para vaciar el carrito */
    if (carrito.length > 0) {
        htmlCarrito += `
        <div class="total">Total: ${totalCarrito}$</div>
        <div> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
        </div>`;
    }

    contenedorCarrito.innerHTML = htmlCarrito;

    // Actualizar contador en header
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
}


function vaciarCarrito(){
    carrito.length = 0; //vaciar el array
    mostrarCarrito();
    localStorage.removeItem("carrito"); // borrar el carrito del storage
    console.log("Carrito vacío y eliminado del localStorage");
}




function eliminarDelCarrito(idFruta) {
    carrito.splice(idFruta, 1); // elimina el producto por el indice
    console.log(`Producto eliminado del carrito`);
    mostrarCarrito();
    //si el carrito queda vacio lo elimina del storage
    if (carrito.length === 0) {
        localStorage.removeItem("carrito");
        console.log("Carrito vacío y eliminado del localStorage");
    } else {
        guardarCarrito();
    }
}

/*-------------------------
Funciones localStorage
---------------------------*/ 

function guardarCarrito(){
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //console.log("Carrito guardado correctamente.");
}

function cargarCarrito(){
    console.log("Cargando carrito desde localStorage...");
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        const datos = JSON.parse(carritoGuardado);
        console.log("Carrito encontrado en localStorage:", datos);

        carrito.push(...datos); // restaura el carrito desde el localStorage, el spread operator toma todos los elementos del array 'datos' y los agrega uno por uno al array 'carrito'.
        console.log("Carrito restaurado:", carrito);
    } else {
        console.log("No hay carrito guardado en localStorage.");
    }
     const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
}
/* Funcion bubble sort utiliza 2 iteracion del bucle for para ir ordenando la lista, la idea es comparar cada elemento con el siguiente y, si están en el orden incorrecto,
los intercambia. Esto se repite varias veces hasta que toda la lista está ordenada.
*/
function ordenar_lista_datos(array, clave) {
    let listaOrdenada = [...array]; // Copia del array utizaldo el spreed operator para que carge los elementos uno a uno.
    for (let i = 0; i < listaOrdenada.length - 1; i++) {
        for (let j = i + 1; j < listaOrdenada.length; j++) {
            if (clave === "nombre") {
                if (listaOrdenada[i].nombre > listaOrdenada[j].nombre) {
                     // Intercambiamos la posición de los elementos si están fuera de orden
                    let temp = listaOrdenada[i];
                    listaOrdenada[i] = listaOrdenada[j];
                    listaOrdenada[j] = temp;
                }
            } else if (clave === "precio") {
                if (listaOrdenada[i].precio > listaOrdenada[j].precio) {
                    let temp = listaOrdenada[i];
                    listaOrdenada[i] = listaOrdenada[j];
                    listaOrdenada[j] = temp;
                }
            }
        }
    }
    return listaOrdenada;
}

function ordenarProductos(clave) {
    const productosOrdenados = ordenar_lista_datos(frutasTienda, clave);
    mostrarLista(productosOrdenados);
}


function init(){
    mostrarTitulo();
    cargarCarrito();
    imprimirDatosAlumno();
    mostrarLista(frutasTienda);
    mostrarCarrito();
}

init();
