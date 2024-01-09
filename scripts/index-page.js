var emailLinkLine = document.querySelector(".contact__email-link-underline");

// Function for scroll reveals
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  var headingLines = document.querySelectorAll(".heading-line");
  var ribbons = document.querySelectorAll(".ribbon");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;

    if (elementTop < windowHeight) {
      reveals[i].classList.add("active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }

  for (var i = 0; i < headingLines.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = headingLines[i].getBoundingClientRect().top;

    if (elementTop < windowHeight - 200) {
      headingLines[i].classList.add("heading-animation");
    } else {
      // headingLines[i].classList.remove("heading-animation");
    }
  }

  for (var i = 0; i < ribbons.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = ribbons[i].getBoundingClientRect().top;

    if (elementTop < windowHeight - 300) {
      ribbons[i].classList.add("ribbon--active");
    } else {
      // reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

window.onscroll = function (ev) {
  if (
    window.innerHeight + Math.round(window.scrollY) >=
    document.body.offsetHeight
  ) {
    emailLinkLine.classList.add("contact__email-link-underline-animation");
  }
};

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

// Get SideNav Checkbox
const sideNavCheckbox = document.querySelector(".side-nav__checkbox");

sideNavCheckbox.addEventListener("change", function () {
  if (this.checked) {
    disableScroll();
  } else {
    enableScroll();
  }
});

const sideNavLinks = document.querySelectorAll(".side-nav__item");

for (let i = 0; i < sideNavLinks.length; i++) {
  sideNavLinks[i].addEventListener("click", () => {
    sideNavCheckbox.click();
  });
}
