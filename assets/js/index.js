    const site = "https://sachquocgia.vn";
    const bookDetailPage = "book-detail.html";
    const lazyPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    const categories = [
      { title: "Tủ sách Nhân vật", href: "/nhan-vat-c189", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161408118.png", color: "#e2dbff", icon: "bi-journal-bookmark" },
      { title: "Tủ sách Lý luận chính trị", href: "/sach-ly-luan-chinh-tri-c191", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161357353.png", color: "#d4ecff", icon: "bi-globe2" },
      { title: "Tủ sách Luật", href: "/tu-sach-luat-c202", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161350415.png", color: "#ffe8da", icon: "bi-bookmark-star" },
      { title: "Tủ sách Giáo trình - Tài liệu", href: "/giao-trinh-va-tai-lieu-hoc-tap-c203", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161343352.png", color: "#ffd8cf", icon: "bi-building" },
      { title: "Tủ sách Ban chỉ đạo 35", href: "/tu-sach-35-c199", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161334227.png", color: "#dcffdf", icon: "bi-file-earmark-text" },
      { title: "Tủ sách Chi Bộ", href: "/tu-sach-chi-bo-c193", img: "https://images.sachquocgia.vn/Picture/2024/3/14/image-20240314161325774.png", color: "#fff0d3", icon: "bi-collection" }
    ];

    const heroSlides = [
      { title: "Slide 1", href: "#", img: "https://images.sachquocgia.vn/Picture/2025/8/25/image-20250825091242581.jpg" },
      { title: "Slide 2", href: "#", img: "https://images.sachquocgia.vn/Picture/2025/8/25/image-20250825091630650.jpg" },
      { title: "Slide 3", href: "#", img: "https://images.sachquocgia.vn/Picture/2025/8/25/image-20250825091702025.jpg" }
    ];

    const books = [
      { title: "Miền Nam trong trái tim Hồ Chí Minh", href: "/mien-nam-trong-trai-tim-ho-chi-minh-b14870.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030172913646.jpg", price: "73.550₫" },
      { title: "Thư ký Bác Hồ kể chuyện (Xuất bản lần thứ tư, có chỉnh sửa)", href: "/thu-ky-bac-ho-ke-chuyen-xuat-ban-lan-thu-tu-co-chinh-sua-b14878.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030180621474.jpg", price: "53.800₫" },
      { title: "Làng nghề, phố nghề Thăng Long - Hà Nội", href: "/lang-nghe-pho-nghe-thang-long-ha-noi-b14865.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030171310362.jpg", price: "53.800₫" },
      { title: "Hồ Chủ tịch - Hình ảnh của dân tộc, tinh hoa của thời đại", href: "/ho-chu-tich-hinh-anh-cua-dan-toc-tinh-hoa-cua-thoi-dai-xuat-ban-lan-thu-hai-b14862.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/30/image-20251030162137031.jpg", price: "20.150₫" },
      { title: "Phương pháp, kỹ năng, kinh nghiệm chủ trì, tham dự Hội nghị", href: "/phuong-phap-ky-nang-kinh-nghiem-chu-tri-tham-du-hoi-nghi-hoi-thao-khoa-hoc-xuat-ban-lan-thu-hai-b14849.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/7/image-20251007090002999.jpg", price: "29.900₫" },
      { title: "Ngoại giao văn hóa Mỹ trong hai thập niên đầu thế kỷ XXI", href: "/ngoai-giao-van-hoa-my-trong-hai-thap-nien-dau-the-ky-xxi-b14845.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/6/image-20251006104331846.jpg", price: "42.200₫" },
      { title: "Người xưa giữ nước (kể chuyện bảo vệ biên cương, biển đảo)", href: "/nguoi-xua-giu-nuoc-ke-chuyen-bao-ve-bien-cuong-bien-dao-b14846.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/6/image-20251006104918207.jpg", price: "43.900₫" },
      { title: "Hồ Chí Minh - Vĩ đại một con người (Tái bản)", href: "/ho-chi-minh-vi-dai-mot-con-nguoi-tai-ban-co-chinh-sua-b14842.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/6/image-20251006101523800.jpg", price: "44.500₫" },
      { title: "Hồ Chí Minh qua hồi ức của những cựu tù chính trị Côn Đảo", href: "/ho-chi-minh-qua-hoi-uc-cua-nhung-cuu-tu-chinh-tri-con-dao-b14841.html", img: "https://images.sachquocgia.vn/Thumbs/2025/10/3/image-20251003161423546.jpg", price: "39.300₫" },
      { title: "Bảy cuộc khủng hoảng định hình toàn cầu hóa", href: "/bay-cuoc-khung-hoang-dinh-hinh-toan-cau-hoa-sach-tham-khao-b14820.html", img: "https://images.sachquocgia.vn/Thumbs/2025/8/13/image-20250813144547630.jpg", price: "106.100₫" }
    ];

    const vipPlans = [
      { title: "Tài khoản VIP - 10 ngày", href: "https://nxbtrithuc.com.vn/checkout/payment-vip/5", img: "https://media.nxbtrithuc.com.vn/Thumbs/2023/2/9/image-20230209111713095.jpg", price: "50.000₫" },
      { title: "Tài khoản VIP - 1 tháng", href: "https://nxbtrithuc.com.vn/checkout/payment-vip/10", img: "https://media.nxbtrithuc.com.vn/Thumbs/2023/2/9/image-2023020911172897.jpg", price: "150.000₫" },
      { title: "Tài khoản VIP - 3 tháng", href: "https://nxbtrithuc.com.vn/checkout/payment-vip/12", img: "https://media.nxbtrithuc.com.vn/Thumbs/2023/2/9/image-20230209111738813.jpg", price: "450.000₫" },
      { title: "Tài khoản VIP - 6 tháng", href: "https://nxbtrithuc.com.vn/checkout/payment-vip/13", img: "https://media.nxbtrithuc.com.vn/Thumbs/2023/2/9/image-20230209111748674.jpg", price: "800.000₫" },
      { title: "Tài khoản VIP 12 tháng", href: "https://nxbtrithuc.com.vn/checkout/payment-vip/14", img: "https://media.nxbtrithuc.com.vn/Thumbs/2023/2/9/image-20230209111757315.jpg", price: "1.500.000₫" }
    ];

    const buyMost = [
      { title: "Giáo trình Tư tưởng Hồ Chí Minh", href: "/giao-trinh-tu-tuong-ho-chi-minh-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12468.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-2024032114215276.jpg", metric: "131 lượt mua" },
      { title: "Giáo trình triết học", href: "/giao-trinh-triet-hoc-dung-cho-khoi-khong-chuyen-nganh-triet-hoc-trinh-do-dao-tao-thac-si-tien-si-cac-nganh-khoa-hoc-tu-nhien-cong-nghe-xuat-ban-lan-thu-nam-b12100.html", img: "https://images.sachquocgia.vn/Thumbs/2024/4/24/image-20240424174821224.jpg", metric: "101 lượt mua" },
      { title: "[Sách nói] Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", href: "/sach-noi-tu-hao-va-tin-tuong-duoi-la-co-ve-vang-cua-dang-quyet-tam-xay-dung-mot-nuoc-viet-nam-ngay-cang-giau-manh-van-minh-van-hien-va-anh-hung-b12401.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/1/image-20240301180127722.jpg", metric: "87 lượt mua" },
      { title: "Giáo trình Triết học Mác - Lênin", href: "/giao-trinh-triet-hoc-mac-lenin-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12466.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-20240321142038119.jpg", metric: "61 lượt mua" },
      { title: "Giáo trình Lịch sử Đảng Cộng sản Việt Nam", href: "/giao-trinh-lich-su-dang-cong-san-viet-nam-danh-cho-bac-dai-hoc-he-khong-chuyen-ly-luan-chinh-tri-b12464.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/21/image-2024032114122991.jpg", metric: "57 lượt mua" }
    ];

    const viewMost = [
      { title: "Xây dựng và phát triển nền văn hóa Việt Nam tiên tiến", href: "/xay-dung-va-phat-trien-nen-van-hoa-viet-nam-tien-tien-dam-da-ban-sac-dan-toc-b12938.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/17/image-20240617144737905.jpg", metric: "6368 lượt xem" },
      { title: "[Sách nói] Tự hào và tin tưởng dưới lá cờ vẻ vang của Đảng", href: "/sach-noi-tu-hao-va-tin-tuong-duoi-la-co-ve-vang-cua-dang-quyet-tam-xay-dung-mot-nuoc-viet-nam-ngay-cang-giau-manh-van-minh-van-hien-va-anh-hung-b12401.html", img: "https://images.sachquocgia.vn/Thumbs/2024/3/1/image-20240301180127722.jpg", metric: "4031 lượt xem" },
      { title: "Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh", href: "/xay-dung-dang-va-he-thong-chinh-tri-trong-sach-vung-manh-gop-phan-thuc-hien-thang-loi-nghi-quyet-dai-hoi-xiii-cua-dang-b12274.html", img: "https://images.sachquocgia.vn/Thumbs/2024/6/4/image-20240604154256965.jpg", metric: "2395 lượt xem" },
      { title: "Xây dựng và phát triển nền đối ngoại, ngoại giao Việt Nam", href: "/xay-dung-va-phat-trien-nen-doi-ngoai-ngoai-giao-viet-nam-toan-dien-hien-dai-mang-dam-ban-sac-cay-tre-viet-nam-b12323.html", img: "https://images.sachquocgia.vn/Thumbs/2024/2/29/image-20240229010554659.jpg", metric: "2172 lượt xem" },
      { title: "Biến thách thức thành cơ hội, quyết tâm tạo đột phá", href: "/bien-thach-thuc-thanh-co-hoi-quyet-tam-tao-dot-pha-dua-dat-nuoc-phat-trien-nhanh-ben-vung-b12273.html", img: "https://images.sachquocgia.vn/Thumbs/2024/2/1/image-20240201202405322.jpg", metric: "2158 lượt xem" }
    ];

    function lazyImage(src, alt, extraClass = "") {
      return `<img class="lazy-image ${extraClass}" data-src="${src}" src="${lazyPlaceholder}" alt="${alt}" loading="lazy" decoding="async">`;
    }

    function resolveItemHref(href) {
      return /^https?:\/\//i.test(href) ? href : `${site}${href}`;
    }

    function resolveBookDetailHref() {
      return bookDetailPage;
    }

    function renderShelfCarousel() {
      const track = document.getElementById("shelf-carousel-track");
      track.innerHTML = categories.map((item) => `
        <a class="shelf-book" href="${resolveItemHref(item.href)}" target="_blank" rel="noreferrer">
          <div class="shelf-card">
            <div class="shelf-card-thumb">${lazyImage(item.img, item.title)}</div>
            <h4>${item.title}</h4>
          </div>
        </a>
      `).join("");
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
          toggle.click();
        }
      };

      const hideMenu = (delay = 110) => {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (toggle.classList.contains("show")) {
            toggle.click();
          }
        }, delay);
      };

      const hideNow = () => {
        clearTimeout(hideTimer);
        if (toggle.classList.contains("show")) {
          toggle.click();
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
        lockBodyScroll();
      });

      toggle.addEventListener("hide.bs.dropdown", () => {
        setToggleIcon();
        overlay.classList.remove("active");
        unlockBodyScroll();
      });

      setToggleIcon();
      overlay.addEventListener("click", hideNow);
      overlay.addEventListener("mouseenter", hideNow);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") hideNow();
      });
    }

    function renderHeroSlider() {
      const slidesWrap = document.getElementById("hero-slides");
      const dotsWrap = document.getElementById("hero-dots");
      slidesWrap.innerHTML = heroSlides.map((item, idx) => `
        <a class="hero-slide${idx === 0 ? " active" : ""}" href="${site}" target="_blank" rel="noreferrer" aria-label="${item.title}">
          <img src="${item.img}" alt="${item.title}" loading="lazy" decoding="async">
        </a>
      `).join("");
      dotsWrap.innerHTML = heroSlides.map((_, idx) => `
        <button class="hero-dot${idx === 0 ? " active" : ""}" type="button" data-index="${idx}" aria-label="Slide ${idx + 1}"></button>
      `).join("");
    }

    function initHeroSlider() {
      const slides = Array.from(document.querySelectorAll(".hero-slide"));
      const dots = Array.from(document.querySelectorAll(".hero-dot"));
      const prev = document.getElementById("hero-prev");
      const next = document.getElementById("hero-next");
      const root = document.querySelector(".hero-slider");
      let index = 0;
      let timer;
      let startX = 0;
      let startY = 0;

      function show(nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
      }

      function start() {
        stop();
        timer = setInterval(() => show(index + 1), 4500);
      }

      function stop() {
        if (timer) clearInterval(timer);
      }

      prev.addEventListener("click", () => { show(index - 1); start(); });
      next.addEventListener("click", () => { show(index + 1); start(); });
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          show(Number(dot.dataset.index || 0));
          start();
        });
      });
      root.addEventListener("mouseenter", stop);
      root.addEventListener("mouseleave", start);
      root.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        startX = touch.clientX;
        startY = touch.clientY;
      }, { passive: true });
      root.addEventListener("touchend", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        if (Math.abs(deltaX) < 38 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (deltaX < 0) show(index + 1);
        else show(index - 1);
        start();
      }, { passive: true });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
      });
      start();
    }

    function renderBookCards(targetId, items, isVip = false) {
      const wrap = document.getElementById(targetId);
      const isLibrarySection = targetId === "library-books";
      wrap.innerHTML = items.map((item) => `
        <a class="book-card ${isVip ? "book-card-vip" : ""} ${isLibrarySection ? "" : "book-card-flat"}" href="${resolveBookDetailHref()}">
          <div class="thumb">${lazyImage(item.img, item.title)}</div>
          <h4>${item.title}</h4>
          <p class="price">Chỉ từ: <strong>${item.price}</strong></p>
        </a>
      `).join("");
    }

    function renderRanking(targetId, items) {
      const wrap = document.getElementById(targetId);
      if (!wrap) return;
      wrap.innerHTML = items.map((item, idx) => `
        <a class="rank-item" href="${resolveBookDetailHref()}">
          <div class="rank-thumb">
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

    function renderFeaturedCarousel() {
      const track = document.getElementById("featured-carousel-track");
      const carouselBooks = books.slice(0, 10);
      track.innerHTML = carouselBooks.map((item) => `
        <a class="featured-book" href="${resolveBookDetailHref()}">
          <div class="featured-book-thumb">${lazyImage(item.img, item.title)}</div>
          <h4>${item.title}</h4>
          <p class="featured-price">Chỉ từ ${item.price}</p>
        </a>
      `).join("");
    }

    function renderGoodBooksCarousel() {
      const track = document.getElementById("good-books-carousel-track");
      const carouselBooks = [...books].reverse();
      track.innerHTML = carouselBooks.map((item) => `
        <a class="featured-book" href="${resolveBookDetailHref()}">
          <div class="featured-book-thumb">${lazyImage(item.img, item.title)}</div>
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
        timer = setInterval(moveNext, 2600);
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

    renderShelfCarousel();
    renderCategoryDropdown();
    initCategoryDropdownInteraction();
    renderHeroSlider();
    renderFeaturedCarousel();
    renderGoodBooksCarousel();
    alignFeaturedCarouselNav();
    renderBookCards("library-books", books.slice(0, 5));
    renderBookCards("vip-books", vipPlans, true);
    renderBookCards("section-new-books", books.slice(5, 10));
    renderBookCards("section-law-books", [books[3], books[4], books[6], books[8], books[9]]);
    renderBookCards("section-reprint-books", [books[2], books[7], books[1], books[5], books[0]]);
    renderRanking("sidebar-buy", buyMost);
    renderRanking("sidebar-view", viewMost);
    renderRanking("sidebar-buy-tab", buyMost);
    renderRanking("sidebar-view-tab", viewMost);
    initHeroSlider();
    initLoopBookCarousel("shelf-carousel-track", "shelf-prev", "shelf-next", "shelf-carousel-viewport");
    initLoopBookCarousel("featured-carousel-track", "featured-prev", "featured-next", "featured-carousel-viewport");
    initLoopBookCarousel("good-books-carousel-track", "good-books-prev", "good-books-next", "good-books-carousel-viewport");
    initLazyLoad();
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
      window.initAiChatbotWidget({
        mode: "mock",
        pageType: "home",
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



