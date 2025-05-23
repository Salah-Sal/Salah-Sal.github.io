// assets/js/theme.js
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle ? themeToggle.querySelector('.toggle-icon') : null;
    const giscusIframe = '.giscus-frame'; // Selector for Giscus iframe

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
        const iframe = document.querySelector(giscusIframe);
        if (!iframe) return;

        // Giscus uses 'light' or 'dark' or a specific theme name like 'gruvbox_dark'
        // Choose your desired Giscus light/dark themes here
        const giscusTheme = theme === 'dark' ? 'gruvbox_dark' : 'light';

        // More robust: use preferred_color_scheme for Giscus and let it adapt,
        // or if you specified a dark theme for giscus in _config.yml, it will stay dark.
        // If you want Giscus to strictly follow site toggle:
        const message = {
            setConfig: {
                theme: giscusTheme
            }
        };
        iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
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

    // Ensure Giscus gets updated after it loads, if the theme was set before it loaded
    // This is a bit tricky as Giscus loads async. A MutationObserver or onload for iframe is complex.
    // A simpler approach is to send the message shortly after page load, hoping Giscus is there.
    // Or, if Giscus theme is set to 'preferred_color_scheme' in _config.yml, it might adapt automatically.
    // Your current _config.yml Giscus theme is 'gruvbox_dark'.
    // If you want Giscus to reflect the toggle, ensure the `updateGiscusTheme` call is effective.
    // It is called in `setTheme`, which runs on page load.
    // Add a slight delay if Giscus isn't ready immediately:
    // setTimeout(() => {
    //     const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    //     updateGiscusTheme(currentTheme);
    // }, 1000); // Adjust delay if needed

})(); 