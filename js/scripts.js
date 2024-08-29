

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
