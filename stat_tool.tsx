import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Calculator, FileText, Info, CheckCircle } from 'lucide-react';

const StatisticalTestSelector = () => {
  const [description, setDescription] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [step, setStep] = useState(1);

  // Database of statistical tests
  const statisticalTests = {
    'one_sample_ttest': {
      name: 'One-sample t-test',
      nameVi: 'Kiểm định t một mẫu',
      description: 'So sánh trung bình của một mẫu với một giá trị chuẩn',
      assumptions: ['Dữ liệu phân phối chuẩn', 'Dữ liệu liên tục', 'Mẫu ngẫu nhiên'],
      apaFormat: 't({df}) = {t_value}, p = {p_value}',
      example: 'Kiểm tra xem điểm trung bình của lớp (M = 85) có khác biệt với điểm chuẩn 80 hay không'
    },
    'independent_ttest': {
      name: 'Independent samples t-test',
      nameVi: 'Kiểm định t hai mẫu độc lập',
      description: 'So sánh trung bình giữa hai nhóm độc lập',
      assumptions: ['Dữ liệu phân phối chuẩn', 'Phương sai đồng nhất', 'Hai nhóm độc lập'],
      apaFormat: 't({df}) = {t_value}, p = {p_value}, d = {effect_size}',
      example: 'So sánh điểm thi giữa nam và nữ'
    },
    'paired_ttest': {
      name: 'Paired samples t-test',
      nameVi: 'Kiểm định t ghép cặp',
      description: 'So sánh trung bình của cùng một nhóm ở hai thời điểm khác nhau',
      assumptions: ['Hiệu số phân phối chuẩn', 'Dữ liệu ghép cặp', 'Mẫu ngẫu nhiên'],
      apaFormat: 't({df}) = {t_value}, p = {p_value}, d = {effect_size}',
      example: 'So sánh điểm số trước và sau can thiệp'
    },
    'one_way_anova': {
      name: 'One-way ANOVA',
      nameVi: 'Phân tích phương sai một chiều',
      description: 'So sánh trung bình giữa ba nhóm trở lên',
      assumptions: ['Dữ liệu phân phối chuẩn', 'Phương sai đồng nhất', 'Các nhóm độc lập'],
      apaFormat: 'F({df1}, {df2}) = {f_value}, p = {p_value}, η² = {eta_squared}',
      example: 'So sánh hiệu quả của ba phương pháp điều trị khác nhau'
    },
    'chi_square': {
      name: 'Chi-square test',
      nameVi: 'Kiểm định Chi bình phương',
      description: 'Kiểm tra mối liên hệ giữa hai biến phân loại',
      assumptions: ['Dữ liệu phân loại', 'Tần số mong đợi ≥ 5', 'Quan sát độc lập'],
      apaFormat: 'χ²({df}) = {chi_value}, p = {p_value}, φ = {phi}',
      example: 'Kiểm tra mối liên hệ giữa giới tính và sở thích màu sắc'
    },
    'correlation': {
      name: 'Pearson correlation',
      nameVi: 'Tương quan Pearson',
      description: 'Đo lường mối tương quan tuyến tính giữa hai biến liên tục',
      assumptions: ['Dữ liệu phân phối chuẩn', 'Mối quan hệ tuyến tính', 'Không có ngoại lệ'],
      apaFormat: 'r({df}) = {r_value}, p = {p_value}',
      example: 'Tương quan giữa chiều cao và cân nặng'
    },
    'mann_whitney': {
      name: 'Mann-Whitney U test',
      nameVi: 'Kiểm định Mann-Whitney U',
      description: 'Thay thế phi tham số cho t-test hai mẫu độc lập',
      assumptions: ['Dữ liệu thứ bậc', 'Hai nhóm độc lập', 'Không yêu cầu phân phối chuẩn'],
      apaFormat: 'U = {u_value}, p = {p_value}, r = {effect_size}',
      example: 'So sánh thứ hạng giữa hai nhóm khi dữ liệu không phân phối chuẩn'
    }
  };

  // Analyze description and suggest test
  const analyzeDescription = (text) => {
    const lowerText = text.toLowerCase();
    
    // Keywords for different tests
    const keywords = {
      one_sample_ttest: ['so sánh với giá trị chuẩn', 'một mẫu', 'giá trị trung bình', 'chuẩn'],
      independent_ttest: ['hai nhóm', 'nam nữ', 'so sánh giữa', 'nhóm điều trị', 'nhóm đối chứng'],
      paired_ttest: ['trước sau', 'pre post', 'cùng một nhóm', 'ghép cặp', 'hai thời điểm'],
      one_way_anova: ['ba nhóm', 'nhiều nhóm', 'ba phương pháp', 'nhiều điều kiện'],
      chi_square: ['phân loại', 'giới tính', 'có không', 'tần số', 'tỷ lệ'],
      correlation: ['tương quan', 'mối quan hệ', 'liên quan', 'ảnh hưởng'],
      mann_whitney: ['không phân phối chuẩn', 'thứ hạng', 'phi tham số', 'median']
    };

    let scores = {};
    
    // Calculate scores for each test
    Object.keys(keywords).forEach(test => {
      scores[test] = 0;
      keywords[test].forEach(keyword => {
        if (lowerText.includes(keyword)) {
          scores[test]++;
        }
      });
    });

    // Find the test with highest score
    const bestTest = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    if (scores[bestTest] > 0) {
      return {
        suggestedTest: bestTest,
        confidence: scores[bestTest],
        allScores: scores
      };
    }
    
    return null;
  };

  const handleAnalyze = () => {
    const result = analyzeDescription(description);
    setAnalysisResult(result);
    if (result) {
      setSelectedTest(result.suggestedTest);
    }
    setStep(2);
  };

  const generateAPAConclusion = (testType, significant = true) => {
    const test = statisticalTests[testType];
    const examples = {
      one_sample_ttest: {
        significant: "Kết quả kiểm định t một mẫu cho thấy có sự khác biệt có ý nghĩa thống kê giữa điểm trung bình mẫu (M = 85.2, SD = 12.4) và giá trị chuẩn 80, t(49) = 2.97, p = .005, d = 0.42. Kết quả này cho thấy điểm trung bình của mẫu cao hơn có ý nghĩa so với giá trị chuẩn.",
        nonsignificant: "Kết quả kiểm định t một mẫu không cho thấy sự khác biệt có ý nghĩa thống kê giữa điểm trung bình mẫu (M = 81.5, SD = 11.8) và giá trị chuẩn 80, t(49) = 0.90, p = .372, d = 0.13. Không có bằng chứng cho thấy điểm trung bình mẫu khác biệt với giá trị chuẩn."
      },
      independent_ttest: {
        significant: "Kiểm định t hai mẫu độc lập cho thấy có sự khác biệt có ý nghĩa thống kê giữa nhóm nam (M = 78.5, SD = 10.2) và nhóm nữ (M = 84.3, SD = 9.8) về điểm số, t(98) = -3.45, p = .001, d = 0.58. Nhóm nữ có điểm số cao hơn có ý nghĩa so với nhóm nam.",
        nonsignificant: "Kiểm định t hai mẫu độc lập không cho thấy sự khác biệt có ý nghĩa thống kê giữa nhóm nam (M = 80.2, SD = 11.1) và nhóm nữ (M = 82.1, SD = 10.5) về điểm số, t(98) = -1.02, p = .311, d = 0.17. Không có bằng chứng cho thấy sự khác biệt giữa hai giới."
      },
      paired_ttest: {
        significant: "Kiểm định t ghép cặp cho thấy có sự cải thiện có ý nghĩa thống kê từ trước can thiệp (M = 75.4, SD = 8.9) đến sau can thiệp (M = 82.7, SD = 9.2), t(29) = -4.87, p < .001, d = 0.81. Can thiệp đã mang lại hiệu quả tích cực.",
        nonsignificant: "Kiểm định t ghép cặp không cho thấy sự thay đổi có ý nghĩa thống kê từ trước can thiệp (M = 78.2, SD = 10.1) đến sau can thiệp (M = 79.8, SD = 9.8), t(29) = -1.24, p = .225, d = 0.16. Không có bằng chứng cho thấy hiệu quả của can thiệp."
      },
      one_way_anova: {
        significant: "Phân tích phương sai một chiều cho thấy có sự khác biệt có ý nghĩa thống kê giữa các nhóm về điểm số, F(2, 87) = 8.45, p < .001, η² = .162. Kiểm định Post-hoc Tukey HSD cho thấy nhóm A (M = 85.2) khác biệt có ý nghĩa với nhóm C (M = 76.8), p = .001.",
        nonsignificant: "Phân tích phương sai một chiều không cho thấy sự khác biệt có ý nghĩa thống kê giữa các nhóm về điểm số, F(2, 87) = 1.24, p = .295, η² = .028. Không có bằng chứng cho thấy sự khác biệt giữa các phương pháp điều trị."
      },
      chi_square: {
        significant: "Kiểm định Chi-square cho thấy có mối liên hệ có ý nghĩa thống kê giữa giới tính và sở thích màu sắc, χ²(2) = 12.87, p = .002, φ = .35. Nam giới có xu hướng thích màu xanh nhiều hơn, trong khi nữ giới thích màu đỏ nhiều hơn.",
        nonsignificant: "Kiểm định Chi-square không cho thấy mối liên hệ có ý nghĩa thống kê giữa giới tính và sở thích màu sắc, χ²(2) = 2.45, p = .294, φ = .15. Không có bằng chứng cho thấy sự khác biệt trong sở thích màu sắc giữa nam và nữ."
      },
      correlation: {
        significant: "Phân tích tương quan Pearson cho thấy có mối tương quan dương có ý nghĩa thống kê giữa chiều cao và cân nặng, r(98) = .67, p < .001. Chiều cao cao hơn có liên quan đến cân nặng lớn hơn.",
        nonsignificant: "Phân tích tương quan Pearson không cho thấy mối tương quan có ý nghĩa thống kê giữa tuổi và điểm số, r(98) = .12, p = .234. Không có bằng chứng cho thấy mối liên hệ giữa hai biến này."
      },
      mann_whitney: {
        significant: "Kiểm định Mann-Whitney U cho thấy có sự khác biệt có ý nghĩa thống kê về thứ hạng giữa hai nhóm, U = 245.5, p = .003, r = .31. Nhóm A có thứ hạng trung bình cao hơn có ý nghĩa so với nhóm B.",
        nonsignificant: "Kiểm định Mann-Whitney U không cho thấy sự khác biệt có ý nghĩa thống kê về thứ hạng giữa hai nhóm, U = 478.5, p = .156, r = .14. Không có bằng chứng cho thấy sự khác biệt giữa các nhóm."
      }
    };

    return examples[testType] ? (significant ? examples[testType].significant : examples[testType].nonsignificant) : "Ví dụ kết luận chưa có sẵn cho test này.";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Công cụ Chọn Test Kiểm định Thống kê
          </h1>
          <p className="text-gray-600">
            Phân tích mô tả nghiên cứu và đề xuất test kiểm định phù hợp theo chuẩn APA
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <BookOpen size={20} />
            </div>
            <ChevronRight className="text-gray-400" size={20} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Calculator size={20} />
            </div>
            <ChevronRight className="text-gray-400" size={20} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* Step 1: Input description */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Mô tả nghiên cứu của bạn:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ví dụ: Tôi muốn so sánh điểm thi giữa nhóm nam và nhóm nữ trong lớp. Có 25 nam sinh và 25 nữ sinh..."
                className="w-full p-4 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="text-blue-500 mt-1" size={20} />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">Mẹo để mô tả tốt:</p>
                  <ul className="space-y-1">
                    <li>• Nêu rõ số lượng nhóm và loại dữ liệu</li>
                    <li>• Mô tả mục tiêu so sánh hoặc kiểm định</li>
                    <li>• Đề cập đến đặc điểm của dữ liệu (liên tục, phân loại, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!description.trim()}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              Phân tích và Đề xuất Test
            </button>
          </div>
        )}

        {/* Step 2: Test selection and explanation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="text-green-500" size={20} />
                <h3 className="font-semibold text-green-800">Test được đề xuất</h3>
              </div>
              {analysisResult && selectedTest && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {statisticalTests[selectedTest].nameVi}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {statisticalTests[selectedTest].description}
                  </p>
                </div>
              )}
            </div>

            {/* Manual test selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Hoặc chọn test khác:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(statisticalTests).map(([key, test]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTest(key)}
                    className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${
                      selectedTest === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-800">{test.nameVi}</h4>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Test details */}
            {selectedTest && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Chi tiết về {statisticalTests[selectedTest].nameVi}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Giả định:</h4>
                    <ul className="space-y-1">
                      {statisticalTests[selectedTest].assumptions.map((assumption, index) => (
                        <li key={index} className="text-sm text-gray-600">• {assumption}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Ví dụ áp dụng:</h4>
                    <p className="text-sm text-gray-600">{statisticalTests[selectedTest].example}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Format báo cáo APA:</h4>
                  <code className="bg-white p-2 rounded border text-sm text-gray-800 block">
                    {statisticalTests[selectedTest].apaFormat}
                  </code>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              disabled={!selectedTest}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              Xem Ví dụ Kết luận APA
            </button>
          </div>
        )}

        {/* Step 3: APA conclusion examples */}
        {step === 3 && selectedTest && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ví dụ Kết luận theo chuẩn APA
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="mr-2" size={20} />
                  Kết quả có ý nghĩa thống kê (p &lt; .05)
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {generateAPAConclusion(selectedTest, true)}
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <Info className="mr-2" size={20} />
                  Kết quả không có ý nghĩa thống kê (p ≥ .05)
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {generateAPAConclusion(selectedTest, false)}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Lưu ý khi viết kết luận APA:</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Luôn báo cáo thống kê mô tả (M, SD) cùng với thống kê kiểm định</li>
                <li>• Bao gồm degrees of freedom, giá trị thống kê, và p-value</li>
                <li>• Báo cáo effect size (d, η², φ, r) khi phù hợp</li>
                <li>• Diễn giải kết quả bằng ngôn ngữ dễ hiểu</li>
                <li>• Không nói "chấp nhận giả thuyết H0" mà nói "không có bằng chứng bác bỏ H0"</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 font-semibold transition-colors"
              >
                Phân tích mới
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
              >
                Chọn test khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticalTestSelector;