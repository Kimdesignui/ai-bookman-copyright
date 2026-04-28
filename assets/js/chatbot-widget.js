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
      if (normalized.indexOf("bao cao") > -1 || normalized.indexOf("report") > -1) {
        const payload = this.ctx.reportService.buildPayload(text, this.ctx.config.currentBook);
        return { kind: "report", text: "Mình đã soạn xong báo cáo chuyên môn. Bạn mở file DOCX ngay bên dưới.", payload: payload };
      }
      if (normalized.indexOf("trich dan") > -1 || normalized.indexOf("quote") > -1 || normalized.indexOf("trich") > -1) {
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
      this.reportService = new ReportExportService();
      this.engine = config.mode === "gemini" ? new ChatEngineGemini() : new ChatEngineMock({
        config: config,
        citationService: this.citationService,
        reportService: this.reportService
      });
      this.activeCitationPayload = null;
      this.currentPreviewFile = null;
    }

    init() {
      if (document.getElementById("ai-chatbot-root")) return;
      this.injectMarkup();
      this.cacheEls();
      this.bind();
      this.playFabIntroAnimation();
      this.pushMessage({
        role: "bot",
        type: "text",
        content: "Xin chào, mình là AI Chatbot chuyên gia. Mình hỗ trợ 2 tác vụ chính: (1) soạn báo cáo chuyên môn và xuất DOCX/PDF, (2) tìm trích dẫn thông minh từ kho tri thức Nhà xuất bản."
      });
      this.pushMessage({
        role: "user",
        type: "text",
        content: "Bạn lập giúp tôi báo cáo chuyên đề về đối ngoại và xuất file DOCX nhé."
      });
      this.pushMessage({
        role: "bot",
        type: "text",
        content: "Được ngay. Mình sẽ tạo báo cáo theo danh mục sách liên quan và gửi tệp DOCX để bạn xem trước, sau đó có thể tạo thêm PDF nếu cần."
      });
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
        + "<div class='ai-chatbot-empty'><div class='ai-chatbot-empty-icon'><i class='bi bi-stars'></i></div><h4>AI có thể hỗ trợ gì?</h4><p>Nhập yêu cầu hoặc chọn mẫu bên dưới để soạn báo cáo, xuất tệp và tìm trích dẫn nhanh.</p></div>"
        + "<div class='ai-chatbot-thread' aria-live='polite'></div>"
        + "<div class='ai-chatbot-starters'>"
        + "<button type='button' data-starter='Lập báo cáo chuyên môn về chủ đề đối ngoại từ danh mục sách, xuất file DOCX'>📝 Soạn báo cáo & xuất DOCX</button>"
        + "<button type='button' data-starter='Tìm các trích dẫn nổi bật về ngoại giao Việt Nam trong toàn bộ kho xuất bản'>🔎 Tìm trích dẫn thông minh</button>"
        + "<button type='button' data-starter='Tạo bản PDF từ báo cáo vừa soạn để gửi lãnh đạo duyệt nhanh'>📄 Tạo PDF từ báo cáo</button>"
        + "</div>"
        + "</div>"
        + "<form class='ai-chatbot-composer'><div class='ai-composer-field'><textarea rows='1' placeholder='Nhập yêu cầu'></textarea><span class='ai-composer-aiicon' aria-hidden='true'><img src='assets/img/ai-icon.svg' alt='AI'></span></div><button type='submit' aria-label='Gửi'><i class='bi bi-send-fill'></i></button></form>"
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
        this.send(text);
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

      window.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        this.closeReport();
        this.closeCitation();
      });
    }

    playFabIntroAnimation() {
      if (!this.fab) return;
      const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        this.fab.classList.add("is-intro-done");
        return;
      }

      this.fab.classList.add("is-intro-playing");
      window.setTimeout(() => {
        this.fab.classList.remove("is-intro-playing");
        this.fab.classList.add("is-intro-done");
      }, 2800);
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
      this.renderMessage(message);
      this.thread.scrollTop = this.thread.scrollHeight;
    }

    renderMessage(message) {
      const node = document.createElement("article");
      node.className = "ai-msg " + (message.role === "user" ? "ai-msg-user" : "ai-msg-bot");

      if (message.type === "text") {
        node.innerHTML = "<div class='ai-msg-bubble'>" + esc(message.content) + "</div>";
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
      }
      this.thread.appendChild(node);
    }

    showTyping() {
      const typing = document.createElement("div");
      typing.className = "ai-msg ai-msg-bot ai-msg-typing";
      typing.setAttribute("data-typing", "1");
      typing.innerHTML = "<span></span><span></span><span></span>";
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
      document.body.classList.add("ai-chatbot-lock-scroll");
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
      if (this.citationOverlay.hasAttribute("hidden")) document.body.classList.remove("ai-chatbot-lock-scroll");
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
      document.body.classList.add("ai-chatbot-lock-scroll");
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
      if (this.reportOverlay.hasAttribute("hidden")) document.body.classList.remove("ai-chatbot-lock-scroll");
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
