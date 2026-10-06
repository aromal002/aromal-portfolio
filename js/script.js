import Lenis from 'lenis';

/* ==========================
   BUTTERY SMOOTH INERTIAL SCROLL (LENIS)
========================== */

// Prevent browser from restoring previous scroll position (e.g. #services)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    infinite: false,
});

window.lenis = lenis;

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Handle initial position & hash navigation (e.g. returning to index.html#work)
function resetToTop() {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
}

if (window.location.hash && window.location.hash.length > 1) {
    const targetHash = window.location.hash;
    const scrollToHash = () => {
        const target = document.querySelector(targetHash);
        if (target) {
            lenis.scrollTo(target, { offset: -80, duration: 1.0 });
        }
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(scrollToHash, 80);
    } else {
        window.addEventListener('load', () => setTimeout(scrollToHash, 100));
        document.addEventListener('DOMContentLoaded', () => setTimeout(scrollToHash, 100));
    }
} else {
    resetToTop();
    window.addEventListener('load', resetToTop);
    document.addEventListener('DOMContentLoaded', resetToTop);
}

// Smooth scroll for all hash/anchor links
document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Internal anchor on current page
    if (href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.25,
            });
        }
    }
});

/* ==========================
   PREMIUM SCROLL REVEAL
========================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.15
});

revealElements.forEach(el=>{

    revealObserver.observe(el);

});

// ==========================
// MOBILE MENU
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}

/* ==========================
   COUNTER ANIMATION
========================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = parseFloat(counter.dataset.target);

            let current = 0;

            const speed = target / 60;

            const updateCounter = ()=>{

                current += speed;

                if(current < target){

                    if(target % 1 !== 0){

                        counter.textContent = current.toFixed(1);

                    }else{

                        counter.textContent = Math.floor(current);

                    }

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.textContent = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:.6
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/* ==========================
   ACTIVE NAVBAR
========================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let current = "";
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
lenis.on('scroll', updateActiveNav);
updateActiveNav();
/* ==========================
   FAST LOADER
========================== */

function dismissLoader() {
    const loader = document.querySelector(".loader");
    if (loader && !loader.classList.contains("hide")) {
        loader.classList.add("hide");
    }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(dismissLoader, 100);
} else {
    document.addEventListener("DOMContentLoaded", () => setTimeout(dismissLoader, 150));
    window.addEventListener("load", dismissLoader);
    setTimeout(dismissLoader, 350); // Fail-safe limit
}

// LR INTERIORS CAMPAIGN SLIDER

document.addEventListener("DOMContentLoaded", () => {

    const lrCampaignImage = document.getElementById("lrCampaignImage");
    const lrCampaignNext = document.getElementById("lrCampaignNext");

    const lrCampaignImages = [
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230460/lr-campaign-01_edic60.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230461/lr-campaign-02_d24gml.png"
    ];

    let lrCampaignIndex = 0;

    if (lrCampaignImage && lrCampaignNext) {

        lrCampaignNext.addEventListener("click", () => {

            lrCampaignIndex++;

            if (lrCampaignIndex >= lrCampaignImages.length) {
                lrCampaignIndex = 0;
            }

            lrCampaignImage.src = lrCampaignImages[lrCampaignIndex];

        });

    }

});

// UIRDF CAMPAIGN SLIDER

document.addEventListener("DOMContentLoaded", () => {

    const uirdfCampaignImage = document.getElementById("uirdfCampaignImage");
    const uirdfCampaignNext = document.getElementById("uirdfCampaignNext");

    const uirdfCampaignImages = [
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791229902/uirdf-campaign-01_nv17ez.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230025/uirdf-campaign-02_kaunnv.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230080/uirdf-campaign-03_qvzogm.png"
    ];

    let uirdfCampaignIndex = 0;

    if (uirdfCampaignImage && uirdfCampaignNext) {

        uirdfCampaignNext.addEventListener("click", () => {

            uirdfCampaignIndex++;

            if (uirdfCampaignIndex >= uirdfCampaignImages.length) {
                uirdfCampaignIndex = 0;
            }

            uirdfCampaignImage.src = uirdfCampaignImages[uirdfCampaignIndex];

        });

    }

});

