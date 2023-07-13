programaPrincipal();

//*-----------------------
//* PROGRAMA PRINCIPAL
//*-----------------------
function programaPrincipal() {
    //*-------------------------
    //* EJECUCION dataJSON
    //*-------------------------
    const dataJSON = './data.json';

    fetch(dataJSON)
        .then((response) => response.json())
        .then((data) => {
            let usuarios = data.usuarios;
            let alumnos = data.alumnos;
            let notasPosibles = data.notasPosibles;
            let contenedorInfo = document.getElementById('contenedorInfo');
            let alumnosJSON = JSON.parse(localStorage.getItem('alumnosStorage'));

            //*------------------------
            //* EJECUCION LOGIN
            //*------------------------
            let usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
            !usuarioGuardado ? login(usuarios, contenedorInfo) : bienvenida(usuarios, usuarioGuardado, contenedorInfo);

            //*------------------------
            //* EJECUCION INICIO
            //*------------------------
            let botonInicio = document.getElementById('botonInicio');
            botonInicio.addEventListener('click', () => inicio(usuarios, contenedorInfo));

            //*-------------------------
            //* EJECUCION LISTA ALUMNOS
            //*-------------------------
            let botonLista = document.getElementById('botonLista');
            alumnosJSON
                ? botonLista.addEventListener('click', () => listaAlumnos(alumnosJSON, contenedorInfo))
                : botonLista.addEventListener('click', () => listaAlumnos(alumnos, contenedorInfo));

            //*-------------------------
            //* EJECUCION BUSCADOR
            //*-------------------------
            let buscador = document.getElementById('buscador');
            alumnosJSON
                ? buscador.addEventListener('input', () => filtrarYListar(alumnosJSON, buscador, contenedorInfo))
                : buscador.addEventListener('input', () => filtrarYListar(alumnos, buscador, contenedorInfo));

            //*-------------------------
            //* EJECUCION NUEVO ALUMNO
            //*-------------------------
            let botonNuevoAlumno = document.getElementById('botonNuevoAlumno');
            alumnosJSON
                ? botonNuevoAlumno.addEventListener('click', () => contenedorNuevoAlumno(alumnosJSON, contenedorInfo))
                : botonNuevoAlumno.addEventListener('click', () => contenedorNuevoAlumno(alumnos, contenedorInfo));

            //*-------------------------
            //* EJECUCION CARGAR NOTAS
            //*-------------------------
            let botonCargarNotas = document.getElementById('botonCargarNotas');
            alumnosJSON
                ? botonCargarNotas.addEventListener('click', () => contenedorCargarNotas(alumnosJSON, notasPosibles, contenedorInfo))
                : botonCargarNotas.addEventListener('click', () => contenedorCargarNotas(alumnos, notasPosibles, contenedorInfo));
        })
        .catch(() =>
            Swal.fire({
                text: 'Error en la base de datos, intente mas tarde',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#003366',
            })
        );
}

//*-------------------------
//* LOGIN
//*-------------------------
function login(arrayIngresado, contenedor) {
    contenedor.innerHTML = `
        <div id='inicioDato'>
            <img src='multimedia/logos/logo-no-background.png' alt='logo UVLA' />
            <input type='text' class='input' id='inputUsuario' placeholder='Ingresá tu apellido (Perez o Torres)' />
            <button class='botonCargar' id='botonInicioUsuario'>INICIO</button>
        </div>
    `;
    let inputUsuario = document.getElementById('inputUsuario');
    botonInicioUsuario.addEventListener('click', () => bienvenida(arrayIngresado, inputUsuario.value, contenedor));
    inputUsuario.addEventListener('keypress', (e) => funcionEnter(e, arrayIngresado, inputUsuario.value, contenedor));

    function funcionEnter(e, arrayIngresado, input, contenedor) {
        if (e.which === 13 || e.keyCode === 13) {
            bienvenida(arrayIngresado, input, contenedor);
        }
    }
}

