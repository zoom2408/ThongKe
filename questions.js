const allQuestions = [
  {
    q: "Một nhà nghiên cứu tiến hành một cuộc khảo sát để kiểm tra xem liệu một chương trình can thiệp tâm lý có làm giảm lo âu ở sinh viên hay không. Giả thuyết không (null hypothesis) được đặt ra là 'chương trình không có tác dụng'. Sau khi phân tích dữ liệu, nhà nghiên cứu thấy rằng nhóm sinh viên tham gia chương trình có mức độ lo âu thấp hơn so với nhóm không tham gia, và quyết định bác bỏ giả thuyết không. Tuy nhiên, trên thực tế, chương trình không có tác dụng trong việc giảm lo âu. Tình huống này là ví dụ về:",
    opts: [
      "Lỗi loại II (Lỗi không bác bỏ giả thuyết không khi nó sai).",
      "Lỗi loại I (Lỗi bác bỏ giả thuyết không khi nó đúng).",
      "Giả thuyết đặt ra không phù hợp.",
      "Không có đáp án nào đúng."
    ],
    ans: 1,
    explain: "Đây là lỗi loại I vì nhà nghiên cứu đã bác bỏ giả thuyết không khi nó thực sự đúng."
  },
  {
    q: "Khi thực hiện một kiểm định giả thuyết, nếu giá trị p nhỏ hơn mức ý nghĩa 0.05, điều này có nghĩa là gì?",
    opts: [
      "Chấp nhận giả thuyết không",
      "Bác bỏ giả thuyết không",
      "Dữ liệu không có ý nghĩa thống kê",
      "Dữ liệu có phân phối chuẩn"
    ],
    ans: 1,
    explain: "Khi p-value < 0.05, chúng ta bác bỏ giả thuyết không."
  },
  {
    q: "Một phân phối lệch phải (positively skewed) có đặc điểm gì?",
    opts: [
      "Đuôi bên phải dài hơn đuôi bên trái",
      "Đuôi bên trái dài hơn đuôi bên phải",
      "Trung bình nhỏ hơn trung vị",
      "Trung bình bằng trung vị"
    ],
    ans: 0,
    explain: "Phân phối lệch phải có đuôi bên phải dài hơn đuôi bên trái."
  },
  {
    q: "Đối với ANOVA hai yếu tố trong Jamovi, bước nào sau đây là cần thiết để kiểm tra tính đồng nhất của phương sai khi có yếu tố lặp?",
    opts: [
      "Sử dụng Mauchly's Test cho Sphericity",
      "Thực hiện Shapiro-Wilk Test",
      "Chọn chỉ số Collinearity",
      "Kiểm tra phương sai đồng nhất với Homogeneity"
    ],
    ans: 0,
    explain: "Mauchly's Test dùng để kiểm tra Sphericity trong ANOVA với yếu tố lặp."
  },
  {
    q: "Trong một nghiên cứu đánh giá hiệu quả của chương trình can thiệp giảm stress nơi làm việc, 40 nhân viên được chia thành hai nhóm: nhóm can thiệp và nhóm kiểm soát. Mức độ stress được đo ở 3 thời điểm. Tương tác nào sau đây trong Mixed ANOVA là quan trọng nhất để kiểm tra giả thuyết trên?",
    opts: [
      "Tác động chính của thời gian (main effect of time)",
      "Tác động chính của nhóm (main effect of group)",
      "Tương tác giữa nhóm và thời gian (group × time interaction)",
      "Sai số ngẫu nhiên (random error)"
    ],
    ans: 2,
    explain: "Tương tác group × time quan trọng nhất để xem sự thay đổi stress theo thời gian có khác nhau giữa nhóm."
  },
  {
    q: "Trong Jamovi, biểu đồ nào giúp bạn kiểm tra dữ liệu có tồn tại outlier hay không?",
    opts: [
      "Scatter plot",
      "Box plot",
      "Line plot",
      "Histogram"
    ],
    ans: 1,
    explain: "Box plot là công cụ tốt nhất để phát hiện outlier."
  },
  {
    q: "Trong một nghiên cứu về sự hài lòng của khách hàng đối với hai sản phẩm khác nhau, các khách hàng đã thực hiện cả independent sample t-test và paired sample t-test. Sau khi phân tích, nhà nghiên cứu nhận thấy dữ liệu không tuân theo phân phối chuẩn và có phương sai không đồng nhất. Nhà nghiên cứu nên:",
    opts: [
      "Thực hiện phân tích hồi quy để kiểm tra mối quan hệ giữa sự hài lòng và các biến số khác.",
      "Sử dụng t-test Welch cho dữ liệu độc lập và paired sample t-test cho dữ liệu cùng nhóm.",
      "Chỉ thực hiện phương pháp phi tham số Mann-Whitney U test cho dữ liệu khác nhóm và Wilcoxon signed-rank test cho dữ liệu cùng nhóm.",
      "Áp dụng phương pháp chuyển đổi dữ liệu cho cả hai biến độc lập và phụ thuộc."
    ],
    ans: 2,
    explain: "Khi dữ liệu không đáp ứng giả định, nên dùng kiểm định phi tham số."
  },
  {
    q: "Một nhà nghiên cứu muốn đánh giá hiệu quả của một chương trình trị liệu hành vi trong việc giảm mức độ trầm cảm ở người trưởng thành. Họ thu thập dữ liệu về điểm số trầm cảm của 40 người tham gia trước và sau khi hoàn thành chương trình trị liệu. Kiểm định thống kê nào nên được sử dụng?",
    opts: [
      "Kiểm định ANOVA một chiều với cùng nhóm.",
      "Kiểm định t-test cho 2 nhóm độc lập.",
      "Kiểm định t-test cho cùng nhóm.",
      "Hồi quy tuyến tính."
    ],
    ans: 2,
    explain: "Paired t-test phù hợp để so sánh trước-sau trên cùng nhóm."
  },
  {
    q: "Trong một phân tích one-way ANOVA, bạn nhận được giá trị F = 4.67 với mức p-value là 0.002 và với tổng độ tự do (df) là 30. Trong đó, độ tự do giữa các nhóm (between group) là 2 và độ tự do trong các nhóm (within group) là 28. Bạn có thể kết luận điều gì?",
    opts: [
      "Biến thiên giữa các nhóm thấp hơn biến thiên trong các nhóm, cho thấy không có sự khác biệt đáng kể giữa các nhóm.",
      "Biến thiên giữa các nhóm lớn hơn biến thiên trong các nhóm, cho thấy có sự khác biệt có ý nghĩa thống kê giữa ít nhất một cặp nhóm.",
      "Biến thiên giữa các nhóm và biến thiên trong các nhóm đều không đủ để đưa ra kết luận về sự khác biệt giữa các nhóm.",
      "Giá trị F thấp cho thấy rằng không cần thực hiện phân tích post-hoc trong ANOVA."
    ],
    ans: 1,
    explain: "F có ý nghĩa thống kê (p < 0.05) cho thấy có ít nhất một cặp nhóm khác biệt."
  },
  {
    q: "Cách tốt nhất và phổ biến nhất để tăng sức mạnh thống kê cho một nghiên cứu là gì?",
    opts: [
      "Giảm kích thước mẫu để dễ kiểm soát dữ liệu hơn.",
      "Giảm mức ý nghĩa (alpha) từ 0.05 xuống 0.01 để chặt chẽ hơn trong thống kê.",
      "Tăng kích thước mẫu và giảm sai số đo lường.",
      "Luôn sử dụng kiểm định phi tham số để tránh sai số."
    ],
    ans: 2,
    explain: "Tăng kích thước mẫu là cách hiệu quả nhất để tăng power."
  },
  {
    q: "Trong một phân tích ANOVA hai chiều (Two-Way ANOVA), giá trị p của hiệu ứng tương tác (interaction effect) nhỏ hơn 0.05 cho biết điều gì?",
    opts: [
      "Cả hai yếu tố đều có ảnh hưởng độc lập lên biến phụ thuộc.",
      "Có một sự tương tác có ý nghĩa giữa hai yếu tố ảnh hưởng đến biến phụ thuộc.",
      "Các nhóm trong các yếu tố khác nhau có phương sai đồng nhất.",
      "Không có sự khác biệt đáng kể giữa các nhóm trong các yếu tố."
    ],
    ans: 1,
    explain: "P-value < 0.05 cho tương tác có nghĩa là sự tương tác giữa hai yếu tố có ý nghĩa."
  },
  {
    q: "Trong phân tích tương quan, một hệ số tương quan Pearson r = -0.78 cho biết điều gì về mối quan hệ giữa hai biến?",
    opts: [
      "Hai biến có mối quan hệ đồng biến chặt chẽ.",
      "Hai biến có mối quan hệ nghịch biến trung bình.",
      "Không có mối quan hệ nào giữa hai biến.",
      "Hai biến có mối quan hệ nghịch biến mạnh."
    ],
    ans: 3,
    explain: "r = -0.78 cho thấy mối quan hệ nghịch biến mạnh (gần -1)."
  },
  {
    q: "Một nhà nghiên cứu thị trường đã thu thập dữ liệu về mức độ hài lòng của khách hàng với các sản phẩm khác nhau và xếp hạng chúng từ cao đến thấp. Thang đo nào được thể hiện trong dữ liệu này?",
    opts: [
      "Thang đo tỉ lệ.",
      "Thang đo thứ bậc.",
      "Thang đo khoảng.",
      "Thang đo định danh."
    ],
    ans: 1,
    explain: "Xếp hạng từ cao đến thấp là thang đo thứ bậc (ordinal)."
  },
  {
    q: "Đâu là diễn giải chính xác nhất về ý nghĩa của giá trị p?",
    opts: [
      "Giá trị p cho biết xác suất Ho là đúng.",
      "Giá trị p là xác suất để mẫu bạn chọn là sai.",
      "Giá trị p cho biết khả năng thu được dữ liệu như vậy nếu giả thuyết không là đúng.",
      "Giá trị p cho biết mức độ tương quan giữa hai biến."
    ],
    ans: 2,
    explain: "P-value là xác suất quan sát được dữ liệu như vậy hoặc cực đoan hơn nếu Ho đúng."
  },
  {
    q: "Trong một nghiên cứu về ảnh hưởng của thời gian tập thể dục đến sức khỏe tâm lý của người trưởng thành, nhà nghiên cứu đã thu thập dữ liệu từ 150 người tham gia. Nhà nghiên cứu nên sử dụng phương pháp hồi quy nào?",
    opts: [
      "Hồi quy đa biến.",
      "Hồi quy Poisson.",
      "Hồi quy logistic.",
      "Hồi quy đơn biến."
    ],
    ans: 3,
    explain: "Chỉ có một biến độc lập (thời gian tập) nên dùng hồi quy đơn biến."
  },
  {
    q: "Cronbach's alpha là một chỉ số được sử dụng để đo lường:",
    opts: [
      "Tính hợp lệ của một thang đo.",
      "Độ tin cậy nội tại của một thang đo.",
      "Mối quan hệ giữa hai biến.",
      "Sự khác biệt giữa các nhóm."
    ],
    ans: 1,
    explain: "Cronbach's alpha đo độ tin cậy nội tại (internal consistency) của thang đo."
  },
  {
    q: "Khi nào thì việc diễn giải hệ số hồi quy không chuẩn hóa là phù hợp nhất?",
    opts: [
      "Khi muốn so sánh tầm quan trọng tương đối của các biến độc lập khác nhau trong cùng một mô hình.",
      "Khi các biến độc lập có đơn vị đo lường khác nhau và cần quy về cùng một thang đo.",
      "Khi muốn dự đoán giá trị thực tế của biến phụ thuộc bằng cách sử dụng các đơn vị đo lường ban đầu của các biến độc lập.",
      "Khi cần kiểm tra ý nghĩa thống kê của từng biến độc lập."
    ],
    ans: 2,
    explain: "Hệ số không chuẩn hóa phù hợp khi muốn dự đoán giá trị thực tế với đơn vị ban đầu."
  },
  {
    q: "Trong hồi quy đa biến, nếu Residual plots cho thấy phần dư phân bố theo hình parabol, điều đó cho thấy vi phạm giả định nào?",
    opts: [
      "Vi phạm giả định phân phối chuẩn; cần sử dụng hồi quy logistic.",
      "Vi phạm giả định tuyến tính; có thể thử biến đổi biến độc lập (vd: log, bình phương).",
      "Vi phạm giả định độc lập; cần kiểm tra VIF.",
      "Vi phạm giả định phương sai không đổi; giải pháp là loại bỏ biến gây nhiễu."
    ],
    ans: 1,
    explain: "Phần dư hình parabol thường chỉ ra mối quan hệ phi tuyến, cần biến đổi biến."
  },
  {
    q: "Trong mô hình hồi quy đa biến, hệ số R² hiệu chỉnh (Adjusted R²) giảm sau khi thêm một biến độc lập mới. Điều này ngụ ý:",
    opts: [
      "Biến mới có ảnh hưởng tích cực đến mô hình.",
      "Biến mới có thể gây đa cộng tuyến nghiêm trọng.",
      "Biến mới không cải thiện khả năng giải thích và có thể không nên giữ trong mô hình.",
      "Mô hình bị sai lệch nghiêm trọng và cần loại bỏ tất cả biến độc lập."
    ],
    ans: 2,
    explain: "Adjusted R² giảm cho thấy biến mới không cải thiện đủ để bù cho độ phức tạp thêm vào."
  },
  {
    q: "Bạn chạy một hồi quy đa biến và phát hiện chỉ số VIF của một biến là 12.5. Điều nào sau đây là đánh giá hợp lý nhất?",
    opts: [
      "Biến này không có vấn đề gì vì VIF càng cao mô hình càng chính xác.",
      "Đây là dấu hiệu của đa cộng tuyến nghiêm trọng, nên xem xét loại bỏ hoặc kết hợp biến.",
      "Cần biến đổi biến phụ thuộc thành thang chuẩn hóa.",
      "Nên giữ nguyên biến vì VIF không liên quan đến chất lượng mô hình."
    ],
    ans: 1,
    explain: "VIF > 10 thường chỉ ra đa cộng tuyến nghiêm trọng."
  },
  {
    q: "Trong thống kê mô tả, đại lượng nào sau đây đo lường mức độ phân tán của dữ liệu xung quanh giá trị trung bình?",
    opts: [
      "Trung bình cộng.",
      "Yếu vị.",
      "Phương sai.",
      "Trung vị."
    ],
    ans: 2,
    explain: "Phương sai đo lường mức độ phân tán của dữ liệu quanh giá trị trung bình."
  },
  {
    q: "Đại lượng nào sau đây không phải là thước đo xu hướng trung tâm?",
    opts: [
      "Trung bình.",
      "Khoảng từ phân vị (IQR).",
      "Yếu vị.",
      "Trung vị."
    ],
    ans: 1,
    explain: "IQR đo độ phân tán, không phải xu hướng trung tâm."
  },
  {
    q: "Kiểm định giả thuyết là một quy trình được sử dụng để làm gì?",
    opts: [
      "Mô tả các đặc điểm của một mẫu cụ thể.",
      "Chỉ để ước lượng các tham số tổng thể.",
      "Tìm kiếm các mẫu trong dữ liệu mà không có giả thuyết ban đầu.",
      "Quyết định xem một giả định về dân số (population) có được hỗ trợ bởi dữ liệu mẫu (sample) hay không."
    ],
    ans: 3,
    explain: "Kiểm định giả thuyết dùng để đánh giá giả thuyết về tổng thể dựa trên dữ liệu mẫu."
  },
  {
    q: "Một nghiên cứu tâm lý học xã hội so sánh mức độ 'tính xã hội' của sinh viên từ ba nền văn hóa khác nhau (Á, Âu, Mỹ Latinh). Sau khi chạy one-way ANOVA, bạn nhận được F-statistic có p-value là 0.04. Giả định nào sau đây là quan trọng nhất cần được kiểm tra để tin tưởng vào kết quả này?",
    opts: [
      "Các cá nhân trong mỗi nền văn hóa phải có mối quan hệ phụ thuộc lẫn nhau.",
      "Các nhóm phải có cùng kích thước mẫu.",
      "Các biến độc lập (nền văn hóa) phải là định lượng.",
      "Phương sai của điểm 'tính xã hội' phải đồng nhất giữa ba nền văn hóa."
    ],
    ans: 3,
    explain: "Giả định phương sai đồng nhất (homogeneity of variance) quan trọng trong ANOVA."
  },
  {
    q: "Mục tiêu chính của phân tích hồi quy tuyến tính đơn biến là gì?",
    opts: [
      "Kiểm tra mối quan hệ phi tuyến giữa các biến.",
      "So sánh trung bình của nhiều nhóm.",
      "Dự đoán giá trị của một biến phụ thuộc dựa trên một biến độc lập duy nhất.",
      "Xác định các mối quan hệ nguyên nhân - kết quả."
    ],
    ans: 2,
    explain: "Hồi quy đơn biến dùng để dự đoán biến phụ thuộc từ một biến độc lập."
  },
  {
    q: "Trong phương trình hồi quy tuyến tính (y=b0+b1x), b1 đại diện cho điều gì?",
    opts: [
      "Giá trị trung bình của biến độc lập x.",
      "Giá trị của y khi x có giá trị là 0 (điểm chặn).",
      "Sai số chuẩn của ước tính hồi quy.",
      "Thay đổi dự kiến của y khi x tăng một đơn vị."
    ],
    ans: 3,
    explain: "b1 là hệ số góc, thể hiện sự thay đổi của y khi x tăng 1 đơn vị."
  },
  {
    q: "Hệ số xác định R² trong hồi quy cho biết điều gì?",
    opts: [
      "Độ mạnh của mối quan hệ tuyến tính giữa hai biến.",
      "Giá trị của biến phụ thuộc khi biến độc lập bằng 0.",
      "Phần trăm biến thiên của biến phụ thuộc được giải thích bởi biến độc lập.",
      "Mức ý nghĩa của mô hình hồi quy."
    ],
    ans: 2,
    explain: "R² cho biết tỷ lệ phương sai của biến phụ thuộc được giải thích bởi biến độc lập."
  },
  {
    q: "Khi một phân phối dữ liệu bị lệch dương (positive skew), mối quan hệ giữa trung bình (mean), trung vị (median) và yếu vị (mode) thường là gì?",
    opts: [
      "Trung bình = trung vị = yếu vị.",
      "Yếu vị < trung vị < trung bình.",
      "Trung vị < yếu vị < trung bình.",
      "Trung bình < trung vị < yếu vị."
    ],
    ans: 1,
    explain: "Với phân phối lệch phải: mode < median < mean."
  },
  {
    q: "Nếu kết quả ANOVA cho thấy giá trị F-statistic không có ý nghĩa thống kê (ví dụ: P-value > 0.05), điều này ngụ ý gì về trung bình của các nhóm được so sánh?",
    opts: [
      "Có ít nhất một cặp trung bình nhóm khác biệt đáng kể.",
      "Tất cả các trung bình nhóm chắc chắn bằng nhau.",
      "Phương sai trong các nhóm lớn hơn nhiều so với phương sai giữa các nhóm.",
      "Không có đủ bằng chứng để kết luận rằng có sự khác biệt đáng kể nào giữa bất kỳ trung bình nhóm nào."
    ],
    ans: 3,
    explain: "P-value > 0.05 có nghĩa là không đủ bằng chứng để kết luận có sự khác biệt giữa các nhóm."
  },
  {
    q: "Một nhà tâm lý học đang nghiên cứu hiệu quả của hai phương pháp trị liệu mới (A và B) so với phương pháp tiêu chuẩn trong việc giảm triệu chứng trầm cảm. Ông chia ngẫu nhiên 150 bệnh nhân thành ba nhóm và đo lường mức độ trầm cảm sau 8 tuần. Kiểm định thống kê nào là phù hợp nhất?",
    opts: [
      "ANOVA một yếu tố (one-way ANOVA).",
      "t-test độc lập (Independent Samples t-test).",
      "t-test cặp (Paired t-test).",
      "Kiểm định Chi-bình phương (Chi-square test)."
    ],
    ans: 0,
    explain: "So sánh 3 nhóm độc lập nên dùng one-way ANOVA."
  },
  {
    q: "Trong một thử nghiệm lâm sàng, một nhà nghiên cứu muốn kiểm tra xem một loại thuốc mới có làm giảm mức độ lo âu hiệu quả hơn giả dược hay không. Lỗi loại I (Type I error) trong tình huống này là gì?",
    opts: [
      "Kết luận rằng cả thuốc mới và giả dược đều không có hiệu quả.",
      "Kết luận rằng thuốc mới hiệu quả hơn giả dược, trong khi thực tế nó không có hiệu quả.",
      "Không thể kết luận gì về hiệu quả của thuốc.",
      "Kết luận rằng thuốc mới không hiệu quả hơn giả dược, trong khi thực tế nó có hiệu quả."
    ],
    ans: 1,
    explain: "Lỗi loại I là bác bỏ Ho khi nó đúng (kết luận thuốc hiệu quả trong khi thực tế không)."
  },
  {
    q: "Khi thực hiện t-test độc lập để so sánh điểm trung bình về lo âu giữa sinh viên ngành tâm lý và sinh viên ngành kinh tế, nếu kích thước mẫu trong mỗi ngành là nhỏ (ví dụ, dưới 30) và giả định phân phối chuẩn bị vi phạm nghiêm trọng, điều gì sẽ xảy ra?",
    opts: [
      "Kiểm định t-test vẫn rất mạnh mẽ và không bị ảnh hưởng.",
      "Cần chuyển đổi dữ liệu thành biến định tính trước khi phân tích.",
      "Kết quả t-test có thể không đáng tin cậy, và p-value có thể bị sai lệch.",
      "Nên sử dụng kiểm định Chi-bình phương thay thế."
    ],
    ans: 2,
    explain: "Với mẫu nhỏ và vi phạm giả định chuẩn, t-test có thể không đáng tin cậy."
  },
  {
    q: "Một nhà tâm lý học lâm sàng muốn dự đoán mức độ giảm lo âu (thang điểm 0-100) dựa trên số buổi trị liệu đã tham gia và mức độ hỗ trợ xã hội của bệnh nhân. Biến phụ thuộc trong mô hình này là gì?",
    opts: [
      "Mức độ giảm lo âu.",
      "Số buổi trị liệu đã tham gia.",
      "Thời gian bệnh nhân mắc bệnh.",
      "Mức độ hỗ trợ xã hội của bệnh nhân."
    ],
    ans: 0,
    explain: "Biến phụ thuộc là kết quả cần dự đoán (mức độ giảm lo âu)."
  },
  {
    q: "Trong một mô hình hồi quy tuyến tính bội dự đoán thành công trong học tập, hệ số hồi quy chuẩn hóa (standardized regression coefficient) cho 'số giờ học mỗi tuần' là 0.55 và cho 'điểm kiểm tra động lực' là 0.30. Điều này có ý nghĩa gì?",
    opts: [
      "Số giờ học mỗi tuần là biến dự đoán quan trọng hơn (mạnh hơn) điểm động lực trong việc giải thích thành công trong học tập.",
      "Khi số giờ học tăng một đơn vị, thành công trong học tập tăng 0.55 đơn vị (giữ động lực không đổi).",
      "Cả hai biến đều không có ảnh hưởng đáng kể lên thành công trong học tập.",
      "Số giờ học mỗi tuần có ảnh hưởng gấp đôi điểm động lực lên thành công trong học tập."
    ],
    ans: 0,
    explain: "Hệ số chuẩn hóa lớn hơn cho thấy biến có ảnh hưởng mạnh hơn."
  },
  {
    q: "Khi kiểm tra giả định của hồi quy tuyến tính, một nhà nghiên cứu vẽ biểu đồ phần dư (residuals) so với các giá trị dự đoán. Nếu các phần dư cho thấy một mô hình hình quạt (fan-shaped), điều này cho thấy vi phạm giả định nào?",
    opts: [
      "Tính tuyến tính (Linearity).",
      "Tính độc lập của các phần dư.",
      "Phân phối chuẩn của phần dư.",
      "Tính đồng nhất phương sai (Homoscedasticity)."
    ],
    ans: 3,
    explain: "Hình quạt chỉ ra phương sai không đồng nhất (heteroscedasticity)."
  },
  {
    q: "Nếu một nhà nghiên cứu tiến hành một nghiên cứu tâm lý và đặt mức ý nghĩa (α) là 0.10, điều này có ý nghĩa gì về khả năng mắc lỗi loại I?",
    opts: [
      "Có 10% khả năng không bác bỏ giả thuyết không khi nó thực sự đúng.",
      "Có 10% rủi ro bác bỏ giả thuyết không khi nó thực sự đúng.",
      "Nghiên cứu có 10% sức mạnh thống kê.",
      "Có 10% khả năng mắc lỗi loại II."
    ],
    ans: 1,
    explain: "α = 0.10 nghĩa là 10% khả năng mắc lỗi loại I (bác bỏ Ho khi nó đúng)."
  },
  {
    q: "Một nhà tâm lý học đang xây dựng mô hình hồi quy để dự đoán điểm hài lòng cuộc sống từ các biến như thu nhập, mối quan hệ xã hội và sức khỏe thể chất. Nếu anh ta thêm biến 'số lượng thú cưng' vào mô hình, điều gì có thể xảy ra với R² và Adjusted R²?",
    opts: [
      "R² sẽ luôn tăng, và Adjusted R² cũng sẽ luôn tăng.",
      "Cả R² và Adjusted R² đều sẽ giảm.",
      "R² sẽ giảm, Adjusted R² sẽ tăng.",
      "R² sẽ tăng hoặc giữ nguyên, trong khi Adjusted R² có thể tăng, giảm hoặc giữ nguyên."
    ],
    ans: 3,
    explain: "Thêm biến luôn làm tăng hoặc giữ nguyên R², nhưng Adjusted R² có thể tăng/giảm tùy vào đóng góp của biến mới."
  },
  {
    q: "Một nhà nghiên cứu tâm lý học phát triển một thang đo mới về khả năng phục hồi (resilience) và muốn kiểm tra xem liệu một can thiệp mới có làm tăng khả năng phục hồi hay không. Sau khi tiến hành một thử nghiệm ngẫu nhiên có đối chứng, ông thu được p-value là 0.048 và một cỡ hiệu ứng Cohen's d là 0.15. Nếu alpha=0.05, kết luận nào sau đây là chính xác nhất?",
    opts: [
      "Can thiệp có ý nghĩa thống kê và hiệu quả thực tế lớn.",
      "Can thiệp không có ý nghĩa thống kê nhưng có hiệu quả thực tế lớn.",
      "Can thiệp có ý nghĩa thống kê, nhưng hiệu quả thực tế của nó rất nhỏ.",
      "Không thể rút ra kết luận nào về ý nghĩa thống kê hay thực tế từ dữ liệu này."
    ],
    ans: 2,
    explain: "P-value < 0.05 có ý nghĩa thống kê, nhưng d = 0.15 là hiệu ứng nhỏ."
  },
  {
    q: "Một nhà tâm lý học thực hiện một phân tích hồi quy tuyến tính bội và phát hiện đa cộng tuyến (multicollinearity) nghiêm trọng. Điều này sẽ ảnh hưởng đến mô hình như thế nào?",
    opts: [
      "Giảm giá trị R² tổng thể của mô hình.",
      "Làm tăng sai số chuẩn của các hệ số hồi quy, dẫn đến p-value lớn hơn và khoảng tin cậy rộng hơn cho các biến độc lập liên quan.",
      "Làm cho ước lượng hệ số hồi quy bị lệch (biased).",
      "Chỉ ảnh hưởng đến tính đồng nhất phương sai của phần dư."
    ],
    ans: 1,
    explain: "Đa cộng tuyến làm tăng sai số chuẩn của hệ số, giảm độ chính xác ước lượng."
  },
  {
    q: "Nếu một nhà tâm lý học quyết định giảm α từ 0.05 xuống 0.01 để giảm rủi ro Lỗi loại I, điều gì có khả năng xảy ra với sức mạnh thống kê của kiểm định?",
    opts: [
      "Sức mạnh thống kê sẽ tăng lên.",
      "Sức mạnh thống kê sẽ giảm xuống.",
      "Sức mạnh thống kê sẽ không thay đổi.",
      "Sức mạnh thống kê sẽ trở nên không liên quan."
    ],
    ans: 1,
    explain: "Giảm α làm tăng ngưỡng bác bỏ Ho, dẫn đến giảm power (khả năng phát hiện hiệu ứng thực)."
  },
  {
    q: "Một nhà quản lý giáo dục đã nhận được báo cáo từ tỉnh liệt kê thứ hạng của các trường học theo thành tích của học sinh. Thang đo nào được thể hiện trong báo cáo này?",
    opts: [
      "Thang đo tỉ lệ.",
      "Thang đo thứ bậc.",
      "Thang đo khoảng.",
      "Thang đo định danh."
    ],
    ans: 1,
    explain: "Thứ bậc: có thể so sánh thứ tự (ví dụ: xếp hạng)"
  },
  {
    q: "Trong một thí nghiệm so sánh các phản ứng hung hăng sau khi tiếp xúc với bạo lực trên phương tiện truyền thông trong chương trình truyền hình và trò chơi điện tử, “phản ứng hung hăng” là __________ và “tiếp xúc với bạo lực trên phương tiện truyền thông” là__________.",
    opts: [
      "Biến độc lập; biến phụ thuộc",
      "Biến phụ thuộc; biến độc lập",
      "Biến kiểm soát; biến phụ thuộc",
      "Biến độc lập; biến nhân khẩu"
    ],
    ans: 1,
    explain: "Phản ứng hung hăng là biến phụ thuộc (đo lường kết quả), tiếp xúc với bạo lực là biến độc lập (nguyên nhân)."
  },
  {
    p: "Năm đứa trẻ được yêu cầu chọn màu sắc yêu thích của chúng bên dưới. Yếu vị trong chuỗi [Hồng, hồng, xanh, hồng, hồng] này là gì?",
    opts: [
      "Hồng",
      "Xanh",
      "Không có yếu vị",
      "Không thể xác định"
    ],
    ans: 0,
    explain: "Yếu vị là giá trị xuất hiện nhiều nhất trong tập dữ liệu. Trong trường hợp này, 'Hồng' xuất hiện 4 lần, nhiều hơn bất kỳ màu nào khác."
  },
  {
    q: "Một nhóm gồm 20 học sinh được lựa chọn ngẫu nhiên tham gia một khoá học Yoga kéo dài 3 tuần. Mục tiêu của nghiên cứu này nhằm so sánh phong cách sống lành mạnh (wellness life style) của nhóm có tham gia khoá học yoga và một nhóm khác không tham gia khoá học yoga. Loại kiểm định thống kê nào sẽ phù hợp để kiểm tra mục tiêu này? Biết rằng phong cách sống lành mạnh được nghiệm thể trả lời câu hỏi tự đánh giá theo mức độ từ 1 đến 10.",
    opts: [
      "Kiểm định t-test độc lập (Independent Samples t-test)",
      "Kiểm định t-test cặp (Paired Samples t-test)",
      "ANOVA một chiều (One-Way ANOVA)",
      "Kiểm định Chi-bình phương (Chi-Square Test)"
    ],
    ans: 0,
    explain: "T-test độc lập phù hợp để so sánh hai nhóm khác nhau về phong cách sống lành mạnh."
  },
  {
    q: "Các biểu đồ histogram dưới đây hiển thị phân phối mức tiêu thụ rượu ở những bệnh nhân được chẩn đoán mắc bệnh gan do rượu tại thời điểm trước (xem Before) và sau (xem After) khi tiếp nhận can thiệp. Một biểu đồ histogram về sự khác biệt (Before trừ After) (xem Difference) cũng được trình bày.<br> <img src='img/img_q_1.png' alt='Histogram of Alcohol Consumption Before and After Intervention' style='width: 400px; height: auto;'><br> Nếu bạn quan tâm đến việc kiểm tra xem có sự thay đổi đáng kể nào trong mức tiêu thụ rượu trước và sau can thiệp hay không, bạn sẽ sử dụng?",
    opts: [
      "One sample t-test do biểu đồ “Before” đạt phân phối chuẩn",
      "Independent samples t-test do biểu đồ “Before” đạt phân phối chuẩn",
      "Paired samples t-test do biểu đồ “Difference” đạt phân phối chuẩn",
      "Không có kiểm định nào phù hợp do biểu đồ “After” không đạt phân phối chuẩn"
    ],
    ans: 2,
    explain: "Để kiểm tra sự thay đổi trước và sau can thiệp, paired samples t-test là phù hợp nhất vì nó so sánh hai nhóm liên quan (trước và sau) và biểu đồ 'Difference' đạt phân phối chuẩn.",
  },
  {
    q: "Tính điểm trung bình trong chuỗi dưới đây: 10, 10, 40, 30, 10",
    opts: [
      "10",
      "20",
      "30",
      "40"
    ],
    ans: 1,
    explain: "Điểm trung bình được tính bằng tổng các giá trị chia cho số lượng giá trị. (10 + 10 + 40 + 30 + 10) / 5 = 20."
  },
  {
    q: "Tính số trung vị trong chuỗi dưới đây: 13, 12, 11, 15, 22}",
    opts: [
      "12",
      "13",
      "15",
      "11"
    ],
    ans: 1,
    explain: "Sắp xếp chuỗi theo thứ tự tăng dần: 11, 12, 13, 15, 22. Số trung vị là giá trị ở giữa, tức là 13."
  },
  {
    q: "Trong một nghiên cứu về ảnh hưởng của việc uống cà phê lên chất lượng giấc ngủ, đâu là biến độc lập?",
    opts: [
      "Số giờ ngủ mỗi đêm",
      "Chất lượng giấc ngủ",
      "Lượng cà phê uống mỗi ngày",
      "Tâm trạng buổi sáng"
    ],
    ans: 2,
    explain: "Biến độc lập là lượng cà phê uống mỗi ngày vì đây là yếu tố mà nhà nghiên cứu muốn kiểm soát hoặc thay đổi để xem ảnh hưởng lên các biến khác."
  },
  {
    q: "Trong nghiên cứu xem việc luyện tập thể dục ảnh hưởng đến cân nặng như thế nào, biến phụ thuộc là gì?",
    opts: [
      "Thời gian luyện tập mỗi ngày",
      "Cân nặng của người tham gia",
      "Độ tuổi của người tham gia",
      "Thói quen ăn uống"
    ],
    ans: 1,
    explain: "Biến phụ thuộc là cân nặng vì nó thay đổi theo mức độ luyện tập, và là kết quả mà nhà nghiên cứu muốn đo."
  },
  {
    q: "Nếu nghiên cứu xem tác động của âm nhạc đến điểm kiểm tra, biến độc lập là gì?",
    opts: [
      "Điểm kiểm tra sau khi nghe nhạc",
      "Loại nhạc được nghe",
      "Thời gian làm bài kiểm tra",
      "Số lượng câu hỏi trong bài"
    ],
    ans: 1,
    explain: "Loại nhạc được nghe là biến độc lập vì đây là yếu tố được thay đổi để xem ảnh hưởng đến điểm kiểm tra."
  },
  {
    q: "Trong một thí nghiệm, nhà khoa học điều chỉnh ánh sáng trong phòng để xem ảnh hưởng đến tốc độ đọc, biến phụ thuộc là gì?",
    opts: [
      "Độ sáng của phòng",
      "Tốc độ đọc của người tham gia",
      "Số trang sách",
      "Loại sách được đọc"
    ],
    ans: 1,
    explain: "Tốc độ đọc là biến phụ thuộc vì nó là kết quả bị ảnh hưởng bởi mức độ sáng trong phòng."
  },
  {
    q: "Một nghiên cứu xem xét ảnh hưởng của loại phân bón lên năng suất cây trồng. Biến độc lập là gì?",
    opts: [
      "Loại phân bón sử dụng",
      "Năng suất cây trồng",
      "Diện tích ruộng",
      "Lượng nước tưới"
    ],
    ans: 0,
    explain: "Loại phân bón là biến độc lập vì đây là yếu tố mà nhà nghiên cứu chủ động thay đổi."
  },
  {
    q: "Trong nghiên cứu kiểm tra mối quan hệ giữa số giờ học và điểm thi, đâu là biến phụ thuộc?",
    opts: [
      "Số giờ học mỗi tuần",
      "Điểm thi cuối kỳ",
      "Tên môn học",
      "Tuổi học sinh"
    ],
    ans: 1,
    explain: "Điểm thi cuối kỳ là biến phụ thuộc vì nó thay đổi tùy theo số giờ học."
  },
  {
    q: "Nếu muốn kiểm tra ảnh hưởng của chế độ ăn đến mức cholesterol, biến độc lập là?",
    opts: [
      "Mức cholesterol trong máu",
      "Chế độ ăn áp dụng",
      "Giới tính người tham gia",
      "Tuổi người tham gia"
    ],
    ans: 1,
    explain: "Chế độ ăn là biến độc lập vì đó là yếu tố được thay đổi để kiểm tra ảnh hưởng đến cholesterol."
  },
  {
    q: "Trong thí nghiệm dùng hai loại thuốc khác nhau để giảm đau, biến phụ thuộc là?",
    opts: [
      "Loại thuốc sử dụng",
      "Liều lượng thuốc",
      "Mức độ giảm đau đo được",
      "Thời gian dùng thuốc"
    ],
    ans: 2,
    explain: "Mức độ giảm đau đo được là biến phụ thuộc, vì đó là kết quả nhà nghiên cứu muốn đo."
  },
  {
    q: "Một nhà nghiên cứu thay đổi nhiệt độ phòng để xem ảnh hưởng đến mức độ tỉnh táo của sinh viên. Biến độc lập là?",
    opts: [
      "Nhiệt độ phòng",
      "Mức độ tỉnh táo",
      "Số lượng sinh viên",
      "Giờ trong ngày"
    ],
    ans: 0,
    explain: "Nhiệt độ phòng là biến độc lập vì được chủ động điều chỉnh để xem ảnh hưởng đến tỉnh táo."
  },
  {
    q: "Khi nghiên cứu tác động của stress đến huyết áp, biến phụ thuộc là gì?",
    opts: [
      "Mức độ stress",
      "Mức huyết áp đo được",
      "Số lần đo huyết áp",
      "Thời gian làm việc"
    ],
    ans: 1,
    explain: "Mức huyết áp đo được là biến phụ thuộc vì nó thay đổi dựa trên mức độ stress."
  }
];
