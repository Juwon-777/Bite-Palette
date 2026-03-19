const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultArea = document.getElementById('result-area');
const historyArea = document.getElementById('historyArea');
const roundBtns = document.querySelectorAll('.round-btn');

let selectedCount = 1;
let history = JSON.parse(localStorage.getItem('lottoHistory') || '[]');

// 게임 수 선택
roundBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    roundBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCount = parseInt(btn.dataset.count);
  });
});

// 번호 색상 결정
function getBallClass(num) {
  if (num <= 10) return 'ball-yellow';
  if (num <= 20) return 'ball-blue';
  if (num <= 30) return 'ball-red';
  if (num <= 40) return 'ball-gray';
  return 'ball-green';
}

// 로또 번호 6개 생성
function generateNumbers() {
  const nums = [];
  while (nums.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort((a, b) => a - b);
}

// 공 요소 생성
function createBall(num, delay = 0) {
  const ball = document.createElement('span');
  ball.className = `ball ${getBallClass(num)} animate`;
  ball.textContent = num;
  ball.style.animationDelay = `${delay}ms`;
  return ball;
}

// 결과 렌더링
function renderResult(allNumbers) {
  resultArea.innerHTML = '';
  allNumbers.forEach((nums, i) => {
    const row = document.createElement('div');
    row.className = 'game-row';

    const label = document.createElement('span');
    label.className = 'game-label';
    label.textContent = `${String.fromCharCode(65 + i)}`;

    const wrap = document.createElement('div');
    wrap.className = 'balls-wrap';

    nums.forEach((n, j) => {
      wrap.appendChild(createBall(n, j * 80));
    });

    row.appendChild(label);
    row.appendChild(wrap);
    resultArea.appendChild(row);
  });
}

// 히스토리 저장 및 렌더링
function saveToHistory(allNumbers) {
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  history.unshift({ date: dateStr, numbers: allNumbers });
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem('lottoHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  if (history.length === 0) {
    historyArea.innerHTML = '<p class="empty-msg">아직 저장된 번호가 없습니다.</p>';
    return;
  }

  historyArea.innerHTML = '';
  history.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'history-entry';

    const dateEl = document.createElement('div');
    dateEl.className = 'history-date';
    dateEl.textContent = entry.date;

    entryDiv.appendChild(dateEl);

    entry.numbers.forEach(nums => {
      const wrap = document.createElement('div');
      wrap.className = 'history-balls';
      nums.forEach(n => {
        const ball = document.createElement('span');
        ball.className = `ball ${getBallClass(n)}`;
        ball.textContent = n;
        wrap.appendChild(ball);
      });
      entryDiv.appendChild(wrap);
      entryDiv.appendChild(document.createElement('br'));
    });

    historyArea.appendChild(entryDiv);
  });
}

// 생성 버튼 클릭
generateBtn.addEventListener('click', () => {
  const allNumbers = Array.from({ length: selectedCount }, generateNumbers);
  renderResult(allNumbers);
  saveToHistory(allNumbers);
});

// 전체 삭제
clearBtn.addEventListener('click', () => {
  history = [];
  localStorage.removeItem('lottoHistory');
  renderHistory();
});

// 초기 히스토리 렌더링
renderHistory();
