/* =========================================================
   CODE POWER
   JavaScript del proyecto
========================================================= */


/* =========================================================
   VARIABLES PRINCIPALES
========================================================= */

let currentGame = null;

const loginScreen = document.getElementById("loginScreen");
const mainApp = document.getElementById("mainApp");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const togglePassword =
    document.getElementById("togglePassword");

const logoutButton =
    document.getElementById("logoutButton");

const gameModal =
    document.getElementById("gameModal");

const gameContent =
    document.getElementById("gameContent");


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {

        loginMessage.textContent =
            "⚠️ Completa todos los campos.";

        loginMessage.style.color = "#d95d69";

        return;
    }

    loginMessage.textContent =
        "✅ Bienvenido/a " + username;

    loginMessage.style.color = "#58a878";

    setTimeout(function() {

        loginScreen.classList.add("hidden");
        mainApp.classList.remove("hidden");

        showSection("home");

    }, 500);

});


/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA
========================================================= */

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "👁";

    }

});


/* =========================================================
   CERRAR SESIÓN
========================================================= */

logoutButton.addEventListener("click", function() {

    mainApp.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    usernameInput.value = "";
    passwordInput.value = "";

    loginMessage.textContent = "";

    showSection("home");

});


/* =========================================================
   NAVEGACIÓN
========================================================= */

const navButtons =
    document.querySelectorAll(".nav-button");

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const section =
            button.dataset.section;

        showSection(section);

    });

});