//*------------------------
//* INICIO
//*------------------------
function bienvenida(arrayUsuarios, usuario, contenedor) {
    let usuarioEncontrado = arrayUsuarios.find(({ login }) => login.toLowerCase() === usuario.toLowerCase());
    if (usuarioEncontrado) {
        usuarioEncontrado.sexo == 'Femenino'
            ? (contenedor.innerHTML = `
                    <h1 class="inicio">Bienvenida ${usuarioEncontrado.nombre}</h1>
                    `)
            : (contenedor.innerHTML = `
                    <h1 class="inicio">Bienvenido ${usuarioEncontrado.nombre}</h1>
                    `);
        sessionStorage.setItem('usuarioGuardado', usuario);
        infoUsuario(arrayUsuarios, usuario);
        mostrarElemento('barraLateral', 'oculto');
        mostrarElemento('contenedorTitulo', 'oculto');
    } else if (!usuarioEncontrado) {
        Swal.fire({
            text: 'Usuario invalido',
            icon: 'error',
            confirmButtonText: 'Reintentar',
            confirmButtonColor: '#003366',
        });
        resetInputs('input');
    }
}

function infoUsuario(arrayUsuarios, usuario) {
    let contenedorUsuario = document.getElementById('contenedorUsuario');
    let usuarioEncontrado = arrayUsuarios.find(({ login }) => login == usuario.toLowerCase());
    contenedorUsuario.innerHTML = `
                <img class="fotoUsuario" src="multimedia/img/${usuarioEncontrado.rutaImagen}" alt="foto de usuario">
                <div id="datosUsuario">
                    <p id="textoUsuario"></p>
                    <p id="legajoUsuario"></p>
                    <a id="botonCerrarSesion">CERRAR SESION</a>
                </div>
            `;
    let textoUsuario = document.getElementById('textoUsuario');
    let legajoUsuario = document.getElementById('legajoUsuario');
    let botonCerrarSesion = document.getElementById('botonCerrarSesion');
    botonCerrarSesion.addEventListener('click', logout);
    textoUsuario.innerText = `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`;
    legajoUsuario.innerText = `Legajo: ${usuarioEncontrado.legajo}`;
}

function inicio(arrayIngresado, contenedor) {
    titulo('Universidad de Villa La Angostura');
    ocultarElemento('barraFiltros', 'oculto');
    ocultarElemento('contenedorTitulo', 'centrado');
    let usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    bienvenida(arrayIngresado, usuarioGuardado, contenedor);
}

//*-------------------------
//* LISTA ALUMNOS
//*-------------------------
function listaAlumnos(array, contenedor) {
    mostrarElemento('barraFiltros', 'oculto');
    mostrarElemento('contenedorTitulo', 'centrado');
    titulo('Lista de Alumnos');
    contenedor.innerHTML = `
        <div id="contenedorLista">
            <div id="linea1">
                <h4 class = "cabecera">LEGAJO</h4>
                <h4 class = "cabecera">NOMBRE</h4>
                <h4 class = "cabecera">APELLIDO</h4>
                <h4 class = "cabecera">TP1</h4>
                <h4 class = "cabecera">TP2</h4>
                <h4 class = "cabecera">TP3</h4>
                <h4 class = "cabecera">TP4</h4>
                <h4 class = "cabecera">PARCIAL 1</h4>
                <h4 class = "cabecera">PARCIAL 2</h4>
                <h4 class = "cabecera">ESTADO</h4>
            </div>
            <div id="lista"></div>
        </div>
        `;

    array.forEach(({ legajo, nombre, apellido, tp1, tp2, tp3, tp4, primerParcial, segundoParcial, estado }) => {
        let tarjetaAlumno = document.createElement('div');
        tarjetaAlumno.classList.add('tarjetaAlumno');
        tarjetaAlumno.innerHTML = `
            <p>${legajo}</p>
            <p>${nombre}</p>
            <p>${apellido}</p>
            <p>${tp1}</p>
            <p>${tp2}</p>
            <p>${tp3}</p>
            <p>${tp4}</p>
            <p>${primerParcial}</p>
            <p>${segundoParcial}</p>
            <p>${estado}</p>
        `;
        lista.appendChild(tarjetaAlumno);
    });
}