// GTEC CAMPAIGN SLIDER

document.addEventListener("DOMContentLoaded", () => {

    const gtecCampaignImage = document.getElementById("gtecCampaignImage");
    const gtecCampaignNext = document.getElementById("gtecCampaignNext");

    const gtecCampaignImages = [
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230814/gtec-01_spwfpa.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230864/gtec-02_qqngyj.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230868/gtec-03_rrbwgz.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230847/gtec-04_l9hj08.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230855/gtec-05_iol0lz.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791230856/gtec-06_p2uupg.png"
    ];

    let gtecCampaignIndex = 0;

    if (gtecCampaignImage && gtecCampaignNext) {

        gtecCampaignNext.addEventListener("click", () => {

            gtecCampaignIndex++;

            if (gtecCampaignIndex >= gtecCampaignImages.length) {
                gtecCampaignIndex = 0;
            }

            gtecCampaignImage.src = gtecCampaignImages[gtecCampaignIndex];

        });

    }

});

// UR FURNACE CAMPAIGN SLIDER

document.addEventListener("DOMContentLoaded", () => {

    const urCampaignImage = document.getElementById("urCampaignImage");
    const urCampaignNext = document.getElementById("urCampaignNext");

    const urCampaignImages = [
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791231139/ur-01_xdcgws.png",
        "https://res.cloudinary.com/dbqrbaioc/image/upload/v1791231152/ur-02_hu4z12.png"
    ];

    let urCampaignIndex = 0;

    if (urCampaignImage && urCampaignNext) {

        urCampaignNext.addEventListener("click", () => {

            urCampaignIndex++;

            if (urCampaignIndex >= urCampaignImages.length) {
                urCampaignIndex = 0;
            }

            urCampaignImage.src = urCampaignImages[urCampaignIndex];

        });

    }

});

/* ==========================
   CLIENT MARQUEE DRAG & TRACKPAD SLIDING (SEPARATE TRACKS)
========================== */

