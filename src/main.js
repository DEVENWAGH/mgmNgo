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
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
        })
      );
      return true;
    }
    throw new Error(data.message || "Signup failed");
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
    const data = await response.json();
    if (data.success) {
      // Save user data to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          name: data.user.name,
          email: data.user.email,
        })
      );
      return { success: true };
    }
    return { success: false, message: data.message };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
}

// Donation function
export async function submitDonation(donationData) {
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
export async function submitContact(contactData) {
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
  console.log("DOM fully loaded");

  // Function declarations - moved to the top for global scope
  function openAuthModal() {
    console.log("Opening auth modal");
    if (signupModal) {
      signupModal.classList.remove("hidden");
    } else {
      console.error("Signup modal element not found");
    }
  }

  function closeAuthModal() {
    console.log("Closing auth modal");
    if (signupModal) {
      signupModal.classList.add("hidden");
    }
  }

  function switchToLogin(e) {
    if (e) e.preventDefault();
    if (loginForm && signupForm) {
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
    }
  }

  function switchToSignup(e) {
    if (e) e.preventDefault();
    if (signupForm && loginForm) {
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    }
  }

  function toggleMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden");
    }
  }

  // Logout function
  window.logout = function () {
    console.log("Logout called");
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Show logout message
    const successElement = document.getElementById("auth-success-message");
    if (successElement) {
      const successText = document.getElementById("auth-success-text");
      if (successText)
        successText.textContent = "You have been logged out successfully.";
      successElement.classList.remove("hidden");
    }

    // Reload page after short delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  // Element references
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

  // Debug element existence
  console.log("Signup button exists:", !!signupBtn);
  console.log("Mobile signup button exists:", !!mobileSignupBtn);
  console.log("Signup modal exists:", !!signupModal);

  // Check if user is already logged in
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user) {
    updateUIForLoggedInUser(user);
  }

  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Event Listeners
  if (signupBtn && !user) {
    console.log("Adding click event to signup button");
    signupBtn.addEventListener("click", openAuthModal);
  }

  if (mobileSignupBtn && !user) {
    mobileSignupBtn.addEventListener("click", openAuthModal);
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeAuthModal);
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMobileMenu);
  }

  if (loginLink) {
    loginLink.addEventListener("click", switchToLogin);
  }

  if (signupLink) {
    signupLink.addEventListener("click", switchToSignup);
  }

  // Handle form submissions
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("signup-email").value,
        password: document.getElementById("signup-password").value,
        confirmPassword: document.getElementById("confirm-password").value,
      };

      if (formData.password !== formData.confirmPassword) {
        showErrorMessage("Passwords do not match");
        return;
      }

      try {
        const success = await signup(formData);
        if (success) {
          showSuccessMessage("Signup successful!");
          setTimeout(() => {
            window.location.href = "/index.html";
          }, 2000);
        }
      } catch (error) {
        showErrorMessage(error.message);
      }
    });
  }

  // Handle login form submission
  const loginFormElement = document.getElementById("login-form-element");
  if (loginFormElement) {
    loginFormElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      const credentials = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
      };

      try {
        const result = await login(credentials);
        if (result.success) {
          showSuccessMessage("Login successful!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          showErrorMessage(result.message || "Login failed");
        }
      } catch (error) {
        showErrorMessage(error.message);
      }
    });
  }

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
});

// Helper functions
function showErrorMessage(message) {
  const errorElement = document.getElementById("auth-error-message");
  if (errorElement) {
    const errorText = document.getElementById("auth-error-text");
    if (errorText) errorText.textContent = message;
    errorElement.classList.remove("hidden");
  }
}

function showSuccessMessage(message) {
  const successElement = document.getElementById("auth-success-message");
  if (successElement) {
    const successText = document.getElementById("auth-success-text");
    if (successText) successText.textContent = message;
    successElement.classList.remove("hidden");
  }
}

function updateUIForLoggedInUser(user) {
  // Update UI for logged-in user
  const signupBtn = document.getElementById("signup-btn");
  const mobileSignupBtn = document.getElementById("mobile-signup-btn");

  if (signupBtn) {
    // Replace button with welcome text and logout option
    signupBtn.innerHTML = `
      <span class="logged-in mr-2">Welcome, ${user.name}</span>
      <button id="logout-btn" class="text-red-200 hover:text-red-100 text-sm">Logout</button>
    `;

    // Add logout event to the new logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      console.log("Adding logout event listener");
      logoutBtn.addEventListener("click", function (e) {
        console.log("Logout button clicked");
        e.stopPropagation(); // Prevent event bubbling
        window.logout();
      });
    }
  }

  // Update mobile menu button too
  if (mobileSignupBtn) {
    mobileSignupBtn.innerHTML = `
      <span class="logged-in mr-2">Welcome, ${user.name}</span>
      <button id="mobile-logout-btn" class="text-red-200 hover:text-red-100 text-sm">Logout</button>
    `;

    const mobileLogoutBtn = document.getElementById("mobile-logout-btn");
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        window.logout();
      });
    }
  }
}
