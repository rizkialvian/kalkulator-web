//Tempat menyimpan data dan kondisi awal pada calculator
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

//Mengupdate angka pada layar kalkulator
function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

//Menghapus angka pada layar kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}
 
//Digunakan untuk input data ke variabel displayNumber
function inputDigit(digit) {
    //Membuat angka 0 berganti menjadi angka pada tombol ditekan
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
      } else {
        calculator.displayNumber += digit;
    }
}

//Membuat angka positif atau negatif
function inverseNumber() {
    if (calculator.displayNumber === '0') {
      return;
    }
    
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
      calculator.operator = operator;
      calculator.isWaitForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber;
   
      // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
      calculator.displayNumber = '0';
    } else {
      alert('Operator sudah ditetapkan');
    }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
      alert("Anda belum menetapkan operator");
      return;
  }

  let result = 0;
  if (calculator.operator === "+") {
      result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
      result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
      firstNumber: calculator.firstNumber,
      secondNumber: calculator.displayNumber,
      operator: calculator.operator,
      result: result
  }
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

//Mengambil semua elemen pada button kalkulator
const buttons = document.querySelectorAll('.button');
  for (const button of buttons) {
    button.addEventListener('click', function (event) {
      // mendapatkan objek elemen yang diklik
      const target = event.target;

        //Mengaktifkan tombol hapus
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        //Mengaktifkan tombol tanda negatif
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        //Mengaktifkan tombol sama dengan
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        //Mengaktifkan tombol operasi
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

      inputDigit(target.innerText);
      updateDisplay();
    });
}
