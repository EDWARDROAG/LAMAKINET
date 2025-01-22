

/* funciones calculadora */

function appendNumber(number) {
    document.getElementById('display').value += number;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}
/*   */
/* funcion para arrastrar calculadora */

document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.getElementById('calculator');
    let isDragging = false;
    let offsetX, offsetY;

    calculator.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - calculator.offsetLeft;
        offsetY = e.clientY - calculator.offsetTop;
        calculator.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            calculator.style.left = e.clientX - offsetX + 'px';
            calculator.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        calculator.style.cursor = 'move';
    });
});

// codigo para hacer que la calculadora funcione con el teclado 

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');

    // Función para agregar números u operadores al display
    function appendNumber(number) {
        display.value += number;
    }

    // Función para calcular el resultado
    function calculate() {
        try {
            display.value = eval(display.value);
        } catch (e) {
            display.value = 'Error';
        }
    }

    // Función para limpiar el display
    function clearDisplay() {
        display.value = '';
    }

    // Capturar las teclas presionadas
    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
            appendNumber(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else if (key === 'Escape') {
            clearDisplay();
        }
    });

    // Funciones disponibles globalmente para los botones
    window.appendNumber = appendNumber;
    window.calculate = calculate;
    window.clearDisplay = clearDisplay;
});


