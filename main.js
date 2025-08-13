/* jshint esversion: 6 */

/* ----- PRELOADER ----- */
// Check for dark mode preference immediately before preloader appears
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Preloader will be removed by the script in the HTML

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  
  // Add click event listener to each link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Get the nav menu element
      const navMenu = document.getElementById('myNavMenu');
      
      // Check if we're in mobile view (menu is responsive)
      if (navMenu.classList.contains('responsive')) {
        // Remove responsive class to close the menu
        navMenu.className = 'nav-menu';
      }
    });
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING & MAKE IT STICKY ----- */
window.onscroll = function() {handleNavigation();};

function handleNavigation() {
  const navHeader = document.getElementById("header");
  const navSpacer = document.getElementById("nav-spacer");
  const scrollPosition = window.scrollY;

  // Make nav sticky after scrolling past a certain point
  if (scrollPosition > 100) {
    navHeader.classList.add("sticky");
    navSpacer.classList.add("spacer-active");
  } else {
    navHeader.classList.remove("sticky");
    navSpacer.classList.remove("spacer-active");
  }
  
  // Apply shadow based on scroll position
  if (scrollPosition > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else if (scrollPosition <= 50 && !navHeader.classList.contains("sticky")) {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
  
  // Update scroll to top button visibility
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    if (scrollPosition > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  // Call the scrollActive function to update active links
  scrollActive();
}

/* ----- TYPING EFFECT ----- */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Typed !== 'undefined') {
    var typingEffect = new Typed(".typedText", {
      strings: ["Bruno Mars Cosplayer", "DP Photo Editor", "Coder"],
      loop: true,
      typeSpeed: 100, 
      backSpeed: 80,
      backDelay: 2000
    });
  }
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true     
    });

    /* -- HOME -- */
    sr.reveal('.featured-text-card', {});
    sr.reveal('.featured-name', {delay: 100});
    sr.reveal('.featured-text-info', {delay: 200});
    sr.reveal('.featured-text-btn', {delay: 200});
    sr.reveal('.social_icons', {delay: 200});
    sr.reveal('.featured-image', {delay: 300});

    /* -- PROJECT BOX -- */
    sr.reveal('.project-box', {interval: 200});

    /* -- GALLERY -- */
    sr.reveal('.gallery-item', {interval: 200});

    /* -- HEADINGS -- */
    sr.reveal('.top-header', {});

    /* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

    /* -- ABOUT INFO & CONTACT INFO -- */
    const srLeft = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srLeft.reveal('.about-info', {delay: 100});
    srLeft.reveal('.contact-info', {delay: 100});

    /* -- ABOUT SKILLS & FORM BOX -- */
    const srRight = ScrollReveal({
      origin: 'right',
      distance: '80px',
      duration: 2000,
      reset: true
    });

    srRight.reveal('.skills-box', {delay: 100});
    srRight.reveal('.form-control', {delay: 100});
  }
});

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id');
    
    // Use attribute selector with quotes to handle special characters
    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
    
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
      if(navLink) navLink.classList.add('active-link');
    } else {
      if(navLink) navLink.classList.remove('active-link');
    }
  });
  
  // Special case for home when at the top
  if(scrollY < 50) {
    const homeLink = document.querySelector('.nav-menu a[href*="home"]');
    if(homeLink) homeLink.classList.add('active-link');
  }
}

/* ----- GALLERY LIGHTBOX FUNCTIONALITY ----- */
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  
  let currentIndex = 0;
  
  // Open lightbox when gallery item is clicked
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentIndex = index;
      const imgSrc = this.getAttribute('data-img');
      const title = this.querySelector('h3').textContent;
      const desc = this.querySelector('p').textContent;
      
      openLightbox(imgSrc, title, desc);
    });
  });
  
  // Close lightbox when close button is clicked
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigate to previous image
  lightboxPrev.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });
  
  // Navigate to next image
  lightboxNext.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.style.display || lightbox.style.display === 'none') return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    }
  });
  
  function openLightbox(imgSrc, title, desc) {
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.style.display = 'block';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }
  
  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function updateLightbox() {
    const item = galleryItems[currentIndex];
    const imgSrc = item.getAttribute('data-img');
    const title = item.querySelector('h3').textContent;
    const desc = item.querySelector('p').textContent;
    
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
  }

  // Dark Mode Toggle
  const toggleSwitch = document.getElementById("toggle-switch");
  
  // Toggle dark mode when the switch is clicked
  if (toggleSwitch) {
    toggleSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Save preference to localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
      } else {
        localStorage.setItem('dark-mode', 'disabled');
      }
    });
  }
  
  // Initialize background music functionality
  initBackgroundMusic();
  
  /* ----- SCROLL TO TOP BUTTON ----- */
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    // Scroll to top with smooth animation when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Initialize the progress ring on DOM ready
  setupProgressRing();
});

