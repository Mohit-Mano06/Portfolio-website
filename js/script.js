const navLinks = document.querySelectorAll("nav a");
const senctions = document.querySelectorAll("section");


navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);

        senctions.forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(targetId).classList.add("active");
    });
});