//*-------------------------
//* BUSCADOR
//*-------------------------
function filtrarYListar(arrayIngresado, input, contenedor) {
    let alumnosFiltrados = arrayIngresado.filter(
        ({ legajo, nombre, apellido, estado }) =>
            legajo.toString().includes(input.value.toLowerCase()) ||
            nombre.toLowerCase().includes(input.value.toLowerCase()) ||
            apellido.toLowerCase().includes(input.value.toLowerCase()) ||
            estado.toLowerCase().includes(input.value.toLowerCase())
    );
    listaAlumnos(alumnosFiltrados, contenedor);
}

//*-------------------------
//* NUEVO ALUMNO
//*-------------------------
function contenedorNuevoAlumno(arrayIngresado, contenedor) {
    ocultarElemento('barraFiltros', 'oculto');
    mostrarElemento('contenedorTitulo', 'centrado');
    titulo('Nuevo Alumno');
    contenedor.innerHTML = `
        <div class="datosNuevoAlumno">
            <input type="text" class="input" id="nombreNuevoAlumno" placeholder="Ingresá el nombre del alumno">
            <input type="text" class="input" id="apellidoNuevoAlumno" placeholder="Ingresá el apellido del alumno">
            <input type="number" class="input" id="dniNuevoAlumno" placeholder="Ingresá el DNI del alumno">
            <button class="botonCargar" id="botonCargarNuevoAlumno">CARGAR</button>
        </div>
    `;
    let botonCargarNuevoAlumno = document.getElementById('botonCargarNuevoAlumno');
    let inputNombre = document.getElementById('nombreNuevoAlumno');
    let inputApellido = document.getElementById('apellidoNuevoAlumno');
    let inputDNI = document.getElementById('dniNuevoAlumno');
    botonCargarNuevoAlumno.addEventListener('click', () => nuevoAlumno(arrayIngresado));
    inputNombre.addEventListener('keypress', (e) => funcionEnter(e, arrayIngresado));
    inputApellido.addEventListener('keypress', (e) => funcionEnter(e, arrayIngresado));
    inputDNI.addEventListener('keypress', (e) => funcionEnter(e, arrayIngresado));

    function funcionEnter(e, arrayIngresado) {
        if (e.which === 13 || e.keyCode === 13) {
            nuevoAlumno(arrayIngresado);
        }
    }
}

function nuevoAlumno(arrayIngresado) {
    let legajoNuevo = arrayIngresado[arrayIngresado.length - 1].legajo;
    let nombre = document.getElementById('nombreNuevoAlumno').value;
    nombre = capitalizarPalabras(nombre);
    let apellido = document.getElementById('apellidoNuevoAlumno').value;
    apellido = capitalizarPalabras(apellido);
    let dni = document.getElementById('dniNuevoAlumno').value;
    let legajo = ++legajoNuevo;
    let tp1 = '-';
    let tp2 = '-';
    let tp3 = '-';
    let tp4 = '-';
    let primerParcial = '-';
    let segundoParcial = '-';
    let estado = '-';
    legajoNuevo = legajo;

    if (nombre && apellido && dni) {
        arrayIngresado.push({ legajo, nombre, apellido, dni, tp1, tp2, tp3, tp4, primerParcial, segundoParcial, estado });
        alertOk('Alumno ingresado');
        resetInputs('input');
    } else {
        alertError('Datos incompletos');
    }

    localStorage.setItem('alumnosStorage', JSON.stringify(arrayIngresado));
}

