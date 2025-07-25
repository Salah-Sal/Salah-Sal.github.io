// assets/js/code-copy.js
(function() {
    // Helper function to create the copy button
    function createCopyButton(textToCopy) {
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.title = 'Copy code';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="copied-text">Copied!</span>
        `;

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                button.classList.add('copied');
                setTimeout(() => {
                    button.classList.remove('copied');
                }, 2000);
            });
        });
        
        return button;
    }

    // Find all code blocks generated by Jekyll/Rouge
    document.querySelectorAll('.post-content .highlight').forEach(container => {
        // The <pre> tag inside contains the code to be copied
        const codeElement = container.querySelector('pre');
        if (codeElement) {
            const button = createCopyButton(codeElement.innerText);
            container.style.position = 'relative'; // Needed for button positioning
            container.appendChild(button);
        }
    });
})();