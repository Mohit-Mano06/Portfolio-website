document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.querySelector('main') || document.body;
    
    // Add entrance animation class
    pageContent.classList.add('page-transition');

    // Handle all internal navigation links
    document.querySelectorAll('nav a, #contact a, .github-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal link
            if (href && !href.startsWith('http') && !href.startsWith('#') && href !== 'javascript:void(0)') {
                e.preventDefault();
                
                // Trigger exit animation
                pageContent.classList.add('is-exiting');
                
                // Navigate after animation finishes
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});
