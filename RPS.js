const win = document.getElementById("win");
const loss = document.getElementById("loss");
const tie = document.getElementById("tie");
const reset = document.getElementById("reset");

// Modal elements
const modal = document.getElementById("resultModal");
const modalOutput = document.getElementById("modalOutput");
const continueBtn = document.getElementById("continueBtn");

// Load score from localStorage OR default
let score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    loss: 0,
    tie: 0
};

// Update UI
const updateUI = () => {
    win.textContent = `win: ${score.win}`;
    loss.textContent = `loss: ${score.loss}`;
    tie.textContent = `tie: ${score.tie}`;
};
updateUI();

// Button click handler
const btnClick = (select) => {
    let result = "";
    const computerMove = pickComputerMove();

    if (select === "rock") {
        result = (computerMove === "rock") ? "tie" : (computerMove === "paper") ? "computer won" : "you won";
    } else if (select === "paper") {
        result = (computerMove === "rock") ? "you won" : (computerMove === "paper") ? "tie" : "computer won";
    } else if (select === "scissors") {
        result = (computerMove === "rock") ? "computer won" : (computerMove === "paper") ? "you won" : "tie";
    }

    // Show modal with result
    modalOutput.textContent = `You picked ${select}, computer picked ${computerMove}, ${result}`;
    modal.classList.remove("hidden");

    // Update score
    if (result === "you won") {
        score.win++;
    } else if (result === "computer won") {
        score.loss++;
    } else {
        score.tie++;
    }

    localStorage.setItem("score", JSON.stringify(score));
    updateUI();
};

// Computer move
const pickComputerMove = () => {
    const randomNumbr = Math.random();
    if (randomNumbr < 1 / 3) return "rock";
    if (randomNumbr < 2 / 3) return "paper";
    return "scissors";
};

// Reset button
reset.addEventListener("click", () => {
    score = {
        win: 0,
        loss: 0,
        tie: 0
    };
    localStorage.setItem("score", JSON.stringify(score));
    updateUI();
});

// Continue button closes modal
continueBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});