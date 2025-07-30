const display = document.getElementById('display');
let input = '';

function append(val) {
  const lastChar = input.slice(-1);

  if ('+-*/%'.includes(val) && '+-*/%'.includes(lastChar)) {
    input = input.slice(0, -1);
  }

  const last = input.split(/[\+\-\*\/%]/).pop();
  if (val === '.' && last.includes('.')) return;

  if (input === '0' && val !== '.') input = '';

  input += val;
  display.textContent = input;
  display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
  input = '';
  display.textContent = '0';
}

function backspace() {
  input = input.slice(0, -1);
  display.textContent = input || '0';
  display.scrollLeft = display.scrollWidth;
}

function calculate() {
  try {
    const result = eval(input);
    if (!isFinite(result)) throw new Error();
    display.textContent = result;
    input = result.toString();
  } catch {
    display.textContent = 'Error';
    input = '';
  }
}

document.addEventListener('keydown', e => {
  if ('0123456789.+-*/%'.includes(e.key)) {
    append(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    backspace();
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
