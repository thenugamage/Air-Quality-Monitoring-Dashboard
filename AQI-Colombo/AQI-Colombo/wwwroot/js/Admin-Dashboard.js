        // Mobile menu toggle functionality
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            hamburgerMenu.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });
        
        // Reset sidebar state on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            }
        });