// assets/js/toc.js
// Generates a table of contents from article headings

(function() {
    const article = document.querySelector('.post-content');
    const tocContainer = document.getElementById('toc');
    const tocList = document.getElementById('toc-list');
    const tocToggle = document.getElementById('toc-toggle');

    if (!article || !tocContainer || !tocList) return;

    // Get all h2 and h3 headings
    const headings = article.querySelectorAll('h2, h3');

    if (headings.length < 2) {
        // Hide TOC if there are fewer than 2 headings
        tocContainer.style.display = 'none';
        return;
    }

    // Generate IDs for headings that don't have them
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
    });

    // Build the TOC
    let tocHTML = '';
    headings.forEach((heading) => {
        const level = heading.tagName.toLowerCase();
        const title = heading.textContent;
        const id = heading.id;

        tocHTML += `<li class="toc-${level}"><a href="#${id}">${title}</a></li>`;
    });

    tocList.innerHTML = tocHTML;

    // Mobile toggle
    if (tocToggle) {
        tocToggle.addEventListener('click', () => {
            tocContainer.classList.toggle('toc-open');
        });
    }

    // Highlight current section on scroll
    const tocLinks = tocList.querySelectorAll('a');

    function highlightCurrentSection() {
        let currentSection = null;
        const scrollPos = window.scrollY + 100;

        headings.forEach((heading) => {
            if (heading.offsetTop <= scrollPos) {
                currentSection = heading.id;
            }
        });

        tocLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll to section
    tocLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 80; // Account for sticky header
                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile TOC after clicking
                tocContainer.classList.remove('toc-open');
            }
        });
    });

    // Listen for scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightCurrentSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial highlight
    highlightCurrentSection();
})();
