const selector = document.getElementById("themeSelector");

selector.addEventListener("change", function() {
    document.body.className = this.value;
});

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("themeSelector");

    if (!selector) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.className = savedTheme;
        selector.value = savedTheme;
    }

    selector.addEventListener("change", function() {
        document.body.className = this.value;
        localStorage.setItem("theme", this.value); 
    });
});