function showSection(section) {

    const homeSection =
        document.getElementById("homeSection");

    const aboutSection =
        document.getElementById("aboutSection");

    if (section === "home") {

        homeSection.classList.remove("hidden");
        aboutSection.classList.add("hidden");

    }

    if (section === "about") {

        homeSection.classList.add("hidden");
        aboutSection.classList.remove("hidden");

    }


    navButtons.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.section === section) {
            button.classList.add("active");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   IR A LOS JUEGOS
========================================================= */

function scrollToGames() {

    const games =
        document.getElementById("games");

    if (games) {

        games.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   ABRIR JUEGO
========================================================= */

function openGame(game) {

    currentGame = game;

    gameModal.classList.remove("hidden");

    if (game === "hangman") {
        createHangman();
    }

    if (game === "number") {
        createNumberGame();
    }

    if (game === "tic") {
        createTicTacToe();
    }

    if (game === "memory") {
        createMemoryGame();
    }

    if (game === "mines") {
        createMinesweeper();
    }

}


/* =========================================================
   CERRAR JUEGO
========================================================= */

function closeGame() {

    currentGame = null;

    gameModal.classList.add("hidden");

    gameContent.innerHTML = "";

}


/* =========================================================
   1. AHORCADO
========================================================= */

let hangmanWord = "";
let hangmanGuessed = [];
let hangmanAttempts = 6;

const hangmanWords = [
    "COMPUTADOR",
    "JAVASCRIPT",
    "PROGRAMACION",
    "TECLADO",
    "INTERNET",
    "VIDEOJUEGO",
    "PANTALLA",
    "CODIGO"
];


function createHangman() {

    hangmanWord =
        hangmanWords[
            Math.floor(
                Math.random() * hangmanWords.length
            )
        ];

    hangmanGuessed = [];
    hangmanAttempts = 6;

    renderHangman();

}


function renderHangman() {

    let wordDisplay = "";

    for (let letter of hangmanWord) {

        if (hangmanGuessed.includes(letter)) {
            wordDisplay += letter + " ";
        } else {
            wordDisplay += "_ ";
        }

    }


    let letters = "";

    for (
        let i = 65;
        i <= 90;
        i++
    ) {

        const letter =
            String.fromCharCode(i);

        letters += `
            <button
                class="letter-button"
                onclick="guessHangman('${letter}')"
                ${hangmanGuessed.includes(letter)
                    ? "disabled"
                    : ""}
            >
                ${letter}
            </button>
        `;

    }


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🔤 Ahorcado</h2>

            <p>
                Descubre la palabra secreta.
            </p>

        </div>

        <div class="hangman-word">
            ${wordDisplay}
        </div>

        <div class="hangman-attempts">
            Intentos restantes:
            <strong>${hangmanAttempts}</strong>
        </div>

        <div class="hangman-letters">
            ${letters}
        </div>

        <p
            id="hangmanMessage"
            class="game-status"
        ></p>

    `;

}


function guessHangman(letter) {

    if (hangmanGuessed.includes(letter)) {
        return;
    }

    hangmanGuessed.push(letter);

    if (!hangmanWord.includes(letter)) {

        hangmanAttempts--;

    }


    if (hangmanWord
        .split("")
        .every(letter =>
            hangmanGuessed.includes(letter)
        )) {

        renderHangman();

        document.getElementById(
            "hangmanMessage"
        ).textContent =
            "🎉 ¡Ganaste!";

        return;
    }


    if (hangmanAttempts <= 0) {

        renderHangman();

        document.getElementById(
            "hangmanMessage"
        ).textContent =
            "❌ Perdiste. La palabra era: "
            + hangmanWord;

        return;
    }


    renderHangman();

}


/* =========================================================
   2. ADIVINA EL NÚMERO
========================================================= */

let secretNumber = 0;
let numberAttempts = 0;


function createNumberGame() {

    secretNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;

    numberAttempts = 0;

    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🔢 Adivina el número</h2>

            <p>
                El número está entre 1 y 100.
            </p>

        </div>

        <div class="number-form">

            <input
                type="number"
                id="numberInput"
                class="number-input"
                min="1"
                max="100"
                placeholder="Escribe un número"
            >

            <button
                class="game-button"
                onclick="checkNumber()"
            >
                Comprobar
            </button>

        </div>

        <p
            id="numberMessage"
            class="game-status"
        ></p>

    `;

    setTimeout(function() {

        const input =
            document.getElementById(
                "numberInput"
            );

        if (input) {
            input.focus();
        }

    }, 100);

}


function checkNumber() {

    const input =
        document.getElementById(
            "numberInput"
        );

    const message =
        document.getElementById(
            "numberMessage"
        );

    const number =
        Number(input.value);

    if (
        !number ||
        number < 1 ||
        number > 100
    ) {

        message.textContent =
            "⚠️ Escribe un número entre 1 y 100.";

        return;
    }

    numberAttempts++;


    if (number === secretNumber) {

        message.textContent =
            "🎉 ¡Correcto! Lo lograste en "
            + numberAttempts
            + " intento(s).";

        return;
    }


    if (number < secretNumber) {

        message.textContent =
            "⬆️ El número secreto es mayor.";

    } else {

        message.textContent =
            "⬇️ El número secreto es menor.";

    }

}


/* =========================================================
   3. TIC TAC TOE
========================================================= */

let ticBoard = [];
let ticPlayer = "X";
let ticGameOver = false;


function createTicTacToe() {

    ticBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    ticPlayer = "X";
    ticGameOver = false;

    renderTicTacToe();

}


function renderTicTacToe() {

    let cells = "";

    ticBoard.forEach(function(cell, index) {

        cells += `

            <button
                class="tic-cell"
                onclick="playTic(${index})"
            >
                ${cell}
            </button>

        `;

    });


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>❌ Tic Tac Toe</h2>

            <p>
                Turno de:
                <strong>${ticPlayer}</strong>
            </p>

        </div>

        <div class="tic-board">
            ${cells}
        </div>

        <p
            id="ticMessage"
            class="game-status"
        ></p>

    `;

}


function playTic(index) {

    if (
        ticBoard[index] !== "" ||
        ticGameOver
    ) {
        return;
    }

    ticBoard[index] = ticPlayer;


    if (checkTicWinner()) {

        ticGameOver = true;

        renderTicTacToe();

        document.getElementById(
            "ticMessage"
        ).textContent =
            "🎉 ¡Ganó " + ticPlayer + "!";

        return;
    }


    if (!ticBoard.includes("")) {

        ticGameOver = true;

        renderTicTacToe();

        document.getElementById(
            "ticMessage"
        ).textContent =
            "🤝 ¡Empate!";

        return;
    }


    ticPlayer =
        ticPlayer === "X"
            ? "O"
            : "X";

    renderTicTacToe();

}


function checkTicWinner() {

    const combinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    return combinations.some(
        function(combo) {

            const [a, b, c] =
                combo;

            return (
                ticBoard[a] !== "" &&
                ticBoard[a] === ticBoard[b] &&
                ticBoard[a] === ticBoard[c]
            );

        }
    );

}


/* =========================================================
   4. JUEGO DE MEMORIA
========================================================= */

let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = [];
let memoryLock = false;


function createMemoryGame() {

    const values = [
        "🍎",
        "🍎",
        "🍕",
        "🍕",
        "🚗",
        "🚗",
        "⚽",
        "⚽",
        "🎵",
        "🎵",
        "🐱",
        "🐱",
        "🌟",
        "🌟",
        "🎮",
        "🎮"
    ];


    memoryCards =
        values.sort(
            () => Math.random() - 0.5
        );

    memoryFlipped = [];
    memoryMatched = [];
    memoryLock = false;

    renderMemory();

}


function renderMemory() {

    let cards = "";

    memoryCards.forEach(
        function(card, index) {

            const visible =
                memoryFlipped.includes(index) ||
                memoryMatched.includes(index);

            cards += `

                <button
                    class="memory-card-game
                    ${visible ? "flipped" : ""}
                    ${memoryMatched.includes(index)
                        ? "matched"
                        : ""}"
                    onclick="flipMemory(${index})"
                >
                    ${visible ? card : "?"}
                </button>

            `;

        }
    );


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🧠 Memoria</h2>

            <p>
                Encuentra todas las parejas.
            </p>

        </div>

        <div class="memory-board">
            ${cards}
        </div>

        <p
            id="memoryMessage"
            class="game-status"
        >
            Parejas encontradas:
            ${memoryMatched.length / 2}
        </p>

    `;

}


function flipMemory(index) {

    if (
        memoryLock ||
        memoryFlipped.includes(index) ||
        memoryMatched.includes(index)
    ) {
        return;
    }

    memoryFlipped.push(index);

    renderMemory();


    if (memoryFlipped.length !== 2) {
        return;
    }

    memoryLock = true;

    const first =
        memoryFlipped[0];

    const second =
        memoryFlipped[1];


    if (
        memoryCards[first] ===
        memoryCards[second]
    ) {

        memoryMatched.push(
            first,
            second
        );

        memoryFlipped = [];
        memoryLock = false;

        renderMemory();

        if (
            memoryMatched.length ===
            memoryCards.length
        ) {

            document.getElementById(
                "memoryMessage"
            ).textContent =
                "🎉 ¡Completaste el juego!";

        }

    } else {

        setTimeout(function() {

            memoryFlipped = [];
            memoryLock = false;

            renderMemory();

        }, 800);

    }

}


/* =========================================================
   5. BUSCAMINAS
========================================================= */

let mineBoard = [];
let mineGameOver = false;

const mineRows = 8;
const mineCols = 8;
const mineCount = 10;


function createMinesweeper() {

    mineGameOver = false;

    mineBoard = [];

    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        mineBoard[row] = [];

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            mineBoard[row][col] = {

                mine: false,
                revealed: false,
                flagged: false,
                number: 0

            };

        }

    }


    let placed = 0;

    while (placed < mineCount) {

        const row =
            Math.floor(
                Math.random() * mineRows
            );

        const col =
            Math.floor(
                Math.random() * mineCols
            );

        if (!mineBoard[row][col].mine) {

            mineBoard[row][col].mine = true;

            placed++;

        }

    }


    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            if (
                mineBoard[row][col].mine
            ) {
                continue;
            }

            let count = 0;

            for (
                let dr = -1;
                dr <= 1;
                dr++
            ) {

                for (
                    let dc = -1;
                    dc <= 1;
                    dc++
                ) {

                    const nr = row + dr;
                    const nc = col + dc;

                    if (
                        nr >= 0 &&
                        nr < mineRows &&
                        nc >= 0 &&
                        nc < mineCols &&
                        mineBoard[nr][nc].mine
                    ) {

                        count++;

                    }

                }

            }

            mineBoard[row][col].number =
                count;

        }

    }


    renderMinesweeper();

}


