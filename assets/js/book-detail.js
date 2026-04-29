    const site = "https://sachquocgia.vn";
    const bookDetailPage = "book-detail.html";
    const lazyPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    const categories = [
      { title: "Tủ sách Nhân vật", href: "/nhan-vat-c189", icon: "bi-journal-bookmark" },
      { title: "Tủ sách Lý luận chính trị", href: "/sach-ly-luan-chinh-tri-c191", icon: "bi-globe2" },
      { title: "Tủ sách Luật", href: "/tu-sach-luat-c202", icon: "bi-bookmark-star" },
      { title: "Tủ sách Giáo trình - Tài liệu", href: "/giao-trinh-va-tai-lieu-hoc-tap-c203", icon: "bi-building" },
      { title: "Tủ sách Ban chỉ đạo 35", href: "/tu-sach-35-c199", icon: "bi-file-earmark-text" },
      { title: "Tủ sách Chi Bộ", href: "/tu-sach-chi-bo-c193", icon: "bi-collection" }
    ];

    const detailGallery = [
      "https://images.sachquocgia.vn/Thumbs/2024/2/29/image-20240229010554659.jpg",
      "https://images.sachquocgia.vn/Picture/2025/9/11/image-20250911095154901.jpg",
      "https://images.sachquocgia.vn/Picture/2025/8/25/image-20250825085630037.jpg",
      "https://images.sachquocgia.vn/Picture/2025/8/25/image-20250825091242581.jpg"
    ];

    const productVariants = [
      { id: "paper", icon: "bi-book", label: "Sách giấy", price: 315000, oldPrice: 515000, controlType: "quantity", quantity: 1, checked: true },
      { id: "ebook", icon: "bi-tablet", label: "Ebook", price: 315000, controlType: "select", options: ["Vĩnh viễn", "12 tháng", "24 tháng"], selectedOption: "Vĩnh viễn", checked: false },
      { id: "multimedia", icon: "bi-display", label: "Multimedia", price: 315000, controlType: "select", options: ["Vĩnh viễn", "12 tháng"], selectedOption: "Vĩnh viễn", checked: false },
      { id: "audio", icon: "bi-mic", label: "Audio book", price: 315000, controlType: "select", options: ["Vĩnh viễn", "12 tháng"], selectedOption: "Vĩnh viễn", checked: false }
    ];

    const relatedBooks = [
      { title: "Xây dựng và phát triển nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc", href: "/xay-dung-va-phat-trien-nen-van-hoa-viet-nam-tien-tien-dam-da-ban-sac-dan-toc-b12938.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/17/image-20240617144737905.jpg", price: "69.000₫" },
      { title: "Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh", href: "/xay-dung-dang-va-he-thong-chinh-tri-trong-sach-vung-manh-gop-phan-thuc-hien-thang-loi-nghi-quyet-dai-hoi-xiii-cua-dang-b12274.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/4/image-20240604154256965.jpg", price: "54.600₫" },
      { title: "Biến thách thức thành cơ hội, quyết tâm tạo đột phá", href: "/bien-thach-thuc-thanh-co-hoi-quyet-tam-tao-dot-pha-dua-dat-nuoc-phat-trien-nhanh-ben-vung-b12273.html", img: "https://images.sachquocgia.vn/Thumbs/2024/2/1/image-20240201202405322.jpg", price: "66.200₫" },
      { title: "Hồ Chủ tịch - Hình ảnh của dân tộc, tinh hoa của thời đại", href: "/ho-chu-tich-hinh-anh-cua-dan-toc-tinh-hoa-cua-thoi-dai-xuat-ban-lan-thu-hai-b14862.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030162137031.jpg", price: "20.150₫" },
      { title: "Ngoại giao văn hóa Mỹ trong hai thập niên đầu thế kỷ XXI", href: "/ngoai-giao-van-hoa-my-trong-hai-thap-nien-dau-the-ky-xxi-b14845.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/6/image-20251006104331846.jpg", price: "42.200₫" },
      { title: "Hồ Chí Minh qua hồi ức của những cựu tù chính trị Côn Đảo", href: "/ho-chi-minh-qua-hoi-uc-cua-nhung-cuu-tu-chinh-tri-con-dao-b14841.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/3/image-20251003161423546.jpg", price: "39.300₫" }
    ];

    const topicBooks = [
      { title: "Giáo trình triết học", href: "/giao-trinh-triet-hoc-dung-cho-khoi-khong-chuyen-nganh-triet-hoc-trinh-do-dao-tao-thac-si-tien-si-cac-nganh-khoa-hoc-tu-nhien-cong-nghe-xuat-ban-lan-thu-nam-b12100.html", img: "https://images.sachquocgia.vn/Thumbs/2024/4/24/image-20240424174821224.jpg", price: "57.900₫" },
      { title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam", href: "/giao-trinh-lich-su-dang-cong-san-viet-nam-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12464.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-2024032114122991.jpg", price: "58.000₫" },
      { title: "Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", href: "/sach-noi-tu-hao-va-tin-tuong-duoi-la-co-ve-vang-cua-dang-quyet-tam-xay-dung-mot-nuoc-viet-nam-ngay-cang-giau-manh-van-minh-van-hien-va-anh-hung-b12401.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/1/image-20240301180127722.jpg", price: "61.500₫" },
      { title: "Miền Nam trong trái tim Hồ Chí Minh", href: "/mien-nam-trong-trai-tim-ho-chi-minh-b14870.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030172913646.jpg", price: "73.550₫" },
      { title: "Thư ký Bác Hồ kể chuyện", href: "/thu-ky-bac-ho-ke-chuyen-xuat-ban-lan-thu-tu-co-chinh-sua-b14878.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030180621474.jpg", price: "53.800₫" },
      { title: "Bảy cuộc khủng hoảng định hình toàn cầu hóa", href: "/bay-cuoc-khung-hoang-dinh-hinh-toan-cau-hoa-sach-tham-khao-b14820.html", img: "https://images.sachquocgia.vn/Thumbs/2025/8/13/image-20250813144547630.jpg", price: "106.100₫" }
    ];

    const buyMost = [
      { title: "Giáo trình Tư tưởng Hồ Chí Minh", href: "/giao-trinh-tu-tuong-ho-chi-minh-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12468.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-2024032114215276.jpg", metric: "131 lượt mua" },
      { title: "Giáo trình triết học", href: "/giao-trinh-triet-hoc-dung-cho-khoi-khong-chuyen-nganh-triet-hoc-trinh-do-dao-tao-thac-si-tien-si-cac-nganh-khoa-hoc-tu-nhien-cong-nghe-xuat-ban-lan-thu-nam-b12100.html", img: "https://images.sachquocgia.vn/Thumbs/2024/4/24/image-20240424174821224.jpg", metric: "101 lượt mua" },
      { title: "Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", href: "/sach-noi-tu-hao-va-tin-tuong-duoi-la-co-ve-vang-cua-dang-quyet-tam-xay-dung-mot-nuoc-viet-nam-ngay-cang-giau-manh-van-minh-van-hien-va-anh-hung-b12401.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/1/image-20240301180127722.jpg", metric: "87 lượt mua" },
      { title: "Giáo trình Triết học Mác - Lênin", href: "/giao-trinh-triet-hoc-mac-lenin-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12466.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-20240321142038119.jpg", metric: "61 lượt mua" },
      { title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam", href: "/giao-trinh-lich-su-dang-cong-san-viet-nam-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12464.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-2024032114122991.jpg", metric: "57 lượt mua" }
    ];

    const viewMost = [
      { title: "Xây dựng và phát triển nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc", href: "/xay-dung-va-phat-trien-nen-van-hoa-viet-nam-tien-tien-dam-da-ban-sac-dan-toc-b12938.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/17/image-20240617144737905.jpg", metric: "6368 lượt xem" },
      { title: "Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", href: "/sach-noi-tu-hao-va-tin-tuong-duoi-la-co-ve-vang-cua-dang-quyet-tam-xay-dung-mot-nuoc-viet-nam-ngay-cang-giau-manh-van-minh-van-hien-va-anh-hung-b12401.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/1/image-20240301180127722.jpg", metric: "4031 lượt xem" },
      { title: "Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh", href: "/xay-dung-dang-va-he-thong-chinh-tri-trong-sach-vung-manh-gop-phan-thuc-hien-thang-loi-nghi-quyet-dai-hoi-xiii-cua-dang-b12274.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/4/image-20240604154256965.jpg", metric: "2395 lượt xem" },
      { title: "Xây dựng và phát triển nền đối ngoại, ngoại giao Việt Nam", href: "/xay-dung-va-phat-trien-nen-doi-ngoai-ngoai-giao-viet-nam-toan-dien-hien-dai-mang-dam-ban-sac-cay-tre-viet-nam-b12323.html", img: "https://images.sachquocgia.vn/Thumbs/2024/2/29/image-20240229010554659.jpg", metric: "2172 lượt xem" },
      { title: "Biến thách thức thành cơ hội, quyết tâm tạo đột phá", href: "/bien-thach-thuc-thanh-co-hoi-quyet-tam-tao-dot-pha-dua-dat-nuoc-phat-trien-nhanh-ben-vung-b12273.html", img: "https://images.sachquocgia.vn/Thumbs/2024/2/1/image-20240201202405322.jpg", metric: "2158 lượt xem" }
    ];

    let activeVariantId = productVariants[0].id;
    let galleryIndex = 0;

    function setActiveVariant(variantId) {
      const fallbackId = productVariants[0]?.id;
      activeVariantId = productVariants.some((item) => item.id === variantId) ? variantId : fallbackId;
      productVariants.forEach((item) => {
        item.checked = item.id === activeVariantId;
      });
    }

    function lazyImage(src, alt, extraClass = "") {
      return `<img class="lazy-image ${extraClass}" data-src="${src}" src="${lazyPlaceholder}" alt="${alt}" loading="lazy" decoding="async">`;
    }

    function resolveItemHref(href) {
      return /^https?:\/\//i.test(href) ? href : `${site}${href}`;
    }

    function resolveBookDetailHref() {
      return bookDetailPage;
    }

    function formatCurrency(value) {
      return `${value.toLocaleString("vi-VN")}đ`;
    }

    function getVariantMetaText(item) {
      if (item.controlType === "quantity") {
        const quantity = Math.max(1, Number.parseInt(item.quantity || 1, 10) || 1);
        return `Số lượng: ${quantity}`;
      }
      return `Gói: ${item.selectedOption || "Vĩnh viễn"}`;
    }

    function renderActivePrice() {
      const active = getVariantById(activeVariantId);
      const wrap = document.getElementById("detail-active-price");
      if (!wrap) return;
      const oldPrice = active.oldPrice ? `<span class="bd-active-old-price">${formatCurrency(active.oldPrice)}</span>` : "";
      wrap.innerHTML = `
        <span class="bd-active-label">Đang chọn: <strong>${active.label}</strong></span>
        <span class="bd-active-meta">${getVariantMetaText(active)}</span>
        <span class="bd-active-amount">${formatCurrency(active.price)}</span>
        ${oldPrice}
      `;
    }

    function renderCategoryDropdown() {
      const wrap = document.getElementById("category-dropdown-list");
      const items = categories.map((item) => `
        <li>
          <a class="dropdown-item category-dropdown-item" href="${resolveItemHref(item.href)}" target="_blank" rel="noreferrer">
            <span class="category-item-icon" aria-hidden="true"><i class="bi ${item.icon || "bi-journal-bookmark"}"></i></span>
            <span class="category-item-label">${item.title}</span>
            <i class="bi bi-chevron-right category-item-arrow" aria-hidden="true"></i>
          </a>
        </li>
      `).join("");

      wrap.innerHTML = `<li class="category-dropdown-heading">
          <span>Danh mục sách</span>
          <i class="bi bi-list"></i>
        </li>
        ${items}
        <li><hr class="dropdown-divider m-0"></li>
        <li>
          <a class="dropdown-item category-dropdown-all" href="https://sachquocgia.vn/tat-ca-danh-muc" target="_blank" rel="noreferrer">
            <i class="bi bi-list"></i>
            <span>Xem tất cả danh mục</span>
          </a>
        </li>`;
    }

    function initCategoryDropdownInteraction() {
      const wrap = document.querySelector(".category-dropdown-wrap");
      const toggle = document.getElementById("category-toggle");
      const menu = document.getElementById("category-dropdown-list");
      if (!wrap || !toggle || !menu) return;
      if (!window.bootstrap) {
        window.addEventListener("load", initCategoryDropdownInteraction, { once: true });
        return;
      }

      const overlay = document.createElement("div");
      overlay.className = "category-menu-overlay";
      document.body.appendChild(overlay);

      const dropdown = bootstrap.Dropdown.getOrCreateInstance(toggle, { autoClose: true });
      const toggleIcon = toggle.querySelector("i");
      const canHover = window.matchMedia("(hover: hover)").matches;
      const isMobileMenu = window.matchMedia("(max-width: 900px)").matches;
      let hideTimer;

      const setToggleIcon = () => {
        if (!toggleIcon) return;
        toggleIcon.classList.remove("bi-x-lg");
        toggleIcon.classList.add("bi-grid");
      };

      const lockBodyScroll = () => {
        const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
        document.body.style.setProperty("--category-scrollbar-comp", `${scrollbarWidth}px`);
        document.body.classList.add("category-overlay-open");
      };

      const unlockBodyScroll = () => {
        document.body.classList.remove("category-overlay-open");
        document.body.style.removeProperty("--category-scrollbar-comp");
      };

      const showMenu = () => {
        clearTimeout(hideTimer);
        if (!toggle.classList.contains("show")) {
          dropdown.show();
        }
      };

      const hideMenu = (delay = 110) => {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (toggle.classList.contains("show")) {
            dropdown.hide();
          }
        }, delay);
      };

      const hideNow = () => {
        clearTimeout(hideTimer);
        if (toggle.classList.contains("show")) {
          dropdown.hide();
        }
      };

      if (canHover) {
        wrap.addEventListener("mouseenter", showMenu);
        wrap.addEventListener("mouseleave", () => hideMenu(120));
        menu.addEventListener("mouseenter", () => clearTimeout(hideTimer));
        menu.addEventListener("mouseleave", () => hideMenu(80));
        toggle.addEventListener("focus", showMenu);
      }

      toggle.addEventListener("show.bs.dropdown", () => {
        setToggleIcon();
        overlay.classList.add("active");
        if (isMobileMenu) lockBodyScroll();
      });

      toggle.addEventListener("hide.bs.dropdown", () => {
        setToggleIcon();
        overlay.classList.remove("active");
        if (isMobileMenu) unlockBodyScroll();
      });

      setToggleIcon();
      overlay.addEventListener("click", hideNow);
      overlay.addEventListener("mouseenter", hideNow);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") hideNow();
      });
    }

    function getResponsiveThumbLimit() {
      const width = window.innerWidth || document.documentElement.clientWidth || 0;
      if (width <= 480) return 3;
      if (width <= 768) return 3;
      if (width <= 992) return 4;
      return 5;
    }

    function renderDetailGalleryThumbs() {
      const wrap = document.getElementById("detail-thumb-list");
      if (!wrap) return;
      const maxVisible = getResponsiveThumbLimit();
      const hasMoreThumb = detailGallery.length >= maxVisible;
      const visibleImageCount = hasMoreThumb ? Math.max(1, maxVisible - 1) : maxVisible;
      const visibleGallery = detailGallery.slice(0, visibleImageCount);

      wrap.innerHTML = visibleGallery.map((src, idx) => `
        <button class="bd-thumb-btn ${idx === galleryIndex ? "active" : ""}" type="button" data-index="${idx}" aria-label="Anh ${idx + 1}">
          <span class="bd-thumb-image image-host">
            <img data-src="${src}" src="${lazyPlaceholder}" alt="Anh minh hoa ${idx + 1}" loading="lazy" decoding="async">
          </span>
        </button>
      `).join("") + (hasMoreThumb ? `
        <button class="bd-thumb-btn bd-thumb-btn-more" type="button" aria-label="Xem thêm hình ảnh">
          <span class="bd-thumb-image image-host"><i class="bi bi-images"></i></span>
          <span class="bd-thumb-more-text">Xem thêm hình ảnh</span>
        </button>
      ` : "");

      const thumbCount = visibleGallery.length + (hasMoreThumb ? 1 : 0);
      wrap.style.setProperty("--bd-thumb-cols", String(Math.max(1, thumbCount)));
    }

    function initResponsiveDetailThumbs() {
      let currentLimit = getResponsiveThumbLimit();
      window.addEventListener("resize", () => {
        const nextLimit = getResponsiveThumbLimit();
        if (nextLimit === currentLimit) return;
        currentLimit = nextLimit;
        renderDetailGalleryThumbs();
        syncGalleryMainImage();
        initLazyLoad();
      });
    }

    function syncGalleryMainImage() {
      const mainImage = document.getElementById("detail-main-image");
      if (!mainImage) return;
      mainImage.src = detailGallery[galleryIndex];
      let hasVisibleActive = false;
      document.querySelectorAll(".bd-thumb-btn[data-index]").forEach((btn) => {
        const isActive = Number(btn.dataset.index) === galleryIndex;
        if (isActive) hasVisibleActive = true;
        btn.classList.toggle("active", isActive);
      });
      const moreBtn = document.querySelector(".bd-thumb-btn-more");
      if (moreBtn) {
        moreBtn.classList.toggle("active", !hasVisibleActive);
      }
    }

    function initGalleryInteraction() {
      const prev = document.getElementById("detail-gallery-prev");
      const next = document.getElementById("detail-gallery-next");
      const wrap = document.getElementById("detail-thumb-list");
      const coverFrame = document.querySelector(".detail-page-v2 .bd-cover-frame");
      let startX = 0;
      let startY = 0;
      if (!wrap) return;

      prev?.addEventListener("click", () => {
        galleryIndex = (galleryIndex - 1 + detailGallery.length) % detailGallery.length;
        syncGalleryMainImage();
      });

      next?.addEventListener("click", () => {
        galleryIndex = (galleryIndex + 1) % detailGallery.length;
        syncGalleryMainImage();
      });

      wrap.addEventListener("click", (event) => {
        const target = event.target.closest(".bd-thumb-btn[data-index]");
        if (!target) return;
        galleryIndex = Number(target.dataset.index);
        syncGalleryMainImage();
      });

      coverFrame?.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        startX = touch.clientX;
        startY = touch.clientY;
      }, { passive: true });

      coverFrame?.addEventListener("touchend", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        if (Math.abs(deltaX) < 34 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (deltaX < 0) {
          galleryIndex = (galleryIndex + 1) % detailGallery.length;
        } else {
          galleryIndex = (galleryIndex - 1 + detailGallery.length) % detailGallery.length;
        }
        syncGalleryMainImage();
      }, { passive: true });
    }

    function getVariantById(id) {
      return productVariants.find((item) => item.id === id) || productVariants[0];
    }

    function renderVariantRow(item) {
      const isActive = activeVariantId === item.id;
      const checkedAttr = isActive ? "checked" : "";
      const oldPriceHtml = item.oldPrice ? `<span class="bd-old-price">${formatCurrency(item.oldPrice)}</span>` : "";

      let controlHtml = "";
      if (item.controlType === "quantity") {
        controlHtml = `
          <div class="bd-qty-control" data-variant-id="${item.id}">
            <button type="button" data-action="minus" aria-label="Giảm số lượng">-</button>
            <input type="text" value="${item.quantity}" inputmode="numeric" aria-label="Số lượng ${item.label}">
            <button type="button" data-action="plus" aria-label="Tăng số lượng">+</button>
          </div>`;
      } else {
        controlHtml = `
          <select class="bd-select-control" data-variant-id="${item.id}" aria-label="Gói ${item.label}">
            ${item.options.map((option) => `<option ${option === item.selectedOption ? "selected" : ""}>${option}</option>`).join("")}
          </select>`;
      }

      return `
        <div class="bd-variant-row ${isActive ? "active" : ""}" data-variant-id="${item.id}">
          <div class="bd-variant-left">
            <span class="bd-variant-label"><i class="bi ${item.icon}"></i>${item.label}</span>
            ${controlHtml}
            <div class="bd-variant-price-group">
              <strong>${formatCurrency(item.price)}</strong>
              ${oldPriceHtml}
            </div>
          </div>
          <label class="bd-variant-check" aria-label="Chọn ${item.label}">
            <input type="radio" name="detail-product-variant" data-variant-id="${item.id}" ${checkedAttr}>
            <i class="bi bi-check2"></i>
          </label>
        </div>`;
    }

    function renderProductVariants() {
      const wrap = document.getElementById("detail-variant-list");
      if (!wrap) return;
      wrap.innerHTML = productVariants.map(renderVariantRow).join("");
      syncProductActionState();
    }

    function syncProductActionState() {
      const active = getVariantById(activeVariantId);
      const buyBtn = document.getElementById("detail-buy-now-btn");
      const cartBtn = document.getElementById("detail-add-cart-btn");
      if (buyBtn) {
        buyBtn.dataset.variantId = active.id;
        buyBtn.dataset.variantLabel = active.label;
        buyBtn.setAttribute("aria-label", `Mua ngay ${active.label}`);
      }
      if (cartBtn) {
        cartBtn.dataset.variantId = active.id;
        cartBtn.dataset.variantLabel = active.label;
        cartBtn.setAttribute("aria-label", `Them vao gio ${active.label}`);
      }

      document.querySelectorAll(".bd-variant-row").forEach((row) => {
        row.classList.toggle("active", row.dataset.variantId === activeVariantId);
      });
      document.querySelectorAll(".bd-variant-check input").forEach((input) => {
        input.checked = input.dataset.variantId === activeVariantId;
      });
      renderActivePrice();
    }

    function initProductVariantEvents() {
      const wrap = document.getElementById("detail-variant-list");
      if (!wrap) return;

      wrap.addEventListener("click", (event) => {
        const minusPlusBtn = event.target.closest(".bd-qty-control button");
        if (minusPlusBtn) {
          event.stopPropagation();
          const control = minusPlusBtn.closest(".bd-qty-control");
          const input = control?.querySelector("input");
          const variant = getVariantById(control?.dataset.variantId || "");
          if (!input || !variant) return;
          const current = Math.max(1, Number.parseInt(input.value || "1", 10) || 1);
          const next = minusPlusBtn.dataset.action === "minus" ? Math.max(1, current - 1) : current + 1;
          variant.quantity = next;
          setActiveVariant(variant.id);
          input.value = String(next);
          syncProductActionState();
          return;
        }

        const radio = event.target.closest(".bd-variant-check input[type='radio']");
        if (radio) {
          event.stopPropagation();
          setActiveVariant(radio.dataset.variantId || "");
          syncProductActionState();
          return;
        }

        const row = event.target.closest(".bd-variant-row");
        if (!row) return;
        setActiveVariant(row.dataset.variantId || "");
        syncProductActionState();
      });

      wrap.addEventListener("change", (event) => {
        const select = event.target.closest(".bd-select-control");
        if (select) {
          const variant = getVariantById(select.dataset.variantId || "");
          variant.selectedOption = select.value;
          setActiveVariant(variant.id);
          syncProductActionState();
          return;
        }

        const input = event.target.closest(".bd-qty-control input");
        if (input) {
          const control = input.closest(".bd-qty-control");
          const variant = getVariantById(control?.dataset.variantId || "");
          const next = Math.max(1, Number.parseInt(input.value || "1", 10) || 1);
          variant.quantity = next;
          setActiveVariant(variant.id);
          input.value = String(next);
          syncProductActionState();
        }
      });
    }

    function renderRanking(targetId, items) {
      const wrap = document.getElementById(targetId);
      if (!wrap) return;
      wrap.innerHTML = items.map((item, idx) => `
        <a class="rank-item" href="${resolveBookDetailHref()}">
          <div class="rank-thumb image-host">
            <span class="rank-no">${idx + 1}</span>
            ${lazyImage(item.img, item.title)}
          </div>
          <div class="rank-content">
            <h5>${item.title}</h5>
            <p>${item.metric}</p>
          </div>
        </a>
      `).join("");
    }

    function renderDetailCarousel(trackId, items) {
      const track = document.getElementById(trackId);
      if (!track) return;
      track.innerHTML = items.map((item) => `
        <a class="featured-book" href="${resolveBookDetailHref()}">
          <div class="featured-book-thumb image-host">${lazyImage(item.img, item.title)}</div>
          <h4>${item.title}</h4>
          <p class="featured-price">Chỉ từ ${item.price}</p>
        </a>
      `).join("");
    }

    function alignFeaturedCarouselNav() {
      const carousels = document.querySelectorAll(".featured-carousel");
      carousels.forEach((carousel) => {
        const thumb = carousel.querySelector(".featured-book-thumb");
        if (!thumb) return;
        const top = thumb.offsetTop + (thumb.offsetHeight / 2);
        carousel.style.setProperty("--carousel-nav-top", `${top}px`);
      });
    }

    function initLoopBookCarousel(trackId, prevId, nextId, viewportId) {
      const track = document.getElementById(trackId);
      const prev = document.getElementById(prevId);
      const next = document.getElementById(nextId);
      const viewport = document.getElementById(viewportId);
      if (!track || !viewport) return;

      let timer;
      let isAnimating = false;

      function getStep() {
        const card = track.firstElementChild;
        if (!card) return 0;
        const gap = parseFloat(getComputedStyle(track).gap || "24");
        return card.getBoundingClientRect().width + gap;
      }

      function moveNext() {
        if (isAnimating || track.children.length < 2) return;
        const first = track.firstElementChild;
        const step = getStep();
        if (!first || !step) return;

        isAnimating = true;
        track.style.transition = "transform 420ms ease";
        track.style.transform = `translateX(-${step}px)`;

        const onEnd = () => {
          track.removeEventListener("transitionend", onEnd);
          track.style.transition = "none";
          track.appendChild(first);
          track.style.transform = "translateX(0)";
          track.offsetHeight;
          isAnimating = false;
          initLazyLoad();
        };

        track.addEventListener("transitionend", onEnd);
      }

      function movePrev() {
        if (isAnimating || track.children.length < 2) return;
        const last = track.lastElementChild;
        const step = getStep();
        if (!last || !step) return;

        track.style.transition = "none";
        track.insertBefore(last, track.firstElementChild);
        track.style.transform = `translateX(-${step}px)`;
        track.offsetHeight;

        isAnimating = true;
        track.style.transition = "transform 420ms ease";
        track.style.transform = "translateX(0)";

        const onEnd = () => {
          track.removeEventListener("transitionend", onEnd);
          track.style.transition = "none";
          isAnimating = false;
          initLazyLoad();
        };

        track.addEventListener("transitionend", onEnd);
      }

      function startAuto() {
        stopAuto();
        timer = setInterval(moveNext, 2800);
      }

      function stopAuto() {
        if (timer) clearInterval(timer);
      }

      if (next) next.addEventListener("click", () => { moveNext(); startAuto(); });
      if (prev) prev.addEventListener("click", () => { movePrev(); startAuto(); });
      viewport.addEventListener("mouseenter", stopAuto);
      viewport.addEventListener("mouseleave", startAuto);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAuto();
        else startAuto();
      });
      window.addEventListener("resize", () => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
      });
      startAuto();
    }

    function initLazyLoad() {
      const targets = document.querySelectorAll("img[data-src]");
      if (!("IntersectionObserver" in window)) {
        targets.forEach((img) => {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        });
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) img.src = src;
          img.removeAttribute("data-src");
          obs.unobserve(img);
        });
      }, { rootMargin: "160px 0px" });

      targets.forEach((img) => observer.observe(img));
    }

    function syncAuthorAvatars() {
      const avatarSrc = "assets/img/avar-icon.png";
      document.querySelectorAll("#detail-author .bd-author-avatar img").forEach((img) => {
        img.src = avatarSrc;
        img.removeAttribute("data-src");
      });
    }

    function renderCommentDemo() {
      const list = document.querySelector(".bd-comment-card .bd-comment-list");
      if (!list) return;

      list.innerHTML = `
        <article class="bd-comment-thread">
          <div class="bd-comment-parent">
            <span class="bd-comment-avatar">T</span>
            <div class="bd-comment-body">
              <header class="bd-comment-head">
                <strong>Tiến</strong>
              </header>
              <p class="bd-comment-text">Mình không mua được sách Ad ơi?</p>
              <div class="bd-comment-actions">
                <a href="#">Trả lời</a>
                <span>- 23 giờ trước</span>
              </div>

              <article class="bd-comment-reply">
                <header class="bd-comment-reply-head">
                  <span class="bd-comment-admin-icon"><i class="bi bi-patch-check-fill"></i></span>
                  <strong>Thành Luân</strong>
                  <span class="bd-comment-admin-role">Quản Trị Viên</span>
                </header>
                <p>Chào bạn!</p>
                <p>Bên mình đã nhận tin hướng dẫn, bạn vui lòng kiểm tra email nhé!</p>
                <p>Xin cảm ơn bạn.</p>
                <div class="bd-comment-actions">
                  <a href="#">Trả lời</a>
                  <span>- 23 giờ trước</span>
                </div>
              </article>
            </div>
          </div>
        </article>
      `;

      const input = document.querySelector(".bd-comment-card .bd-comment-form textarea");
      if (input) input.placeholder = "Mời Bạn để lại bình luận...";
      const submit = document.querySelector(".bd-comment-card .bd-comment-form button");
      if (submit) submit.textContent = "Gửi bình luận";
    }

    setActiveVariant(activeVariantId);
    renderCategoryDropdown();
    initCategoryDropdownInteraction();
    renderDetailGalleryThumbs();
    syncGalleryMainImage();
    initGalleryInteraction();
    initResponsiveDetailThumbs();
    renderProductVariants();
    initProductVariantEvents();
    renderDetailCarousel("detail-related-track", relatedBooks);
    renderDetailCarousel("detail-topic-track", topicBooks);
    renderRanking("sidebar-buy", buyMost);
    renderRanking("sidebar-view", viewMost);
    renderRanking("sidebar-buy-tab", buyMost);
    renderRanking("sidebar-view-tab", viewMost);
    renderCommentDemo();
    initLoopBookCarousel("detail-related-track", "detail-related-prev", "detail-related-next", "detail-related-viewport");
    initLoopBookCarousel("detail-topic-track", "detail-topic-prev", "detail-topic-next", "detail-topic-viewport");
    syncAuthorAvatars();
    initLazyLoad();
    alignFeaturedCarouselNav();
    window.addEventListener("resize", alignFeaturedCarouselNav);
    (function () {
      var btn = document.getElementById('scroll-to-top');
      if (!btn) return;
      window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 320);
      }, { passive: true });
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();

    if (typeof window.initAiChatbotWidget === "function") {
      var detailTitleNode = document.querySelector(".bd-summary-head h1");
      var detailBookTitle = detailTitleNode ? detailTitleNode.textContent.trim() : "Chi tiết sách";
      var detailBookMeta = {
        bookId: "b12323",
        title: detailBookTitle,
        detailUrl: "book-detail.html",
        buyUrl: "book-detail.html",
        readerUrl: "https://sachquocgia.vn/customer/purchased-book"
      };

      window.initAiChatbotWidget({
        mode: "mock",
        pageType: "detail",
        currentBook: detailBookMeta,
        userState: { isPurchased: false },
        routes: {
          detail: function (bookMeta) {
            return (bookMeta && bookMeta.detailUrl) || "book-detail.html";
          },
          reader: function (bookMeta) {
            return (bookMeta && bookMeta.readerUrl) || "https://sachquocgia.vn/customer/purchased-book";
          },
          buy: function (bookMeta) {
            return (bookMeta && bookMeta.buyUrl) || ((bookMeta && bookMeta.detailUrl) || "book-detail.html");
          }
        }
      });
    }


