/* =========================================================
   CODE POWER
   JavaScript - Proyecto escolar
   ========================================================= */


/* =========================================================
   VARIABLES GENERALES
   ========================================================= */

let currentGame = null;

let currentUser = "";

let totalWins = 0;
let totalLosses = 0;

let gameTimer = null;
let gameSeconds = 0;


/* =========================================================
   ELEMENTOS DEL LOGIN
   ========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const mainApp =
    document.getElementById("mainApp");

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");

const togglePassword =
    document.getElementById("togglePassword");


/* =========================================================
   ELEMENTOS PRINCIPALES
   ========================================================= */

const gameModal =
    document.getElementById("gameModal");

const gameContent =
    document.getElementById("gameContent");

const helpModal =
    document.getElementById("helpModal");

const welcomeUser =
    document.getElementById("welcomeUser");

const totalWinsElement =
    document.getElementById("totalWins");

const totalLossesElement =
    document.getElementById("totalLosses");


/* =========================================================
   LOGIN
   ========================================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (username === "") {

            mostrarMensajeLogin(
                "⚠️ Escribe tu nombre.",
                "error"
            );

            return;
        }


        /*
         * La contraseña solamente puede ser
         * un número del 1 al 9.
         */

        if (!/^[1-9]$/.test(password)) {

            mostrarMensajeLogin(
                "🔑 La contraseña debe ser un número del 1 al 9.",
                "error"
            );

            return;
        }


        currentUser = username;


        mostrarMensajeLogin(
            "✅ ¡Bienvenida/o " + username + "!",
            "success"
        );


        /*
         * Aquí se puede conectar EmailJS.
         * No enviamos la contraseña.
         */

        enviarNotificacionCorreo(username);


        setTimeout(
            function () {

                loginScreen.classList.add("hidden");

                mainApp.classList.remove("hidden");

                welcomeUser.textContent =
                    "¡Hola, " + currentUser + "! 🎮";

                showSection("home");

            },
            700
        );
    }
);


/* =========================================================
   MENSAJE LOGIN
   ========================================================= */

function mostrarMensajeLogin(
    mensaje,
    tipo
) {

    loginMessage.textContent = mensaje;

    if (tipo === "error") {

        loginMessage.style.color =
            "#ef476f";

    } else {

        loginMessage.style.color =
            "#38b000";
    }
}


/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA
   ========================================================= */

togglePassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁️";
        }
    }
);


/* =========================================================
   SOLO PERMITIR 1 AL 9
   ========================================================= */

passwordInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(/[^1-9]/g, "");

    }
);


/* =========================================================
   EMAIL
   ========================================================= */

/*
 * IMPORTANTE:
 *
 * Para que llegue un correo de verdad debes configurar
 * EmailJS.
 *
 * No pongas aquí la contraseña del usuario.
 *
 * Después de configurar EmailJS debes colocar:
 *
 * EMAILJS_PUBLIC_KEY
 * EMAILJS_SERVICE_ID
 * EMAILJS_TEMPLATE_ID
 *
 */

function enviarNotificacionCorreo(nombre) {

    /*
     * Esta función queda preparada.
     *
     * Si EmailJS no está instalado, no pasa nada:
     * el juego seguirá funcionando.
     */

    if (
        typeof emailjs === "undefined"
    ) {

        console.log(
            "EmailJS todavía no está configurado."
        );

        return;
    }


    const templateParams = {

        usuario: nombre,

        fecha:
            new Date().toLocaleDateString(
                "es-CO"
            ),

        hora:
            new Date().toLocaleTimeString(
                "es-CO"
            ),

        destinatario:
            "keylamirandasena690@gmail.com"
    };


    emailjs.send(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        templateParams
    )
    .then(
        function () {

            console.log(
                "Notificación enviada."
            );

        }
    )
    .catch(
        function (error) {

            console.log(
                "No se pudo enviar el correo:",
                error
            );

        }
    );
}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

document
    .querySelectorAll(".nav-button[data-section]")
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    showSection(
                        button.dataset.section
                    );

                }
            );

        }
    );


function showSection(section) {

    const home =
        document.getElementById(
            "homeSection"
        );

    const about =
        document.getElementById(
            "aboutSection"
        );


    home.classList.add("hidden");

    about.classList.add("hidden");


    if (section === "home") {

        home.classList.remove("hidden");

    }


    if (section === "about") {

        about.classList.remove("hidden");

    }


    document
        .querySelectorAll(
            ".nav-button[data-section]"
        )
        .forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

                if (
                    button.dataset.section ===
                    section
                ) {

                    button.classList.add(
                        "active"
                    );
                }

            }
        );


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );
}


