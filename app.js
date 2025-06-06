    // Slide panel data
    const panelData = {
      "t-test": {
        title: "t-test độc lập",
        html: `
    <b>Khi nào dùng:</b> So sánh trung bình của 2 nhóm độc lập (vd: nam vs nữ).<br><br>
    <b>Điều kiện:</b>
    <ul>
      <li>Biến phụ thuộc là định lượng (interval/ratio)</li>
      <li>2 nhóm độc lập</li>
      <li>Phân phối chuẩn, phương sai đồng nhất</li>
    </ul>
    <b>Các bước thực hiện:</b>
    <ol>
      <li>Kiểm tra phân phối (Histogram/Normality test)</li>
      <li>Kiểm tra phương sai (Levene's Test)</li>
      <li>Chạy t-test</li>
    </ol>
    <b>Thông số nên đọc trên output:</b>
    <ul>
      <li><b>Mean ± SD</b> mỗi nhóm</li>
      <li><b>t-value</b></li>
      <li><b>df</b> (bậc tự do)</li>
      <li><b>p-value</b>: <i>Ý nghĩa nếu &lt;0.05</i></li>
      <li><b>Effect size</b> (Cohen's d nếu có)</li>
    </ul>
    `
      },
      "anova": {
        title: "ANOVA (Analysis of Variance)",
        html: `
    <b>Khi nào dùng:</b> So sánh trung bình từ 3 nhóm trở lên.<br><br>
    <b>Điều kiện:</b>
    <ul>
      <li>Biến phụ thuộc: định lượng (interval/ratio)</li>
      <li>Các nhóm độc lập</li>
      <li>Phân phối chuẩn, phương sai đồng nhất</li>
    </ul>
    <b>Các bước thực hiện:</b>
    <ol>
      <li>Kiểm tra phân phối (Normality)</li>
      <li>Kiểm tra phương sai (Levene's Test)</li>
      <li>Chạy ANOVA</li>
      <li>Nếu có ý nghĩa, làm Post-hoc test để biết nhóm nào khác biệt</li>
    </ol>
    <b>Thông số nên đọc trên output:</b>
    <ul>
      <li><b>Mean ± SD</b> mỗi nhóm</li>
      <li><b>F-value, df giữa và trong</b></li>
      <li><b>p-value</b></li>
      <li><b>Effect size</b> (Partial eta squared)</li>
      <li><b>Kết quả post-hoc</b></li>
    </ul>
    `
      },
      "chi2": {
        title: "Chi-square test",
        html: `
    <b>Khi nào dùng:</b> So sánh tỉ lệ/phân loại giữa các nhóm.<br><br>
    <b>Điều kiện:</b>
    <ul>
      <li>Dữ liệu định tính/định danh (nominal/categorical)</li>
      <li>Số quan sát trong mỗi ô >= 5 (nên có)</li>
    </ul>
    <b>Các bước thực hiện:</b>
    <ol>
      <li>Lập bảng tần số (contingency table)</li>
      <li>Chạy kiểm định Chi-square</li>
      <li>Kiểm tra expected count</li>
    </ol>
    <b>Thông số nên đọc trên output:</b>
    <ul>
      <li><b>Chi-square value (χ²)</b></li>
      <li><b>df</b></li>
      <li><b>p-value</b></li>
      <li><b>Percentage/Proportion các nhóm</b></li>
    </ul>
    `
      },
      "correlation": {
        title: "Tương quan Pearson/Spearman",
        html: `
    <b>Khi nào dùng:</b> Đo độ mạnh và chiều của mối liên hệ giữa 2 biến định lượng.<br><br>
    <b>Điều kiện:</b>
    <ul>
      <li>Pearson: 2 biến liên tục, phân phối chuẩn</li>
      <li>Spearman: 2 biến thứ bậc hoặc 1 biến không chuẩn</li>
    </ul>
    <b>Các bước thực hiện:</b>
    <ol>
      <li>Kiểm tra loại biến & phân phối</li>
      <li>Chạy tương quan Pearson/Spearman</li>
    </ol>
    <b>Thông số nên đọc trên output:</b>
    <ul>
      <li><b>r-value</b> (hệ số tương quan, từ -1 đến 1)</li>
      <li><b>p-value</b></li>
      <li><b>N</b> (số mẫu)</li>
    </ul>
    `
      },
      "regression": {
        title: "Hồi quy tuyến tính",
        html: `
    <b>Khi nào dùng:</b> Dự đoán giá trị biến phụ thuộc định lượng từ 1 hay nhiều biến độc lập.<br><br>
    <b>Điều kiện:</b>
    <ul>
      <li>Biến phụ thuộc liên tục</li>
      <li>Mối quan hệ tuyến tính</li>
      <li>Các giả định về phân phối, outlier, homoscedasticity</li>
    </ul>
    <b>Các bước thực hiện:</b>
    <ol>
      <li>Kiểm tra giả định</li>
      <li>Chạy hồi quy</li>
      <li>Kiểm tra residuals</li>
    </ol>
    <b>Thông số nên đọc trên output:</b>
    <ul>
      <li><b>B (Beta, hệ số hồi quy)</b></li>
      <li><b>R²</b> (phần trăm giải thích phương sai)</li>
      <li><b>p-value</b></li>
      <li><b>Kiểm tra các giả định</b></li>
    </ul>
    `
      }
    };
    function showPanel(key) {
      document.getElementById('panel-title').innerHTML = panelData[key].title;
      document.getElementById('panel-detail').innerHTML = panelData[key].html;
      document.getElementById('panel').classList.add('open');
    }
    function closePanel() {
      document.getElementById('panel').classList.remove('open');
    }
    // QUIZ ENGINE
    // questionPool được nạp từ questions.js
    // Lấy ngẫu nhiên 20 câu, shuffle đáp án
    let quizQuestions = [];
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    function generateQuiz() {
      quizQuestions = [];
      const indexes = Array.from(Array(questionPool.length).keys());
      shuffleArray(indexes);
      const picked = indexes.slice(0, 20);
      picked.forEach(i => {
        let q = questionPool[i];
        let opts = q.opts.slice();
        let correct = q.ans;
        let origIdx = [...opts.keys()];
        shuffleArray(origIdx);
        let shuffledOpts = origIdx.map(k => opts[k]);
        let newAns = origIdx.indexOf(correct);
        quizQuestions.push({ ...q, opts: shuffledOpts, ans: newAns });
      });
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
    let userAnswers = {};
    function chooseOption(qIdx, optIdx) {
      if (window.quizSubmitted) return;
      userAnswers[qIdx] = optIdx;
      quizQuestions[qIdx].opts.forEach((_, j) => {
        document.getElementById(`q${qIdx}o${j}`).style.background = j === optIdx ? "#dbeafe" : "#f5f7fa";
      });
    }
    function submitQuiz() {
      if (window.quizSubmitted) return;
      let score = 0;
      quizQuestions.forEach((q, i) => {
        let user = userAnswers[i];
        let ex = document.getElementById('explain' + i);
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
        `<div style="font-weight:700; font-size:1.2em; margin:16px 0;">Bạn đúng ${score}/20 câu.</div>`;
      window.quizSubmitted = true;
    }
    function resetQuiz() {
      window.quizSubmitted = false;
      userAnswers = {};
      generateQuiz();
      renderQuiz();
      document.getElementById('quiz-score').innerHTML = '';
    }
    window.onload = () => { generateQuiz(); renderQuiz(); }

    function showTab(event, tabName) {
      document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
      if (event) event.target.classList.add('active');
      document.getElementById(tabName).classList.add('active');
      if (tabName === "quiz") resetQuiz();
      if (tabName !== "schema") closePanel();
    }

