let defaultMainHTML = '';
if (typeof window !== 'undefined') {
  const initContainer = document.querySelector('.content.main');
  if (initContainer) defaultMainHTML = initContainer.innerHTML;

  function showTab(event, tabName) {
    const container = document.querySelector('.content.main');
    if (container && !document.getElementById(tabName)) {
      container.innerHTML = defaultMainHTML;
    }
    document.querySelectorAll('.page-link').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    const target = document.getElementById(tabName);
    if (target) target.classList.add('active');
    if (tabName === 'quiz') resetQuiz();
  }

  function showExtra(card) {
    const extra = card.querySelector('.card-extra');
    if (!extra) return;
    extra.style.display = (extra.style.display === 'block') ? 'none' : 'block';
    card.classList.toggle('active');
  }

  function showOverlay() {
    const ov = document.getElementById("overlay");
    if (ov) ov.classList.add("active");
  }

  function hideOverlay() {
    const ov = document.getElementById("overlay");
    if (ov) ov.classList.remove("active");
  }

  function closeOverlay() {
    hideOverlay();
    if (typeof closeSEPanel === "function") closeSEPanel();
    if (typeof closeTestPanel === "function") closeTestPanel();
    if (typeof closeSidebar === "function") closeSidebar();
  }

  function openSidebar() {
    const sb = document.querySelector('.sidebar');

    if (sb) sb.classList.remove('open');
  }

  function toggleSidebar() {
    const sb = document.querySelector('.sidebar');
    if (!sb) return;
    if (sb.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function loadPage(event, file, samePage = false) {
    const viewer = document.getElementById('viewer');
    if (viewer) {
      if (!samePage && file) {
        viewer.src = file;
      } else if (samePage) {
        viewer.src = viewer.getAttribute('data-default') || viewer.src;
      }
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      if (event) event.currentTarget.classList.add('active');
      if (typeof closeSidebar === 'function') closeSidebar();
      return;
    }

    const container = document.querySelector('.content.main');
    if (!container) return;
    if (samePage) {
      container.innerHTML = defaultMainHTML;
    } else if (file) {
      container.innerHTML = `<iframe src="${file}" class="page-frame"></iframe>`;
    }
    document.querySelectorAll('.page-link').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    if (typeof closeSidebar === 'function') closeSidebar();
  }

}

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.content-section, .section');
            sections.forEach(section => section.classList.remove('active'));

            const targetSection = document.getElementById(sectionId);
            if (targetSection) targetSection.classList.add('active');

            const tabs = document.querySelectorAll('.nav-btn, .tab');
            tabs.forEach(tab => tab.classList.remove('active'));

            if (event?.currentTarget) event.currentTarget.classList.add('active');

            if (sectionId === 'quiz' && typeof initializeQuiz === 'function' && !quizCompleted) {
                initializeQuiz();
            }
        }

        function toggleInterpretation(id) {
            const interpretation = document.getElementById(id);
            if (!interpretation) return;
            
            interpretation.classList.toggle('show');
            
            // Đóng các interpretation khác
            const allInterpretations = document.querySelectorAll('.interpretation');
            allInterpretations.forEach(interp => {
                if (interp && interp.id !== id) {
                    interp.classList.remove('show');
                }
            });
        }

        function updatePracticeInterpretation() {
            const pvalInput = document.getElementById('pval-practice');
            const alphaInput = document.getElementById('alpha-practice');
            const cohendInput = document.getElementById('cohend-practice');
            const samplesizeInput = document.getElementById('samplesize-practice');
            const resultDiv = document.getElementById('practice-result');
            
            // Check if all elements exist
            if (!pvalInput || !alphaInput || !cohendInput || !samplesizeInput || !resultDiv) {
                console.log('Some input elements not found, skipping update');
                return;
            }
            
            const pval = parseFloat(pvalInput.value) || 0.032;
            const alpha = parseFloat(alphaInput.value) || 0.05;
            const cohend = parseFloat(cohendInput.value) || 0.65;
            const samplesize = parseInt(samplesizeInput.value) || 30;
            
            let significance = '';
            let effectMeaning = '';
            let powerComment = '';
            let practicalMeaning = '';
            
            // Diễn giải p-value
            if (pval < 0.001) {
                significance = `
                    <div class="p-value-indicator significant">
                        p = ${pval} < 0.001 ➜ RẤT CÓ Ý NGHĨA THỐNG KÊ ⭐⭐⭐
                    </div>
                    <p><strong>Kết luận:</strong> Bác bỏ H₀ với độ tin cậy rất cao. Bằng chứng thống kê rất mạnh.</p>
                `;
            } else if (pval < 0.01) {
                significance = `
                    <div class="p-value-indicator significant">
                        p = ${pval} < 0.01 ➜ CÓ Ý NGHĨA THỐNG KÊ CAO ⭐⭐
                    </div>
                    <p><strong>Kết luận:</strong> Bác bỏ H₀. Bằng chứng thống kê mạnh.</p>
                `;
            } else if (pval < alpha) {
                significance = `
                    <div class="p-value-indicator significant">
                        p = ${pval} < α = ${alpha} ➜ CÓ Ý NGHĨA THỐNG KÊ ⭐
                    </div>
                    <p><strong>Kết luận:</strong> Bác bỏ H₀. Có bằng chứng thống kê cho thấy có sự khác biệt/mối quan hệ có ý nghĩa.</p>
                `;
            } else {
                significance = `
                    <div class="p-value-indicator not-significant">
                        p = ${pval} ≥ α = ${alpha} ➜ KHÔNG CÓ Ý NGHĨA THỐNG KÊ ❌
                    </div>
                    <p><strong>Kết luận:</strong> Không bác bỏ H₀. Không có đủ bằng chứng thống kê.</p>
                `;
            }
            
            // Diễn giải Effect Size
            if (cohend < 0.2) {
                effectMeaning = `<span style="color: #6c757d;">Rất nhỏ</span> - Khác biệt không đáng kể về mặt thực tiễn`;
                practicalMeaning = "Mặc dù có thể có ý nghĩa thống kê, nhưng khác biệt quá nhỏ để có ý nghĩa thực tiễn.";
            } else if (cohend < 0.5) {
                effectMeaning = `<span style="color: #ffc107;">Nhỏ</span> - Khác biệt nhỏ về mặt thực tiễn`;
                practicalMeaning = "Khác biệt có thể được phát hiện, nhưng tác động thực tiễn hạn chế.";
            } else if (cohend < 0.8) {
                effectMeaning = `<span style="color: #fd7e14;">Trung bình</span> - Khác biệt vừa phải về mặt thực tiễn`;
                practicalMeaning = "Khác biệt có ý nghĩa thực tiễn rõ ràng và có thể quan trọng trong thực tế.";
            } else {
                effectMeaning = `<span style="color: #dc3545;">Lớn</span> - Khác biệt lớn về mặt thực tiễn`;
                practicalMeaning = "Khác biệt rất lớn với tác động thực tiễn mạnh mẽ và quan trọng.";
            }
            
            // Nhận xét về cỡ mẫu
            if (samplesize < 30) {
                powerComment = `<span style="color: #dc3545;">Cỡ mẫu nhỏ (n=${samplesize})</span> - Sức mạnh thống kê có thể thấp. Cân nhắc sử dụng test phi tham số.`;
            } else if (samplesize < 100) {
                powerComment = `<span style="color: #ffc107;">Cỡ mẫu vừa phải (n=${samplesize})</span> - Sức mạnh thống kê ổn định.`;
            } else {
                powerComment = `<span style="color: #28a745;">Cỡ mẫu lớn (n=${samplesize})</span> - Sức mạnh thống kê cao. Lưu ý: với cỡ mẫu lớn, ngay cả khác biệt nhỏ cũng có thể có ý nghĩa thống kê.`;
            }
            
            // Gợi ý hành động
            let actionSuggestion = '';
            if (pval < alpha && cohend >= 0.5) {
                actionSuggestion = '🎉 <strong>Kết quả tuyệt vời!</strong> Vừa có ý nghĩa thống kê vừa có ý nghĩa thực tiễn. Có thể tin tưởng áp dụng kết quả.';
            } else if (pval < alpha && cohend < 0.5) {
                actionSuggestion = '⚠️ <strong>Cẩn thận:</strong> Có ý nghĩa thống kê nhưng effect size nhỏ. Cần đánh giá kỹ tính thực tiễn.';
            } else if (pval >= alpha && cohend >= 0.5) {
                actionSuggestion = '🤔 <strong>Thú vị:</strong> Effect size lớn nhưng không có ý nghĩa thống kê. Có thể cần tăng cỡ mẫu.';
            } else {
                actionSuggestion = '📊 <strong>Không có bằng chứng:</strong> Cả ý nghĩa thống kê và effect size đều thấp. Có thể cần thiết kế lại nghiên cứu.';
            }
            
            resultDiv.innerHTML = `
                <h5>🎯 Kết quả diễn giải chi tiết:</h5>
                
                <div style="margin: 15px 0;">
                    <h6>📊 Ý nghĩa thống kê:</h6>
                    ${significance}
                </div>
                
                <div style="margin: 15px 0;">
                    <h6>📏 Effect Size:</h6>
                    <p><strong>Cohen's d = ${cohend}</strong> → ${effectMeaning}</p>
                    <p style="font-size: 0.9rem; color: #6c757d;">${practicalMeaning}</p>
                </div>
                
                <div style="margin: 15px 0;">
                    <h6>👥 Cỡ mẫu:</h6>
                    <p>${powerComment}</p>
                </div>
                
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h6>💡 Gợi ý hành động:</h6>
                    <p>${actionSuggestion}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h6>📝 Mẫu báo cáo APA:</h6>
                    <p style="font-style: italic;">
                        "Kết quả cho thấy ${pval < alpha ? 'có sự khác biệt có ý nghĩa thống kê' : 'không có sự khác biệt có ý nghĩa thống kê'} 
                        giữa các nhóm (p ${pval < 0.001 ? '< .001' : pval < 0.01 ? '< .01' : pval < 0.05 ? '< .05' : '= ' + pval.toFixed(3)}, 
                        Cohen's d = ${cohend}, n = ${samplesize})."
                    </p>
                </div>
            `;
        }

        // Khởi tạo an toàn
        document.addEventListener('DOMContentLoaded', function() {
            try {
                // Chờ một chút để đảm bảo tất cả elements đã được render
                setTimeout(() => {
                    updatePracticeInterpretation();
                }, 100);
            } catch (error) {
                console.log('Error during initialization:', error);
            }
        });

        // Fallback cho trường hợp DOMContentLoaded đã fire
        if (document.readyState === 'loading') {
            // DOM chưa load xong, chờ DOMContentLoaded
        } else {
            // DOM đã load xong, chạy ngay
            setTimeout(() => {
                try {
                    updatePracticeInterpretation();
                } catch (error) {
                    console.log('Error during fallback initialization:', error);
                }
            }, 100);
        }
        // Quiz data
        const quizData = [
            {
                question: "Thống kê mô tả có vai trò gì trong nghiên cứu tâm lý?",
                options: ["Kiểm tra giả thuyết", "Tóm tắt đầy đủ về dữ liệu", "Suy luận về dân số", "Phát triển lý thuyết"],
                correct: 1
            },
            {
                question: "Điều kiện cần thiết để thống kê suy luận có giá trị là gì?",
                options: ["Mẫu lớn", "Mẫu được thu thập ngẫu nhiên", "Dữ liệu phân phối chuẩn", "Có nhiều biến"],
                correct: 1
            },
            {
                question: "Độ lệch chuẩn SD = 2.5 trong nghiên cứu về điểm stress có nghĩa là gì?",
                options: ["Tất cả người có stress = 2.5", "68% người có điểm stress trong khoảng M±2.5", "Chỉ có 2.5% người tham gia", "Nghiên cứu kéo dài 2.5 năm"],
                correct: 1
            },
            {
                question: "Khi SD lớn (>15), điều này cho thấy:",
                options: ["Dữ liệu tập trung quanh mean", "Dữ liệu rất phân tán, có thể có outliers", "Nghiên cứu rất chính xác", "Kích thước mẫu quá nhỏ"],
                correct: 1
            },
            {
                question: "Thang đo nào cho phép thực hiện đầy đủ các phép toán +, -, ×, ÷?",
                options: ["Thang đo định danh", "Thang đo thứ bậc", "Thang đo khoảng", "Thang đo tỉ lệ"],
                correct: 3
            },
            {
                question: "Trong chuỗi [1, 2, 2, 3, 4, 5], số trung vị (median) là bao nhiêu?",
                options: ["2", "2.5", "2.83", "3"],
                correct: 1
            },
            {
                question: "Khi báo cáo Mean = 7.2, SD = 1.8, cách diễn giải đúng là:",
                options: ["Tất cả giá trị đều bằng 7.2", "68% giá trị nằm trong khoảng 5.4-9.0", "Có 1.8% dữ liệu bị sai", "Mean chỉ chính xác với sai số 1.8"],
                correct: 1
            },
            {
                question: "Điểm trung bình của chuỗi [10, 10, 40, 30, 10] là:",
                options: ["20", "18", "22", "15"],
                correct: 0
            },
            {
                question: "Correlation r = 0.8 có nghĩa là:",
                options: ["Mối quan hệ yếu", "Mối quan hệ mạnh", "80% dữ liệu chính xác", "Có 0.8% sai số"],
                correct: 1
            },
            {
                question: "Phân phối chuẩn có đặc điểm gì?",
                options: ["Mean > Median > Mode", "Mean = Median = Mode", "Mean < Median < Mode", "Không có quy luật"],
                correct: 1
            },
            {
                question: "Bước đầu tiên trong quy trình phân tích dữ liệu nghiên cứu là gì?",
                options: ["Chạy kiểm định thống kê", "Làm sạch và mô tả dữ liệu", "Diễn giải kết quả", "Viết báo cáo"],
                correct: 1
            },
            {
                question: "P-value < 0.05 có nghĩa là:",
                options: ["Kết quả có ý nghĩa thống kê", "5% dữ liệu bị sai", "Cần 5% mẫu thêm", "Độ tin cậy chỉ 5%"],
                correct: 0
            },
            {
                question: "Để kiểm tra phân phối chuẩn, ta thường dùng test nào?",
                options: ["t-test", "ANOVA", "Shapiro-Wilk test", "Chi-square test"],
                correct: 2
            },
            {
                question: "Trong phân phối lệch dương, thứ tự từ trái sang phải của Mode, Median, Mean là:",
                options: ["Mode < Median < Mean", "Mean < Median < Mode", "Mode = Median = Mean", "Median < Mode < Mean"],
                correct: 0
            },
            {
                question: "Sample size N = 25 được coi là:",
                options: ["Mẫu lớn, rất tin cậy", "Mẫu nhỏ, cần cẩn thận với assumption", "Mẫu vừa phải", "Mẫu quá lớn"],
                correct: 1
            },
            {
                question: "Khi so sánh 2 nhóm độc lập với dữ liệu phân phối chuẩn, nên dùng:",
                options: ["One-sample t-test", "Independent samples t-test", "Mann-Whitney U test", "Paired t-test"],
                correct: 1
            },
            {
                question: "Variance và Standard Deviation có mối quan hệ:",
                options: ["Variance = SD²", "SD = Variance²", "Không liên quan", "SD = 2×Variance"],
                correct: 0
            },
            {
                question: "Khi dữ liệu không phân phối chuẩn và cần so sánh 2 nhóm độc lập:",
                options: ["Independent t-test", "Mann-Whitney U test", "Paired t-test", "ANOVA"],
                correct: 1
            },
            {
                question: "Outlier thường được định nghĩa là giá trị có Z-score:",
                options: ["< ±1.96", "> ±2.58", "> ±3.29", "< ±0.05"],
                correct: 2
            },
            {
                question: "Điều gì cần làm đầu tiên trước khi phân tích thống kê suy luận?",
                options: ["Kiểm định giả thuyết", "Mô tả dữ liệu và kiểm tra assumption", "Tính tương quan", "Vẽ biểu đồ"],
                correct: 1
            }
        ];

        let currentQuestion = 0;
        let userAnswers = [];
        let quizCompleted = false;


        function calculateStats() {
            const input = document.getElementById('numbers').value;
            const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
            
            if (numbers.length === 0) {
                alert('Vui lòng nhập các số hợp lệ');
                return;
            }
            
            // Calculate statistics
            const sum = numbers.reduce((a, b) => a + b, 0);
            const mean = sum / numbers.length;
            
            const sortedNumbers = [...numbers].sort((a, b) => a - b);
            let median;
            if (sortedNumbers.length % 2 === 0) {
                median = (sortedNumbers[sortedNumbers.length/2 - 1] + sortedNumbers[sortedNumbers.length/2]) / 2;
            } else {
                median = sortedNumbers[Math.floor(sortedNumbers.length/2)];
            }
            
            // Find mode
            const frequency = {};
            numbers.forEach(num => {
                frequency[num] = (frequency[num] || 0) + 1;
            });
            const maxFreq = Math.max(...Object.values(frequency));
            const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
            const mode = modes.length === numbers.length ? 'Không có' : modes.join(', ');
            
            // Calculate standard deviation
            const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
            const standardDeviation = Math.sqrt(variance);
            
            const result = `
                <strong>Kết quả tính toán:</strong><br>
                Dãy số: [${numbers.join(', ')}]<br>
                Mean (Trung bình): ${mean.toFixed(2)}<br>
                Median (Trung vị): ${median}<br>
                Mode (Yếu vị): ${mode}<br>
                Standard Deviation: ${standardDeviation.toFixed(2)}<br>
                Variance (Phương sai): ${variance.toFixed(2)}
            `;
            
            document.getElementById('statsResult').innerHTML = result;
            document.getElementById('statsResult').style.display = 'block';
        }

        function clearCalculator() {
            document.getElementById('numbers').value = '';
            document.getElementById('statsResult').style.display = 'none';
        }

        function updateRecommendation() {
            const purpose = document.getElementById('purpose').value;
            const independent = document.getElementById('independent').value;
            const dataType = document.getElementById('dataType').value;
            const groups = document.getElementById('groups').value;
            const normality = document.getElementById('normality').value;
            
            let recommendation = '';
            let reasoning = '';
            
            if (purpose && dataType) {
                if (purpose === 'compare') {
                    if (dataType === 'continuous') {
                        if (groups === '1') {
                            if (normality === 'yes') {
                                recommendation = '<strong>One-sample t-test</strong>';
                                reasoning = 'So sánh 1 nhóm với giá trị chuẩn, dữ liệu phân phối chuẩn';
                            } else if (normality === 'no') {
                                recommendation = '<strong>Wilcoxon signed-rank test</strong>';
                                reasoning = 'So sánh 1 nhóm với giá trị chuẩn, dữ liệu không phân phối chuẩn';
                            }
                        } else if (groups === '2') {
                            if (normality === 'yes') {
                                recommendation = '<strong>Independent samples t-test</strong> hoặc <strong>Paired samples t-test</strong>';
                                reasoning = 'Chọn Independent nếu 2 nhóm độc lập, Paired nếu cùng đối tượng đo 2 lần';
                            } else if (normality === 'no') {
                                recommendation = '<strong>Mann-Whitney U test</strong> hoặc <strong>Wilcoxon signed-rank test</strong>';
                                reasoning = 'Mann-Whitney cho nhóm độc lập, Wilcoxon cho nhóm phụ thuộc';
                            }
                        } else if (groups === 'multiple') {
                            if (normality === 'yes') {
                                recommendation = '<strong>One-way ANOVA</strong>';
                                reasoning = 'So sánh nhiều nhóm, dữ liệu phân phối chuẩn';
                            } else if (normality === 'no') {
                                recommendation = '<strong>Kruskal-Wallis test</strong>';
                                reasoning = 'So sánh nhiều nhóm, dữ liệu không phân phối chuẩn';
                            }
                        }
                    } else if (dataType === 'categorical') {
                        recommendation = '<strong>Chi-square test</strong>';
                        reasoning = 'So sánh tỷ lệ giữa các nhóm với dữ liệu phân loại';
                    }
                } else if (purpose === 'relationship') {
                    if (dataType === 'continuous') {
                        if (independent === '1') {
                            if (normality === 'yes') {
                                recommendation = '<strong>Pearson correlation</strong>';
                                reasoning = 'Tương quan giữa 2 biến liên tục, phân phối chuẩn';
                            } else if (normality === 'no') {
                                recommendation = '<strong>Spearman correlation</strong>';
                                reasoning = 'Tương quan giữa 2 biến, dữ liệu không phân phối chuẩn';
                            }
                        } else if (independent === 'multiple') {
                            recommendation = '<strong>Multiple correlation/Partial correlation</strong>';
                            reasoning = 'Tương quan giữa nhiều biến';
                        }
                    } else if (dataType === 'ordinal') {
                        recommendation = '<strong>Spearman correlation</strong>';
                        reasoning = 'Tương quan với dữ liệu thứ bậc';
                    }
                } else if (purpose === 'predict') {
                    if (dataType === 'continuous') {
                        if (independent === '1') {
                            recommendation = '<strong>Simple Linear Regression</strong>';
                            reasoning = 'Dự báo biến liên tục từ 1 biến dự báo';
                        } else if (independent === 'multiple') {
                            recommendation = '<strong>Multiple Linear Regression</strong>';
                            reasoning = 'Dự báo biến liên tục từ nhiều biến dự báo';
                        }
                    } else if (dataType === 'categorical') {
                        recommendation = '<strong>Logistic Regression</strong>';
                        reasoning = 'Dự báo biến phân loại (binary hoặc multinomial)';
                    }
                }
                
                if (recommendation) {
                    document.getElementById('testRecommendation').innerHTML = `
                        <h4>🎯 Kiểm định được đề xuất:</h4>
                        <p style="font-size: 1.2em; color: #2d5a2d; margin: 10px 0;">${recommendation}</p>
                        <p><strong>Lý do:</strong> ${reasoning}</p>
                        <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 5px;">
                            <strong>💡 Checklist trước khi chạy:</strong><br>
                            ✓ Kiểm tra missing data<br>
                            ✓ Loại bỏ outliers (nếu cần)<br>
                            ✓ Kiểm tra assumption của test<br>
                            ✓ Tính effect size
                        </div>
                    `;
                    document.getElementById('testRecommendation').style.display = 'block';
                } else {
                    document.getElementById('testRecommendation').style.display = 'none';
                }
            } else {
                document.getElementById('testRecommendation').style.display = 'none';
            }
        }

        function interpretSD() {
            const mean = parseFloat(document.getElementById('meanInput').value);
            const sd = parseFloat(document.getElementById('sdInput').value);
            
            if (isNaN(mean) || isNaN(sd) || sd <= 0) {
                alert('Vui lòng nhập giá trị hợp lệ');
                return;
            }
            
            // Calculate ranges
            const oneSdLower = mean - sd;
            const oneSdUpper = mean + sd;
            const twoSdLower = mean - (2 * sd);
            const twoSdUpper = mean + (2 * sd);
            
            // Determine SD interpretation
            let sdLevel = '';
            let sdColor = '';
            let interpretation = '';
            
            if (sd <= 5) {
                sdLevel = 'THẤP - Dữ liệu đồng đều';
                sdColor = '#c6f6d5';
                interpretation = 'Dữ liệu rất tập trung quanh giá trị trung bình. Nhóm nghiên cứu có đặc điểm tương đối đồng nhất.';
            } else if (sd <= 15) {
                sdLevel = 'TRUNG BÌNH - Dữ liệu cân bằng';
                sdColor = '#bee3f8';
                interpretation = 'Mức độ biến thiên bình thường. Dữ liệu có sự phân tán hợp lý và phù hợp cho hầu hết phân tích thống kê.';
            } else {
                sdLevel = 'CAO - Dữ liệu phân tán';
                sdColor = '#fed7d7';
                interpretation = 'Dữ liệu rất phân tán. Cần kiểm tra outliers và xem xét việc chia nhóm phụ hoặc sử dụng median thay vì mean.';
            }
            
            const result = `
                <div style="background: ${sdColor}; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h4>📊 Phân tích độ lệch chuẩn: SD = ${sd}</h4>
                    <p><strong>Mức độ:</strong> ${sdLevel}</p>
                    <p><strong>Giải thích:</strong> ${interpretation}</p>
                </div>
                
                <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h4>📏 Phạm vi dự đoán:</h4>
                    <p><strong>68% dữ liệu nằm trong:</strong> ${oneSdLower.toFixed(1)} - ${oneSdUpper.toFixed(1)}</p>
                    <p><strong>95% dữ liệu nằm trong:</strong> ${twoSdLower.toFixed(1)} - ${twoSdUpper.toFixed(1)}</p>
                </div>
                
                <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #38b2ac;">
                    <h4>💡 Ý nghĩa thực tế:</h4>
                    <p>Với Mean = ${mean} và SD = ${sd}:</p>
                    <ul style="margin-left: 20px;">
                        <li>Nếu bạn chọn ngẫu nhiên 1 người từ nhóm này, có 68% khả năng giá trị của họ nằm trong khoảng ${oneSdLower.toFixed(1)} - ${oneSdUpper.toFixed(1)}</li>
                        <li>Giá trị ${(mean + sd).toFixed(1)} được coi là "cao hơn trung bình 1 độ lệch chuẩn"</li>
                        <li>Giá trị ${(mean - sd).toFixed(1)} được coi là "thấp hơn trung bình 1 độ lệch chuẩn"</li>
                    </ul>
                </div>
                
                <div style="background: #fff5cd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ecc94b;">
                    <h4>📝 Cách viết trong báo cáo:</h4>
                    <p><em>"Kết quả cho thấy giá trị trung bình là ${mean} (SD = ${sd}), cho thấy ${interpretation.toLowerCase()} Dữ liệu được phân phối với 68% giá trị nằm trong khoảng ${oneSdLower.toFixed(1)} đến ${oneSdUpper.toFixed(1)}."</em></p>
                </div>
            `;
            
            document.getElementById('sdInterpretation').innerHTML = result;
            document.getElementById('sdInterpretation').style.display = 'block';
        }

        function initializeQuiz() {
            currentQuestion = 0;
            userAnswers = [];
            quizCompleted = false;
            document.getElementById('finalScore').style.display = 'none';
            displayQuestion();
        }

        function displayQuestion() {
            const question = quizData[currentQuestion];
            const questionsContainer = document.getElementById('quizQuestions');
            
            questionsContainer.innerHTML = `
                <div class="question">
                    <h3>Câu ${currentQuestion + 1}: ${question.question}</h3>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <div class="option" onclick="selectOption(${index})">
                                <input type="radio" name="q${currentQuestion}" value="${index}" id="option${index}">
                                <label for="option${index}">${String.fromCharCode(65 + index)}. ${option}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Update progress
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('scoreDisplay').textContent = `Câu hỏi: ${currentQuestion + 1}/${quizData.length}`;
            
            // Update buttons
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            document.getElementById('nextBtn').textContent = currentQuestion === quizData.length - 1 ? 'Kết thúc' : 'Câu tiếp';
            
            // Restore previous answer if exists
            if (userAnswers[currentQuestion] !== undefined) {
                const radio = document.querySelector(`input[value="${userAnswers[currentQuestion]}"]`);
                if (radio) {
                    radio.checked = true;
                    radio.closest('.option').classList.add('selected');
                }
            }
        }

        function selectOption(optionIndex) {
            // Clear previous selections
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select new option
            const selectedOption = document.querySelector(`input[value="${optionIndex}"]`);
            selectedOption.checked = true;
            selectedOption.closest('.option').classList.add('selected');
            
            userAnswers[currentQuestion] = optionIndex;
        }

        function nextQuestion() {
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                displayQuestion();
            } else {
                finishQuiz();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        }

        function finishQuiz() {
            let score = 0;
            for (let i = 0; i < quizData.length; i++) {
                if (userAnswers[i] === quizData[i].correct) {
                    score++;
                }
            }
            
            quizCompleted = true;
            document.getElementById('quizQuestions').style.display = 'none';
            document.querySelector('.quiz-controls').style.display = 'none';
            document.getElementById('finalScore').style.display = 'block';
            document.getElementById('finalScoreValue').textContent = score;
            
            // Show detailed results
            let resultsHTML = '<div style="margin-top: 20px; text-align: left;"><h4>Chi tiết kết quả:</h4>';
            for (let i = 0; i < quizData.length; i++) {
                const isCorrect = userAnswers[i] === quizData[i].correct;
                const userAnswer = userAnswers[i] !== undefined ? quizData[i].options[userAnswers[i]] : 'Không trả lời';
                const correctAnswer = quizData[i].options[quizData[i].correct];
                
                resultsHTML += `
                    <p style="margin: 10px 0; padding: 10px; background: ${isCorrect ? '#c6f6d5' : '#fed7d7'}; border-radius: 5px;">
                        <strong>Câu ${i + 1}:</strong> ${isCorrect ? '✓' : '✗'}<br>
                        <small>Đáp án của bạn: ${userAnswer}</small><br>
                        ${!isCorrect ? `<small>Đáp án đúng: ${correctAnswer}</small>` : ''}
                    </p>
                `;
            }
            resultsHTML += '</div>';
            
            document.getElementById('finalScore').innerHTML += resultsHTML;
        }

        function restartQuiz() {
            document.getElementById('finalScore').innerHTML = `
                <h3>Kết quả bài thi</h3>
                <div class="score" style="font-size: 1.5em; margin: 20px 0;">
                    Điểm số: <span id="finalScoreValue"></span>/20
                </div>
                <button class="quiz-btn" onclick="restartQuiz()">Làm lại</button>
            `;
            document.getElementById('quizQuestions').style.display = 'block';
            document.querySelector('.quiz-controls').style.display = 'flex';
            initializeQuiz();
        }

        // Initialize the lesson
        document.addEventListener('DOMContentLoaded', function() {
            // Any initialization code here
        });
        function openTab(evt, tabName) {
            var i, tabcontent, tabbuttons;
            tabcontent = document.getElementsByClassName("tab-content");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.remove("active");
            }
            tabbuttons = document.getElementsByClassName("tab-button");
            for (i = 0; i < tabbuttons.length; i++) {
                tabbuttons[i].classList.remove("active");
            }
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
        }

        function calculateChiSquare() {
            const observedInput = document.getElementById('observed').value;
            const expectedInput = document.getElementById('expected').value;
            
            if (!observedInput) {
                document.getElementById('chiResult').innerHTML = '<span style="color: red;">Vui lòng nhập tần suất quan sát!</span>';
                return;
            }
            
            const observed = observedInput.split(',').map(Number);
            let expected;
            
            if (expectedInput) {
                expected = expectedInput.split(',').map(Number);
            } else {
                const total = observed.reduce((a, b) => a + b, 0);
                const expectedValue = total / observed.length;
                expected = new Array(observed.length).fill(expectedValue);
            }
            
            if (observed.length !== expected.length) {
                document.getElementById('chiResult').innerHTML = '<span style="color: red;">Số lượng tần suất quan sát và kỳ vọng phải bằng nhau!</span>';
                return;
            }
            
            let chiSquare = 0;
            for (let i = 0; i < observed.length; i++) {
                chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
            }
            
            const df = observed.length - 1;
            
            document.getElementById('chiResult').innerHTML = `
                <strong>Kết quả tính toán:</strong><br>
                χ² = ${chiSquare.toFixed(3)}<br>
                Bậc tự do (df) = ${df}<br>
                <em>Tham khảo bảng phân phối Chi-square để so sánh với giá trị tới hạn</em>
            `;
        }

        function calculateTTest() {
            const testType = document.getElementById('testType').value;
            
            if (testType === 'one') {
                const sampleMean = parseFloat(document.getElementById('sampleMean').value);
                const popMean = parseFloat(document.getElementById('popMean').value);
                const stdDev = parseFloat(document.getElementById('stdDev').value);
                const sampleSize = parseFloat(document.getElementById('sampleSize').value);
                
                if (isNaN(sampleMean) || isNaN(popMean) || isNaN(stdDev) || isNaN(sampleSize)) {
                    document.getElementById('tResult').innerHTML = '<span style="color: red;">Vui lòng nhập đầy đủ thông tin!</span>';
                    return;
                }
                
                const t = (sampleMean - popMean) / (stdDev / Math.sqrt(sampleSize));
                const df = sampleSize - 1;
                
                document.getElementById('tResult').innerHTML = `
                    <strong>Kết quả One sample t-test:</strong><br>
                    t = ${t.toFixed(3)}<br>
                    Bậc tự do (df) = ${df}<br>
                    <em>Tham khảo bảng phân phối t để so sánh với giá trị tới hạn</em>
                `;
            }
        }

        let currentScenario = null;
        const scenarios = [
            {
                situation: "Nghiên cứu ảnh hưởng của phương pháp giảng dạy (Truyền thống vs Tương tác) đến điểm thi toán của học sinh",
                variables: "Biến độc lập: Phương pháp (Phân loại), Biến phụ thuộc: Điểm thi (Định lượng)",
                correctAnswer: "Independent samples t-test",
                explanation: "2 nhóm độc lập (Truyền thống vs Tương tác) so sánh điểm số (định lượng)"
            },
            {
                situation: "Kiểm tra xem tỷ lệ các loại rối loạn tâm lý (Lo âu, Trầm cảm, Stress, Bình thường) trong dân số có bằng nhau không",
                variables: "Biến: Loại rối loạn (Phân loại), Mục tiêu: Kiểm tra phân phối tần suất",
                correctAnswer: "Chi-square goodness of fit",
                explanation: "1 biến phân loại, kiểm tra phân phối tần suất với kỳ vọng bằng nhau"
            },
            {
                situation: "Đo mức độ tự tin của 40 sinh viên trước và sau khi tham gia khóa training kỹ năng giao tiếp",
                variables: "Biến độc lập: Thời điểm (Trước/Sau), Biến phụ thuộc: Mức độ tự tin (Định lượng)",
                correctAnswer: "Paired samples t-test",
                explanation: "Cùng nhóm đối tượng được đo 2 lần, so sánh điểm trung bình before-after"
            },
            {
                situation: "Nghiên cứu mối quan hệ giữa giới tính (Nam/Nữ) và loại stress chính (Học tập/Gia đình/Tài chính)",
                variables: "Biến 1: Giới tính (Phân loại), Biến 2: Loại stress (Phân loại)",
                correctAnswer: "Chi-square test of independence", 
                explanation: "2 biến phân loại, kiểm tra mối quan hệ/độc lập giữa chúng"
            },
            {
                situation: "So sánh điểm EQ (trí tuệ cảm xúc) trung bình của học sinh Việt Nam với chuẩn quốc tế (85 điểm)",
                variables: "Biến: Điểm EQ học sinh (Định lượng), Giá trị so sánh: 85 điểm (Hằng số)",
                correctAnswer: "One sample t-test",
                explanation: "1 mẫu so sánh với giá trị chuẩn, dữ liệu định lượng"
            },
            {
                situation: "So sánh mức độ burnout (kiệt sức) giữa 3 nhóm: Y tá ICU, Y tá ngoại trú, Y tá nhi khoa",
                variables: "Biến độc lập: Khoa làm việc (3 nhóm), Biến phụ thuộc: Mức độ burnout (Định lượng)",
                correctAnswer: "ANOVA (không phải t-test)",
                explanation: "3 nhóm trở lên cần dùng ANOVA, không dùng t-test"
            },
            {
                situation: "Nghiên cứu hiệu quả của thuốc antidepressant: So sánh điểm trầm cảm của 60 bệnh nhân trước và sau 8 tuần điều trị",
                variables: "Biến độc lập: Thời điểm (Trước/Sau điều trị), Biến phụ thuộc: Điểm trầm cảm (Định lượng)",
                correctAnswer: "Paired samples t-test",
                explanation: "Cùng nhóm bệnh nhân đo 2 lần, thiết kế within-subjects"
            },
            {
                situation: "Kiểm tra mối quan hệ giữa tình trạng hút thuốc (Có/Không) và mức độ lo âu (Thấp/Trung bình/Cao)",
                variables: "Biến 1: Hút thuốc (Phân loại), Biến 2: Mức độ lo âu (Phân loại thứ bậc)",
                correctAnswer: "Chi-square test of independence",
                explanation: "2 biến phân loại (có thể coi ordinal như categorical), kiểm tra mối quan hệ"
            },
            {
                situation: "So sánh điểm IQ trung bình giữa trẻ được nuôi dưỡng bởi ông bà và trẻ được nuôi bởi bố mẹ",
                variables: "Biến độc lập: Người nuôi dưỡng (Phân loại), Biến phụ thuộc: Điểm IQ (Định lượng)",
                correctAnswer: "Independent samples t-test",
                explanation: "2 nhóm độc lập so sánh trung bình của biến định lượng"
            },
            {
                situation: "Nghiên cứu phân bố tỷ lệ các style học tập (Visual/Auditory/Kinesthetic/Reading) ở sinh viên tâm lý",
                variables: "Biến: Style học tập (Phân loại), Mục tiêu: Mô tả phân phối",
                correctAnswer: "Chi-square goodness of fit",
                explanation: "1 biến phân loại, kiểm tra phân phối có khác với kỳ vọng không"
            },
            {
                situation: "Đánh giá hiệu quả liệu pháp CBT: Đo anxiety score của 30 bệnh nhân trước điều trị, sau 4 tuần và sau 8 tuần",
                variables: "Biến độc lập: Thời điểm (3 lần đo), Biến phụ thuộc: Anxiety score (Định lượng)",
                correctAnswer: "ANOVA (Repeated measures)",
                explanation: "3 lần đo trở lên cần dùng Repeated measures ANOVA"
            },
            {
                situation: "So sánh hiệu quả của 2 loại therapy: Group therapy vs Individual therapy trong điều trị trầm cảm",
                variables: "Biến độc lập: Loại therapy (Phân loại), Biến phụ thuộc: Điểm trầm cảm (Định lượng)",
                correctAnswer: "Independent samples t-test",
                explanation: "2 nhóm độc lập được can thiệp khác nhau, so sánh outcome"
            },
            {
                situation: "Nghiên cứu mối quan hệ giữa tình trạng hôn nhân (Độc thân/Hẹn hò/Kết hôn) và mức độ hạnh phúc (Không hạnh phúc/Hạnh phúc)",
                variables: "Biến 1: Tình trạng hôn nhân (Phân loại), Biến 2: Mức độ hạnh phúc (Phân loại)",
                correctAnswer: "Chi-square test of independence",
                explanation: "2 biến phân loại, kiểm tra có mối quan hệ không"
            },
            {
                situation: "Kiểm tra xem điểm stress trung bình của sinh viên y khoa có khác với mức stress trung bình dân số (50 điểm) không",
                variables: "Biến: Điểm stress sinh viên Y (Định lượng), Giá trị so sánh: 50 điểm (Chuẩn dân số)",
                correctAnswer: "One sample t-test",
                explanation: "So sánh trung bình 1 mẫu với giá trị tham chiếu của dân số"
            },
            {
                situation: "Nghiên cứu hiệu quả của mindfulness meditation: Đo cortisol level trước và sau 6 tuần tập luyện ở 50 người tham gia",
                variables: "Biến độc lập: Thời điểm (Trước/Sau), Biến phụ thuộc: Cortisol level (Định lượng)",
                correctAnswer: "Paired samples t-test",
                explanation: "Cùng nhóm người đo 2 lần, thiết kế before-after"
            },
            {
                situation: "Kiểm tra tỷ lệ các cơ chế defense (Denial/Projection/Sublimation/Rationalization) có xuất hiện đều nhau không",
                variables: "Biến: Loại defense mechanism (Phân loại), Mục tiêu: Kiểm tra phân phối đồng đều",
                correctAnswer: "Chi-square goodness of fit",
                explanation: "1 biến phân loại với nhiều categories, test phân phối đồng đều"
            },
            {
                situation: "So sánh điểm empathy giữa sinh viên ngành tâm lý lâm sàng và sinh viên ngành tâm lý tổ chức",
                variables: "Biến độc lập: Chuyên ngành (Phân loại), Biến phụ thuộc: Điểm empathy (Định lượng)",
                correctAnswer: "Independent samples t-test",
                explanation: "2 nhóm sinh viên độc lập, so sánh điểm số trung bình"
            },
            {
                situation: "Nghiên cứu mối quan hệ giữa personality type (Introvert/Extrovert) và preferred therapy style (CBT/Psychodynamic/Humanistic)",
                variables: "Biến 1: Personality type (Phân loại), Biến 2: Therapy preference (Phân loại)",
                correctAnswer: "Chi-square test of independence",
                explanation: "2 biến phân loại, kiểm tra có association không"
            },
            {
                situation: "Đánh giá tác động của sleep deprivation: Đo reaction time của 25 người sau 0h, 24h, và 48h không ngủ",
                variables: "Biến độc lập: Thời gian không ngủ (3 levels), Biến phụ thuộc: Reaction time (Định lượng)",
                correctAnswer: "ANOVA (Repeated measures)",
                explanation: "3 lần đo trở lên trên cùng đối tượng cần Repeated measures ANOVA"
            },
            {
                situation: "Kiểm tra phân phối các loại phobia phổ biến (Arachnophobia/Claustrophobia/Agoraphobia/Social phobia) có theo tỷ lệ 2:1:1:3 không",
                variables: "Biến: Loại phobia (Phân loại), Tỷ lệ kỳ vọng: 2:1:1:3",
                correctAnswer: "Chi-square goodness of fit",
                explanation: "1 biến phân loại, test phân phối theo tỷ lệ kỳ vọng cụ thể"
            }
        ];

        function generateScenario() {
            currentScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            
            document.getElementById('practiceScenarios').innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 15px; border: 2px solid #F6A5B7; margin: 15px 0;">
                    <h4 style="color: #2C3E50; margin-bottom: 15px;">📋 Tình huống:</h4>
                    <p style="font-size: 1.1em; margin-bottom: 15px;">${currentScenario.situation}</p>
                    <p style="color: #666; font-style: italic;">${currentScenario.variables}</p>
                    
                    <div style="margin-top: 20px;">
                        <strong>Chọn test phù hợp:</strong><br>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="chi-goodness"> Chi-square goodness of fit</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="chi-independence"> Chi-square test of independence</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="one-sample"> One sample t-test</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="independent"> Independent samples t-test</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="paired"> Paired samples t-test</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="anova"> ANOVA</label>
                        <label style="display: block; margin: 8px 0;"><input type="radio" name="scenarioAnswer" value="anova-rm"> ANOVA (Repeated measures)</label>
                    </div>
                </div>
            `;
            
            document.getElementById('practiceResult').innerHTML = 'Hãy chọn test phù hợp và nhấn "Hiện đáp án" để kiểm tra...';
        }

        function showAnswer() {
            if (!currentScenario) {
                document.getElementById('practiceResult').innerHTML = '<span style="color: #F6A5B7;">Vui lòng tạo tình huống trước!</span>';
                return;
            }
            
            const selected = document.querySelector('input[name="scenarioAnswer"]:checked');
            const userAnswer = selected ? selected.nextSibling.textContent.trim() : '';
            
            const isCorrect = userAnswer === currentScenario.correctAnswer;
            
            document.getElementById('practiceResult').innerHTML = `
                <div style="padding: 15px;">
                    <strong>${isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng'}</strong><br><br>
                    ${selected ? `<strong>Bạn chọn:</strong> ${userAnswer}<br>` : '<strong>Bạn chưa chọn đáp án</strong><br>'}
                    <strong>Đáp án đúng:</strong> ${currentScenario.correctAnswer}<br><br>
                    <strong>Giải thích:</strong> ${currentScenario.explanation}
                </div>
            `;
        }

        function checkSituation() {
            const selected = document.getElementById('situationTest').value;
            const resultDiv = document.getElementById('situationResult');
            
            if (!selected) {
                resultDiv.innerHTML = '<span style="color: #F6A5B7;">Vui lòng chọn một test!</span>';
                return;
            }
            
            if (selected === 'chi') {
                resultDiv.innerHTML = `
                    <strong style="color: #48bb78;">✅ Chính xác!</strong><br>
                    <strong>Giải thích:</strong> Cả hai biến đều là phân loại (có/không), vì vậy sử dụng Chi-square test of independence để kiểm tra mối quan hệ giữa chúng.<br>
                    <em>Biến 1: Hút thuốc (có/không) - Phân loại</em><br>
                    <em>Biến 2: Ung thư phổi (có/không) - Phân loại</em>
                `;
            } else {
                let testName = '';
                switch(selected) {
                    case 't1': testName = 'One sample t-test'; break;
                    case 't2': testName = 'Independent t-test'; break;
                    case 't3': testName = 'Paired t-test'; break;
                }
                resultDiv.innerHTML = `
                    <strong style="color: #e53e3e;">❌ Không đúng</strong><br>
                    <strong>Bạn chọn:</strong> ${testName}<br>
                    <strong>Đáp án đúng:</strong> Chi-square test of independence<br>
                    <strong>Lý do:</strong> t-test dành cho biến định lượng, nhưng ở đây cả hai biến đều là phân loại (có/không).
                `;
            }
        }

        function checkAnswers() {
            const answers = {
                q1: 'b',   // Chi-square dành cho biến phân loại
                q2: 'c',   // Paired t-test cho before-after
                q3: 'b',   // E là tần suất kỳ vọng
                q4: 'b',   // Giới tính (phân loại) vs mức độ lo âu (định lượng) → Independent t-test
                q5: 'b',   // Hai biến phân loại → Chi-square independence
                q6: 'b',   // Chi-square không cần phân phối chuẩn
                q7: 'c',   // So sánh với giá trị chuẩn → One sample t-test
                q8: 'b',   // Before-after cùng nhóm → Paired t-test
                q9: 'b',   // df = n-1 = 6-1 = 5
                q10: 'c',  // Kiểm tra phân phối của 1 biến phân loại → goodness of fit
                q11: 'b',  // So sánh 2 nhóm độc lập → Independent t-test
                q12: 'b',  // Công thức one sample t-test
                q13: 'c',  // Hai biến phân loại → Chi-square independence
                q14: 'd',  // Tất cả các trường hợp vi phạm giả định
                q15: 'b'   // Cùng nhóm đo 2 lần → Paired t-test
            };
            
            let score = 0;
            let total = Object.keys(answers).length;
            let feedback = '<strong>📊 KẾT QUẢ KIỂM TRA:</strong><br><br>';
            
            const explanations = {
                q1: 'Chi-square test dành cho dữ liệu phân loại (categorical variables)',
                q2: 'Paired samples t-test dành cho thiết kế before-after (cùng nhóm đối tượng)',
                q3: 'E trong công thức χ²=Σ[(O-E)²/E] là Expected frequency (tần suất kỳ vọng)',
                q4: 'Giới tính (phân loại) → biến độc lập, mức độ lo âu (định lượng) → biến phụ thuộc. Dùng Independent t-test',
                q5: 'Cả hai biến đều phân loại (có/không) → Chi-square test of independence',
                q6: 'Chi-square không yêu cầu phân phối chuẩn. Đây là test phi tham số',
                q7: 'So sánh trung bình mẫu với giá trị chuẩn dân số → One sample t-test',
                q8: 'Cùng 30 bệnh nhân đo trước và sau → Paired samples t-test',
                q9: 'Bậc tự do df = số nhóm - 1 = 6 - 1 = 5',
                q10: 'Kiểm tra phân phối tần suất của 1 biến phân loại → Chi-square goodness of fit',
                q11: 'So sánh điểm stress giữa 2 nhóm sinh viên độc lập → Independent t-test',
                q12: 'One sample t-test: t = (x̄ - μ) / (s/√n)',
                q13: 'Cả hai biến đều phân loại (có/không) → Chi-square test of independence',
                q14: 'Khi vi phạm bất kỳ giả định nào của t-test thì chuyển sang test phi tham số',
                q15: 'Cùng 40 sinh viên đo 2 lần → Paired samples t-test'
            };
            
            for (let question in answers) {
                const selected = document.querySelector(`input[name="${question}"]:checked`);
                if (selected && selected.value === answers[question]) {
                    score++;
                    feedback += `✅ <strong>${question.toUpperCase()}:</strong> Đúng<br>`;
                } else {
                    feedback += `❌ <strong>${question.toUpperCase()}:</strong> Sai<br>`;
                    feedback += `&nbsp;&nbsp;&nbsp;<em>→ ${explanations[question]}</em><br>`;
                }
                feedback += '<br>';
            }
            
            const percentage = Math.round(score/total*100);
            feedback += `<div style="background: #F8F0FF; padding: 15px; border-radius: 10px; margin: 20px 0; border: 2px solid #F6A5B7;">`;
            feedback += `<strong>🎯 ĐIỂM SỐ: ${score}/${total} (${percentage}%)</strong><br><br>`;
            
            if (score >= 13) {
                feedback += '🥇 <strong style="color: #FFD700;">XUẤT SẮC!</strong> Bạn đã thành thạo Chi-square & t-test!<br>';
                feedback += '💡 Bạn có thể tự tin áp dụng vào nghiên cứu thực tế.';
            } else if (score >= 10) {
                feedback += '🥈 <strong style="color: #C0C0C0;">TỐT!</strong> Kiến thức khá vững vàng.<br>';
                feedback += '📚 Hãy ôn lại những phần còn thiếu để đạt điểm tối đa.';
            } else if (score >= 7) {
                feedback += '🥉 <strong style="color: #CD7F32;">KHÁ!</strong> Cần củng cố thêm.<br>';
                feedback += '📖 Đọc lại lý thuyết và thực hành thêm các ví dụ.';
            } else {
                feedback += '📚 <strong style="color: #e53e3e;">CẦN CỐ GẮNG THÊM!</strong><br>';
                feedback += '🔄 Hãy học lại từ đầu và thực hành nhiều hơn.';
            }
            
            feedback += '</div>';
            
            // Thêm gợi ý học tập
            feedback += `<div style="background: white; padding: 15px; border-radius: 10px; margin: 10px 0; border-left: 5px solid #F6A5B7;">`;
            feedback += `<strong>📋 GỢI Ý HỌC TẬP:</strong><br>`;
            if (score < 13) {
                feedback += `• Ôn lại tab "Tổng quan" để hiểu quy tắc chọn test<br>`;
                feedback += `• Thực hành thêm ở tab "Thực hành" với các tình huống mới<br>`;
                feedback += `• Xem lại các ví dụ cụ thể trong tab "Chi-square" và "t-test"`;
            } else {
                feedback += `• Thử thách bản thân với các nghiên cứu phức tạp hơn<br>`;
                feedback += `• Học thêm về ANOVA và các test khác<br>`;
                feedback += `• Áp dụng vào dự án nghiên cứu thực tế`;
            }
            feedback += '</div>';
            
            document.getElementById('quizResult').innerHTML = feedback;
        }

        // Hiệu ứng loading khi chuyển tab
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Trang học tập Chi-square & t-test đã sẵn sàng!');
        });