function renderMinesweeper() {

    let cells = "";

    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            const cell =
                mineBoard[row][col];

            let content = "";

            if (cell.flagged) {

                content = "🚩";

            } else if (cell.revealed) {

                if (cell.mine) {

                    content = "💣";

                } else {

                    content =
                        cell.number === 0
                            ? ""
                            : cell.number;

                }

            }


            cells += `

                <button
                    class="
                        mine-cell
                        ${cell.revealed ? "revealed" : ""}
                        ${cell.flagged ? "flagged" : ""}
                    "
                    onclick="revealMine(${row},${col})"
                    oncontextmenu="flagMine(event,${row},${col})"
                >
                    ${content}
                </button>

            `;

        }

    }


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>💣 Buscaminas</h2>

            <p>
                Clic para descubrir.
                Clic derecho para poner bandera.
            </p>

        </div>

        <div class="mines-board">
            ${cells}
        </div>

        <p
            id="mineMessage"
            class="game-status"
        >
            🚩 Banderas:
            ${mineBoard.flat()
                .filter(cell => cell.flagged)
                .length}
        </p>

    `;

}


function revealMine(row, col) {

    if (
        mineGameOver ||
        mineBoard[row][col].revealed ||
        mineBoard[row][col].flagged
    ) {
        return;
    }


    const cell =
        mineBoard[row][col];

    cell.revealed = true;


    if (cell.mine) {

        mineGameOver = true;

        mineBoard.flat().forEach(
            function(item) {

                if (item.mine) {
                    item.revealed = true;
                }

            }
        );

        renderMinesweeper();

        document.getElementById(
            "mineMessage"
        ).textContent =
            "💥 ¡Pisaste una mina!";

        return;
    }


    if (cell.number === 0) {

        revealEmptyCells(row, col);

    }


    renderMinesweeper();


    if (checkMineWin()) {

        mineGameOver = true;

        document.getElementById(
            "mineMessage"
        ).textContent =
            "🎉 ¡Ganaste Buscaminas!";

    }

}


function revealEmptyCells(row, col) {

    for (
        let dr = -1;
        dr <= 1;
        dr++
    ) {

        for (
            let dc = -1;
            dc <= 1;
            dc++
        ) {

            const nr = row + dr;
            const nc = col + dc;


            if (
                nr < 0 ||
                nr >= mineRows ||
                nc < 0 ||
                nc >= mineCols
            ) {
                continue;
            }


            const cell =
                mineBoard[nr][nc];


            if (
                cell.revealed ||
                cell.mine ||
                cell.flagged
            ) {
                continue;
            }


            cell.revealed = true;


            if (cell.number === 0) {

                revealEmptyCells(
                    nr,
                    nc
                );

            }

        }

    }

}


function flagMine(event, row, col) {

    event.preventDefault();

    if (
        mineGameOver ||
        mineBoard[row][col].revealed
    ) {
        return false;
    }

    mineBoard[row][col].flagged =
        !mineBoard[row][col].flagged;

    renderMinesweeper();

    return false;

}


function checkMineWin() {

    let safeCells = 0;

    mineBoard.flat().forEach(
        function(cell) {

            if (
                !cell.mine &&
                cell.revealed
            ) {

                safeCells++;

            }

        }
    );


    return safeCells ===
        mineRows * mineCols - mineCount;

}


/* =========================================================
   ATAJOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();

        const modalOpen =
            !gameModal.classList.contains(
                "hidden"
            );


        /* ESC = cerrar juego */

        if (
            event.key === "Escape" &&
            modalOpen
        ) {

            closeGame();

            return;
        }


        /* R = reiniciar */

        if (
            key === "r" &&
            modalOpen
        ) {

            event.preventDefault();

            if (currentGame === "hangman") {
                createHangman();
            }

            if (currentGame === "number") {
                createNumberGame();
            }

            if (currentGame === "tic") {
                createTicTacToe();
            }

            if (currentGame === "memory") {
                createMemoryGame();
            }

            if (currentGame === "mines") {
                createMinesweeper();
            }

            return;
        }


        /* No ejecutar navegación mientras se escribe */

        const active =
            document.activeElement;

        const typing =
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA"
            );


        if (
            typing ||
            modalOpen
        ) {
            return;
        }


        /* G = juegos */

        if (key === "g") {

            showSection("home");

            setTimeout(
                scrollToGames,
                100
            );

        }


        /* A = acerca de */

        if (key === "a") {

            showSection("about");

        }


        /* H = inicio */

        if (key === "h") {

            showSection("home");

        }


        /* HOME = inicio */

        if (event.key === "Home") {

            showSection("home");

        }

    }
);


/* =========================================================
   ENTER PARA ADIVINA EL NÚMERO
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            currentGame === "number"
        ) {

            const input =
                document.getElementById(
                    "numberInput"
                );

            if (
                input &&
                document.activeElement === input
            ) {

                checkNumber();

            }

        }

    }
);





document.addEventListener("DOMContentLoaded", function() {
    
    // CONTROL DE VENTANAS Y PERFILES
    const ventanaEdad = document.getElementById("ventana-edad");
    const interfazPlataforma = document.getElementById("interfaz-plataforma");
    const btnNinos = document.getElementById("modo-ninos");
    const btnJovenes = document.getElementById("modo-jovenes");
    const btnCambiarModo = document.getElementById("btn-cambiar-modo");

    // LABELS DINÁMICOS POR EDAD
    const tituloBienvenida = document.getElementById("titulo-bienvenida");
    const subBienvenida = document.getElementById("sub-bienvenida");
    const descKids = document.querySelectorAll(".desc-kids");
    const descTeens = document.querySelectorAll(".desc-teens");

    // NAVEGACIÓN MECÁNICA POR TABS
    const tabLinks = document.querySelectorAll(".tab-link:not(.cambio-edad)");
    const vistasSeccion = document.querySelectorAll(".vista-seccion");

    // MODAL INTERNO AHORCADO
    const ventanaModalAhorcado = document.getElementById("ventana-modal-ahorcado");
    const btnJugarAhorcado = document.getElementById("btn-jugar-ahorcado");
    const btnCerrarAhorcado = document.getElementById("btn-cerrar-ahorcado-modal");
    const btnReiniciarAhorcadoRapido = document.getElementById("btn-reiniciar-ahorcado-rapido");
    const contenedorPalabraSecreta = document.getElementById("contenedor-palabra-secreta");
    const marcadorIntentosAhorcado = document.getElementById("marcador-intentos-ahorcado");
    const letrasTecladoVirtual = document.getElementById("letras-teclado-virtual");
    const mensajeResultadoAhorcado = document.getElementById("mensaje-resultado-ahorcado");

    // LÓGICA DEL JUEGO AHORCADO
    const bancoPalabras = ["SENA", "CODIGO", "COMPUTADORA", "INTERNET", "TECLADO", "PANTALLA", "JUEGO", "HTML"];
    let palabraOculta = "";
    let letrasAdivinadas = [];
    let intentosRestantes = 6;

    // ASIGNAR ENTORNO/MODO DE EDAD
    function seleccionarModo(modo) {
        ventanaEdad.classList.add("oculto");
        interfazPlataforma.classList.remove("oculto");
        document.body.className = ""; // Limpia clases previas
        
        if (modo === "ninos") {
            document.body.classList.add("entorno-ninos");
            tituloBienvenida.textContent = "✨ ¡Bienvenidos a la Zona de Juegos! ✨";
            subBienvenida.textContent = "Elige el juego que más te guste y diviértete aprendiendo.";
            descKids.forEach(el => el.classList.remove("oculto"));
            descTeens.forEach(el => el.classList.add("oculto"));
        } else {
            document.body.classList.add("entorno-jovenes");
            tituloBienvenida.textContent = "🚀 Panel de Control Gamer - Code Power";
            subBienvenida.textContent = "Optimiza tus habilidades técnicas y algorítmicas en nuestro entorno interactivo.";
            descKids.forEach(el => el.classList.add("oculto"));
            descTeens.forEach(el => el.classList.remove("oculto"));
        }
    }

    btnNinos.addEventListener("click", () => seleccionarModo("ninos"));
    btnJovenes.addEventListener("click", () => seleccionarModo("jovenes"));
    
    btnCambiarModo.addEventListener("click", () => {
        interfazPlataforma.classList.add("oculto");
        ventanaEdad.classList.remove("oculto");
    });

    // SISTEMA MECÁNICO DE CAMBIO DE VENTANAS (TABS)
    tabLinks.forEach(tab => {
        tab.addEventListener("click", function() {
            tabLinks.forEach(t => t.classList.remove("activo"));
            this.classList.add("activo");

            const seccionDestino = this.getAttribute("data-target");
            vistasSeccion.forEach(vista => {
                if (vista.id === seccionDestino) {
                    vista.classList.remove("oculto");
                } else {
                    vista.classList.add("oculto");
                }
            });
        });
    });

    // MECÁNICA DEL JUEGO: AHORCADO
    function iniciarAhorcado() {
        palabraOculta = bancoPalabras[Math.floor(Math.random() * bancoPalabras.length)];
        letrasAdivinadas = [];
        intentosRestantes = 6;
        mensajeResultadoAhorcado.textContent = "";
        mensajeResultadoAhorcado.style.color = "inherit";
        marcadorIntentosAhorcado.textContent = intentosRestantes;

        actualizarVisualizacionPalabra();
        construirTecladoVirtual();
    }

    function actualizarVisualizacionPalabra() {
        let cadenaMostrar = "";
        palabraOculta.split("").forEach(letra => {
            if (letrasAdivinadas.includes(letra)) {
                cadenaMostrar += letra + " ";
            } else {
                cadenaMostrar += "_ ";
            }
        });
        contenedorPalabraSecreta.textContent = cadenaMostrar.trim();

        // Validar Victoria
        if (!cadenaMostrar.includes("_")) {
            mensajeResultadoAhorcado.textContent = "🎉 ¡Felicidades! Descubriste la palabra.";
            mensajeResultadoAhorcado.style.color = "#2a9d8f";
            bloquearTeclado();
        }
    }

    function construirTecladoVirtual() {
        letrasTecladoVirtual.innerHTML = "";
        const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
        
        alfabeto.forEach(letra => {
            const btnLetra = document.createElement("button");
            btnLetra.textContent = letra;
            btnLetra.addEventListener("click", function() {
                this.disabled = true;
                procesarLetraJugada(letra);
            });
            letrasTecladoVirtual.appendChild(btnLetra);
        });
    }

    function procesarLetraJugada(letra) {
        if (palabraOculta.includes(letra)) {
            letrasAdivinadas.push(letra);
            actualizarVisualizacionPalabra();
        } else {
            intentosRestantes--;
            marcadorIntentosAhorcado.textContent = intentosRestantes;
            if (intentosRestantes <= 0) {
                mensajeResultadoAhorcado.textContent = `💥 Fin del juego. La palabra era: ${palabraOculta}`;
                mensajeResultadoAhorcado.style.color = "#e63946";
                bloquearTeclado();
            }
        }
    }

    function bloquearTeclado() {
        const botones = letrasTecladoVirtual.querySelectorAll("button");
        botones.forEach(btn => btn.disabled = true);
    }

    // GESTIÓN DE VENTANAS DEL MODAL
    btnJugarAhorcado.addEventListener("click", () => {
        ventanaModalAhorcado.style.display = "flex";
        iniciarAhorcado();
    });

    btnCerrarAhorcado.addEventListener("click", () => {
        ventanaModalAhorcado.style.display = "none";
    });

    btnReiniciarAhorcadoRapido.addEventListener("click", iniciarAhorcado);
});