/* =========================================================
   IR A JUEGOS
   ========================================================= */

function scrollToGames() {

    const games =
        document.getElementById("games");

    games.scrollIntoView(
        {
            behavior: "smooth"
        }
    );
}


/* =========================================================
   CERRAR SESIÓN
   ========================================================= */

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function () {

            if (
                confirm(
                    "¿Quieres cerrar tu sesión?"
                )
            ) {

                cerrarSesion();
            }

        }
    );


function cerrarSesion() {

    detenerCronometro();

    currentUser = "";

    totalWins = 0;

    totalLosses = 0;

    actualizarMarcador();


    mainApp.classList.add("hidden");

    loginScreen.classList.remove(
        "hidden"
    );


    usernameInput.value = "";

    passwordInput.value = "";

    loginMessage.textContent = "";

    closeGame();

    showSection("home");
}


/* =========================================================
   ABRIR JUEGO
   ========================================================= */

function openGame(game) {

    currentGame = game;

    gameModal.classList.remove(
        "hidden"
    );


    detenerCronometro();


    if (game === "hangman") {

        createHangman();

    } else if (game === "number") {

        createNumberGame();

    } else if (game === "tic") {

        createTicTacToe();

    } else if (game === "memory") {

        createMemoryGame();

    } else if (game === "mines") {

        createMinesweeper();
    }
}


/* =========================================================
   CERRAR JUEGO
   ========================================================= */

function closeGame() {

    detenerCronometro();

    currentGame = null;

    gameContent.innerHTML = "";

    gameModal.classList.add(
        "hidden"
    );
}


/* =========================================================
   CRONÓMETRO
   ========================================================= */

function iniciarCronometro(elementId) {

    detenerCronometro();

    gameSeconds = 0;

    const element =
        document.getElementById(elementId);


    if (!element) {
        return;
    }


    element.textContent =
        "00:00";


    gameTimer =
        setInterval(
            function () {

                gameSeconds++;

                const minutes =
                    Math.floor(
                        gameSeconds / 60
                    );

                const seconds =
                    gameSeconds % 60;


                element.textContent =
                    String(minutes).padStart(
                        2,
                        "0"
                    )
                    +
                    ":"
                    +
                    String(seconds).padStart(
                        2,
                        "0"
                    );

            },
            1000
        );
}


function detenerCronometro() {

    if (gameTimer) {

        clearInterval(gameTimer);

        gameTimer = null;
    }
}


/* =========================================================
   MARCADOR
   ========================================================= */

function registrarVictoria() {

    totalWins++;

    actualizarMarcador();
}


function registrarDerrota() {

    totalLosses++;

    actualizarMarcador();
}


function actualizarMarcador() {

    if (totalWinsElement) {

        totalWinsElement.textContent =
            totalWins;
    }

    if (totalLossesElement) {

        totalLossesElement.textContent =
            totalLosses;
    }
}


/* =========================================================
   AHORCADO
   ========================================================= */

let hangmanWord = "";

let hangmanGuessed = [];

let hangmanAttempts = 6;

let hangmanGameOver = false;


const hangmanWords = [

    {
        word: "JAVASCRIPT",
        hint: "Lenguaje que utilizamos para programar la interacción.",
        category: "Programación"
    },

    {
        word: "COMPUTADORA",
        hint: "Máquina que usamos para realizar diferentes tareas.",
        category: "Tecnología"
    },

    {
        word: "TECLADO",
        hint: "Tiene letras y números y sirve para escribir.",
        category: "Computación"
    },

    {
        word: "INTERNET",
        hint: "Red que conecta computadoras de todo el mundo.",
        category: "Tecnología"
    },

    {
        word: "CODIGO",
        hint: "Conjunto de instrucciones que escribimos al programar.",
        category: "Programación"
    },

    {
        word: "PANTALLA",
        hint: "Lugar donde podemos ver imágenes e información.",
        category: "Computación"
    },

    {
        word: "SENA",
        hint: "Institución donde se realizan muchos proyectos de formación.",
        category: "Educación"
    },

    {
        word: "VIDEOJUEGO",
        hint: "Actividad digital creada para entretener.",
        category: "Diversión"
    }

];


