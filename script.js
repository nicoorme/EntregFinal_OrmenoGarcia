ejecucionPrograma();

//*-----------------------
//* PROGRAMA
//*-----------------------
function ejecucionPrograma() {
    //*-----------------------
    //* ARRAYS
    //*-----------------------
    let usuarios = [
        {
            legajo: 1,
            nombre: 'Cecilia',
            apellido: 'Lorusso',
            login: 'lorusso',
            contrasena: 'prueba',
            dni: 45234442,
            rutaImagen: 'profesora.jpg',
            sexo: 'Femenino',
        },
        {
            legajo: 2,
            nombre: 'Maria',
            apellido: 'Farisello',
            login: 'farisello',
            contrasena: 'prueba',
            dni: 42330393,
            rutaImagen: 'profesora.jpg',
            sexo: 'Femenino',
        },
        {
            legajo: 3,
            nombre: 'Guillermo',
            apellido: 'Laito',
            login: 'laito',
            contrasena: 'prueba',
            dni: 43982710,
            rutaImagen: 'profesor.jpg',
            sexo: 'Masculino',
        },
        {
            legajo: 4,
            nombre: 'Cristina',
            apellido: 'Perez',
            login: 'perez',
            contrasena: 'prueba',
            dni: 44992692,
            rutaImagen: 'profesora.jpg',
            sexo: 'Femenino',
        },
        {
            legajo: 5,
            nombre: 'Juan Carlos',
            apellido: 'Torres',
            login: 'torres',
            contrasena: 'prueba',
            dni: 45927433,
            rutaImagen: 'profesor.jpg',
            sexo: 'Masculino',
        },
    ];

    let alumnos = [
        {
            legajo: 1001,
            nombre: 'Ana',
            apellido: 'Vivas',
            dni: 45234442,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1002,
            nombre: 'Manuel',
            apellido: 'Ordoñez',
            dni: 42330393,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1003,
            nombre: 'Alejandro',
            apellido: 'Moran',
            dni: 43982710,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1004,
            nombre: 'Eugenio',
            apellido: 'Islas',
            dni: 44992692,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1005,
            nombre: 'Carla',
            apellido: 'Gomez',
            dni: 45927433,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1006,
            nombre: 'Natalia',
            apellido: 'Acosta',
            dni: 44229018,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1007,
            nombre: 'Federico',
            apellido: 'Rivas',
            dni: 43847993,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1008,
            nombre: 'Laura',
            apellido: 'Giordano',
            dni: 45929111,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
        {
            legajo: 1009,
            nombre: 'Micaela',
            apellido: 'Martinez',
            dni: 46301112,
            primerParcial: '-',
            segundoParcial: '-',
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            estado: '-',
        },
        {
            legajo: 1010,
            nombre: 'Joaquin',
            apellido: 'Garcia',
            dni: 46321234,
            tp1: '-',
            tp2: '-',
            tp3: '-',
            tp4: '-',
            primerParcial: '-',
            segundoParcial: '-',
            estado: '-',
        },
    ];

    let notasPosibles = ['AUSENTE', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //*------------------------
    //* LOGIN
    //*------------------------
    let inputUsuario = document.getElementById('inputUsuario');
    let contenedorInfo = document.getElementById('contenedorInfo');

    let botonInicioUsuario = document.getElementById('botonInicioUsuario');
    botonInicioUsuario.addEventListener('click', () => bienvenida(usuarios, inputUsuario.value, contenedorInfo));
    botonInicioUsuario.addEventListener('click', () => infoUsuario(usuarios, inputUsuario.value));
    botonInicioUsuario.addEventListener('click', () => guardarUsuario(inputUsuario.value));
    botonInicioUsuario.addEventListener('click', () => mostrarElemento('barraLateral'));
    botonInicioUsuario.addEventListener('click', () => mostrarElemento('contenedorTitulo'));
    botonInicioUsuario.addEventListener('click', () => activo('botonInicio', 'botonLista', 'botonNuevoAlumno', 'botonCargarNotas'));

    //*------------------------
    //* EJECUCION INICIO
    //*------------------------
    let botonInicio = document.getElementById('botonInicio');
    botonInicio.addEventListener('click', () => inicio(usuarios, contenedorInfo));
    botonInicio.addEventListener('click', () => ocultarElemento('barraFiltros'));
    botonInicio.addEventListener('click', () => activo('botonInicio', 'botonLista', 'botonNuevoAlumno', 'botonCargarNotas'));

    //*-------------------------
    //* EJECUCION LISTA ALUMNOS
    //*-------------------------
    let alumnosJSON = JSON.parse(localStorage.getItem('alumnosStorage'));
    let botonLista = document.getElementById('botonLista');

    alumnosJSON
        ? botonLista.addEventListener('click', () => listaAlumnos(alumnosJSON, contenedorInfo))
        : botonLista.addEventListener('click', () => listaAlumnos(alumnos, contenedorInfo));

    botonLista.addEventListener('click', () => mostrarElemento('barraFiltros'));
    botonLista.addEventListener('click', () => activo('botonLista', 'botonInicio', 'botonNuevoAlumno', 'botonCargarNotas'));

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

    botonNuevoAlumno.addEventListener('click', () => ocultarElemento('barraFiltros'));
    botonNuevoAlumno.addEventListener('click', () => activo('botonNuevoAlumno', 'botonLista', 'botonInicio', 'botonCargarNotas'));

    //*-------------------------
    //* EJECUCION CARGAR NOTAS
    //*-------------------------

    let botonCargarNotas = document.getElementById('botonCargarNotas');

    alumnosJSON
        ? botonCargarNotas.addEventListener('click', () => cargarNotas(alumnosJSON, notasPosibles, contenedorInfo))
        : botonCargarNotas.addEventListener('click', () => cargarNotas(alumnos, notasPosibles, contenedorInfo));

    botonCargarNotas.addEventListener('click', () => ocultarElemento('barraFiltros'));
    botonCargarNotas.addEventListener('click', () => activo('botonCargarNotas', 'botonLista', 'botonInicio', 'botonNuevoAlumno'));

    //*-------------------------
    //* EJECUCION TITULO
    //*-------------------------
    botonInicio.addEventListener('click', () => titulo(''));
    botonLista.addEventListener('click', () => titulo('Lista de Alumnos'));
    botonNuevoAlumno.addEventListener('click', () => titulo('Nuevo Alumno'));
    botonCargarNotas.addEventListener('click', () => titulo('Cargar Notas'));
}

//*------------------------
//* INICIO
//*------------------------
function guardarUsuario(usuario) {
    sessionStorage.setItem('usuarioGuardado', usuario);
}

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
    } else if (!usuarioEncontrado) {
        contenedor.innerHTML = `
                <h1 class="inicio">HOLA ${usuario.toUpperCase()}</h1>
                `;
    } else if (usuario == '') {
        contenedor.innerHTML = `
                <h1 class="inicio">HOLA INVITADO</h1>
                `;
    }
}

