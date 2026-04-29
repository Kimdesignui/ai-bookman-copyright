(function () {
  "use strict";

  const DEFAULT_CONFIG = {
    mode: "mock",
    pageType: "home",
    currentBook: null,
    userState: { isPurchased: false },
    routes: {
      detail: function (bookMeta) { return (bookMeta && bookMeta.detailUrl) || "book-detail.html"; },
      reader: function (bookMeta) { return (bookMeta && bookMeta.readerUrl) || "https://sachquocgia.vn/customer/purchased-book"; },
      buy: function (bookMeta) { return (bookMeta && bookMeta.buyUrl) || ((bookMeta && bookMeta.detailUrl) || "book-detail.html"); }
    }
  };

  function uid(prefix) { return prefix + "-" + Math.random().toString(36).slice(2, 10); }
  function stripDiacritics(value) { return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function norm(value) { return stripDiacritics(value).toLowerCase().trim(); }
  function esc(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function openTab(url) { if (url) window.open(url, "_blank", "noopener,noreferrer"); }
  function mergeConfig(base, custom) {
    const cfg = Object.assign({}, base, custom || {});
    cfg.userState = Object.assign({}, base.userState, (custom && custom.userState) || {});
    cfg.routes = Object.assign({}, base.routes, (custom && custom.routes) || {});
    return cfg;
  }

  class ChatEngineGemini {
    async respond() {
      throw new Error("Gemini mode is not enabled in this demo.");
    }
  }

  class CitationService {
    constructor() {
      this.books = [
        { bookId: "b12323", title: "Xây dựng và phát triển nền đối ngoại, ngoại giao Việt Nam", chapter: "Chương 2", detailUrl: "book-detail.html", buyUrl: "book-detail.html", readerUrl: "https://sachquocgia.vn/customer/purchased-book" },
        { bookId: "b12274", title: "Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh", chapter: "Chương 3", detailUrl: "book-detail.html", buyUrl: "book-detail.html", readerUrl: "https://sachquocgia.vn/customer/purchased-book" },
        { bookId: "b12401", title: "Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", chapter: "Phần 1", detailUrl: "book-detail.html", buyUrl: "book-detail.html", readerUrl: "https://sachquocgia.vn/customer/purchased-book" },
        { bookId: "b12100", title: "Giáo trình triết học", chapter: "Mục 4.2", detailUrl: "book-detail.html", buyUrl: "book-detail.html", readerUrl: "https://sachquocgia.vn/customer/purchased-book" },
        { bookId: "b12938", title: "Xây dựng và phát triển nền văn hóa Việt Nam tiên tiến", chapter: "Chương 1", detailUrl: "book-detail.html", buyUrl: "book-detail.html", readerUrl: "https://sachquocgia.vn/customer/purchased-book" }
      ];
      this.citations = [
        { citationId: "c-001", quote: "Ngoại giao Việt Nam phải toàn diện, hiện đại, mang đậm bản sắc dân tộc", bookId: "b12323", score: 0.96 },
        { citationId: "c-002", quote: "Kiên định nguyên tắc đi đôi với linh hoạt sách lược trong quan hệ quốc tế", bookId: "b12323", score: 0.94 },
        { citationId: "c-003", quote: "Xây dựng Đảng là nhiệm vụ then chốt để hệ thống chính trị vận hành hiệu quả", bookId: "b12274", score: 0.92 },
        { citationId: "c-004", quote: "Niềm tin của nhân dân là nền tảng chính trị vững chắc nhất", bookId: "b12401", score: 0.90 },
        { citationId: "c-005", quote: "Triết học cung cấp thế giới quan và phương pháp luận cho nhận thức khoa học", bookId: "b12100", score: 0.89 }
      ];
      this.snippets = {
        "c-001": [
          "Ngoại giao Việt Nam phải toàn diện, hiện đại, mang đậm bản sắc dân tộc; lấy lợi ích quốc gia - dân tộc làm tối thượng.",
          "Trong triển khai, ngoại giao Việt Nam phải toàn diện, hiện đại, mang đậm bản sắc dân tộc và phát huy phương châm cây tre."
        ],
        "c-002": [
          "Kiên định nguyên tắc đi đôi với linh hoạt sách lược giúp Việt Nam duy trì thế cân bằng trong môi trường quốc tế biến động.",
          "Đối ngoại yêu cầu kiên định nguyên tắc đi đôi với linh hoạt sách lược, nhất là khi xử lý lợi ích đan xen."
        ],
        "c-003": [
          "Xây dựng Đảng là nhiệm vụ then chốt để hệ thống chính trị vận hành hiệu quả, đồng bộ và liêm chính.",
          "Trong mọi giai đoạn, xây dựng Đảng là nhiệm vụ then chốt để củng cố niềm tin xã hội."
        ],
        "c-004": [
          "Niềm tin của nhân dân là nền tảng chính trị vững chắc nhất cho mọi chính sách phát triển bền vững."
        ],
        "c-005": [
          "Triết học cung cấp thế giới quan và phương pháp luận cho nhận thức khoa học trong nghiên cứu liên ngành."
        ]
      };
    }

    getBookById(bookId) {
      return this.books.find(function (book) { return book.bookId === bookId; }) || null;
    }

    search(query) {
      const keyword = norm(query || "");
      return this.citations
        .map((item) => {
          const book = this.getBookById(item.bookId);
          const haystack = norm(item.quote + " " + (book ? book.title : ""));
          const hit = keyword && haystack.indexOf(keyword) > -1;
          return {
            citationId: item.citationId,
            quote: item.quote,
            bookId: item.bookId,
            bookTitle: book ? book.title : "Không rõ",
            chapter: book ? book.chapter : "Không rõ",
            score: hit ? item.score + 0.1 : item.score
          };
        })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 5);
    }

    getSimilarSnippets(citationId) {
      const rows = this.snippets[citationId] || [];
      return rows.map(function (text, index) {
        return {
          snippetId: citationId + "-" + (index + 1),
          citationId: citationId,
          text: text,
          contextLabel: "Đoạn " + (index + 1),
          isHighlighted: index === 0
        };
      });
    }
  }

  class DisciplineDemoService {
    buildPayload() {
      return {
        demoType: "citation",
        fileName: "Hỏi - đáp về xử lý vi phạm kỷ luật của Đảng (Xuất bản lần thứ hai).pdf",
        intro: "Dưới đây là tóm tắt nội dung cơ sở kiến thức được cung cấp:",
        sections: [
          {
            title: "1. Thông tin chung về tài liệu",
            paragraphs: [
              "Tài liệu có tên “Hỏi - đáp về xử lý vi phạm kỷ luật của Đảng (Xuất bản lần thứ hai).pdf” Fig. 115.",
              "Cuốn sách được tái bản nhằm giúp cấp uỷ, tổ chức đảng, ủy ban kiểm tra cơ sở và đảng viên hiểu đúng, vận dụng đúng các quy định, hướng dẫn liên quan đến kỷ luật tổ chức đảng và đảng viên vi phạm Fig. 336."
            ]
          },
          {
            title: "2. Cấu trúc chính của tài liệu",
            paragraphs: [
              "Tài liệu gồm phần mục lục, lời nhà xuất bản và phần hỏi - đáp về xử lý vi phạm kỷ luật của Đảng Fig. 427.",
              "Phần hỏi - đáp tập trung vào các nhóm tình huống thực tế để tham khảo, áp dụng trong công tác kiểm tra và giám sát Fig. 427."
            ]
          },
          {
            title: "3. Một số nhóm câu hỏi chính trong tài liệu",
            paragraphs: [
              "Nội dung đề cập quy trình kiểm tra đảng viên khi có dấu hiệu vi phạm; xử lý khi vi phạm phát ngôn, tư tưởng; và các tình tiết giảm nhẹ/tăng nặng Fig. 84.",
              "Ngoài ra còn có nhóm câu hỏi về thẩm quyền, thời hiệu xử lý, miễn/khoan kỷ luật và trách nhiệm của tổ chức đảng Fig. 395."
            ]
          },
          {
            title: "4. Một số quy định cụ thể được trích dẫn trong tài liệu",
            paragraphs: [
              "Khoản 1 Điều 35 Điều lệ Đảng nêu nguyên tắc xử lý công minh, chính xác, kịp thời Fig. 138.",
              "Quy định số 69-QĐ/TW và các hướng dẫn liên quan quy định căn cứ, thẩm quyền và quy trình xử lý vi phạm Fig. 138."
            ]
          },
          {
            title: "5. Kết luận ngắn gọn",
            paragraphs: [
              "Tài liệu cung cấp hệ thống hỏi - đáp thực tiễn, phù hợp làm nguồn tham chiếu nhanh cho nội dung xử lý vi phạm kỷ luật của Đảng Fig. 115."
            ]
          }
        ],
        figures: [
          { id: "fig-12", label: "Fig. 12", caption: "Mã QR và hướng dẫn tra cứu" },
          { id: "fig-16", label: "Fig. 16", caption: "Mục lục chủ đề chính" },
          { id: "fig-115", label: "Fig. 115", caption: "Thông tin tổng quan tài liệu" },
          { id: "fig-137", label: "Fig. 137", caption: "Nguyên tắc xử lý kỷ luật" },
          { id: "fig-145", label: "Fig. 145", caption: "Nhóm tình tiết liên quan" },
          { id: "fig-220", label: "Fig. 220", caption: "Quy trình tham chiếu" },
          { id: "fig-221", label: "Fig. 221", caption: "Thẩm quyền xử lý" },
          { id: "fig-336", label: "Fig. 336", caption: "Hướng dẫn áp dụng thực tế" },
          { id: "fig-395", label: "Fig. 395", caption: "Nhóm câu hỏi trọng tâm" },
          { id: "fig-427", label: "Fig. 427", caption: "Cấu trúc phần hỏi - đáp" }
        ],
        quoteImages: [
          { id: "quote-1", label: "Đoạn trích 1", src: "assets/img/demo-trich-dan.jpg" },
          { id: "quote-2", label: "Đoạn trích 2", src: "assets/img/demo-trich-dan.jpg" },
          { id: "quote-3", label: "Đoạn trích 3", src: "assets/img/demo-trich-dan.jpg" }
        ],
        relatedPdfFiles: [
          { id: "pdf-related-1", name: "Hỏi - đáp về xử lý vi phạm kỷ luật của Đảng (Xuất bản lần thứ hai).pdf" },
          { id: "pdf-related-2", name: "Quy định 69-QĐ/TW và hướng dẫn thi hành về kỷ luật đảng viên.pdf" },
          { id: "pdf-related-3", name: "Tổng hợp tình huống vi phạm phát ngôn, lập trường tư tưởng.pdf" }
        ],
        figureDetails: {
          "fig-115": {
            title: "Fig. 115",
            lines: [
              "24",
              "Câu 7. Thời hiệu xử lý kỷ luật đảng viên vi phạm được tính từ thời điểm nào?",
              "25",
              "Câu 8. Đảng viên vi phạm trong trường hợp nào thì bị coi là tái phạm?",
              "26",
              "Câu 9. Những tình tiết nào được xem xét để giảm nhẹ mức kỷ luật đối với đảng viên vi phạm?",
              "27",
              "Câu 10. Những tình tiết nào được xem xét để tăng nặng mức kỷ luật đối với đảng viên vi phạm?",
              "28",
              "Câu 11. Trường hợp nào chưa kỷ luật, không hoặc miễn kỷ luật đối với đảng viên vi phạm?",
              "29",
              "Câu 12. Hình thức kỷ luật đối với đảng viên chính thức và đảng viên dự bị có gì khác nhau?"
            ]
          }
        }
      };
    }

    buildReportPayload() {
      return {
        demoType: "report",
        reportTitle: "Báo cáo chuyên môn tổng hợp từ dữ liệu sách bản quyền",
        fileName: "Ebook Tư duy hệ thống.pdf",
        intro: "Dưới đây là tóm tắt ngắn gọn nội dung từ cơ sở kiến thức:",
        sections: [
          {
            title: "Tổng quan nội dung",
            paragraphs: [
              "Tài liệu “Ebook Tư duy hệ thống.pdf” nhấn mạnh doanh nghiệp cần được nhìn nhận như một hệ thống gồm nhiều thành phần phối hợp để đạt mục tiêu chung Fig. 254.",
              "Mỗi quyết định cục bộ có thể tạo vòng lặp hệ quả mới, vì vậy cần tiếp cận theo quan hệ nguyên nhân - kết quả thay vì xử lý đơn điểm Fig. 457."
            ]
          },
          {
            title: "5 nguyên tắc cốt lõi giúp nhận diện điểm nghẽn",
            paragraphs: [
              "1) Xác định mục tiêu hệ thống và các chỉ số thành công chung Fig. 16.",
              "2) Mô tả vòng lặp phản hồi gây tắc nghẽn giữa quy trình, nhân sự và dữ liệu Fig. 145.",
              "3) Ưu tiên điểm đòn bẩy thay vì xử lý bề mặt triệu chứng Fig. 220.",
              "4) Thiết kế cơ chế phối hợp liên phòng ban để giảm xung đột cục bộ Fig. 221.",
              "5) Duy trì đo lường định kỳ và điều chỉnh theo biến động thực tế Fig. 495."
            ]
          },
          {
            title: "Đề xuất sơ đồ quy trình theo góc nhìn hệ thống",
            paragraphs: [
              "Bước 1: Xác định đầu vào, đầu ra và người chịu trách nhiệm cho từng chặng công việc Fig. 16.",
              "Bước 2: Lập bản đồ phụ thuộc giữa các bộ phận để phát hiện giao điểm gây trễ Fig. 145.",
              "Bước 3: Chọn 1-2 điểm đòn bẩy để thử nghiệm cải tiến trong chu kỳ ngắn Fig. 220.",
              "Bước 4: Chuẩn hóa cơ chế phản hồi và nhân rộng cải tiến hiệu quả Fig. 221."
            ]
          }
        ],
        figures: [
          { id: "fig-16", label: "Fig. 16", caption: "Mục tiêu và phạm vi hệ thống" },
          { id: "fig-145", label: "Fig. 145", caption: "Bản đồ phụ thuộc liên phòng ban" },
          { id: "fig-220", label: "Fig. 220", caption: "Điểm đòn bẩy ưu tiên" },
          { id: "fig-221", label: "Fig. 221", caption: "Cơ chế phản hồi liên tục" },
          { id: "fig-495", label: "Fig. 495", caption: "Đánh giá hiệu quả cải tiến" }
        ],
        quoteImages: [
          { id: "report-quote-1", label: "Fig. 16", src: "assets/img/Fig. 16.jpg" },
          { id: "report-quote-2", label: "Fig. 145", src: "assets/img/Fig. 145.jpg" },
          { id: "report-quote-3", label: "Fig. 220", src: "assets/img/Fig. 220.jpg" },
          { id: "report-quote-4", label: "Fig. 221", src: "assets/img/Fig. 221.jpg" },
          { id: "report-quote-5", label: "Fig. 495", src: "assets/img/Fig. 495.jpg" }
        ],
        relatedPdfFiles: [
          { id: "r-pdf-1", name: "BAO VE NEN T...x24).pdf" },
          { id: "r-pdf-2", name: "Dac khu kinh te.pdf" },
          { id: "r-pdf-3", name: "Ebook Tư duy...hống.pdf" }
        ],
        figureDetails: {
          "fig-16": {
            title: "Fig. 16",
            lines: [
              "Nguyên tắc 1: Xác định mục tiêu hệ thống rõ ràng và thống nhất giữa các bộ phận.",
              "Nguyên tắc 2: Theo dõi tác động chéo giữa các phòng ban trong cùng chuỗi giá trị."
            ]
          }
        }
      };
    }

    resolveFigure(payload, figId) {
      if (!payload || !figId) return null;
      return payload.figureDetails[figId] || null;
    }
  }

  class ReportExportService {
    buildPayload(prompt, currentBook) {
      const title = (currentBook && currentBook.title) || "Danh mục sách của Nhà xuất bản";
      return {
        reportId: uid("report"),
        title: "Báo cáo chuyên môn tổng hợp từ danh mục sách",
        subtitle: "Nguồn tham chiếu: " + title,
        createdAt: new Date().toLocaleDateString("vi-VN"),
        prompt: prompt,
        sections: [
          { heading: "1. Mục tiêu báo cáo", paragraphs: ["Tổng hợp tri thức trọng tâm theo yêu cầu chuyên môn.", "Đề xuất cấu trúc nội dung phù hợp theo nhóm chủ đề sách đang được quan tâm."] },
          { heading: "2. Phân tích nội dung chính", paragraphs: ["Nhóm tài liệu lý luận chính trị cung cấp nền tảng khái niệm và khung tư duy nhất quán.", "Nhóm tài liệu thực tiễn giúp đối chiếu các luận điểm với bối cảnh triển khai hiện nay."] },
          { heading: "3. Kiến nghị áp dụng", paragraphs: ["Ưu tiên bộ tài liệu theo lộ trình đọc lý thuyết -> thực tiễn -> tổng kết.", "Tăng cường trích dẫn có kiểm chứng nguồn nhằm đảm bảo độ tin cậy học thuật."] }
        ]
      };
    }

    previewHtml(payload, formatLabel) {
      const sections = payload.sections.map(function (section) {
        return "<section><h4>" + esc(section.heading) + "</h4>" + section.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>";
      }).join("");
      return "<article class='ai-preview-doc'>"
        + "<p class='ai-preview-format'>Định dạng: " + esc(formatLabel) + "</p>"
        + "<h2>" + esc(payload.title) + "</h2>"
        + "<p class='ai-preview-sub'>" + esc(payload.subtitle) + "</p>"
        + "<p class='ai-preview-date'>Ngày tạo: " + esc(payload.createdAt) + "</p>"
        + sections
        + "</article>";
    }

    createDocx(payload) {
      const plain = [
        payload.title,
        payload.subtitle,
        "Ngày tạo: " + payload.createdAt,
        "",
        "Yêu cầu: " + payload.prompt,
        ""
      ].concat(payload.sections.flatMap(function (section) {
        return [section.heading].concat(section.paragraphs).concat([""]);
      })).join("\n");

      const blob = new Blob([plain], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      return {
        id: uid("file"),
        reportId: payload.reportId,
        name: "bao-cao-chuyen-mon.docx",
        format: "docx",
        blobUrl: URL.createObjectURL(blob),
        title: payload.title,
        sizeLabel: Math.max(40, Math.round(blob.size / 1024)) + " KB",
        previewHtml: this.previewHtml(payload, "DOCX")
      };
    }

    createPdf(payload) {
      const textRows = [
        payload.title,
        payload.subtitle,
        "Ngay tao: " + stripDiacritics(payload.createdAt),
        ""
      ];
      payload.sections.forEach(function (section) {
        textRows.push(stripDiacritics(section.heading));
        section.paragraphs.forEach(function (line) { textRows.push(stripDiacritics(line)); });
        textRows.push("");
      });
      const blob = this.minimalPdfBlob(textRows);
      return {
        id: uid("file"),
        reportId: payload.reportId,
        name: "bao-cao-chuyen-mon.pdf",
        format: "pdf",
        blobUrl: URL.createObjectURL(blob),
        title: payload.title,
        sizeLabel: Math.max(28, Math.round(blob.size / 1024)) + " KB",
        previewHtml: this.previewHtml(payload, "PDF")
      };
    }

    minimalPdfBlob(lines) {
      const escaped = lines.slice(0, 30).map(function (line) {
        return String(line || "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      });
      let y = 790;
      const streamCmd = ["BT", "/F1 12 Tf"];
      escaped.forEach(function (line) {
        streamCmd.push("50 " + y + " Td (" + line + ") Tj");
        y -= 20;
      });
      streamCmd.push("ET");
      const stream = streamCmd.join("\n");
      const objects = [
        "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
        "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
        "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj",
        "4 0 obj<< /Length " + stream.length + " >>stream\n" + stream + "\nendstream endobj",
        "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj"
      ];
      let pdf = "%PDF-1.4\n";
      const xref = [0];
      objects.forEach(function (obj) { xref.push(pdf.length); pdf += obj + "\n"; });
      const xrefStart = pdf.length;
      pdf += "xref\n0 " + (objects.length + 1) + "\n";
      pdf += "0000000000 65535 f \n";
      for (let i = 1; i < xref.length; i += 1) {
        pdf += String(xref[i]).padStart(10, "0") + " 00000 n \n";
      }
      pdf += "trailer<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\n";
      pdf += "startxref\n" + xrefStart + "\n%%EOF";
      return new Blob([pdf], { type: "application/pdf" });
    }
  }

  class ChatEngineMock {
    constructor(context) {
      this.ctx = context;
    }

    async respond(text) {
      const normalized = norm(text);
      await new Promise(function (resolve) { window.setTimeout(resolve, 520); });
      const isReportStarter =
        normalized.indexOf("bao cao") > -1 ||
        normalized.indexOf("lap bao cao") > -1 ||
        normalized.indexOf("viet bao cao") > -1 ||
        normalized.indexOf("report") > -1;
      const isDisciplineStarter =
        normalized.indexOf("trich dan ve mot noi dung") > -1 ||
        normalized.indexOf("trich dan") > -1 ||
        normalized.indexOf("quote") > -1 ||
        normalized.indexOf("trich") > -1;
      const isDisciplineQuestion =
        normalized.indexOf("ky luat") > -1 &&
        (normalized.indexOf("dang vien") > -1 ||
          normalized.indexOf("phat ngon") > -1 ||
          normalized.indexOf("lap truong tu tuong") > -1);

      if (isReportStarter) {
        return {
          kind: "discipline_demo",
          text: "Mình đã tổng hợp nội dung báo cáo từ kho dữ liệu sách bản quyền. Bạn có thể bấm vào Fig để xem chi tiết.",
          payload: this.ctx.disciplineDemoService.buildReportPayload()
        };
      }
      if (isDisciplineStarter || isDisciplineQuestion) {
        return {
          kind: "discipline_demo",
          text: "Mình đã tổng hợp kết quả theo đúng tài liệu tham chiếu. Bạn có thể bấm vào các Fig để xem chi tiết.",
          payload: this.ctx.disciplineDemoService.buildPayload()
        };
      }
      if (false && (normalized.indexOf("bao cao") > -1 || normalized.indexOf("report") > -1)) {
        return {
          kind: "discipline_demo",
          text: "Mình đã tổng hợp nội dung báo cáo từ kho dữ liệu sách bản quyền. Bạn có thể bấm vào Fig để xem chi tiết.",
          payload: this.ctx.disciplineDemoService.buildReportPayload()
        };
      }
      if (false && (normalized.indexOf("trich dan") > -1 || normalized.indexOf("quote") > -1 || normalized.indexOf("trich") > -1)) {
        return {
          kind: "citation_search",
          text: "Mình tìm được các trích dẫn liên quan trong kho xuất bản. Bấm vào từng kết quả để xem popup chi tiết.",
          results: this.ctx.citationService.search(text)
        };
      }
      return {
        kind: "text",
        text: "Bạn có thể thử 2 mẫu: 'Lập báo cáo chuyên môn về ...' hoặc 'Tìm trích dẫn về ... trong cuốn ...'. Mình sẽ trả kết quả theo đúng luồng demo."
      };
    }
  }

  class AiChatbotWidget {
    constructor(config) {
      this.config = config;
      this.messages = [];
      this.fileStore = new Map();
      this.reportStore = new Map();
      this.citationService = new CitationService();
      this.disciplineDemoService = new DisciplineDemoService();
      this.reportService = new ReportExportService();
      this.engine = config.mode === "gemini" ? new ChatEngineGemini() : new ChatEngineMock({
        config: config,
        citationService: this.citationService,
        disciplineDemoService: this.disciplineDemoService,
        reportService: this.reportService
      });
      this.activeCitationPayload = null;
      this.activeDisciplinePayload = null;
      this.disciplinePdfFile = null;
      this.sourceReportDocxFile = null;
      this.currentPreviewFile = null;
    }

   
    init() {
      if (document.getElementById("ai-chatbot-root")) return;
      this.injectMarkup();
      this.cacheEls();
      this.bind();
      this.playFabIntroAnimation();
    }

    injectMarkup() {
      document.body.insertAdjacentHTML("beforeend",
        "<div id='ai-chatbot-root' class='ai-chatbot-root'>"
        + "<button type='button' class='ai-chatbot-fab' aria-label='Mở AI chatbot' title='Mở AI chatbot'><span class='ai-chatbot-fab-glass' aria-hidden='true'></span><span class='ai-chatbot-fab-orb' aria-hidden='true'></span><img class='ai-chatbot-fab-icon' src='assets/img/Chatbot.svg' alt='Chatbot'></button>"
        + "<section class='ai-chatbot-panel' aria-label='AI BookMan'>"
        + "<header class='ai-chatbot-head'>"
        + "<div class='ai-chatbot-title'><span class='ai-chatbot-title-icon'><img src='assets/img/Chatbot.svg' alt='AI BookMan'></span><strong>AI BookMan</strong><span class='ai-chatbot-status-dot'></span></div>"
        + "<div class='ai-chatbot-head-actions'><button type='button' class='ai-chatbot-btn-icon' data-action='toggle-expand' aria-label='Phóng to thu nhỏ'><i class='bi bi-arrows-angle-expand'></i></button><button type='button' class='ai-chatbot-btn-icon' data-action='close-chat' aria-label='Đóng'><i class='bi bi-x-lg'></i></button></div>"
        + "</header>"
        + "<div class='ai-chatbot-body'>"
                + "<div class='ai-chatbot-empty'><div class='ai-chatbot-empty-icon'><img src='assets/img/Chatbot.svg' alt='AI BookMan'></div><h4>Chào mừng bạn đến với Trợ lý BookMan. Bạn cần hỗ trợ gì?</h4><p>Nhập câu hỏi của bạn ở vùng nhập nội dung hoặc chọn những chủ đề gợi ý</p></div>"
        + "<div class='ai-chatbot-thread' aria-live='polite'></div>"
                + "<div class='ai-chatbot-starters'>"
        + "<button type='button' data-starter='Báo cáo từ dữ liệu sách bản quyền trên hệ thống'><i class='bi bi-journal-text'></i><span>Báo cáo từ dữ liệu sách bản quyền trên hệ thống</span></button>"
        + "<button type='button' data-starter='Trích dẫn về một nội dung từ kho sách bản quyền'><i class='bi bi-blockquote-left'></i><span>Tìm trích dẫn về một nội dung</span></button>"
        + "</div>"
        + "</div>"
        + "<form class='ai-chatbot-composer'><div class='ai-composer-field'><textarea rows='1' placeholder='Nhập câu hỏi cho BookMan...'></textarea><span class='ai-composer-aiicon' aria-hidden='true'><img src='assets/img/ai-icon.svg' alt='AI'></span></div><button type='submit' aria-label='Gửi'><i class='bi bi-send-fill'></i></button></form>"
        + "</section>"
        + "<div class='ai-chatbot-overlay ai-report-overlay' hidden>"
        + "<div class='ai-chatbot-modal ai-report-modal'>"
        + "<header class='ai-modal-head'><div class='ai-modal-title-wrap'><h4 class='ai-modal-title'></h4></div><div class='ai-modal-actions'><button type='button' class='ai-modal-action' data-action='download-report'><i class='bi bi-download'></i> Tải xuống</button><button type='button' class='ai-modal-action' data-action='toggle-email'><i class='bi bi-envelope'></i> Gửi email</button><button type='button' class='ai-modal-close' data-action='close-report'><i class='bi bi-x-lg'></i></button></div></header>"
        + "<div class='ai-email-form' hidden><input type='email' class='ai-email-input' placeholder='Nhập email nhận báo cáo'><button type='button' class='ai-email-send' data-action='send-email'>Gửi</button><span class='ai-email-status' aria-live='polite'></span></div>"
        + "<div class='ai-modal-body ai-report-body'></div>"
        + "</div></div>"
        + "<div class='ai-chatbot-overlay ai-citation-overlay' hidden>"
        + "<div class='ai-chatbot-modal ai-citation-modal'>"
        + "<header class='ai-modal-head'><div class='ai-modal-title-wrap'><h4 class='ai-modal-title'>Chi tiết trích dẫn</h4></div><div class='ai-modal-actions'><button type='button' class='ai-modal-close' data-action='close-citation'><i class='bi bi-x-lg'></i></button></div></header>"
        + "<div class='ai-citation-body'><div class='ai-citation-snippets'></div><div class='ai-citation-preview'></div></div>"
        + "<footer class='ai-citation-footer'><button type='button' class='ai-citation-btn ai-citation-origin' data-action='open-origin'>Xem sách gốc</button><button type='button' class='ai-citation-btn' data-action='open-buy'>Mua</button><button type='button' class='ai-citation-btn ai-citation-btn-primary' data-action='open-view'>Xem</button></footer>"
        + "</div></div>"
        + "<div class='ai-chatbot-overlay ai-fig-overlay' hidden>"
        + "<div class='ai-chatbot-modal ai-fig-modal'>"
        + "<header class='ai-modal-head'><div class='ai-modal-title-wrap'><h4 class='ai-modal-title'>Fig. 115</h4></div><div class='ai-modal-actions'><button type='button' class='ai-modal-close' data-action='close-fig'><i class='bi bi-x-lg'></i></button></div></header>"
        + "<div class='ai-modal-body ai-fig-body'></div>"
        + "<footer class='ai-fig-footer'><button type='button' class='ai-source-file-chip' data-action='open-fig-file'><img src='assets/img/PDF_file_icon.svg' alt='PDF icon'><span class='ai-fig-file-name'></span></button><div class='ai-fig-actions'><button type='button' class='ai-citation-btn ai-citation-origin' data-action='open-fig-origin'>Xem sách gốc</button><button type='button' class='ai-citation-btn ai-citation-btn-primary' data-action='open-fig-buy'>Mua</button></div></footer>"
        + "</div></div>"
        + "<div class='ai-chatbot-overlay ai-pdf-overlay' hidden>"
        + "<div class='ai-chatbot-modal ai-pdf-modal'>"
        + "<header class='ai-modal-head'><div class='ai-modal-title-wrap'><h4 class='ai-modal-title'>Document Previewer</h4></div><div class='ai-modal-actions'><button type='button' class='ai-modal-close' data-action='close-pdf'><i class='bi bi-x-lg'></i></button></div></header>"
        + "<div class='ai-modal-body ai-pdf-body'><iframe class='ai-report-iframe ai-pdf-iframe' title='PDF preview'></iframe></div>"
        + "</div></div>"
        + "<div class='ai-chatbot-overlay ai-image-overlay' hidden>"
        + "<div class='ai-chatbot-modal ai-image-modal'>"
        + "<header class='ai-modal-head'><div class='ai-modal-title-wrap'><h4 class='ai-modal-title'>Ảnh trích dẫn</h4></div><div class='ai-modal-actions'><button type='button' class='ai-modal-close' data-action='close-image'><i class='bi bi-x-lg'></i></button></div></header>"
        + "<div class='ai-modal-body ai-image-body'><img class='ai-image-preview' alt='Ảnh trích dẫn mở rộng'></div>"
        + "</div></div>"
        + "<div class='ai-toast-wrap' aria-live='polite' aria-atomic='true'>"
        + "<div class='ai-permission-toast' role='status' hidden>"
        + "<i class='bi bi-exclamation-triangle-fill'></i>"
        + "<span>Tài khoản chưa có quyền đọc, vui lòng bấm vào mua sách</span>"
        + "</div>"
        + "</div>"
        + "</div>"
      );
    }

    cacheEls() {
      const root = document.getElementById("ai-chatbot-root");
      this.root = root;
      this.fab = root.querySelector(".ai-chatbot-fab");
      this.panel = root.querySelector(".ai-chatbot-panel");
      this.thread = root.querySelector(".ai-chatbot-thread");
      this.empty = root.querySelector(".ai-chatbot-empty");
      this.starters = root.querySelector(".ai-chatbot-starters");
      this.form = root.querySelector(".ai-chatbot-composer");
      this.input = root.querySelector(".ai-chatbot-composer textarea");
      this.reportOverlay = root.querySelector(".ai-report-overlay");
      this.reportTitle = root.querySelector(".ai-report-overlay .ai-modal-title");
      this.reportBody = root.querySelector(".ai-report-body");
      this.emailForm = root.querySelector(".ai-email-form");
      this.emailInput = root.querySelector(".ai-email-input");
      this.emailStatus = root.querySelector(".ai-email-status");
      this.citationOverlay = root.querySelector(".ai-citation-overlay");
      this.citationSnippets = root.querySelector(".ai-citation-snippets");
      this.citationPreview = root.querySelector(".ai-citation-preview");
      this.figOverlay = root.querySelector(".ai-fig-overlay");
      this.figBody = root.querySelector(".ai-fig-body");
      this.figFileName = root.querySelector(".ai-fig-file-name");
      this.pdfOverlay = root.querySelector(".ai-pdf-overlay");
      this.pdfFrame = root.querySelector(".ai-pdf-iframe");
      this.imageOverlay = root.querySelector(".ai-image-overlay");
      this.imagePreview = root.querySelector(".ai-image-preview");
      this.permissionToast = root.querySelector(".ai-permission-toast");
      this.permissionToastTimer = null;
    }

    bind() {
      this.fab.addEventListener("click", () => {
        this.panel.classList.toggle("is-open");
        if (this.panel.classList.contains("is-open")) this.input.focus();
      });

      this.panel.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (action === "close-chat") this.panel.classList.remove("is-open");
        if (action === "toggle-expand") this.panel.classList.toggle("is-expanded");
      });

      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = (this.input.value || "").trim();
        if (!text) return;
        this.input.value = "";
        this.autoResizeComposer();
        this.send(text);
      });

      this.input.addEventListener("input", () => {
        this.autoResizeComposer();
      });

      this.starters.addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-starter]");
        if (!btn) return;
        this.send(btn.getAttribute("data-starter") || "");
      });

      this.thread.addEventListener("click", (event) => {
        const fileBtn = event.target.closest("[data-file-id]");
        if (fileBtn) {
          const fileMeta = this.fileStore.get(fileBtn.getAttribute("data-file-id"));
          if (fileMeta) this.openReportPreview(fileMeta);
          return;
        }

        const citationBtn = event.target.closest("[data-citation-id]");
        if (citationBtn) {
          const hit = this.findCitationResult(citationBtn.getAttribute("data-citation-id"));
          if (hit) this.openCitationPreview(hit);
          return;
        }

        const figBtn = event.target.closest("[data-fig-id]");
        if (figBtn) {
          this.openFigDetail(figBtn.getAttribute("data-fig-id"));
          return;
        }

        const figFileBtn = event.target.closest("[data-action='open-fig-file']");
        if (figFileBtn) {
          this.openDisciplinePdfPreview();
          return;
        }

        const quoteImageBtn = event.target.closest("[data-quote-image]");
        if (quoteImageBtn) {
          this.openQuoteImage(quoteImageBtn.getAttribute("data-quote-image"), quoteImageBtn.getAttribute("data-quote-label"));
          return;
        }

        const relatedPdfBtn = event.target.closest("[data-related-pdf]");
        if (relatedPdfBtn) {
          this.openDisciplinePdfPreview(relatedPdfBtn.getAttribute("data-related-pdf-name") || "");
          return;
        }

        const reportAttachBtn = event.target.closest("[data-action='open-source-report']");
        if (reportAttachBtn) {
          this.openSourceReportPreview();
        }
      });

      this.reportOverlay.addEventListener("click", (event) => {
        if (event.target === this.reportOverlay) {
          this.closeReport();
          return;
        }
        const btn = event.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (action === "close-report") this.closeReport();
        if (action === "download-report") this.downloadReport();
        if (action === "view-as-pdf") this.switchReportPreviewFormat("pdf");
        if (action === "view-as-docx") this.switchReportPreviewFormat("docx");
        if (action === "open-report-fig-note") this.showReportFigureNote(btn.getAttribute("data-fig-id") || "");
        if (action === "toggle-email") {
          const show = this.emailForm.hasAttribute("hidden");
          if (show) {
            this.emailForm.removeAttribute("hidden");
            this.emailStatus.textContent = "";
            this.emailInput.focus();
          } else {
            this.emailForm.setAttribute("hidden", "");
          }
        }
        if (action === "send-email") {
          const email = (this.emailInput.value || "").trim();
          this.emailStatus.textContent = email ? ("Đã gửi báo cáo tới " + email + " (demo).") : "Vui lòng nhập email.";
        }
      });

      this.citationOverlay.addEventListener("click", (event) => {
        if (event.target === this.citationOverlay) {
          this.closeCitation();
          return;
        }

        const snippetBtn = event.target.closest(".ai-citation-snippet");
        if (snippetBtn && this.activeCitationPayload) {
          this.activeCitationPayload.activeSnippetId = snippetBtn.getAttribute("data-snippet-id");
          this.renderCitationPopup();
          return;
        }

        const btn = event.target.closest("[data-action]");
        if (!btn || !this.activeCitationPayload) return;
        const action = btn.getAttribute("data-action");
        if (action === "close-citation") this.closeCitation();
        if (action === "open-origin") openTab(this.resolveDetail(this.activeCitationPayload.book));
        if (action === "open-buy") openTab(this.resolveBuy(this.activeCitationPayload.book));
        if (action === "open-view") openTab(this.resolveView(this.activeCitationPayload.book));
      });

      this.figOverlay.addEventListener("click", (event) => {
        if (event.target === this.figOverlay) {
          this.closeFigDetail();
          return;
        }
        const btn = event.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (action === "close-fig") this.closeFigDetail();
        if (action === "open-fig-file") this.openDisciplinePdfPreview();
        if (action === "open-fig-origin") this.showOriginPermissionNotice();
        if (action === "open-fig-buy") openTab(this.resolveBuy(this.config.currentBook || {}));
      });

      this.pdfOverlay.addEventListener("click", (event) => {
        if (event.target === this.pdfOverlay) {
          this.closeDisciplinePdfPreview();
          return;
        }
        const btn = event.target.closest("[data-action]");
        if (!btn) return;
        if (btn.getAttribute("data-action") === "close-pdf") {
          this.closeDisciplinePdfPreview();
        }
      });

      this.imageOverlay.addEventListener("click", (event) => {
        if (event.target === this.imageOverlay) {
          this.closeQuoteImage();
          return;
        }
        const btn = event.target.closest("[data-action]");
        if (!btn) return;
        if (btn.getAttribute("data-action") === "close-image") {
          this.closeQuoteImage();
        }
      });

      window.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        this.closeReport();
        this.closeCitation();
        this.closeFigDetail();
        this.closeDisciplinePdfPreview();
        this.closeQuoteImage();
      });

      this.autoResizeComposer();
    }

    autoResizeComposer() {
      if (!this.input) return;
      this.input.style.height = "auto";
      const nextHeight = Math.min(this.input.scrollHeight, 180);
      this.input.style.height = Math.max(42, nextHeight) + "px";
    }

    playFabIntroAnimation() {
      if (!this.fab) return;
      const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        this.fab.classList.remove("is-attention");
        return;
      }
      this.fab.classList.add("is-attention");
    }

    async send(text) {
      this.pushMessage({ role: "user", type: "text", content: text });
      this.showTyping();
      try {
        const response = await this.engine.respond(text);
        this.hideTyping();
        this.handleResponse(response);
      } catch (error) {
        this.hideTyping();
        this.pushMessage({ role: "bot", type: "text", content: "AI demo đang bận, bạn thử lại giúp mình." });
      }
    }

    handleResponse(response) {
      if (!response) return;
      if (response.kind === "report") {
        this.pushMessage({ role: "bot", type: "text", content: response.text });
        const docx = this.reportService.createDocx(response.payload);
        this.fileStore.set(docx.id, docx);
        this.reportStore.set(response.payload.reportId, response.payload);
        this.pushMessage({
          role: "bot",
          type: "file",
          content: "Tệp báo cáo đã tạo:",
          meta: { reportId: response.payload.reportId, files: [docx] }
        });
        return;
      }
      if (response.kind === "citation_search") {
        this.pushMessage({ role: "bot", type: "text", content: response.text });
        this.pushMessage({ role: "bot", type: "citation_result", content: "Kết quả trích dẫn:", meta: { results: response.results || [] } });
        return;
      }
      if (response.kind === "discipline_demo") {
        this.activeDisciplinePayload = response.payload || null;
        this.disciplinePdfFile = null;
        this.sourceReportDocxFile = null;
        this.pushMessage({ role: "bot", type: "text", content: (response.payload && response.payload.intro) || response.text });
        this.pushMessage({
          role: "bot",
          type: "discipline_result",
          content: "Kết quả trích dẫn chuyên sâu:",
          meta: { payload: response.payload || null }
        });
        return;
      }
      this.pushMessage({ role: "bot", type: "text", content: response.text || "Mình đã nhận yêu cầu." });
    }

    pushMessage(input) {
      const message = {
        id: input.id || uid("msg"),
        role: input.role || "bot",
        type: input.type || "text",
        content: input.content || "",
        createdAt: input.createdAt || Date.now(),
        meta: input.meta || {}
      };
      this.messages.push(message);
      this.empty.classList.add("is-hidden");
      if (this.starters) this.starters.classList.add("is-hidden");
      this.renderMessage(message);
      this.thread.scrollTop = this.thread.scrollHeight;
    }

    renderMessage(message) {
      const node = document.createElement("article");
      node.className = "ai-msg " + (message.role === "user" ? "ai-msg-user" : "ai-msg-bot");

      if (message.type === "text") {
        if (message.role === "user") {
          node.classList.add("ai-msg-user-query");
          node.innerHTML = "<span class='ai-msg-avatar'><i class='bi bi-person-circle'></i></span><div class='ai-msg-bubble'>" + esc(message.content) + "</div>";
        } else {
          node.innerHTML = "<div class='ai-msg-bubble'>" + esc(message.content) + "</div>";
        }
      } else if (message.type === "file") {
        const fileButtons = ((message.meta && message.meta.files) || []).map(function (file) {
          return "<button type='button' class='ai-file-chip' data-file-id='" + esc(file.id) + "'>"
            + "<i class='bi bi-file-earmark-text'></i><span><strong>" + esc(file.name) + "</strong><small>" + esc(file.sizeLabel) + "</small></span></button>";
        }).join("");
        node.innerHTML = "<div class='ai-msg-bubble'><p>" + esc(message.content) + "</p><div class='ai-file-list'>" + fileButtons + "</div></div>";
      } else if (message.type === "citation_result") {
        const resultButtons = ((message.meta && message.meta.results) || []).map(function (row) {
          return "<button type='button' class='ai-citation-item' data-citation-id='" + esc(row.citationId) + "'><strong>\"" + esc(row.quote) + "\"</strong><small>" + esc(row.bookTitle) + " • " + esc(row.chapter) + "</small></button>";
        }).join("");
        node.innerHTML = "<div class='ai-msg-bubble'><p>" + esc(message.content) + "</p><div class='ai-citation-list'>" + resultButtons + "</div></div>";
      } else if (message.type === "discipline_result") {
        node.innerHTML = this.renderDisciplineResult(message.meta && message.meta.payload);
      }
      this.thread.appendChild(node);
    }

    renderDisciplineResultLegacy(payload) {
      if (!payload) {
        return "<div class='ai-msg-bubble'><p>Không có dữ liệu demo.</p></div>";
      }

      const sectionsHtml = (payload.sections || []).map(function (section) {
        const paragraphs = (section.paragraphs || []).map(function (paragraph) {
          return "<p>" + paragraph.replace(/(Fig\.? ?\d+)/g, function (match) {
            const figId = "fig-" + match.replace(/[^0-9]/g, "");
            return "<button type='button' class='ai-inline-fig' data-fig-id='" + esc(figId) + "'>" + esc(match) + "</button>";
          }) + "</p>";
        }).join("");
        return "<section class='ai-discipline-section'><h5>" + esc(section.title) + "</h5>" + paragraphs + "</section>";
      }).join("");

      const figureHtml = (payload.figures || []).map(function (figure) {
        return "<button type='button' class='ai-figure-card ai-figure-card-btn' data-fig-id='" + esc(figure.id) + "'>"
          + "<span class='ai-figure-badge'>" + esc(figure.label) + "</span>"
          + "<p>" + esc(figure.caption) + "</p>"
          + "</button>";
      }).join("");

      const quoteImagesHtml = (payload.quoteImages || []).map(function (img) {
        return "<button type='button' class='ai-quote-image-card' data-quote-image='" + esc(img.src) + "' data-quote-label='" + esc(img.label || "Ảnh trích dẫn") + "'>"
          + "<img src='" + esc(img.src) + "' alt='" + esc(img.label || "Ảnh trích dẫn") + "'>"
          + "<span>" + esc(img.label || "Ảnh trích dẫn") + "</span>"
          + "</button>";
      }).join("");

      return "<div class='ai-msg-bubble ai-knowledge-card'>"
        + "<h4 class='ai-knowledge-title'>Kết quả trích dẫn theo tài liệu tham chiếu</h4>"
        + sectionsHtml
        + "<div class='ai-figure-grid'>" + figureHtml + "</div>"
        + "<h5 class='ai-quote-title'>Ảnh trích dẫn được highlight</h5>"
        + "<div class='ai-quote-image-grid'>" + quoteImagesHtml + "</div>"
        + "</div>";
    }

    renderDisciplineResult(payload) {
      if (!payload) {
        return "<div class='ai-msg-bubble'><p>Không có dữ liệu demo.</p></div>";
      }

      const sectionsHtml = (payload.sections || []).map(function (section) {
        const paragraphs = (section.paragraphs || []).map(function (paragraph) {
          return "<p>" + paragraph.replace(/(Fig\.? ?\d+)/g, function (match) {
            const figId = "fig-" + match.replace(/[^0-9]/g, "");
            return "<button type='button' class='ai-inline-fig' data-fig-id='" + esc(figId) + "'>" + esc(match) + "</button>";
          }) + "</p>";
        }).join("");
        return "<section class='ai-discipline-section'><h5>" + esc(section.title) + "</h5>" + paragraphs + "</section>";
      }).join("");

      const figureHtml = (payload.figures || []).map(function (figure) {
        return "<button type='button' class='ai-figure-card ai-figure-card-btn' data-fig-id='" + esc(figure.id) + "'>"
          + "<span class='ai-figure-badge'>" + esc(figure.label) + "</span>"
          + "<p>" + esc(figure.caption) + "</p>"
          + "</button>";
      }).join("");

      const quoteImagesHtml = (payload.quoteImages || []).map(function (img) {
        return "<button type='button' class='ai-quote-image-card' data-quote-image='" + esc(img.src) + "' data-quote-label='" + esc(img.label || "Ảnh trích dẫn") + "'>"
          + "<img src='" + esc(img.src) + "' alt='" + esc(img.label || "Ảnh trích dẫn") + "'>"
          + "<span>" + esc(img.label || "Ảnh trích dẫn") + "</span>"
          + "</button>";
      }).join("");

      const relatedPdfHtml = (payload.relatedPdfFiles || []).map(function (file) {
        return "<button type='button' class='ai-source-file-chip ai-related-pdf-chip' data-related-pdf='" + esc(file.id || "") + "' data-related-pdf-name='" + esc(file.name || "") + "'>"
          + "<img src='assets/img/PDF_file_icon.svg' alt='PDF icon'>"
          + "<span>" + esc(file.name || "Tài liệu liên quan.pdf") + "</span>"
          + "</button>";
      }).join("");

      const reportAttachmentHtml = payload.demoType === "report"
        ? "<button type='button' class='ai-report-cta-chip' data-action='open-source-report'><i class='bi bi-file-earmark-word-fill'></i><span>Bấm vào để xem báo cáo</span></button>"
        : "";

      return "<div class='ai-msg-bubble ai-knowledge-card'>"
        + "<h4 class='ai-knowledge-title'>Kết quả trích dẫn theo tài liệu tham chiếu</h4>"
        + sectionsHtml
        + "<div class='ai-figure-grid'>" + figureHtml + "</div>"
        + "<h5 class='ai-quote-title'>Ảnh trích dẫn được highlight</h5>"
        + "<div class='ai-quote-image-grid'>" + quoteImagesHtml + "</div>"
        + "<h5 class='ai-quote-title'>PDF sách liên quan</h5>"
        + "<div class='ai-related-pdf-list'>" + relatedPdfHtml + "</div>"
        + reportAttachmentHtml
        + "</div>";
    }

    showTyping() {
      if (this.thread.querySelector("[data-typing='1']")) return;
      const typing = document.createElement("div");
      typing.className = "ai-msg ai-msg-bot ai-msg-status";
      typing.setAttribute("data-typing", "1");
      typing.innerHTML = "<div class='ai-msg-bubble'>Hệ thống đang kiểm tra dữ liệu, bạn vui lòng chờ giây lát...</div>";
      this.thread.appendChild(typing);
      this.thread.scrollTop = this.thread.scrollHeight;
    }

    hideTyping() {
      const typing = this.thread.querySelector("[data-typing='1']");
      if (typing) typing.remove();
    }

    createPdf(reportId) {
      const payload = this.reportStore.get(reportId);
      if (!payload) return null;
      const existingPdf = this.findReportFile(reportId, "pdf");
      if (existingPdf) return existingPdf;
      const pdf = this.reportService.createPdf(payload);
      this.fileStore.set(pdf.id, pdf);
      return pdf;
    }

    openReportPreview(fileMeta) {
      this.currentPreviewFile = fileMeta;
      this.reportTitle.textContent = fileMeta.title;
      this.emailForm.setAttribute("hidden", "");
      this.emailInput.value = "";
      this.emailStatus.textContent = "";
      this.renderReportPreviewContent(fileMeta);
      this.reportOverlay.removeAttribute("hidden");
      this.updateBodyScrollLock();
    }

    renderReportPreviewContent(fileMeta) {
      const reportId = fileMeta.reportId || "";
      const showPdfAction = fileMeta.format !== "pdf";
      const showDocxAction = fileMeta.format === "pdf";

      const switchBar = "<div class='ai-report-view-switch'>"
        + (showPdfAction ? ("<button type='button' class='ai-report-switch-btn' data-action='view-as-pdf' data-report-id='" + esc(reportId) + "'><i class='bi bi-file-earmark-pdf'></i> Xem dưới dạng PDF</button>") : "")
        + (showDocxAction ? ("<button type='button' class='ai-report-switch-btn' data-action='view-as-docx' data-report-id='" + esc(reportId) + "'><i class='bi bi-file-earmark-text'></i> Xem dưới dạng DOCX</button>") : "")
        + "</div>";

      const content = fileMeta.format === "pdf"
        ? "<iframe class='ai-report-iframe' src='" + esc(fileMeta.blobUrl) + "' title='Preview PDF'></iframe>"
        : (fileMeta.previewHtml || "<p>Không có dữ liệu xem trước.</p>");

      this.reportBody.innerHTML = switchBar + content;
    }

    switchReportPreviewFormat(format) {
      const current = this.currentPreviewFile;
      if (!current || !current.reportId) return;

      if (format === "pdf") {
        const pdfFile = this.createPdf(current.reportId);
        if (!pdfFile) return;
        this.currentPreviewFile = pdfFile;
        this.renderReportPreviewContent(pdfFile);
        return;
      }

      if (format === "docx") {
        const docxFile = this.findReportFile(current.reportId, "docx");
        if (!docxFile) return;
        this.currentPreviewFile = docxFile;
        this.renderReportPreviewContent(docxFile);
      }
    }

    createSourceReportDocxFile() {
      if (this.sourceReportDocxFile) return this.sourceReportDocxFile;
      const payload = this.activeDisciplinePayload;
      if (!payload || payload.demoType !== "report") return null;
      const exportPayload = {
        reportId: uid("report"),
        title: payload.reportTitle || "Báo cáo chuyên môn tổng hợp từ dữ liệu sách bản quyền",
        subtitle: "Nguồn tham chiếu: " + (payload.fileName || "Kho dữ liệu sách bản quyền"),
        createdAt: new Date().toLocaleDateString("vi-VN"),
        prompt: "Báo cáo từ dữ liệu sách bản quyền",
        sections: (payload.sections || []).map(function (section) {
          return {
            heading: section.title || "Nội dung",
            paragraphs: section.paragraphs || []
          };
        })
      };
      const docx = this.reportService.createDocx(exportPayload);
      docx.name = "bao-cao-chuyen-mon.docx";
      docx.title = exportPayload.title;
      docx.previewHtml = this.buildSourceReportPreviewHtml(exportPayload);
      this.fileStore.set(docx.id, docx);
      this.sourceReportDocxFile = docx;
      return docx;
    }

    buildSourceReportPreviewHtml(payload) {
      const sections = (payload.sections || []).map(function (section) {
        const paragraphs = (section.paragraphs || []).map(function (text) {
          return "<p>" + this.decorateReportParagraph(text, payload) + "</p>";
        }, this).join("");
        return "<section><h4><strong>" + esc(section.heading || "") + "</strong></h4>" + paragraphs + "</section>";
      }, this).join("");
      return "<article class='ai-preview-doc ai-source-report-doc'>"
        + "<h2><strong>" + esc(payload.title || "Báo cáo") + "</strong></h2>"
        + "<p class='ai-preview-sub'>" + esc(payload.subtitle || "") + "</p>"
        + "<p class='ai-preview-date'>Ngày tạo: " + esc(payload.createdAt || "") + "</p>"
        + sections
        + "</article>";
    }

    decorateReportParagraph(text, payload) {
      const raw = String(text || "");
      if (!raw) return "";
      const figureRegex = /Fig\.?\s?(\d+)\.?/g;
      let output = "";
      let lastIndex = 0;
      let match = figureRegex.exec(raw);
      while (match) {
        const full = match[0];
        const number = match[1];
        const figId = "fig-" + number;
        output += esc(raw.slice(lastIndex, match.index));
        output += "<button type='button' class='ai-report-fig-note' data-action='open-report-fig-note' data-fig-id='" + esc(figId) + "'>" + esc(full) + "</button>";
        lastIndex = match.index + full.length;
        match = figureRegex.exec(raw);
      }
      output += esc(raw.slice(lastIndex));
      return output;
    }

    showReportFigureNote(figId) {
      if (!figId || !this.activeDisciplinePayload) return;
      const payload = this.activeDisciplinePayload;
      const detail = this.disciplineDemoService.resolveFigure(payload, figId);
      const figure = (payload.figures || []).find(function (item) { return item.id === figId; }) || null;
      const figLabel = (figure && figure.label) || (detail && detail.title) || figId.replace("fig-", "Fig. ");
      const detailText = detail && detail.lines && detail.lines.length
        ? detail.lines.slice(0, 2).join(" ")
        : ((figure && figure.caption) ? figure.caption : "Đây là ghi chú trích dẫn liên quan trong báo cáo.");
      this.showOriginPermissionNotice(figLabel + ": " + detailText);
    }

    openSourceReportPreview() {
      const file = this.createSourceReportDocxFile();
      if (!file) return;
      this.openReportPreview(file);
    }

    findReportFile(reportId, format) {
      if (!reportId || !format) return null;
      for (const fileMeta of this.fileStore.values()) {
        if (fileMeta.reportId === reportId && fileMeta.format === format) {
          return fileMeta;
        }
      }
      return null;
    }

    closeReport() {
      this.reportOverlay.setAttribute("hidden", "");
      this.updateBodyScrollLock();
    }

    downloadReport() {
      if (!this.currentPreviewFile) return;
      const anchor = document.createElement("a");
      anchor.href = this.currentPreviewFile.blobUrl;
      anchor.download = this.currentPreviewFile.name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    }

    findCitationResult(citationId) {
      for (let i = this.messages.length - 1; i >= 0; i -= 1) {
        const message = this.messages[i];
        if (message.type !== "citation_result") continue;
        const rows = (message.meta && message.meta.results) || [];
        const hit = rows.find(function (row) { return row.citationId === citationId; });
        if (hit) return hit;
      }
      return null;
    }

    openCitationPreview(result) {
      const book = this.citationService.getBookById(result.bookId) || {
        bookId: result.bookId,
        title: result.bookTitle,
        detailUrl: "book-detail.html",
        buyUrl: "book-detail.html",
        readerUrl: "https://sachquocgia.vn/customer/purchased-book"
      };
      const snippets = this.citationService.getSimilarSnippets(result.citationId);
      this.activeCitationPayload = {
        result: result,
        snippets: snippets,
        book: book,
        activeSnippetId: snippets[0] ? snippets[0].snippetId : ""
      };
      this.renderCitationPopup();
      this.citationOverlay.removeAttribute("hidden");
      this.updateBodyScrollLock();
    }

    renderCitationPopup() {
      if (!this.activeCitationPayload) return;
      const payload = this.activeCitationPayload;
      this.citationSnippets.innerHTML = payload.snippets.map(function (snippet) {
        const active = snippet.snippetId === payload.activeSnippetId ? " is-active" : "";
        return "<button type='button' class='ai-citation-snippet" + active + "' data-snippet-id='" + esc(snippet.snippetId) + "'><strong>" + esc(snippet.contextLabel) + "</strong><span>" + esc(snippet.text) + "</span></button>";
      }).join("");
      const activeSnippet = payload.snippets.find(function (s) { return s.snippetId === payload.activeSnippetId; }) || payload.snippets[0];
      if (!activeSnippet) {
        this.citationPreview.innerHTML = "<p>Không có nội dung trích dẫn.</p>";
        return;
      }
      const highlight = this.highlightQuote(activeSnippet.text, payload.result.quote);
      this.citationPreview.innerHTML = "<h5>" + esc(payload.book.title) + "</h5><p class='ai-citation-meta'>" + esc(payload.result.chapter) + "</p><div class='ai-citation-highlight'>" + highlight + "</div>";
    }

    highlightQuote(text, quote) {
      const rawText = String(text || "");
      const rawQuote = String(quote || "");
      if (!rawQuote) return esc(rawText);
      let idx = rawText.toLowerCase().indexOf(rawQuote.toLowerCase());
      if (idx < 0) idx = norm(rawText).indexOf(norm(rawQuote));
      if (idx < 0) return esc(rawText);
      const start = Math.max(0, idx);
      const end = Math.min(rawText.length, start + rawQuote.length);
      return esc(rawText.slice(0, start)) + "<mark>" + esc(rawText.slice(start, end)) + "</mark>" + esc(rawText.slice(end));
    }

    closeCitation() {
      this.citationOverlay.setAttribute("hidden", "");
      this.updateBodyScrollLock();
    }

    openFigDetail(figId) {
      if (!this.activeDisciplinePayload) return;
      const payload = this.activeDisciplinePayload;
      const figureDetails = payload.figureDetails || {};
      const fallbackFigure =
        figureDetails["fig-115"] ||
        figureDetails["fig-16"] ||
        figureDetails[Object.keys(figureDetails)[0]];
      const figure = this.disciplineDemoService.resolveFigure(payload, figId) || fallbackFigure;
      if (!figure) return;

      const linesHtml = (figure.lines || []).map(function (line) {
        return "<p>" + esc(line) + "</p>";
      }).join("");

      this.figBody.innerHTML = "<div class='ai-fig-content'>" + linesHtml + "</div>";
      this.figFileName.textContent = payload.fileName || "Tài liệu tham chiếu.pdf";
      this.figOverlay.removeAttribute("hidden");
      this.updateBodyScrollLock();
    }

    closeFigDetail() {
      this.figOverlay.setAttribute("hidden", "");
      this.updateBodyScrollLock();
    }

    ensureDisciplinePdf() {
      if (this.disciplinePdfFile) return this.disciplinePdfFile;
      if (!this.activeDisciplinePayload) return null;
      const lines = ["Hoi - dap ve xu ly vi pham ky luat cua Dang", ""];
      const figureDetails = this.activeDisciplinePayload.figureDetails || {};
      const fig =
        figureDetails["fig-115"] ||
        figureDetails["fig-16"] ||
        figureDetails[Object.keys(figureDetails)[0]];
      (fig && fig.lines ? fig.lines : []).forEach(function (line) { lines.push(stripDiacritics(line)); });
      const blob = this.reportService.minimalPdfBlob(lines);
      this.disciplinePdfFile = {
        id: uid("file"),
        name: this.activeDisciplinePayload.fileName || "tai-lieu-tham-chieu.pdf",
        format: "pdf",
        blobUrl: URL.createObjectURL(blob),
        title: "Document Previewer"
      };
      return this.disciplinePdfFile;
    }

    openDisciplinePdfPreview(fileNameOverride) {
      const fileMeta = this.ensureDisciplinePdf();
      if (!fileMeta) return;
      if (fileNameOverride) {
        fileMeta.name = fileNameOverride;
      }
      this.pdfFrame.setAttribute("src", fileMeta.blobUrl);
      this.pdfOverlay.removeAttribute("hidden");
      this.updateBodyScrollLock();
    }

    closeDisciplinePdfPreview() {
      this.pdfOverlay.setAttribute("hidden", "");
      this.updateBodyScrollLock();
    }

    showOriginPermissionNotice(message) {
      const text = message || "Tài khoản chưa có quyền đọc, vui lòng bấm vào mua sách";
      if (!this.permissionToast) {
        window.alert(text);
        return;
      }
      const textNode = this.permissionToast.querySelector("span");
      if (textNode) textNode.textContent = text;
      this.permissionToast.removeAttribute("hidden");
      this.permissionToast.classList.add("is-show");
      if (this.permissionToastTimer) {
        window.clearTimeout(this.permissionToastTimer);
      }
      this.permissionToastTimer = window.setTimeout(() => {
        this.permissionToast.classList.remove("is-show");
        this.permissionToast.setAttribute("hidden", "");
      }, 2600);
    }

    openQuoteImage(src, label) {
      if (!src || !this.imagePreview) return;
      this.imagePreview.setAttribute("src", src);
      this.imagePreview.setAttribute("alt", label || "Ảnh trích dẫn mở rộng");
      this.imageOverlay.removeAttribute("hidden");
      this.updateBodyScrollLock();
    }

    closeQuoteImage() {
      if (!this.imageOverlay || !this.imagePreview) return;
      this.imageOverlay.setAttribute("hidden", "");
      this.imagePreview.removeAttribute("src");
      this.updateBodyScrollLock();
    }

    updateBodyScrollLock() {
      const overlays = [this.reportOverlay, this.citationOverlay, this.figOverlay, this.pdfOverlay, this.imageOverlay];
      const hasOpenOverlay = overlays.some(function (overlay) {
        return overlay && !overlay.hasAttribute("hidden");
      });
      document.body.classList.toggle("ai-chatbot-lock-scroll", hasOpenOverlay);
    }

    resolveDetail(bookMeta) { return this.config.routes.detail(bookMeta || {}); }
    resolveBuy(bookMeta) { return this.config.routes.buy(bookMeta || {}); }
    resolveView(bookMeta) {
      if (this.config.userState.isPurchased) return this.config.routes.reader(bookMeta || {});
      return this.config.routes.detail(bookMeta || {});
    }
  }

  window.initAiChatbotWidget = function initAiChatbotWidget(userConfig) {
    const config = mergeConfig(DEFAULT_CONFIG, userConfig);
    const widget = new AiChatbotWidget(config);
    widget.init();
    return widget;
  };
})();
