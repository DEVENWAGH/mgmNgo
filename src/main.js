import "./style.css";

const API_URL = "http://localhost:5000/api";

// Auth functions
async function signup(userData) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.success) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify({
        token: data.token,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email
      }));
      return true;
    }
    throw new Error(data.message || 'Signup failed');
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

async function login(credentials) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Donation function
async function submitDonation(donationData) {
  try {
    const response = await fetch(`${API_URL}/donations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });
    return await response.json();
  } catch (error) {
    console.error("Donation error:", error);
    throw error;
  }
}

// Contact form function
async function submitContact(contactData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    return await response.json();
  } catch (error) {
    console.error("Contact submission error:", error);
    throw error;
  }
}

// Event listeners and UI code
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user) {
    updateUIForLoggedInUser(user);
  }

  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const signupBtn = document.getElementById("signup-btn");
  const mobileSignupBtn = document.getElementById("mobile-signup-btn");
  const signupModal = document.getElementById("signup-modal");
  const closeModal = document.getElementById("close-modal");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // Function to open signup/login popup
  function openAuthModal() {
    signupModal.classList.remove("hidden");
  }

  // Function to close signup/login popup
  function closeAuthModal() {
    signupModal.classList.add("hidden");
  }

  // Function to switch to login form
  function switchToLogin(e) {
    if (e) e.preventDefault();
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  }

  // Function to switch to signup form
  function switchToSignup(e) {
    if (e) e.preventDefault();
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden");
    }
  }

  // Event Listeners
  if (signupBtn) signupBtn.addEventListener("click", openAuthModal);
  if (mobileSignupBtn) mobileSignupBtn.addEventListener("click", openAuthModal);
  if (closeModal) closeModal.addEventListener("click", closeAuthModal);
  if (menuToggle) menuToggle.addEventListener("click", toggleMobileMenu);
  if (loginLink) loginLink.addEventListener("click", switchToLogin);
  if (signupLink) signupLink.addEventListener("click", switchToSignup);

  // Handle form submissions
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('confirm-password').value
      };

      if (formData.password !== formData.confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
      }

      try {
        const success = await signup(formData);
        if (success) {
          showSuccessMessage('Signup successful!');
          setTimeout(() => {
            window.location.href = '/index.html';
    const aboutSections = document.querySelectorAll(".about-page .bg-white");
    if (aboutSections.length > 0) {
      aboutSections.forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }
  }
});