//*-------------------------
//* CARGAR NOTAS
//*-------------------------
function contenedorCargarNotas(arrayIngresado, arrayNotas, contenedor) {
    ocultarElemento('barraFiltros', 'oculto');
    mostrarElemento('contenedorTitulo', 'centrado');
    titulo('Cargar Notas');
    contenedor.innerHTML = `
        <div class="datosNuevoAlumno">
            <select class="input" id="inputAlumnos"><option value="-">Seleccioná un alumno</option></select>
            <select class="input inputNotas" id="inputTP1"><option value="-">Seleccioná la nota del TP1</option></select>
            <select class="input inputNotas" id="inputTP2"><option value="-">Seleccioná la nota del TP2</option></select>
            <select class="input inputNotas" id="inputTP3"><option value="-">Seleccioná la nota del TP3</option></select>
            <select class="input inputNotas" id="inputTP4"><option value="-">Seleccioná la nota del TP4</option></select>
            <select class="input inputNotas" id="inputPrimerParcial"><option value="-">Seleccioná la nota del Primer Parcial</option></select>
            <select class="input inputNotas" id="inputSegundoParcial"><option value="-">Seleccioná la nota del Segundo Parcial</option></select>
            <button class="botonCargar" id="botonCargarNota">CARGAR</button>
        </div>
        `;

    let inputLegajo;
    let inputAlumnos = document.getElementById('inputAlumnos');

    arrayIngresado.forEach(({ legajo, nombre, apellido }) => {
        let elementosListaAlumnos = document.createElement('option');
        elementosListaAlumnos.innerText = `
        ${legajo} - ${nombre} ${apellido}
        `;
        if (`${legajo}`) {
            elementosListaAlumnos.value = `${legajo}`;
        } else {
            elementosListaAlumnos.value = '';
        }
        inputAlumnos.appendChild(elementosListaAlumnos);
        inputAlumnos.addEventListener('change', datoControlAlumno);

        function datoControlAlumno(e) {
            inputLegajo = e.target.value;
        }
    });

    let inputNotas = document.querySelectorAll('.inputNotas');

    inputNotas.forEach((input) => {
        const fragment = document.createDocumentFragment();
        arrayNotas.forEach((elemento) => {
            let valorNota = document.createElement('option');
            valorNota.innerText = `
            ${elemento}
            `;
            fragment.appendChild(valorNota);
        });
        input.appendChild(fragment);
    });
    let botonCargarNotas = document.getElementById('botonCargarNota');
    botonCargarNotas.addEventListener('click', () => nuevaNota(arrayIngresado, inputLegajo, contenedor, arrayNotas));
}

