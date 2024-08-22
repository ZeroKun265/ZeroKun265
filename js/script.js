// Function to save the state (HTML classes) of the body
function saveState(override = false) {
    console.log(override)
    // We check if the user has saved at least once, if he didn't we don't save unless override is true
    // We do this to be GDPR compliant and not store anything unless the user uses a feature that needs 
    // local storage to work
    if (!localStorage.getItem('bodyClasses') && !override) {
        console.log("Tried to save but user never manually saved once: ignoring")
    } else {
        // Body classes for dark/light mode
        const bodyClasses = document.body.className;
        localStorage.setItem('bodyClasses', bodyClasses);
        // Dark mode toggle icon
        const modeIconSrc = document.getElementById("mode-icon").src;
        localStorage.setItem("modeIconSrc", modeIconSrc);
    }
}

// Function to load the state (HTML classes) of the body
function loadState() {
    console.log("Loading")
    // Body classes for dark/light mode
    const bodyClasses = localStorage.getItem('bodyClasses');
    if (bodyClasses) {
        console.log("body classes found")
        document.body.className = bodyClasses;
    }
    const modeIconSrc = localStorage.getItem("modeIconSrc");
    if (modeIconSrc) {
        console.log("IconSRC found")
        document.getElementById("mode-icon").src = modeIconSrc;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Loading and setting up the topbar
    fetch('top-bar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('top-bar').innerHTML = data; //"Spawn" the top bar

            // Setup for saving preference
            const darkModeToggle = document.getElementById("dark-mode-toggle");
            const body = document.body;
            const modeIcon = document.getElementById("mode-icon")
            loadState();
            darkModeToggle.addEventListener("click", function() {
                modeIcon.classList.add("fade-out");

                //Animation setup
                setTimeout(() => {
                    if (modeIcon.src.includes('moon.svg')) {
                        modeIcon.src = 'assets/sun.svg';
                    } else {
                        modeIcon.src = 'assets/moon.svg';
                    }

                    modeIcon.classList.remove("fade-out");
                    modeIcon.classList.add("fade-in");
                    body.classList.toggle("dark-mode");
                    body.classList.toggle("light-mode");
                    // Now that the user has used the button once we can force the saving of the state by specificing override=true
                    saveState(true);

                    setTimeout(() => {
                        modeIcon.classList.remove("fade-in");
                    }, 300); // Match this duration with the CSS transition
                }, 300); // This timeout matches the duration of the fade-out
            });

            // Side menu functionality
            document.getElementById("hamburger-menu-button").addEventListener("click", function() {
                document.getElementById("side-menu").classList.toggle("open")
            })

        });

    fetch('side-menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('side-menu').innerHTML = data;
            // Attach event listener to the close button
            document.getElementById('hamburger-menu-close-button').addEventListener('click', function() {
                document.getElementById('side-menu').classList.toggle('open');
            });
            document.getElementById("nothing-back-menu-button").addEventListener("click", function() {
                document.getElementById("side-menu").classList.remove('open');
            });
            document.getElementById("blog-menu-button").addEventListener("click", function() {
                window.location.href = "blog.html";
            });
            document.getElementById("home-menu-button").addEventListener("click", function() {
                window.location.href = "index.html";
            });
            document.getElementById("cv-menu-button").addEventListener("click", function() {
                window.location.href = "cv.html";
            });
            document.getElementById("privacy-menu-button").addEventListener("click", function() {
                window.location.href = "privacy.html";
            });
            document.getElementById("socials-menu-button").addEventListener("click", function() {
                window.location.href = "socials.html";
            });
            // Close the menu when clicking outside
            document.addEventListener('click', function(event) {
                const sideMenu = document.getElementById('side-menu');
                const hamburgerButton = document.getElementById('hamburger-menu-button');

                // Check if the click was outside the side menu and the hamburger button
                if (!sideMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
                    sideMenu.classList.remove('open');
                }
            });
        });

});