function createHangman() {

    const random =
        hangmanWords[
            Math.floor(
                Math.random() *
                hangmanWords.length
            )
        ];


    hangmanWord =
        random.word;

    hangmanGuessed = [];

    hangmanAttempts = 6;

    hangmanGameOver = false;


    gameContent.innerHTML = `

        <div class="game-header">

            <div class="emoji">🔤</div>

            <h2>Ahorcado</h2>

            <p>
                Descubre la palabra antes de perder tus vidas.
            </p>

        </div>

        <div class="game-info-bar">

            <div class="info-pill">
                ❤️ Vidas:
                <span id="hangmanLives">6</span>
            </div>

            <div class="info-pill">
                ⏱️
                <span id="hangmanTime">00:00</span>
            </div>

            <div class="info-pill">
                📚 Categoría:
                ${random.category}
            </div>

        </div>


        <div class="hangman-layout">

            <div class="hangman-drawing">

                <div
                    id="hangmanPerson"
                    class="hangman-person"
                >
                    🙂
                </div>

            </div>


            <div>

                <div
                    id="hangmanWord"
                    class="hangman-word"
                ></div>


                <div class="hangman-hint">

                    💡 <strong>Pista:</strong>
                    ${random.hint}

                </div>


                <div
                    id="hangmanKeyboard"
                    class="hangman-keyboard"
                ></div>

            </div>

        </div>


        <div
            id="hangmanResult"
            class="result-message info"
        >
            ¡Comencemos! 💜
        </div>


        <div class="game-center-buttons">

            <button
                class="game-action"
                onclick="createHangman()"
            >
                🔄 Nueva palabra
            </button>

        </div>
    `;


    actualizarAhorcado();

    crearTecladoAhorcado();

    iniciarCronometro(
        "hangmanTime"
    );
}


/* =========================================================
   DIBUJO DEL AHORCADO
   ========================================================= */

function obtenerDibujoAhorcado() {

    const dibujos = [

        "🙂",

        "😟",

        "😰",

        "😨",

        "😵",

        "😖",

        "💀"

    ];


    return dibujos[
        6 - hangmanAttempts
    ];
}


function actualizarAhorcado() {

    const wordElement =
        document.getElementById(
            "hangmanWord"
        );

    if (!wordElement) {
        return;
    }


    let display = "";


    for (
        const letter of hangmanWord
    ) {

        if (
            hangmanGuessed.includes(
                letter
            )
        ) {

            display += letter + " ";

        } else {

            display += "_ ";
        }
    }


    wordElement.textContent =
        display;


    const lives =
        document.getElementById(
            "hangmanLives"
        );


    if (lives) {

        lives.textContent =
            hangmanAttempts;
    }


    const person =
        document.getElementById(
            "hangmanPerson"
        );


    if (person) {

        person.textContent =
            obtenerDibujoAhorcado();
    }


    const ganado =
        [...hangmanWord]
            .every(
                letter =>
                    hangmanGuessed.includes(
                        letter
                    )
            );


    if (ganado) {

        terminarAhorcado(true);
    }
}


/* =========================================================
   TECLADO AHORCADO
   ========================================================= */

function crearTecladoAhorcado() {

    const keyboard =
        document.getElementById(
            "hangmanKeyboard"
        );


    if (!keyboard) {
        return;
    }


    keyboard.innerHTML = "";


    const letters =
        "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";


    for (
        const letter of letters
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            letter;

        button.className =
            "letter-button";


        button.addEventListener(
            "click",
            function () {

                jugarAhorcado(
                    letter,
                    button
                );

            }
        );


        keyboard.appendChild(
            button
        );
    }
}


/* =========================================================
   JUGAR AHORCADO
   ========================================================= */

function jugarAhorcado(
    letter,
    button
) {

    if (hangmanGameOver) {
        return;
    }


    button.disabled = true;


    hangmanGuessed.push(
        letter
    );


    if (
        !hangmanWord.includes(
            letter
        )
    ) {

        hangmanAttempts--;

    }


    actualizarAhorcado();


    if (
        hangmanAttempts <= 0 &&
        !hangmanGameOver
    ) {

        terminarAhorcado(false);
    }
}


/* =========================================================
   TERMINAR AHORCADO
   ========================================================= */

function terminarAhorcado(
    gano
) {

    if (hangmanGameOver) {
        return;
    }


    hangmanGameOver = true;

    detenerCronometro();


    const result =
        document.getElementById(
            "hangmanResult"
        );


    const buttons =
        document.querySelectorAll(
            "#hangmanKeyboard button"
        );


    buttons.forEach(
        button =>
            button.disabled = true
    );


    if (gano) {

        registrarVictoria();

        result.className =
            "result-message win";

        result.textContent =
            "🎉 ¡GANASTE! Encontraste la palabra: "
            + hangmanWord;

    } else {

        registrarDerrota();

        result.className =
            "result-message lose";

        result.textContent =
            "😢 PERDISTE. La palabra era: "
            + hangmanWord;
    }
}