function infoUsuario(arrayUsuarios, usuario) {
    let contenedorUsuario = document.getElementById('contenedorUsuario');
    let usuarioEncontrado = arrayUsuarios.find(({ login }) => login == usuario.toLowerCase());
    if (usuarioEncontrado) {
        contenedorUsuario.innerHTML = `
                <img class="fotoUsuario" src="multimedia/img/${usuarioEncontrado.rutaImagen}" alt="">
                <div id="datosUsuario">
                <p id="textoUsuario"></p>
                <p id="legajoUsuario"></p>
                </div>
            `;
        let textoUsuario = document.getElementById('textoUsuario');
        let legajoUsuario = document.getElementById('legajoUsuario');
        textoUsuario.innerText = `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`;
        legajoUsuario.innerText = `Legajo: ${usuarioEncontrado.legajo}`;
    } else if (!usuarioEncontrado) {
        contenedorUsuario.innerHTML = `
                        <img class="fotoUsuario" src="multimedia/img/invitado.jpeg" alt="">
                        <div id="datosUsuario">
                        <p id="textoUsuario"></p>
                        <p id="legajoUsuario"></p>
                        </div>
                    `;
        let textoUsuario = document.getElementById('textoUsuario');
        let legajoUsuario = document.getElementById('legajoUsuario');
        textoUsuario.innerText = `INVITADO`;
        legajoUsuario.innerText = `Legajo: -`;
    }
}

function inicio(arrayIngresado, contenedor) {
    let usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    bienvenida(arrayIngresado, usuarioGuardado, contenedor);
}

//*-------------------------
//* LISTA ALUMNOS
//*-------------------------
function listaAlumnos(array, contenedor) {
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
            <p class = 'p1'>${legajo}</p>
            <p class = 'p2'>${nombre}</p>
            <p class = 'p3'>${apellido}</p>
            <p class = 'p4'>${tp1}</p>
            <p class = 'p5'>${tp2}</p>
            <p class = 'p6'>${tp3}</p>
            <p class = 'p7'>${tp4}</p>
            <p class = 'p8'>${primerParcial}</p>
            <p class = 'p9'>${segundoParcial}</p>
            <p class = 'p10'>${estado}</p>
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
    contenedor.innerHTML = `
        <div class="datosNuevoAlumno">
            <input type="text" class="input" id="nombreNuevoAlumno" placeholder="Ingresá el nombre del alumno">
            <input type="text" class="input" id="apellidoNuevoAlumno" placeholder="Ingresá el apellido del alumno">
            <input type="number" class="input" id="dniNuevoAlumno" placeholder="Ingresá el DNI del alumno">
            <button class="botonCargar" id="botonCargarNuevoAlumno">CARGAR</button>
        </div>
    `;
    let botonCargarNuevoAlumno = document.getElementById('botonCargarNuevoAlumno');
    botonCargarNuevoAlumno.addEventListener('click', () => nuevoAlumno(arrayIngresado, contenedor));
    botonCargarNuevoAlumno.addEventListener('click', () => mostrarElemento('barraFiltros'));
}

