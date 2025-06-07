if (typeof window !== 'undefined') {
  function showTab(event, tabName) {
    document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
    if (event) event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    if (tabName === "quiz") resetQuiz();
  }
  // Org chart card click handler
  function showExtra(card) {
    let extra = card.querySelector('.card-extra');
    if (!extra) return;
    extra.style.display = (extra.style.display === 'block') ? 'none' : 'block';
    card.classList.toggle('active');
  }
  // QUIZ ENGINE
  let quizQuestions = [];
  let userAnswers = {};
  let numQuizQuestions = 20; // mặc định, luôn cập nhật từ select khi bấm "Làm bài"

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function startQuiz() {
    // Lấy số câu từ select dropdown (không dùng biến cũ)
    const select = document.getElementById('numQuizQuestions');
    numQuizQuestions = parseInt(select.value);
    // Bảo vệ tránh lỗi khi questionPool không đủ số câu (hiếm gặp)
    const maxQ = Math.min(numQuizQuestions, window.allQuestions.length);
    generateQuiz(maxQ);
    renderQuiz();
    window.quizSubmitted = false;
    userAnswers = {};
    document.getElementById('quiz-area').style.display = '';
    document.getElementById('quiz-actions').style.display = 'flex';
    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-score').innerHTML = '';
    document.getElementById('quiz-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function generateQuiz(qNum) {
    quizQuestions = [];
    const indexes = Array.from(Array(window.allQuestions.length).keys());
    shuffleArray(indexes);
    const picked = indexes.slice(0, qNum);
    picked.forEach(i => {
      let q = window.allQuestions[i];
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
      `<div style="font-weight:700; font-size:1.2em; margin:16px 0;">Bạn đúng ${score}/${quizQuestions.length} câu.</div>`;
    window.quizSubmitted = true;
  }

  function resetQuiz() {
    // Quay về bước chọn số câu, ẩn quiz
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('quiz-actions').style.display = 'none';
    document.getElementById('quiz-setup').style.display = '';
    document.getElementById('quiz-score').innerHTML = '';
  }

  // KHÔNG tự động render quiz khi onload, chỉ hiện setup
  window.onload = () => {
    resetQuiz();
  };

  //End quiz engine


  const STAT_PANEL = {
    // THỐNG KÊ MÔ TẢ
    "mota-mean": {
      title: "Trung bình (Mean)",
      html: `<b>Ý nghĩa:</b> Giá trị đại diện cho xu hướng trung tâm của dữ liệu.<br>
    <b>Cách tính:</b> Tổng các giá trị chia cho số quan sát.<br>
    <b>Khi sử dụng:</b> Dữ liệu định lượng, không quá lệch.<br>
    <b>Lưu ý:</b> Trung bình bị ảnh hưởng bởi outlier.<br>
    <b>Ứng dụng:</b> So sánh, báo cáo, chuẩn bị cho kiểm định.`
    },
    "mota-median": {
      title: "Trung vị (Median)",
      html: `<b>Ý nghĩa:</b> Phân chia dữ liệu thành 2 nửa, 50% trên và 50% dưới.<br>
    <b>Khi sử dụng:</b> Dữ liệu bị lệch hoặc có outlier.<br>
    <b>Ưu điểm:</b> Không bị ảnh hưởng bởi giá trị cực trị.<br>
    <b>Ứng dụng:</b> Báo cáo vị trí điển hình trong mô tả dữ liệu.`
    },
    "mota-mode": {
      title: "Mốt (Mode)",
      html: `<b>Ý nghĩa:</b> Giá trị xuất hiện nhiều nhất.<br>
    <b>Áp dụng:</b> Dữ liệu phân loại, định tính hoặc định lượng.<br>
    <b>Ứng dụng:</b> Nhận diện nhóm phổ biến nhất.`
    },
    "mota-std": {
      title: "Độ lệch chuẩn (Standard Deviation)",
      html: `<b>Ý nghĩa:</b> Đo mức độ phân tán dữ liệu quanh trung bình.<br>
    <b>Cách đọc:</b> SD nhỏ → dữ liệu đồng nhất; SD lớn → dữ liệu phân tán.<br>
    <b>Kết hợp với:</b> Trung bình khi báo cáo mô tả.`
    },
    "mota-percent": {
      title: "Tỉ lệ & Tần suất",
      html: `<b>Ý nghĩa:</b> Phản ánh phần trăm hay số lần xuất hiện của từng nhóm.<br>
    <b>Ứng dụng:</b> Dữ liệu định tính (giới tính, nhóm máu...), tạo bảng tần số và biểu đồ cột/tròn.`
    },
    "mota-hist": {
      title: "Biểu đồ tần số (Histogram)",
      html: `<b>Ý nghĩa:</b> Hình dung phân phối dữ liệu, nhận diện lệch, chuẩn hay outlier.<br>
    <b>Ứng dụng:</b> Kiểm tra điều kiện cho kiểm định thống kê, báo cáo sơ bộ dữ liệu.`
    },
    // THAM SỐ
    "t1": {
      title: "Kiểm định t một mẫu",
      html: `<b>Mục đích:</b> So sánh trung bình mẫu với một giá trị cụ thể (vd: trung bình lý thuyết).<br>
    <b>Điều kiện:</b> Dữ liệu định lượng, phân phối chuẩn.<br>
    <b>Thông số đọc:</b> Giá trị t, p-value, trung bình, SD, df.<br>
    <b>Quy trình:</b>
    <ol><li>Kiểm tra chuẩn hóa</li>
    <li>Tính trung bình, SD</li>
    <li>Chạy kiểm định t</li></ol>`
    },
    "t2i": {
      title: "Kiểm định t hai mẫu độc lập",
      html: `<b>Mục đích:</b> So sánh trung bình giữa 2 nhóm độc lập.<br>
    <b>Điều kiện:</b> Dữ liệu định lượng, 2 nhóm độc lập, phân phối chuẩn, phương sai đồng nhất.<br>
    <b>Thông số đọc:</b> t, p-value, trung bình mỗi nhóm, SD, df, Levene's Test.<br>
    <b>Quy trình:</b>
    <ol><li>Kiểm tra chuẩn hóa, phương sai</li>
    <li>Chạy t-test</li>
    <li>Đọc p, kết luận</li></ol>`
    },
    "t2c": {
      title: "Kiểm định t hai mẫu cặp",
      html: `<b>Mục đích:</b> So sánh 2 lần đo trên cùng đối tượng (trước/sau).<br>
    <b>Điều kiện:</b> Định lượng, phân phối chuẩn, mẫu cặp.<br>
    <b>Thông số đọc:</b> t, p-value, trung bình chênh lệch, SD, df.<br>
    <b>Quy trình:</b>
    <ol><li>Tính chênh lệch</li>
    <li>Kiểm tra chuẩn hóa</li>
    <li>Chạy t-test</li></ol>`
    },
    "anova": {
      title: "Kiểm định ANOVA",
      html: `<b>Mục đích:</b> So sánh trung bình ≥3 nhóm.<br>
    <b>Điều kiện:</b> Định lượng, các nhóm độc lập, phân phối chuẩn, phương sai đồng nhất.<br>
    <b>Thông số đọc:</b> F, p-value, trung bình mỗi nhóm, SD, df, post-hoc.<br>
    <b>Quy trình:</b>
    <ol><li>Kiểm tra điều kiện</li>
    <li>Chạy ANOVA</li>
    <li>Làm post-hoc nếu có ý nghĩa</li></ol>`
    },
    "reg": {
      title: "Hồi quy tuyến tính",
      html: `<b>Mục đích:</b> Dự đoán biến liên tục từ 1 hay nhiều biến độc lập.<br>
    <b>Điều kiện:</b> Biến phụ thuộc liên tục, mối quan hệ tuyến tính, kiểm tra giả định.<br>
    <b>Thông số đọc:</b> B, R², p-value, kiểm tra giả định.<br>
    <b>Quy trình:</b>
    <ol><li>Kiểm tra giả định</li>
    <li>Chạy hồi quy</li>
    <li>Kiểm tra residuals</li></ol>`
    },
    // PHI THAM SỐ
    "chi2": {
      title: "Kiểm định Chi bình phương",
      html: `<b>Mục đích:</b> So sánh tần suất/ tỷ lệ giữa các nhóm.<br>
    <b>Điều kiện:</b> Dữ liệu phân loại, bảng tần số, số quan sát đủ lớn.<br>
    <b>Thông số đọc:</b> Giá trị chi-square, df, p-value.<br>
    <b>Quy trình:</b>
    <ol><li>Tạo bảng tần số</li>
    <li>Chạy kiểm định</li>
    <li>Đọc p, kết luận</li></ol>`
    },
    "mw": {
      title: "Mann-Whitney U",
      html: `<b>Mục đích:</b> So sánh thứ hạng giữa 2 nhóm độc lập.<br>
    <b>Điều kiện:</b> Định lượng hoặc thứ bậc, 2 nhóm độc lập, không chuẩn.<br>
    <b>Thông số đọc:</b> U, p-value, median, ranks.<br>
    <b>Quy trình:</b>
    <ol><li>Kiểm tra dữ liệu</li>
    <li>Chạy test</li></ol>`
    },
    "wil": {
      title: "Wilcoxon Signed-Rank",
      html: `<b>Mục đích:</b> So sánh 2 lần đo trên cùng nhóm khi không chuẩn.<br>
    <b>Điều kiện:</b> Định lượng/thứ bậc, mẫu cặp, không chuẩn.<br>
    <b>Thông số đọc:</b> W, p-value, ranks.<br>
    <b>Quy trình:</b>
    <ol><li>Tính chênh lệch</li>
    <li>Xếp hạng và chạy test</li></ol>`
    },
    "sign": {
      title: "Sign test",
      html: `<b>Mục đích:</b> So sánh 2 lần đo mẫu cặp (phi tham số).<br>
    <b>Điều kiện:</b> Dữ liệu thứ bậc, mẫu cặp, không chuẩn.<br>
    <b>Thông số đọc:</b> Số lượng dương/âm, p-value.<br>
    <b>Quy trình:</b>
    <ol><li>So sánh từng cặp</li>
    <li>Đếm số dương/âm</li>
    <li>Chạy test</li></ol>`
    },
    "runs": {
      title: "Runs test",
      html: `<b>Mục đích:</b> Kiểm tra tính ngẫu nhiên của chuỗi dữ liệu.<br>
    <b>Điều kiện:</b> Dữ liệu nhị phân hoặc thứ tự.<br>
    <b>Thông số đọc:</b> Số runs, p-value.<br>
    <b>Quy trình:</b>
    <ol><li>Gán giá trị</li>
    <li>Tính số runs</li>
    <li>Chạy kiểm định</li></ol>`
    }
  };

  function showTestPanel(key) {
    document.getElementById('stat-panel-content').innerHTML = `<h2 style="margin-top:0;font-size:1.25em">${STAT_PANEL[key].title}</h2>` + STAT_PANEL[key].html;
    document.getElementById('stat-panel').classList.add('open');
  }
  function closeTestPanel() {
    document.getElementById('stat-panel').classList.remove('open');
  }
  const SE_PANEL = {
    "mota": {
      title: "Thống kê mô tả là gì?",
      html: `
      <b>Khái niệm:</b> Thống kê mô tả giúp mô tả, tóm tắt và trình bày đặc điểm chính của dữ liệu.<br>
      <b>Ví dụ thực tế:</b>
      <ul>
        <li><b>Trung bình:</b> Trung bình điểm môn Tâm lý học của 50 sinh viên là 7.4.</li>
        <li><b>Trung vị:</b> Nếu dãy điểm: 5, 7, 8, 8, 9 &rarr; Trung vị = 8.</li>
        <li><b>Độ lệch chuẩn (SD):</b> SD = 1.2 nghĩa là đa số điểm dao động từ 6.2–8.6.</li>
        <li><b>Tỷ lệ:</b> 70% sinh viên hài lòng với chương trình học.</li>
      </ul>
      <b>Ứng dụng:</b> Nhìn bảng mô tả ở Jamovi/SPSS: chú ý cột Mean, SD, Median, Min, Max để phát hiện bất thường trước khi kiểm định.
    `
    },
    "docbang": {
      title: "Cách đọc bảng số liệu, biểu đồ",
      html: `
      <b>Ví dụ thực tế:</b><br>
      <img src="https://i.imgur.com/WuBoFlN.png" alt="Bảng điểm minh họa" style="width:92%;max-width:300px;border-radius:8px;border:1.5px solid #e4e7f6;margin:8px 0;">
      <ul>
        <li><b>Trung bình:</b> Đọc ở cột Mean = 7.2 (ví dụ bảng điểm).</li>
        <li><b>Trung vị:</b> Nếu khác Mean nhiều, có thể có điểm lệch lớn.</li>
        <li><b>SD:</b> SD = 0.7 (thấp): lớp đồng đều. SD = 2.5 (cao): lớp có nhóm yếu hoặc giỏi vượt trội.</li>
      </ul>
      <b>Đọc biểu đồ:</b> Histogram xem phân phối; boxplot phát hiện outlier (điểm quá cao/thấp).
    `
    },
    "thamso": {
      title: "Kiểm định tham số & phi tham số",
      html: `
      <b>Chọn kiểm định tham số khi:</b>
      <ul>
        <li>Dữ liệu liên tục, phân phối gần chuẩn.</li>
        <li>Ví dụ: So sánh điểm trung bình giữa nam và nữ bằng <b>t-test độc lập</b>.</li>
      </ul>
      <b>Chọn phi tham số khi:</b>
      <ul>
        <li>Dữ liệu thứ bậc, định tính hoặc không chuẩn hóa (kiểm tra bằng histogram, Shapiro-Wilk test...)</li>
        <li>Ví dụ: So sánh mức độ hài lòng giữa 2 nhóm trên thang Likert 5 điểm bằng <b>Mann-Whitney</b>.</li>
      </ul>
      <div style="margin:7px 0 2px 0;background:#f8f5e6;border-left:4px solid #ffe066;padding:8px 12px;border-radius:6px;">
        <b>Mẹo thực tế:</b> Nếu boxplot có outlier hoặc dữ liệu lệch nhiều, hãy chọn test phi tham số!
      </div>
    `
    },
    "bienphu": {
      title: "Biến phụ thuộc & độc lập",
      html: `
      <b>Ví dụ thực tế:</b>
      <ul>
        <li><b>Bài toán:</b> Nghiên cứu ảnh hưởng của việc ngủ đủ giấc đến điểm kiểm tra tâm lý học.</li>
        <li><b>Biến độc lập (IV):</b> Nhóm (ngủ đủ/không đủ).</li>
        <li><b>Biến phụ thuộc (DV):</b> Điểm kiểm tra tâm lý học.</li>
      </ul>
      <b>Cách xác định:</b> Xem biến nào là kết quả (DV), biến nào là yếu tố phân nhóm (IV). Đọc đề bài & bảng kết quả, xác định đúng trước khi chọn kiểm định.
    `
    },
    "thongso": {
      title: "Cách đọc bảng kiểm định & chú ý thông số",
      html: `
      <ul>
        <li>Chú ý trung bình, SD, median từng nhóm (nếu là t-test/ANOVA).</li>
        <li>Kiểm tra giá trị kiểm định (t, F, U, Chi-square...), p-value, df.</li>
        <li>Ví dụ: <b>t(38)=2.31, p=0.025</b> &rarr; Hai nhóm có khác biệt ý nghĩa thống kê.</li>
        <li><b>p &lt; 0.05:</b> Có ý nghĩa thống kê. <b>p ≥ 0.05:</b> Không có ý nghĩa thống kê.</li>
        <li><b>Effect size:</b> d=0.2 (nhỏ), d=0.5 (trung bình), d=0.8 (lớn).</li>
      </ul>
      <div style="margin:7px 0 2px 0;background:#f5f6fb;border-left:4px solid #b1c3fa;padding:8px 12px;border-radius:6px;">
        <b>Ví dụ thực tế:</b> <br>
        <i>Bảng Jamovi báo Mean nhóm A = 8.1, SD = 1.1; nhóm B = 6.7, SD = 1.0; t(38)=3.5, p=0.001.</i>
        <br>Kết luận: Nhóm A có điểm trung bình cao hơn có ý nghĩa thống kê so với nhóm B.
      </div>
    `
    },
    "thangdo": {
      title: "Các loại thang đo",
      html: `
      <b>Ví dụ minh họa:</b>
      <table border="1" style="border-collapse:collapse;margin-top:8px;">
        <tr><th>Loại thang đo</th><th>Ví dụ</th></tr>
        <tr><td>Định danh</td><td>Nhóm máu (A, B, AB, O), giới tính (Nam/Nữ)</td></tr>
        <tr><td>Thứ bậc</td><td>Xếp hạng học sinh: Giỏi, Khá, Trung bình</td></tr>
        <tr><td>Khoảng</td><td>Điểm kiểm tra IQ, nhiệt độ (°C)</td></tr>
        <tr><td>Tỷ lệ</td><td>Chiều cao (cm), cân nặng (kg), số lượng câu đúng</td></tr>
      </table>
      <ul style="margin:7px 0 2px 12px;">
        <li><b>Nhận diện đúng thang đo</b> để chọn kiểm định phù hợp!</li>
      </ul>
    `
    }
  };
  function showSEPanel(key) {
    document.getElementById('se-panel-content').innerHTML = `<h2 style="margin-top:0;font-size:1.15em">${SE_PANEL[key].title}</h2>${SE_PANEL[key].html}`;
    document.getElementById('se-panel').classList.add('open');
  }
  function closeSEPanel() {
    document.getElementById('se-panel').classList.remove('open');
  }


}