/* =========================================================
   ADIVINA EL NÚMERO
   ========================================================= */

let secretNumber = 0;

let numberAttempts = 0;

let numberGameOver = false;


function createNumberGame() {

    secretNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;


    numberAttempts = 0;

    numberGameOver = false;


    gameContent.innerHTML = `

        <div class="game-header">

            <div class="emoji">🔢</div>

            <h2>Adivina el número</h2>

            <p>
                El número secreto está entre 1 y 100.
            </p>

        </div>


        <div class="game-info-bar">

            <div class="info-pill">
                🎯 Intentos:
                <span id="numberAttempts">0</span>
            </div>

            <div class="info-pill">
                ⏱️
                <span id="numberTime">00:00</span>
            </div>

        </div>


        <div class="number-game">

            <div class="number-hints">

                <div class="hint-box">
                    🔥 Muy cerca
                </div>

                <div class="hint-box">
                    ☀️ Cerca
                </div>

                <div class="hint-box">
                    ❄️ Lejos
                </div>

            </div>


            <input
                id="numberInput"
                class="number-input"
                type="number"
                min="1"
                max="100"
                placeholder="Escribe un número"
            >


            <div class="number-buttons">

                <button
                    class="game-action"
                    onclick="checkNumber()"
                >
                    🔍 Adivinar
                </button>

                <button
                    class="game-action secondary"
                    onclick="createNumberGame()"
                >
                    🔄 Reiniciar
                </button>

            </div>


            <div
                id="numberResult"
                class="result-message info"
            >
                💡 Pista: comienza a probar números.
            </div>

        </div>
    `;


    iniciarCronometro(
        "numberTime"
    );


    setTimeout(
        function () {

            const input =
                document.getElementById(
                    "numberInput"
                );

            if (input) {
                input.focus();
            }

        },
        100
    );
}


/* =========================================================
   COMPROBAR NUMERO
   ========================================================= */

function checkNumber() {

    if (numberGameOver) {
        return;
    }


    const input =
        document.getElementById(
            "numberInput"
        );


    const result =
        document.getElementById(
            "numberResult"
        );


    const attemptsElement =
        document.getElementById(
            "numberAttempts"
        );


    const number =
        Number(input.value);


    if (
        number < 1 ||
        number > 100 ||
        !Number.isInteger(number)
    ) {

        result.className =
            "result-message lose";

        result.textContent =
            "⚠️ Escribe un número entero entre 1 y 100.";

        return;
    }


    numberAttempts++;


    attemptsElement.textContent =
        numberAttempts;


    const difference =
        Math.abs(
            secretNumber - number
        );


    if (
        number === secretNumber
    ) {

        numberGameOver = true;

        detenerCronometro();

        registrarVictoria();


        result.className =
            "result-message win";

        result.textContent =
            "🎉 ¡GANASTE! El número era "
            + secretNumber
            + ". Lo lograste en "
            + numberAttempts
            + " intentos.";

        input.disabled = true;

        return;
    }


    if (
        number < secretNumber
    ) {

        if (difference <= 5) {

            result.textContent =
                "🔥 ¡Muy cerca! El número secreto es MAYOR.";

        } else if (
            difference <= 15
        ) {

            result.textContent =
                "☀️ Vas cerca. El número secreto es MAYOR.";

        } else {

            result.textContent =
                "❄️ Estás lejos. El número secreto es MAYOR.";
        }

    } else {

        if (difference <= 5) {

            result.textContent =
                "🔥 ¡Muy cerca! El número secreto es MENOR.";

        } else if (
            difference <= 15
        ) {

            result.textContent =
                "☀️ Vas cerca. El número secreto es MENOR.";

        } else {

            result.textContent =
                "❄️ Estás lejos. El número secreto es MENOR.";
        }
    }


    result.className =
        "result-message info";


    input.value = "";

    input.focus();
}


/* =========================================================
   ENTER EN NUMERO
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            currentGame === "number"
        ) {

            checkNumber();
        }

    }
);


/* =========================================================
   TIC TAC TOE
   ========================================================= */

let ticBoard = [];

let ticPlayer = "X";

let ticGameOver = false;

let ticMode = null;

let ticXWins = 0;

let ticOWins = 0;


