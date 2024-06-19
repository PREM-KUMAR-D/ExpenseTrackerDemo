document.addEventListener("DOMContentLoaded", function() {
    
    const currentPath = window.location.pathname;

    
    const navLinks = document.querySelectorAll(".main-header__item-list a");

    
    navLinks.forEach(link => {
        if (link.pathname === currentPath) {
            link.classList.add("active"); 
        } else {
            link.classList.remove("active");
        }
    });
});