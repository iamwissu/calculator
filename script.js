let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        let result = eval(currentInput);
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Dark/Light mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const toggleBtn = document.querySelector('.toggle-btn');
    const isDarkMode = !document.body.classList.contains('light-mode');
    toggleBtn.textContent = isDarkMode ? '🌙' : '☀️';
    localStorage.setItem('darkMode', isDarkMode);
}

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false';
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        document.querySelector('.toggle-btn').textContent = '☀️';
    }
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});