function createTicTacToe() {

    ticBoard =
        Array(9).fill("");


    ticPlayer = "X";

    ticGameOver = false;

    ticMode = null;


    gameContent.innerHTML = `

        <div class="game-header">

            <div class="emoji">
                ❌⭕
            </div>

            <h2>
                Tic Tac Toe
            </h2>

            <p>
                Escoge cómo quieres jugar.
            </p>

        </div>


        <div class="mode-selection">

            <button
                class="mode-card"
                onclick="startTicMode('computer')"
            >

                <div style="font-size:45px">
                    🤖
                </div>

                <h3>
                    1 jugador
                </h3>

                <p>
                    Juega contra la computadora.
                </p>

            </button>


            <button
                class="mode-card"
                onclick="startTicMode('two')"
            >

                <div style="font-size:45px">
                    👩‍🤝‍👩
                </div>

                <h3>
                    2 jugadores
                </h3>

                <p>
                    Dos personas en el mismo portátil.
                </p>

            </button>

        </div>


        <div
            id="ticGameArea"
            class="hidden"
        ></div>

    `;
}


/* =========================================================
   INICIAR TIC TAC TOE
   ========================================================= */

function startTicMode(mode) {

    ticMode = mode;

    ticBoard =
        Array(9).fill("");

    ticPlayer = "X";

    ticGameOver = false;


    renderTicTacToe();
}


/* =========================================================
   RENDER TIC TAC TOE
   ========================================================= */

function renderTicTacToe() {

    const area =
        document.getElementById(
            "ticGameArea"
        );


    area.classList.remove(
        "hidden"
    );


    area.innerHTML = `

        <div class="game-info-bar">

            <div class="info-pill">
                ${ticMode === "computer"
                    ? "🤖 Tú vs Computadora"
                    : "👩‍🤝‍👩 Dos jugadores"
                }
            </div>

            <div class="info-pill">
                Turno:
                ${ticPlayer}
            </div>

        </div>


        <div class="tic-score">

            <div class="info-pill">
                ❌ Victorias:
                ${ticXWins}
            </div>

            <div class="info-pill">
                ⭕ Victorias:
                ${ticOWins}
            </div>

        </div>


        <div
            id="ticBoard"
            class="tic-board"
        ></div>


        <div
            id="ticResult"
            class="result-message info"
        >
            🎮 Turno de ${ticPlayer}
        </div>


        <div
            style="
                text-align:center;
                margin-top:15px;
            "
        >

            <button
                class="game-action"
                onclick="startTicMode('${ticMode}')"
            >
                🔄 Nueva partida
            </button>

        </div>
    `;


    const boardElement =
        document.getElementById(
            "ticBoard"
        );


    ticBoard.forEach(
        function (value, index) {

            const cell =
                document.createElement(
                    "button"
                );


            cell.className =
                "tic-cell";

            cell.textContent =
                value;


            cell.addEventListener(
                "click",
                function () {

                    playTic(index);

                }
            );


            boardElement.appendChild(
                cell
            );
        }
    );
}


/* =========================================================
   JUGAR TIC
   ========================================================= */

function playTic(index) {

    if (
        ticGameOver ||
        ticBoard[index] !== ""
    ) {

        return;
    }


    ticBoard[index] =
        ticPlayer;


    if (
        checkTicWinner()
    ) {

        terminarTic(
            ticPlayer
        );

        return;
    }


    if (
        ticBoard.every(
            cell => cell !== ""
        )
    ) {

        terminarTic("draw");

        return;
    }


    ticPlayer =
        ticPlayer === "X"
            ? "O"
            : "X";


    renderTicTacToe();


    /*
     * Si es contra computadora y ahora
     * le toca a O, la computadora juega.
     */

    if (
        ticMode === "computer" &&
        ticPlayer === "O"
    ) {

        setTimeout(
            computerTicMove,
            500
        );
    }
}


/* =========================================================
   COMPUTADORA
   ========================================================= */

function computerTicMove() {

    if (ticGameOver) {
        return;
    }


    const empty =
        ticBoard
            .map(
                (value, index) =>
                    value === ""
                        ? index
                        : null
            )
            .filter(
                index => index !== null
            );


    if (empty.length === 0) {
        return;
    }


    /*
     * Primero intenta ganar.
     */

    for (
        const index of empty
    ) {

        ticBoard[index] = "O";


        if (
            checkTicWinner()
        ) {

            ticPlayer = "O";

            terminarTic("O");

            return;

        }


        ticBoard[index] = "";
    }


    /*
     * Después intenta bloquear a X.
     */

    for (
        const index of empty
    ) {

        ticBoard[index] = "X";


        if (
            checkTicWinner()
        ) {

            ticBoard[index] = "O";

            ticPlayer = "O";

            renderTicTacToe();

            return;
        }


        ticBoard[index] = "";
    }


    /*
     * Si no hay jugada especial,
     * elige una posición aleatoria.
     */

    const randomIndex =
        empty[
            Math.floor(
                Math.random() *
                empty.length
            )
        ];


    ticBoard[randomIndex] =
        "O";


    if (
        checkTicWinner()
    ) {

        ticPlayer = "O";

        terminarTic("O");

        return;
    }


    if (
        ticBoard.every(
            cell => cell !== ""
        )
    ) {

        terminarTic("draw");

        return;
    }


    ticPlayer = "X";

    renderTicTacToe();
}


