const hamburgerBtn = document.querySelector(".hamburger-icon");
const closeBtn = document.querySelector(".side-bar");

hamburgerBtn.addEventListener('click', (event) => {
    closeBtn.style.display = "block";
    hamburgerBtn.style.display = "none";
});

closeBtn.addEventListener('click', (event) => {
    closeBtn.style.display = "none";
    hamburgerBtn.style.display = "block";
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show2");
        } else {
            entry.target.classList.remove("show2");
        }
    });
});


const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElement2 = document.querySelectorAll(".hidden2");
hiddenElement2.forEach((el) => observer2.observe(el));