document.addEventListener("DOMContentLoaded", () => {
    const tracks = document.querySelectorAll(".clients-track");

    tracks.forEach((track) => {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let hasMoved = false;

        track.addEventListener("mousedown", (e) => {
            isDown = true;
            hasMoved = false;
            track.classList.add("is-dragging");
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener("mouseleave", () => {
            isDown = false;
            track.classList.remove("is-dragging");
        });

        track.addEventListener("mouseup", () => {
            isDown = false;
            track.classList.remove("is-dragging");
        });

        track.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 4) {
                hasMoved = true;
            }
            track.scrollLeft = scrollLeft - walk;
        });

        // Touch gesture drag
        track.addEventListener("touchstart", (e) => {
            isDown = true;
            hasMoved = false;
            track.classList.add("is-dragging");
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        }, { passive: true });

        track.addEventListener("touchend", () => {
            isDown = false;
            track.classList.remove("is-dragging");
        });

        track.addEventListener("touchmove", (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 4) {
                hasMoved = true;
            }
            track.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        // Wheel horizontal trackpad support
        track.addEventListener("wheel", (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                track.scrollLeft += e.deltaX;
            }
        }, { passive: true });

        // Prevent opening modal if user was dragging
        track.addEventListener("click", (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });
});

/* ==========================
   LOGO ZOOM LIGHTBOX MODAL
========================== */

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("logoModal");
    const modalImg = document.getElementById("logoModalImg");
    const modalTitle = document.getElementById("logoModalTitle");
    const modalClose = document.getElementById("logoModalClose");
    const modalBackdrop = document.getElementById("logoModalBackdrop");

    if (!modal || !modalImg) return;

    function openModal(src, name) {
        if (!src) return;
        modalImg.src = src;
        modalImg.alt = name || "Brand Logo";
        if (modalTitle) {
            modalTitle.textContent = name || "";
        }
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (window.lenis) {
            window.lenis.stop();
        }
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (window.lenis) {
            window.lenis.start();
        }
        setTimeout(() => {
            modalImg.src = "";
        }, 300);
    }

    document.querySelectorAll(".client-card, .client-campaign-image, .zoomable-campaign-image").forEach((item) => {
        item.addEventListener("click", () => {
            const logoSrc = item.dataset.logoSrc || (item.tagName === "IMG" ? item.src : item.querySelector("img")?.src);
            const logoName = item.dataset.logoName || (item.tagName === "IMG" ? item.alt : item.querySelector("img")?.alt);
            openModal(logoSrc, logoName);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});

/* ==========================
   INFINITE CONTINUOUS POSTER TICKER (GRAPHIC DESIGN)
   - Continuous seamless loop with zero end / no stuck points
   - Independent bidirectional sliding for upper and bottom rows
   - Touchpad horizontal swipe + touch screen gestures + mouse drag
========================== */

document.addEventListener("DOMContentLoaded", () => {
    const posterRows = document.querySelectorAll(".poster-row");
    if (!posterRows.length) return;

    posterRows.forEach((row, rowIndex) => {
        const track = row.querySelector(".poster-track");
        if (!track) return;

        // Ensure enough clones for an uninterrupted infinite canvas
        const initialChildren = Array.from(track.children);
        if (initialChildren.length === 0) return;

        // Clone so we have plenty of repeating sets
        for (let i = 0; i < 2; i++) {
            initialChildren.forEach(child => {
                track.appendChild(child.cloneNode(true));
            });
        }

        let singleSetWidth = 0;
        function updateDimensions() {
            const allPosters = track.querySelectorAll(".poster");
            if (allPosters.length > 10) {
                const firstRect = allPosters[0].getBoundingClientRect();
                const tenthNextRect = allPosters[10].getBoundingClientRect();
                singleSetWidth = tenthNextRect.left - firstRect.left;
            }
            if (singleSetWidth <= 0) {
                singleSetWidth = 2320; // 10 * 232px
            }
        }

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        window.addEventListener("load", updateDimensions);

        // Direction: row 1 moves left (positive x), row 2 moves right (negative x)
        const direction = rowIndex === 0 ? 1 : -1;
        let x = rowIndex === 0 ? 0 : 600;
        const autoSpeed = 0.75;
        let isHovered = false;
        let isDragging = false;
        let startX = 0;
        let lastX = 0;
        let lastTime = 0;
        let velocityX = 0;
        let hasMoved = false;

        row.addEventListener("mouseenter", () => { isHovered = true; });
        row.addEventListener("mouseleave", () => {
            isHovered = false;
            isDragging = false;
            row.classList.remove("is-dragging");
        });

        // Mouse Drag
        row.addEventListener("mousedown", (e) => {
            isDragging = true;
            hasMoved = false;
            startX = e.pageX;
            lastX = e.pageX;
            lastTime = performance.now();
            velocityX = 0;
            row.classList.add("is-dragging");
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const deltaX = e.pageX - lastX;
            const now = performance.now();
            const dt = Math.max(1, now - lastTime);

            if (Math.abs(e.pageX - startX) > 4) {
                hasMoved = true;
            }

            x -= deltaX;
            velocityX = (-deltaX / dt) * 16;
            lastX = e.pageX;
            lastTime = now;
        });

        window.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                row.classList.remove("is-dragging");
            }
        });

        // Touch Gestures
        row.addEventListener("touchstart", (e) => {
            if (e.touches.length !== 1) return;
            isDragging = true;
            hasMoved = false;
            startX = e.touches[0].pageX;
            lastX = e.touches[0].pageX;
            lastTime = performance.now();
            velocityX = 0;
            row.classList.add("is-dragging");
        }, { passive: true });

        row.addEventListener("touchmove", (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].pageX - lastX;
            const now = performance.now();
            const dt = Math.max(1, now - lastTime);

            if (Math.abs(e.touches[0].pageX - startX) > 4) {
                hasMoved = true;
            }

            x -= deltaX;
            velocityX = (-deltaX / dt) * 16;
            lastX = e.touches[0].pageX;
            lastTime = now;
        }, { passive: true });

        row.addEventListener("touchend", () => {
            isDragging = false;
            row.classList.remove("is-dragging");
        });

        // Trackpad Horizontal Wheel
        row.addEventListener("wheel", (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                x += e.deltaX * 1.1;
                velocityX = 0;
            }
        }, { passive: false });

        // Prevent opening zoom modal on dragging
        row.addEventListener("click", (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        // Infinite RAF Render Loop
        function renderLoop() {
            if (!isDragging) {
                if (Math.abs(velocityX) > 0.1) {
                    x += velocityX;
                    velocityX *= 0.94; // Smooth inertial glide
                } else {
                    velocityX = 0;
                    if (!isHovered) {
                        x += direction * autoSpeed;
                    }
                }
            }

            if (singleSetWidth > 0) {
                x = ((x % singleSetWidth) + singleSetWidth) % singleSetWidth;
            }

            track.style.transform = `translate3d(${-x}px, 0, 0)`;
            requestAnimationFrame(renderLoop);
        }

        requestAnimationFrame(renderLoop);
    });
});