/* =========================================================
   GANADOR TIC
   ========================================================= */

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
        function (combination) {

            const [a, b, c] =
                combination;


            return (
                ticBoard[a] !== "" &&
                ticBoard[a] ===
                    ticBoard[b] &&
                ticBoard[a] ===
                    ticBoard[c]
            );
        }
    );
}


/* =========================================================
   TERMINAR TIC
   ========================================================= */

function terminarTic(result) {

    ticGameOver = true;


    const area =
        document.getElementById(
            "ticGameArea"
        );


    if (!area) {
        return;
    }


    let message = "";

    let className =
        "result-message info";


    if (result === "draw") {

        message =
            "🤝 ¡Empate! Nadie ganó esta partida.";

    } else if (
        result === "X"
    ) {

        ticXWins++;

        registrarVictoria();

        message =
            "🎉 ¡GANÓ X! ¡Muy buena jugada!";

        className =
            "result-message win";

    } else {

        ticOWins++;


        if (
            ticMode === "computer"
        ) {

            registrarDerrota();

            message =
                "🤖 La computadora ganó esta vez.";

            className =
                "result-message lose";

        } else {

            registrarVictoria();

            message =
                "🎉 ¡GANÓ O! ¡Muy buena partida!";

            className =
                "result-message win";
        }
    }


    renderTicTacToe();


    const resultElement =
        document.getElementById(
            "ticResult"
        );


    if (resultElement) {

        resultElement.className =
            className;

        resultElement.textContent =
            message;
    }
}


/* =========================================================
   MEMORIA
   ========================================================= */

let memoryCards = [];

let memoryFlipped = [];

let memoryMatched = [];

let memoryLocked = false;

let memoryMoves = 0;

let memoryGameOver = false;


const memoryAnimals = [

    "🐼",
    "🦊",
    "🐸",
    "🐨",
    "🐰",
    "🐯",
    "🐵",
    "🦄"

];


function createMemoryGame() {

    memoryCards =
        [...memoryAnimals,
         ...memoryAnimals];


    memoryCards.sort(
        () =>
            Math.random() - 0.5
    );


    memoryFlipped = [];

    memoryMatched = [];

    memoryLocked = false;

    memoryMoves = 0;

    memoryGameOver = false;


    gameContent.innerHTML = `

        <div class="game-header">

            <div class="emoji">
                🧠
            </div>

            <h2>
                Memoria de Animalitos
            </h2>

            <p>
                Encuentra todas las parejas.
            </p>

        </div>


        <div class="game-info-bar">

            <div class="info-pill">
                🎯 Movimientos:
                <span id="memoryMoves">
                    0
                </span>
            </div>

            <div class="info-pill">
                💜 Parejas:
                <span id="memoryPairs">
                    0
                </span>/8
            </div>

            <div class="info-pill">
                ⏱️
                <span id="memoryTime">
                    00:00
                </span>
            </div>

        </div>


        <div
            id="memoryBoard"
            class="memory-board"
        ></div>


        <div
            id="memoryResult"
            class="result-message info"
        >
            🧠 ¡Busca las parejas!
        </div>


        <div
            style="text-align:center"
        >

            <button
                class="game-action"
                onclick="createMemoryGame()"
            >
                🔄 Reiniciar
            </button>

        </div>

    `;


    renderMemory();


    iniciarCronometro(
        "memoryTime"
    );
}


/* =========================================================
   RENDER MEMORIA
   ========================================================= */

function renderMemory() {

    const board =
        document.getElementById(
            "memoryBoard"
        );


    board.innerHTML = "";


    memoryCards.forEach(
        function (animal, index) {

            const card =
                document.createElement(
                    "button"
                );


            card.className =
                "memory-card-game";


            if (
                memoryFlipped.includes(
                    index
                ) ||
                memoryMatched.includes(
                    index
                )
            ) {

                card.classList.add(
                    "flipped"
                );

                card.textContent =
                    animal;

            } else {

                card.textContent =
                    "❓";
            }


            if (
                memoryMatched.includes(
                    index
                )
            ) {

                card.classList.add(
                    "matched"
                );
            }


            card.addEventListener(
                "click",
                function () {

                    flipMemory(
                        index
                    );

                }
            );


            board.appendChild(
                card
            );
        }
    );


    document.getElementById(
        "memoryMoves"
    ).textContent =
        memoryMoves;


    document.getElementById(
        "memoryPairs"
    ).textContent =
        memoryMatched.length / 2;
}


