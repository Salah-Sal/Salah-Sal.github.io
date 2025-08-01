// assets/js/theme.js
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle ? themeToggle.querySelector('.toggle-icon') : null;
    const giscusIframe = '.giscus-frame'; // Selector for Giscus iframe


    // --- New Nav Toggle Logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open'); // Optional: animate hamburger
        });
    }
    // --- End of New Nav Toggle Logic ---

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (toggleIcon) toggleIcon.textContent = '🌙'; // Moon icon
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            if (toggleIcon) toggleIcon.textContent = '☀️'; // Sun icon
            localStorage.setItem('theme', 'light');
        }
        updateGiscusTheme(theme);
    }

        function updateGiscusTheme(theme) {
        // Use the same themes as configured - preferred_color_scheme will auto-adapt
        // But we can still send manual updates when user toggles
        const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light';
        const message = { setConfig: { theme: giscusTheme } };

        // Try to update Giscus theme immediately if iframe exists
        const iframe = document.querySelector(giscusIframe);
        if (iframe) {
            iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
            return;
        }

        // Otherwise wait for iframe to load with retries
        let retries = 0;
        const maxRetries = 10;
        const interval = setInterval(() => {
            const iframe = document.querySelector(giscusIframe);
            if (iframe) {
                iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
                clearInterval(interval);
            } else if (retries >= maxRetries) {
                clearInterval(interval);
            }
            retries++;
        }, 500);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Listen for OS theme changes (optional, but good for consistency if no manual toggle was used yet)
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if no theme has been explicitly set by the user via toggle
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


})(); 