function nuevoAlumno(arrayIngresado, contenedor) {
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

    arrayIngresado.push({ legajo, nombre, apellido, dni, tp1, tp2, tp3, tp4, primerParcial, segundoParcial, estado });
    listaAlumnos(arrayIngresado, contenedor);

    localStorage.setItem('alumnosStorage', JSON.stringify(arrayIngresado));
}

//*-------------------------
//* CARGAR NOTAS
//*-------------------------
function cargarNotas(arrayIngresado, arrayNotas, contenedor) {
    contenedor.innerHTML = `
        <div class="datosNuevoAlumno">
        <select class="input" id="inputAlumnos"><option>Seleccioná un alumno</option></select>
        <select class="input inputNotas" id="inputTP1"><option value='-'>Seleccioná la nota del TP1</option></select>
        <select class="input inputNotas" id="inputTP2"><option value='-'>Seleccioná la nota del TP2</option></select>
        <select class="input inputNotas" id="inputTP3"><option value='-'>Seleccioná la nota del TP3</option></select>
        <select class="input inputNotas" id="inputTP4"><option value='-'>Seleccioná la nota del TP4</option></select>
        <select class="input inputNotas" id="inputPrimerParcial"><option value='-'>Seleccioná la nota del Primer Parcial</option></select>
        <select class="input inputNotas" id="inputSegundoParcial"><option value='-'>Seleccioná la nota del Segundo Parcial</option></select>
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
        elementosListaAlumnos.value = `${legajo}`;

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
    botonCargarNotas.addEventListener('click', () => nuevaNota(arrayIngresado, inputLegajo, contenedor));
    botonCargarNotas.addEventListener('click', () => mostrarElemento('barraFiltros'));
}

function nuevaNota(arrayIngresado, legajoBuscado, contenedor) {
    let inputTP1 = document.getElementById('inputTP1');
    let inputTP2 = document.getElementById('inputTP2');
    let inputTP3 = document.getElementById('inputTP3');
    let inputTP4 = document.getElementById('inputTP4');
    let inputPrimerParcial = document.getElementById('inputPrimerParcial');
    let inputSegundoParcial = document.getElementById('inputSegundoParcial');

    let alumnoNotas = arrayIngresado.find(({ legajo }) => legajo == legajoBuscado);

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
    } else if (alumnoNotas.primerParcial == '-' || alumnoNotas.segundoParcial == '-') {
        alumnoNotas.estado = '-';
    } else if (alumnoNotas.primerParcial == 'AUSENTE' || alumnoNotas.segundoParcial == 'AUSENTE') {
        alumnoNotas.estado = 'LIBRE';
    } else {
        alumnoNotas.estado = 'REGULAR';
    }
    localStorage.setItem('alumnosStorage', JSON.stringify(arrayIngresado));
    listaAlumnos(arrayIngresado, contenedor);
}

//*-------------------------
//* MOSTRAR / OCULTAR
//*-------------------------
function ocultarElemento(id) {
    let contenedor = document.getElementById(id);
    contenedor.classList.add('oculto');
}

function mostrarElemento(id) {
    let contenedor = document.getElementById(id);
    contenedor.classList.remove('oculto');
}

//*-------------------------
//* ESTILO ACTIVO BOTONES
//*-------------------------
function activo(botonActivado, botonDesactivado1, botonDesactivado2, botonDesactivado3) {
    let contenedor = document.getElementById(botonActivado);
    contenedor.classList.add('activo');

    let contenedor1 = document.getElementById(botonDesactivado1);
    contenedor1.classList.remove('activo');

    let contenedor2 = document.getElementById(botonDesactivado2);
    contenedor2.classList.remove('activo');

    let contenedor3 = document.getElementById(botonDesactivado3);
    contenedor3.classList.remove('activo');
}

//*-------------------------
//* CAPITALIZAR PALABRAS
//*-------------------------
function capitalizarPalabras(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function titulo(tituloIngresado) {
    let titulo = document.getElementById('titulo');
    titulo.innerText = `
    ${tituloIngresado.toUpperCase()}`;
}
