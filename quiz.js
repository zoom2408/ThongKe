if (typeof window !== 'undefined') {
  let quizQuestions = [];
  let userAnswers = {};
  let numQuizQuestions = 20;


  // Ensure the dropdown includes an option for the maximum available questions
  function ensureMaxOption() {
    const select = document.getElementById('numQuizQuestions');
    if (!select || typeof allQuestions === 'undefined') return;
    const max = allQuestions.length;
    const exists = Array.from(select.options).some(opt => parseInt(opt.value) === max);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = max;
      opt.textContent = `${max} câu`;
      select.appendChild(opt);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureMaxOption);
  } else {
    ensureMaxOption();
  }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function startQuiz() {
    const select = document.getElementById('numQuizQuestions');
    numQuizQuestions = parseInt(select.value) || 20;
    const maxQ = Math.min(numQuizQuestions, allQuestions.length);

    quizQuestions = [];
    const indexes = Array.from(Array(allQuestions.length).keys());
    shuffleArray(indexes);
    const picked = indexes.slice(0, maxQ);
    picked.forEach(i => {
      const q = allQuestions[i];
      const opts = q.opts.slice();
      const correct = q.ans;
      const origIdx = [...opts.keys()];
      shuffleArray(origIdx);
      const shuffledOpts = origIdx.map(k => opts[k]);
      const newAns = origIdx.indexOf(correct);
      quizQuestions.push({ ...q, opts: shuffledOpts, ans: newAns });
    });

    renderQuiz();
    window.quizSubmitted = false;
    userAnswers = {};

    document.getElementById('quiz-area').style.display = '';
    document.getElementById('quiz-actions').style.display = 'flex';
    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-score').innerHTML = '';
    document.getElementById('quiz-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderQuiz() {
    let html = '';
    quizQuestions.forEach((q, idx) => {
      html += `<div class="question" data-idx="${idx}">
            <h4>Câu ${idx + 1}: ${q.q}</h4>
            <ul class="options">` + q.opts.map((opt, j) =>
        `<li onclick="chooseOption(${idx},${j})" id="q${idx}o${j}">${opt}</li>`
      ).join('') + `</ul>
            <div class="explain" id="explain${idx}"></div>
        </div>`;
    });
    document.getElementById('quiz-area').innerHTML = html;
    document.getElementById('quiz-score').innerHTML = '';
  }

  function chooseOption(qIdx, optIdx) {
    if (window.quizSubmitted) return;
    userAnswers[qIdx] = optIdx;
    quizQuestions[qIdx].opts.forEach((_, j) => {
      document.getElementById(`q${qIdx}o${j}`).style.background = j === optIdx ? '#dbeafe' : '#f5f7fa';
    });
  }

  function submitQuiz() {
    if (window.quizSubmitted) return;
    let score = 0;
    quizQuestions.forEach((q, i) => {
      const user = userAnswers[i];
      const ex = document.getElementById('explain' + i);
      if (user === q.ans) {
        score++;
        ex.innerHTML = '<span>✔️ Đúng. ' + q.explain + '</span>';
        ex.classList.remove('wrong');
      } else {
        ex.innerHTML = '<span class="wrong">❌ Sai.</span> ' + q.explain;
        ex.classList.add('wrong');
      }
    });
    document.getElementById('quiz-score').innerHTML =
      `<div style="font-weight:700; font-size:1.2em; margin:16px 0;">Bạn đúng ${score}/${quizQuestions.length} câu.</div>`;
    window.quizSubmitted = true;
  }

  function resetQuiz() {
    ensureMaxOption();
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('quiz-actions').style.display = 'none';
    document.getElementById('quiz-setup').style.display = '';
    document.getElementById('quiz-score').innerHTML = '';
  }
}
