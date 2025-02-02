document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const images = document.querySelectorAll('.gallery li');
    let currentIndex = 0;
  
    // Set initial position with a slight shift to the left
    gallery.style.transition = 'none'; // Disable transition temporarily
    gallery.style.transform = `translateX(-5%)`; // Shift the gallery by -5% to the left
  
    // Wait for the page to load, then trigger the first scroll
    setTimeout(() => {
      gallery.style.transition = 'transform 2s ease-in-out'; // Re-enable smooth scrolling
      scrollToNextImage(); // Scroll to the next image after load
    }, 100); // Small delay to ensure proper positioning before transition
  
    // Function to scroll to the next image
    function scrollToNextImage() {
      // Increment the current index, looping back to the first image after the last one
      currentIndex = (currentIndex + 1) % images.length; // This loops back to 0 when currentIndex exceeds the last image
      const offset = -currentIndex * 100; // Move the gallery by 100% of the viewport width
      gallery.style.transform = `translateX(${offset - 5}vw)`; // Apply the offset to the gallery
    }
  
    // Change image every 3 seconds
    const scrollInterval = setInterval(scrollToNextImage, 3000);
  });
  const section = document.querySelector('#about');
  const lines = document.querySelectorAll('.line');
  
  // Create a new Intersection Observer to detect when the section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the section is in view, add the 'reveal' class to each line
        lines.forEach((line) => {
          line.classList.add('reveal');
        });
      } else {
        // If the section is out of view, remove the 'reveal' class to reset animation
        lines.forEach((line) => {
          line.classList.remove('reveal');
        });
      }
    });
  }, {
    threshold: 0.5 // Trigger the observer when 50% of the section is visible
  });
  
  // Observe the "About" section
  observer.observe(section);