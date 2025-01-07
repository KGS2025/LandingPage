document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("menu-btn");
  const menu = document.querySelector(".sm-menu");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      menu.style.maxHeight = 270 + "px"; // Set to content height
    } else {
      menu.style.maxHeight = "0"; // Collapse the menu
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");
  const languageSelectorMobile = document.getElementById(
    "language-selector-mobile"
  );

  // Function to fetch the JSON file for the selected language
  const fetchLanguageData = async (language) => {
    try {
      const response = await fetch(`languages/${language}.json`);
      if (!response.ok) throw new Error("Failed to load language file");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Function to update the page content
  const updateContent = (translations) => {
    const elements = document.querySelectorAll("[data-key]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-key");
      const text = key
        .split(".")
        .reduce((obj, prop) => obj && obj[prop], translations);

      if (text) {
        el.innerHTML = text;
      }
    });
  };

  // Event listener for language change
  languageSelector.addEventListener("change", async (event) => {
    languageSelectorMobile.value = event.target.value;
    const selectedLanguage = event.target.value;
    const translations = await fetchLanguageData(selectedLanguage);

    if (translations) {
      updateContent(translations);
      document.documentElement.lang =
        selectedLanguage === "arabic" ? "ar" : "en";
      document.documentElement.dir =
        selectedLanguage === "arabic" ? "rtl" : "ltr";
    }
  });

  languageSelectorMobile.addEventListener("change", async (event) => {
    languageSelector.value = event.target.value;
    const selectedLanguage = event.target.value;
    const translations = await fetchLanguageData(selectedLanguage);

    if (translations) {
      updateContent(translations);
      console.log(selectedLanguage)
      document.documentElement.lang =
        selectedLanguage === "arabic" ? "ar" : "en";
      document.documentElement.dir =
        selectedLanguage === "arabic" ? "rtl" : "ltr";
    }
  });

  // Load default language on page load
  (async () => {
    const defaultLanguage = languageSelector.value;
    const translations = await fetchLanguageData(defaultLanguage);

    if (translations) updateContent(translations);
  })();
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#carouselExampleIndicators');
  let startX;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;
  
  // Initialize the Bootstrap carousel
  const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: false // Disable auto sliding while dragging
  });
  
  // Mouse events
  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('mouseup', dragEnd);
  carousel.addEventListener('mouseleave', dragEnd);
  
  // Touch events
  carousel.addEventListener('touchstart', dragStart);
  carousel.addEventListener('touchmove', drag);
  carousel.addEventListener('touchend', dragEnd);
  
  function dragStart(e) {
      isDragging = true;
      startX = getPositionX(e);
      
      // Disable transition while dragging
      carousel.querySelector('.carousel-inner').style.transition = 'none';
  }
  
  function drag(e) {
      if (!isDragging) return;
      
      e.preventDefault();
      const currentPosition = getPositionX(e);
      const diff = currentPosition - startX;
      
      if (Math.abs(diff) > 100) { // Threshold for sliding
          if (diff > 0) {
              bsCarousel.prev();
          } else {
              bsCarousel.next();
          }
          dragEnd();
      }
  }
  
  function dragEnd() {
      isDragging = false;
      // Re-enable transition
      carousel.querySelector('.carousel-inner').style.transition = '';
  }
  
  function getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
});
