const generateBtn = document.getElementById('generate');
const lottoNumbersDiv = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
  lottoNumbersDiv.innerHTML = '';
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  for (const number of numbers) {
    const lottoNumber = document.createElement('div');
    lottoNumber.classList.add('lotto-number');
    lottoNumber.textContent = number;
    lottoNumbersDiv.appendChild(lottoNumber);
  }
});