function nuevaNota(arrayIngresado, inputLegajo, contenedor, arrayNotas) {
    console.log(inputLegajo);

    if (inputLegajo == undefined || inputLegajo == '-') {
        alertError('Alumno no seleccionado');
    } else {
        let inputTP1 = document.getElementById('inputTP1');
        let inputTP2 = document.getElementById('inputTP2');
        let inputTP3 = document.getElementById('inputTP3');
        let inputTP4 = document.getElementById('inputTP4');
        let inputPrimerParcial = document.getElementById('inputPrimerParcial');
        let inputSegundoParcial = document.getElementById('inputSegundoParcial');
        let alumnoNotas = arrayIngresado.find(({ legajo }) => legajo == inputLegajo);

        let tp1;
        let dato1 = inputTP1.value;
        if (!dato1) {
            tp1 = '-';
        } else if (dato1 == 'ausente') {
            tp1 = 1;
        } else {
            tp1 = dato1;
        }

        let tp2;
        let dato2 = inputTP2.value;
        if (!dato2) {
            tp2 = '-';
        } else if (dato2 == 'ausente') {
            tp2 = 1;
        } else {
            tp2 = dato2;
        }

        let tp3;
        let dato3 = inputTP3.value;
        if (!dato3) {
            tp3 = '-';
        } else if (dato3 == 'ausente') {
            tp3 = 1;
        } else {
            tp3 = dato3;
        }

        let tp4;
        let dato4 = inputTP4.value;
        if (!dato4) {
            tp4 = '-';
        } else if (dato4 == 'ausente') {
            tp4 = 1;
        } else {
            tp4 = dato4;
        }

        let primerParcial;
        let dato5 = inputPrimerParcial.value;
        if (!dato5) {
            primerParcial = '-';
        } else if (dato5 == 'ausente') {
            primerParcial = 1;
        } else {
            primerParcial = dato5;
        }

        let segundoParcial;
        let dato6 = inputSegundoParcial.value;
        if (!dato6) {
            segundoParcial = '-';
        } else if (dato6 == 'ausente') {
            segundoParcial = 1;
        } else {
            segundoParcial = dato6;
        }

        alumnoNotas.tp1 = tp1;
        alumnoNotas.tp2 = tp2;
        alumnoNotas.tp3 = tp3;
        alumnoNotas.tp4 = tp4;
        alumnoNotas.primerParcial = primerParcial;
        alumnoNotas.segundoParcial = segundoParcial;

        let condicion1;
        tp1 >= 7 ? (condicion1 = 1) : (condicion1 = 0);

        let condicion2;
        tp2 >= 7 ? (condicion2 = 1) : (condicion2 = 0);

        let condicion3;
        tp3 >= 7 ? (condicion3 = 1) : (condicion3 = 0);

        let condicion4;
        tp4 >= 7 ? (condicion4 = 1) : (condicion4 = 0);

        let sumaTP = condicion1 + condicion2 + condicion3 + condicion4;
        let condicionTP;

        if (sumaTP == 4) {
            condicionTP = 2;
        } else if (sumaTP == 3) {
            condicionTP = 1;
        } else {
            condicionTP = 0;
        }

        if (alumnoNotas.primerParcial >= 7 && alumnoNotas.segundoParcial >= 7) {
            alumnoNotas.estado = 'APROBADO';
        } else if (condicionTP == 2 && alumnoNotas.primerParcial >= 5 && alumnoNotas.segundoParcial >= 5) {
            alumnoNotas.estado = 'APROBADO';
        } else if (alumnoNotas.primerParcial < 5 || alumnoNotas.segundoParcial < 5) {
            alumnoNotas.estado = 'LIBRE';
        } else if (alumnoNotas.primerParcial == '-' && alumnoNotas.segundoParcial == '-') {
            alumnoNotas.estado = '-';
        } else if (alumnoNotas.primerParcial == 'AUSENTE' || alumnoNotas.segundoParcial == 'AUSENTE') {
            alumnoNotas.estado = 'LIBRE';
        } else {
            alumnoNotas.estado = 'REGULAR';
        }
        localStorage.setItem('alumnosStorage', JSON.stringify(arrayIngresado));
        alertOk('Notas cargadas');
        contenedorCargarNotas(arrayIngresado, arrayNotas, contenedor);
    }
}

//*-------------------------
//* CERRAR SESION
//*-------------------------
function logout() {
    sessionStorage.removeItem('usuarioGuardado');
    location.reload();
}

//*-------------------------
//* MOSTRAR / OCULTAR
//*-------------------------
function ocultarElemento(id, clase) {
    let contenedor = document.getElementById(id);
    contenedor.classList.add(clase);
}

function mostrarElemento(id, clase) {
    let contenedor = document.getElementById(id);
    contenedor.classList.remove(clase);
}

//*-------------------------
//* CAPITALIZAR PALABRAS
//*-------------------------
function capitalizarPalabras(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//*-------------------------
//* TITULO MENUES
//*-------------------------
function titulo(tituloIngresado) {
    let titulo = document.getElementById('titulo');
    titulo.innerText = `${tituloIngresado.toUpperCase()}`;
}

//*-------------------------
//* ALERTS
//*-------------------------
function alertOk(texto) {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: 'bottom',
        backgroundColor: '#001e3c',
        avatar: 'multimedia/iconos/icons8-de-acuerdo-50.png',
    }).showToast();
}
function alertError(texto) {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: 'bottom',
        backgroundColor: '#001e3c',
        avatar: 'multimedia/iconos/icons8-error-50.png',
    }).showToast();
}

//*-------------------------
//* RESET INPUTS
//*-------------------------
function resetInputs(clase) {
    let inputs = document.querySelectorAll(clase);
    inputs.forEach((input) => (input.value = ''));
}
