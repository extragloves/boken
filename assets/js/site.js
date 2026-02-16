(function () {
  "use strict";

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function hidePreloader() {
    var preloader = qs(".preloader");
    if (!preloader) {
      return;
    }
    preloader.classList.add("preloader-hidden");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 600);
  }

  function updateHeaderCloneHeight() {
    var header = qs(".site-header");
    var clone = qs(".header-clone");
    if (!header || !clone) {
      return;
    }
    clone.style.height = header.offsetHeight + "px";
  }

  function bindHeaderScrolled() {
    var header = qs(".site-header");
    if (!header) {
      return;
    }
    var onScroll = function () {
      if (window.scrollY > 0) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function bindHeaderInfoFade() {
    var headerInfo = qs(".header-info");
    if (!headerInfo) {
      return;
    }
    var fadeDistance = 400;
    var onScroll = function () {
      var top = window.scrollY || document.documentElement.scrollTop || 0;
      var opacity = 0;
      if (top <= 100) {
        opacity = 1;
      } else if (top <= fadeDistance) {
        opacity = 1 - top / fadeDistance;
      }
      headerInfo.style.opacity = String(opacity);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupMobileNavigation() {
    var menuIcon = qs(".btn-menu .fa");
    var mobileQuery = window.matchMedia("(max-width: 1024px)");

    function ensureSubmenuToggles(nav) {
      qsa("li", nav).forEach(function (item) {
        var childMenu = null;
        Array.prototype.forEach.call(item.children, function (child) {
          if (!childMenu && child.tagName === "UL") {
            childMenu = child;
          }
        });
        if (!childMenu) {
          return;
        }
        var hasToggle = false;
        Array.prototype.forEach.call(item.children, function (child) {
          if (child.classList && child.classList.contains("btn-submenu")) {
            hasToggle = true;
          }
        });
        if (!hasToggle) {
          var toggle = document.createElement("span");
          toggle.className = "btn-submenu";
          item.appendChild(toggle);
        }
        childMenu.style.display = "none";
      });
    }

    function removeSubmenuToggles(nav) {
      qsa(".btn-submenu", nav).forEach(function (el) {
        el.remove();
      });
      qsa("ul ul", nav).forEach(function (sub) {
        sub.style.display = "";
      });
    }

    function applyNavMode() {
      var nav = qs("#mainnav, #mainnav-mobi");
      if (!nav) {
        return;
      }

      if (mobileQuery.matches) {
        if (nav.id !== "mainnav-mobi") {
          nav.id = "mainnav-mobi";
          nav.style.display = "none";
        }
        ensureSubmenuToggles(nav);
        if (menuIcon) {
          menuIcon.classList.remove("active");
        }
      } else {
        if (nav.id !== "mainnav") {
          nav.id = "mainnav";
        }
        nav.style.display = "";
        removeSubmenuToggles(nav);
      }
    }

    if (menuIcon) {
      menuIcon.addEventListener("click", function () {
        var nav = qs("#mainnav-mobi");
        if (!nav) {
          return;
        }
        var isOpen = nav.style.display !== "none" && nav.style.display !== "";
        nav.style.display = isOpen ? "none" : "block";
        menuIcon.classList.toggle("active", !isOpen);
      });
    }

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest(".btn-submenu");
      if (!toggle) {
        return;
      }
      var submenu = toggle.previousElementSibling;
      if (!submenu || submenu.tagName !== "UL") {
        return;
      }
      var isOpen = submenu.style.display !== "none" && submenu.style.display !== "";
      submenu.style.display = isOpen ? "none" : "block";
      toggle.classList.toggle("active", !isOpen);
      event.preventDefault();
      event.stopPropagation();
    });

    applyNavMode();
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", applyNavMode);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(applyNavMode);
    }
    window.addEventListener("resize", updateHeaderCloneHeight);
  }

  document.addEventListener("DOMContentLoaded", function () {
    hidePreloader();
    updateHeaderCloneHeight();
    bindHeaderScrolled();
    bindHeaderInfoFade();
    setupMobileNavigation();
  });
})();
