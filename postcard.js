(function () {
    var form = document.getElementById("postcard-form");
    var status = document.getElementById("postcard-status");
    var nameInput = document.getElementById("postcard-name");
    var emailInput = document.getElementById("postcard-email");
    if (!form || !status || !nameInput || !emailInput) {
        return;
    }

    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncMotion() {
        document.documentElement.setAttribute("data-motion", motion.matches ? "reduced" : "ok");
    }

    syncMotion();
    if (typeof motion.addEventListener === "function") {
        motion.addEventListener("change", syncMotion);
    } else if (typeof motion.addListener === "function") {
        motion.addListener(syncMotion);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = nameInput.value.replace(/^\s+|\s+$/g, "");
        var email = emailInput.value.replace(/^\s+|\s+$/g, "");
        if (!name) {
            announce("error", "Write a name on the postcard before sending it.");
            nameInput.focus();
            return;
        }
        if (email && email.indexOf("@") === -1) {
            announce("error", "The email needs an @ sign, or leave that line empty.");
            emailInput.focus();
            return;
        }
        announce("success", "Postcard kept on this page.");
    });

    function announce(state, message) {
        status.hidden = true;
        status.setAttribute("data-state", state);
        status.textContent = "";
        window.requestAnimationFrame(function () {
            status.hidden = false;
            status.textContent = message;
        });
    }
}());
