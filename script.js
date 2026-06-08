const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {

    for (let i = 0; i < winningConditions.length; i++) {

        const [a, b, c] = winningConditions[i];

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            drawWinningLine(i);

            statusText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Match Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    document.querySelectorAll(".win-line").forEach(line => {
        line.remove();
    });
}

function drawWinningLine(index) {

    const boardDiv = document.getElementById("board");

    const line = document.createElement("div");
    line.classList.add("win-line");

    const positions = [
        "top:50px; left:0; width:310px;",
        "top:155px; left:0; width:310px;",
        "top:260px; left:0; width:310px;",
        "top:0; left:50px; width:310px; transform:rotate(90deg);",
        "top:0; left:155px; width:310px; transform:rotate(90deg);",
        "top:0; left:260px; width:310px; transform:rotate(90deg);",
        "top:0; left:0; width:440px; transform:rotate(45deg);",
        "top:310px; left:0; width:440px; transform:rotate(-45deg);"
    ];

    line.style.cssText = positions[index];
    boardDiv.appendChild(line);
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);