// Setup Progress Ring with SVG viewBox approach
function setupProgressRing() {
    const circle = document.querySelector('.progress-ring__circle');
    if (!circle) return;
    
    // Get radius and calculate circumference (using viewBox coordinates)
    const radius = parseFloat(circle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    
    // Set initial stroke properties
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference; // Start with full offset (no progress)
}

// Background Music Functionality
function initBackgroundMusic() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nowPlayingText = document.getElementById('now-playing-text');
    const currentTrackName = document.getElementById('current-track-name');
    const trackArtistElement = document.getElementById('track-artist');
    const progressCircle = document.querySelector('.progress-ring__circle');
    
    // Check if audio elements exist
    if (!audio || !progressCircle) {
        console.warn("Audio player elements not found in the DOM");
        return;
    }

    // Get all audio elements from music-sources
    let tracks = Array.from(document.querySelectorAll('#music-sources audio'));
    
    // Check if we have music sources
    if (tracks.length === 0) {
        console.warn("No music sources found in #music-sources");
        return;
    }
    
    let current = 0;
    let isPlaying = false;
    let currentPlayAttempt = null;

    // Get radius and calculate circumference for the progress ring
    const radius = parseFloat(progressCircle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;

    // Set initial stroke properties
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    // Shuffle the music array when page loads
    shuffleArray(tracks);

    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize
    function initPlayer() {
        audio.volume = 0.4;
        loadTrack(current);
        
        audio.addEventListener('ended', function() {
            nextTrack();
        });
        
        audio.addEventListener('timeupdate', updateProgress);
        
        // Handle errors
        audio.addEventListener('error', function(e) {
            console.error("Audio error:", e);
            showToast("Error playing track. Skipping to next.", "error");
            nextTrack();
        });
    }

    // Update progress ring
    function updateProgress() {
        if (!audio.duration) return;
        
        // Calculate current progress percentage
        const percent = audio.currentTime / audio.duration;
        const offset = circumference - (percent * circumference);
        
        // Update the stroke dashoffset
        progressCircle.style.strokeDashoffset = offset;
    }

    // Function to load and play a track
    function loadTrack(index) {
        if (index >= tracks.length) {
            console.error("Track index out of bounds:", index);
            return;
        }
        
        // Pause current track before loading new one
        const wasPlaying = isPlaying;
        if (isPlaying) {
            pauseTrack();
        }
        
        const track = tracks[index];
        
        // Check if track is valid
        if (!track) {
            console.error("Invalid track at index:", index);
            return;
        }
        
        // Get track metadata from data attributes
        const title = track.getAttribute('data-title') || 'Unknown Title';
        const artist = track.getAttribute('data-artist') || 'Unknown Artist';
        
        // Get the source element
        const source = track.querySelector('source');
        if (!source || !source.src) {
            console.error("Invalid source for track:", title);
            return;
        }
        
        // Set the source for the main audio element
        audio.src = source.src;
        
        // Log the source to help with debugging
        console.log("Loading track:", title, "by", artist, "from", source.src);
        
        audio.load();
        
        updateNowPlaying(title, artist);
        
        // Reset progress
        progressCircle.style.strokeDashoffset = circumference;
        
        // Play if was previously playing, but use setTimeout to ensure audio is loaded
        if (wasPlaying) {
            setTimeout(() => {
                playTrack();
            }, 100);
        }
    }

    // Play current track
    function playTrack() {
        if (!audio.src) {
            console.error("No audio source set");
            showToast("No audio track loaded", "error");
            return;
        }
        
        // Cancel any previous play attempt
        if (currentPlayAttempt) {
            currentPlayAttempt.cancel();
        }
        
        // Set a flag to indicate we're attempting to play
        let playAttemptInProgress = true;
        
        // Create a new play attempt
        currentPlayAttempt = {
            cancel: function() {
                playAttemptInProgress = false;
            }
        };
        
        // Update UI immediately to provide feedback
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<svg class="svg-icon" aria-hidden="true" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
            playPauseBtn.setAttribute('aria-label', 'Pause music');
        }
        isPlaying = true;
        
        audio.play()
            .then(() => {
                if (playAttemptInProgress) { // Only update UI if we haven't cancelled
                    if (playPauseBtn) {
                        playPauseBtn.innerHTML = '<svg class="svg-icon" aria-hidden="true" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
                        playPauseBtn.setAttribute('aria-label', 'Pause music');
                    }
                    isPlaying = true;
                }
            })
            .catch(error => {
                console.error("Error playing audio:", error, "Source:", audio.src);
                // Only update UI if this play attempt is still relevant
                if (playAttemptInProgress) {
                    if (playPauseBtn) {
                        playPauseBtn.innerHTML = '<svg class="svg-icon" aria-hidden="true" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
                        playPauseBtn.setAttribute('aria-label', 'Play music');
                    }
                    isPlaying = false;
                    
                    showToast("Error playing track. Trying next one.", "error");
                    
                    // Try next track if current one fails
                    nextTrack();
                }
            })
            .finally(() => {
                if (currentPlayAttempt && !playAttemptInProgress) {
                    currentPlayAttempt = null;
                }
            });
        
        return currentPlayAttempt;
    }

    // Pause current track
    function pauseTrack() {
        // Cancel any pending play attempt
        if (currentPlayAttempt) {
            currentPlayAttempt.cancel();
            currentPlayAttempt = null;
        }
        
        if (audio) {
            audio.pause();
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<svg class="svg-icon" aria-hidden="true" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
                playPauseBtn.setAttribute('aria-label', 'Play music');
            }
            isPlaying = false;
        }
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (audio.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    }

    // Go to previous track
    function prevTrack() {
        current = (current - 1 + tracks.length) % tracks.length;
        loadTrack(current);
        if (isPlaying) {
            playTrack();
        }
    }

    // Go to next track
    function nextTrack() {
        current = (current + 1) % tracks.length;
        loadTrack(current);
        if (isPlaying) {
            playTrack();
        }
    }

    // Update now playing text with title and artist
    function updateNowPlaying(title, artist) {
        if (nowPlayingText) nowPlayingText.textContent = `${title} - ${artist}`;
        if (currentTrackName) currentTrackName.textContent = title;
        if (trackArtistElement) trackArtistElement.textContent = artist;
    }

    // Show toast notification
    function showToast(message, type) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
          <div class="toast-content">
            <svg class="svg-icon" aria-hidden="true" viewBox="0 0 512 512">
              ${type === 'success' 
                ? '<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>' 
                : '<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>'}
            </svg>
            <div class="toast-message">${message}</div>
          </div>
          <svg class="svg-icon toast-close" aria-hidden="true" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        `;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Add close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('toast-hiding');
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.add('toast-hiding');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Event listeners
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    if (prevBtn) prevBtn.addEventListener('click', prevTrack);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    
    // Pause when tab is hidden, resume intention respected
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            pauseTrack();
        }
    });
    
    // Initialize the player
    initPlayer();
}

// Speech Bubble Animation
document.addEventListener('DOMContentLoaded', function() {
    const speechBubble = document.querySelector('.speech-bubble');
    if (speechBubble) {
        // Make the speech bubble disappear after 5 seconds with ease-in-out
        setTimeout(function() {
            speechBubble.classList.add('disappear');
            
            // Remove from DOM after animation completes
            setTimeout(function() {
                speechBubble.remove();
            }, 1000);
        }, 10000); // Changed to 10 seconds instead of 34 seconds for better UX
    }
    
    // Call scrollActive once on page load to set initial active state
    scrollActive();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
});

/* ----- CONTACT FORM FUNCTIONALITY ----- */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-control');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageTextarea = document.getElementById('message');
  const submitButton = form.querySelector('.form-button .btn');

  // Add form submission event
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate form fields
      if (validateForm()) {
        // Show sending feedback
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending <svg class="svg-icon fa-spinner" aria-hidden="true" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>';
        submitButton.disabled = true;
        
        // Simulate form submission (since we don't have a backend)
        setTimeout(() => {
          // Clear form fields
          nameInput.value = '';
          emailInput.value = '';
          messageTextarea.value = '';
          
          // Show success message
          submitButton.innerHTML = 'Sent Successfully <svg class="svg-icon" aria-hidden="true" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';
          submitButton.style.backgroundColor = '#4CAF50';
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
          }, 3000);
          
          // Show toast notification
          showToast('Message sent successfully!', 'success');
        }, 1500);
      }
    });
  }

  // Form validation function
  function validateForm() {
    let isValid = true;
    
    // Reset previous error styles
    removeErrorStyles();
    
    // Validate Name
    if (!nameInput || nameInput.value.trim() === '') {
      setErrorFor(nameInput, 'Name cannot be empty');
      isValid = false;
    }
    
    // Validate Email
    if (!emailInput || emailInput.value.trim() === '') {
      setErrorFor(emailInput, 'Email cannot be empty');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setErrorFor(emailInput, 'Email is not valid');
      isValid = false;
    }
    
    // Validate Message
    if (!messageTextarea || messageTextarea.value.trim() === '') {
      setErrorFor(messageTextarea, 'Message cannot be empty');
      isValid = false;
    }
    
    return isValid;
  }

  // Set error message and style
  function setErrorFor(input, message) {
    if (!input) return;
    
    const formControl = input.parentElement;
    
    // Create error message element if it doesn't exist
    let errorDisplay = formControl.querySelector('.error-message');
    if (!errorDisplay) {
      errorDisplay = document.createElement('div');
      errorDisplay.className = 'error-message';
      formControl.appendChild(errorDisplay);
    }
    
    // Add error class and message
    input.classList.add('input-error');
    errorDisplay.innerText = message;
  }

  // Remove all error styles
  function removeErrorStyles() {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    const errorInputs = form.querySelectorAll('.input-error');
    errorInputs.forEach(input => input.classList.remove('input-error'));
  }

  // Email validation using regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

// Toast notification function
function showToast(message, type) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <svg class="svg-icon" aria-hidden="true" viewBox="0 0 512 512">
        ${type === 'success' 
          ? '<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>' 
          : '<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>'}
      </svg>
      <div class="toast-message">${message}</div>
    </div>
    <svg class="svg-icon toast-close" aria-hidden="true" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Add close button functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto remove toast after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) { // Check if still in DOM
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 300);
    }
  }, 5000);
}