/* ==========================
   PURE IMAGE ZOOM MODAL (GRAPHIC DESIGN)
========================== */

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pureImageModal");
    const modalImg = document.getElementById("pureImageImg");
    const modalClose = document.getElementById("pureImageClose");
    const modalBackdrop = document.getElementById("pureImageBackdrop");

    if (!modal || !modalImg) return;

    function openPureModal(src, alt) {
        if (!src) return;
        modalImg.src = src;
        modalImg.alt = alt || "Design Preview";
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (window.lenis) {
            window.lenis.stop();
        }
    }

    function closePureModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (window.lenis) {
            window.lenis.start();
        }
        setTimeout(() => {
            modalImg.src = "";
        }, 300);
    }

    document.querySelectorAll(".poster").forEach((poster) => {
        poster.addEventListener("click", () => {
            const img = poster.querySelector("img");
            if (!img) return;
            openPureModal(img.src, img.alt);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closePureModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closePureModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closePureModal();
        }
    });
});

/* ==========================
   INSTANT CASE STUDY FAST NAVIGATION & PREFETCH
========================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Top progress indicator
    let progressBar = document.querySelector(".page-transition-bar");
    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "page-transition-bar";
        document.body.appendChild(progressBar);
    }

    document.body.classList.add("page-entering");

    function navigateSmoothly(href, triggerBtn) {
        if (!href) return;
        if (triggerBtn) {
            triggerBtn.classList.add("is-loading");
        }
        progressBar.classList.remove("finish");
        progressBar.classList.add("loading");
        document.body.classList.add("page-leaving");

        // Navigate immediately without perceived freeze
        setTimeout(() => {
            window.location.href = href;
        }, 50);
    }

    // 2. Proactive background pre-fetch of all case study HTML pages
    const casePages = [
        "case-meta-ads.html",
        "case-social-media.html",
        "case-graphic-design.html",
        "case-ai-videos.html"
    ];

    casePages.forEach((page) => {
        try {
            fetch(page, { priority: "low" }).catch(() => {});
        } catch (_) {}
    });

    // 3. Make full work-cards interactive for immediate responsive navigation
    const workCards = document.querySelectorAll(".work-card");
    workCards.forEach((card) => {
        const btn = card.querySelector(".case-btn");
        const href = btn ? btn.getAttribute("href") : null;
        if (!href) return;

        // Navigate on card click
        card.addEventListener("click", (e) => {
            e.preventDefault();
            navigateSmoothly(href, btn);
        });

        // Warm up on hover / touch
        const warmup = () => {
            try { fetch(href, { priority: "high" }).catch(() => {}); } catch (_) {}
        };

        card.addEventListener("mouseenter", warmup, { passive: true });
        card.addEventListener("touchstart", warmup, { passive: true });
        card.addEventListener("pointerdown", warmup, { passive: true });
    });

    // 4. Case Buttons click
    const caseButtons = document.querySelectorAll("a.case-btn");
    caseButtons.forEach((btn) => {
        const href = btn.getAttribute("href");
        if (!href) return;

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateSmoothly(href, btn);
        });
    });

    // 5. Header / Navbar links transition
    const minimalNavLinks = document.querySelectorAll(".navbar-minimal a");
    minimalNavLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            navigateSmoothly(href, link);
        });
    });
});