/* =========================================================
   VOLTEAR CARTA
   ========================================================= */

function flipMemory(index) {

    if (
        memoryLocked ||
        memoryGameOver ||
        memoryFlipped.includes(index) ||
        memoryMatched.includes(index)
    ) {

        return;
    }


    memoryFlipped.push(index);

    renderMemory();


    if (
        memoryFlipped.length === 2
    ) {

        memoryMoves++;

        memoryLocked = true;


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

            memoryLocked = false;


            renderMemory();


            if (
                memoryMatched.length ===
                memoryCards.length
            ) {

                terminarMemoria();
            }

        } else {

            setTimeout(
                function () {

                    memoryFlipped = [];

                    memoryLocked = false;

                    renderMemory();

                },
                800
            );
        }
    }
}


/* =========================================================
   TERMINAR MEMORIA
   ========================================================= */

function terminarMemoria() {

    memoryGameOver = true;

    detenerCronometro();

    registrarVictoria();


    const result =
        document.getElementById(
            "memoryResult"
        );


    result.className =
        "result-message win";

    result.textContent =
        "🎉 ¡GANASTE! Encontraste todas las parejas en "
        + memoryMoves
        + " movimientos.";
}


/* =========================================================
   BUSCAMINAS
   ========================================================= */

const mineRows = 8;

const mineCols = 8;

const mineCount = 10;

let mineBoard = [];

let mineGameOver = false;

let mineRevealed = 0;

let mineFlags = 0;


function createMinesweeper() {

    mineGameOver = false;

    mineRevealed = 0;

    mineFlags = 0;


    mineBoard =
        crearTableroMinas();


    colocarMinas();


    calcularNumerosMinas();


    gameContent.innerHTML = `

        <div class="game-header">

            <div class="emoji">
                💣
            </div>

            <h2>
                Buscaminas
            </h2>

            <p>
                Encuentra las casillas seguras.
                ¡Cuidado con las minas!
            </p>

        </div>


        <div class="game-info-bar">

            <div class="info-pill">
                💣 Minas:
                ${mineCount}
            </div>

            <div class="info-pill">
                🚩 Banderas:
                <span id="mineFlags">
                    0
                </span>
            </div>

            <div class="info-pill">
                ⏱️
                <span id="mineTime">
                    00:00
                </span>
            </div>

        </div>


        <div
            id="mineBoard"
            class="mine-board"
        ></div>


        <div
            id="mineResult"
            class="result-message info"
        >
            💡 Consejo: haz clic derecho para poner una bandera.
        </div>


        <div
            style="text-align:center"
        >

            <button
                class="game-action"
                onclick="createMinesweeper()"
            >
                🔄 Nuevo tablero
            </button>

        </div>

    `;


    renderMinesweeper();


    iniciarCronometro(
        "mineTime"
    );
}


/* =========================================================
   CREAR TABLERO
   ========================================================= */

function crearTableroMinas() {

    const board = [];


    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        board[row] = [];


        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            board[row][col] = {

                mine: false,

                number: 0,

                revealed: false,

                flagged: false
            };
        }
    }


    return board;
}


/* =========================================================
   COLOCAR MINAS
   ========================================================= */

function colocarMinas() {

    let placed = 0;


    while (
        placed < mineCount
    ) {

        const row =
            Math.floor(
                Math.random() *
                mineRows
            );


        const col =
            Math.floor(
                Math.random() *
                mineCols
            );


        if (
            !mineBoard[row][col].mine
        ) {

            mineBoard[row][col].mine =
                true;

            placed++;
        }
    }
}


/* =========================================================
   CALCULAR NUMEROS
   ========================================================= */

function calcularNumerosMinas() {

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

                    if (
                        dr === 0 &&
                        dc === 0
                    ) {
                        continue;
                    }


                    const nr =
                        row + dr;

                    const nc =
                        col + dc;


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
}


/* =========================================================
   RENDER BUSCAMINAS
   ========================================================= */

