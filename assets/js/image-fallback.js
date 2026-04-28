(function () {
  const HOST_CLASS = "image-host";
  const HIDDEN_CLASS = "image-fallback-hidden";
  const ICON_CLASS = "image-fallback-icon";
  const ICON_BI_CLASS = "bi bi-card-image";
  const PLACEHOLDER_PREFIX = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///";

  function getHost(img) {
    const host = img.parentElement;
    if (!host) return null;
    host.classList.add(HOST_CLASS);
    return host;
  }

  function ensureIcon(host) {
    let icon = host.querySelector(`:scope > .${ICON_CLASS}`);
    if (!icon) {
      icon = document.createElement("i");
      icon.className = `${ICON_BI_CLASS} ${ICON_CLASS}`;
      icon.setAttribute("aria-hidden", "true");
      host.appendChild(icon);
    }
    return icon;
  }

  function showFallback(img) {
    const host = getHost(img);
    if (!host) return;
    ensureIcon(host);
    img.classList.add(HIDDEN_CLASS);
  }

  function hideFallback(img) {
    const host = getHost(img);
    if (!host) return;
    const icon = host.querySelector(`:scope > .${ICON_CLASS}`);
    if (icon) icon.remove();
    img.classList.remove(HIDDEN_CLASS);
  }

  function isMissingSource(img) {
    const dataSrc = (img.getAttribute("data-src") || "").trim();
    const src = (img.getAttribute("src") || "").trim();
    const srcset = (img.getAttribute("srcset") || "").trim();

    if (dataSrc || srcset) return false;
    if (!src) return true;
    if (src.startsWith(PLACEHOLDER_PREFIX)) return true;
    if (img.complete && img.naturalWidth === 0) return true;
    return false;
  }

  function bindImage(img) {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.fallbackBound === "1") return;
    img.dataset.fallbackBound = "1";

    getHost(img);
    img.addEventListener("load", () => hideFallback(img));
    img.addEventListener("error", () => showFallback(img));

    if (isMissingSource(img)) {
      showFallback(img);
      return;
    }

    if (img.complete && img.naturalWidth > 0) {
      hideFallback(img);
    }
  }

  function scan(root) {
    if (!root) return;
    if (root instanceof HTMLImageElement) {
      bindImage(root);
      return;
    }
    if (!(root instanceof Element) && root !== document) return;
    const images = root.querySelectorAll ? root.querySelectorAll("img") : [];
    images.forEach(bindImage);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        scan(node);
      });
    });
  });

  function init() {
    scan(document);
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  window.ensureImageFallback = scan;
})();