function renderMinesweeper() {

    const board =
        document.getElementById(
            "mineBoard"
        );


    board.innerHTML = "";


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


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "mine-cell";


            if (cell.revealed) {

                button.classList.add(
                    "revealed"
                );


                if (cell.mine) {

                    button.classList.add(
                        "mine"
                    );

                    button.textContent =
                        "💣";

                } else if (
                    cell.number > 0
                ) {

                    button.textContent =
                        cell.number;

                } else {

                    button.textContent =
                        "✨";
                }

            } else if (
                cell.flagged
            ) {

                button.classList.add(
                    "flagged"
                );

                button.textContent =
                    "🚩";

            } else {

                button.textContent =
                    "❔";
            }


            button.addEventListener(
                "click",
                function () {

                    revealMine(
                        row,
                        col
                    );

                }
            );


            button.addEventListener(
                "contextmenu",
                function (event) {

                    event.preventDefault();

                    flagMine(
                        row,
                        col
                    );

                }
            );


            board.appendChild(
                button
            );
        }
    }


    const flagElement =
        document.getElementById(
            "mineFlags"
        );


    if (flagElement) {

        flagElement.textContent =
            mineFlags;
    }
}


/* =========================================================
   REVELAR MINA
   ========================================================= */

function revealMine(
    row,
    col
) {

    if (
        mineGameOver
    ) {
        return;
    }


    const cell =
        mineBoard[row][col];


    if (
        cell.flagged ||
        cell.revealed
    ) {
        return;
    }


    cell.revealed = true;


    if (cell.mine) {

        terminarMinas(false);

        return;
    }


    mineRevealed++;


    /*
     * Si no hay números alrededor,
     * se abren las casillas vecinas.
     */

    if (
        cell.number === 0
    ) {

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

                const nr =
                    row + dr;

                const nc =
                    col + dc;


                if (
                    nr >= 0 &&
                    nr < mineRows &&
                    nc >= 0 &&
                    nc < mineCols
                ) {

                    if (
                        !mineBoard[nr][nc]
                            .revealed &&
                        !mineBoard[nr][nc]
                            .mine
                    ) {

                        revealMine(
                            nr,
                            nc
                        );
                    }
                }
            }
        }
    }


    renderMinesweeper();


    checkMineWin();
}


/* =========================================================
   BANDERA
   ========================================================= */

function flagMine(
    row,
    col
) {

    if (
        mineGameOver
    ) {
        return;
    }


    const cell =
        mineBoard[row][col];


    if (cell.revealed) {
        return;
    }


    if (cell.flagged) {

        cell.flagged = false;

        mineFlags--;

    } else {

        if (
            mineFlags >= mineCount
        ) {
            return;
        }


        cell.flagged = true;

        mineFlags++;
    }


    renderMinesweeper();
}


/* =========================================================
   COMPROBAR VICTORIA MINAS
   ========================================================= */

function checkMineWin() {

    const safeCells =
        mineRows *
        mineCols -
        mineCount;


    if (
        mineRevealed >=
        safeCells
    ) {

        terminarMinas(true);
    }
}


/* =========================================================
   TERMINAR BUSCAMINAS
   ========================================================= */

function terminarMinas(
    gano
) {

    if (mineGameOver) {
        return;
    }


    mineGameOver = true;

    detenerCronometro();


    if (gano) {

        registrarVictoria();


        const result =
            document.getElementById(
                "mineResult"
            );


        result.className =
            "result-message win";

        result.textContent =
            "🎉 ¡GANASTE! Encontraste todas las casillas seguras.";

    } else {

        registrarDerrota();


        mineBoard.forEach(
            row =>
                row.forEach(
                    cell => {

                        if (
                            cell.mine
                        ) {

                            cell.revealed =
                                true;
                        }

                    }
                )
        );


        renderMinesweeper();


        const result =
            document.getElementById(
                "mineResult"
            );


        result.className =
            "result-message lose";

        result.textContent =
            "💥 ¡BOOM! Encontraste una mina. ¡Inténtalo otra vez!";
    }
}


/* =========================================================
   AYUDA
   ========================================================= */

document
    .getElementById("helpButton")
    .addEventListener(
        "click",
        function () {

            helpModal.classList.remove(
                "hidden"
            );

        }
    );


function closeHelp() {

    helpModal.classList.add(
        "hidden"
    );
}


/* =========================================================
   TECLA ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            if (
                !gameModal.classList.contains(
                    "hidden"
                )
            ) {

                closeGame();
            }


            if (
                !helpModal.classList.contains(
                    "hidden"
                )
            ) {

                closeHelp();
            }
        }

    }
);


/* =========================================================
   EVITAR CLIC DERECHO GENERAL EN JUEGO
   ========================================================= */

/*
 * No bloqueamos el clic derecho porque Buscaminas
 * lo necesita para colocar banderas.
 */


/* =========================================================
   FIN DE CODE POWER
   ========================================================= */
