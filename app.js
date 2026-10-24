/**
 * ==============================================================================
 * Student Blog Portal - Comprehensive Application Logic (app.js)
 * Features:
 *   1. 3-Second Loader & Screen Transitions
 *   2. Client-Side Page Routing & Mobile Navigation Drawer
 *   3. Dark / Light Mode Theme Toggle with Persistence
 *   4. Role-Based Authentication (Student & Admin) with Session Storage
 *   5. Top-Right '+' Blog Creation Button (Visible ONLY for Signed-in Students)
 *   6. Blog Creation Modal & Form Management
 *   7. Admin Moderation Dashboard (Approve & Delete Actions, NO Blog Add Option)
 *   8. Real-time Search & Multi-Category Filtering
 *   9. Full Article Reader Modal with Interactive Likes System
 *  10. Student "My Blogs" Dashboard with Live Status Tracking
 *  11. Contact Us & Newsletter Notifications
 * ==============================================================================
 */

// --- INITIAL PRE-SEEDED DATA ---
const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "Getting Started with Open Source as a College Student",
    category: "Computer Science",
    readTime: "5 min read",
    excerpt: "A practical guide to making your first pull request, finding mentor-friendly repositories, and boosting your GitHub profile.",
    content: `Contributing to open source during university is one of the most effective ways to build real-world software engineering skills and stand out to technical recruiters.

### Why Contribute Early?
- **Real Codebases**: You learn how to navigate massive codebases with thousands of files and comprehensive automated test suites.
- **Code Review Experience**: Senior engineers from around the world review your code, providing actionable feedback that improves your architectural decisions.
- **Community Networking**: Connecting with maintainers often opens doors to internships and full-time opportunities.

### Step-by-Step Roadmap
1. **Find Good First Issues**: Search GitHub for issues labeled \`good-first-issue\` or \`beginner-friendly\`.
2. **Read the CONTRIBUTING.md**: Every established repository has specific guidelines for code styles, branching naming conventions, and pull request templates.
3. **Submit Clean PRs**: Keep pull requests focused on a single issue with descriptive commit messages and passing unit tests.`,
    authorName: "Abhinav",
    authorEmail: "abhinav@university.edu",
    status: "approved",
    dateCreated: "Feb 18, 2026",
    likes: 42
  },
  {
    id: "blog-2",
    title: "How I Maintained a 4.0 GPA While Working Part-Time",
    category: "Study Hacks",
    readTime: "4 min read",
    excerpt: "Time-blocking strategies, active recall techniques, and effective prioritization methods that saved my semester.",
    content: `Balancing academic rigor with part-time work requires strict discipline and a reliable personal operating system.

### Time-Blocking System
Instead of maintaining endless to-do lists, schedule specific tasks directly onto your calendar. Treat study sessions with the same non-negotiable commitment as scheduled work shifts.

### Active Recall & Spaced Repetition
Ditch passive rereading and highlighting. Use flashcard systems like Anki or handwritten Feynman summaries to test your memory actively before exams.

### Prioritization Matrix
Categorize assignments using the Eisenhower Matrix: Urgent vs. Important. Focus your freshest mental energy in the morning on high-impact projects and problem sets.`,
    authorName: "Bhumit",
    authorEmail: "bhumit@university.edu",
    status: "approved",
    dateCreated: "Feb 15, 2026",
    likes: 38
  },
  {
    id: "blog-3",
    title: "Highlights from the Annual Inter-College Hackathon 2026",
    category: "Campus Life",
    readTime: "6 min read",
    excerpt: "Over 500 developers built 120+ innovative AI and Web3 projects in 36 action-packed hours. Here are the top winners.",
    content: `The 2026 Annual Campus Hackathon concluded this weekend, bringing together developers, designers, and students from 15 universities across the state.

### The Winning Projects
- **First Place - MediScan AI**: An on-device computer vision tool assisting clinical triage in rural clinics.
- **Second Place - CampusPulse**: An autonomous peer tutoring scheduling engine based on calendar availability.
- **Third Place - EcoTrack**: A carbon footprint estimator integrated with student dining halls.

### Key Takeaways
The greatest hackathon achievements come from focused problem scopes and polished user journeys rather than over-engineered feature lists.`,
    authorName: "Sargun",
    authorEmail: "sargun@university.edu",
    status: "approved",
    dateCreated: "Feb 12, 2026",
    likes: 67
  },
  {
    id: "blog-4",
    title: "Cracking Summer Software Engineering Internships",
    category: "Career & Internships",
    readTime: "7 min read",
    excerpt: "Resume formatting secrets, LeetCode preparation roadmaps, and behavioral interview strategies from senior students.",
    content: `Landing your first software internship is a numbers and preparation game. Here is the structured playbook we used to secure offers at top tier tech companies.

### Resume Essentials
- Single page format with clickable GitHub and LinkedIn links.
- Bullet points structured with Google's XYZ formula: Accomplished [X], measured by [Y], by doing [Z].
- Highlight real deployed projects over school tutorial homework.

### Technical Interview Prep
Focus on patterns rather than memorizing individual problems:
- Two Pointers & Sliding Window
- BFS / DFS Graph traversals
- Dynamic Programming sub-problems
- System design basics for junior engineers`,
    authorName: "Abhinav",
    authorEmail: "abhinav@university.edu",
    status: "pending",
    dateCreated: "Feb 20, 2026",
    likes: 19
  },
  {
    id: "blog-5",
    title: "Building Autonomous AI Agents with Python & LLMs",
    category: "Computer Science",
    readTime: "8 min read",
    excerpt: "An introduction to multi-agent architectures, prompt engineering, and deploying intelligent assistants for student projects.",
    content: `Autonomous AI agents are transforming modern development by enabling models to inspect codebases, execute shell commands, and interact with tool ecosystems independently.

### Core Architecture
An autonomous agent consists of four main components:
1. **Planning & Reasoning Engine**: Breaking down user prompts into multi-step execution plans.
2. **Tool Execution**: Sandboxed function calling for file reading, search, and command execution.
3. **Memory Systems**: Short-term context management and long-term vector embeddings.
4. **Self-Reflection**: Evaluating tool outputs and correcting errors dynamically.`,
    authorName: "Bhumit",
    authorEmail: "bhumit@university.edu",
    status: "pending",
    dateCreated: "Feb 22, 2026",
    likes: 25
  }
];

// --- APP STATE CLASS ---
class AppState {
  constructor() {
    this.initStorage();
    this.activePage = "home";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.loginRole = "student"; // 'student' or 'admin'
  }

  initStorage() {
    // 1. Students array
    if (!localStorage.getItem("sb_students")) {
      localStorage.setItem("sb_students", JSON.stringify([
        {
          id: "STU-2026-101",
          name: "Abhinav",
          email: "abhinav@university.edu",
          password: "password123",
          course: "Computer Science & Engineering"
        },
        {
          id: "STU-2026-102",
          name: "Bhumit",
          email: "bhumit@university.edu",
          password: "password123",
          course: "Information Technology"
        },
        {
          id: "STU-2026-103",
          name: "Sargun",
          email: "sargun@university.edu",
          password: "password123",
          course: "Electronics & Communication"
        }
      ]));
    }

    // 2. Blogs array
    if (!localStorage.getItem("sb_blogs")) {
      localStorage.setItem("sb_blogs", JSON.stringify(INITIAL_BLOGS));
    }

    // 3. Current Session
    if (!localStorage.getItem("sb_session")) {
      localStorage.setItem("sb_session", JSON.stringify(null));
    }

    // 4. Theme
    if (localStorage.getItem("sb_theme") === "light") {
      document.body.classList.add("light-theme");
    }
  }

  getStudents() {
    return JSON.parse(localStorage.getItem("sb_students")) || [];
  }

  saveStudents(students) {
    localStorage.setItem("sb_students", JSON.stringify(students));
  }

  getBlogs() {
    return JSON.parse(localStorage.getItem("sb_blogs")) || [];
  }

  saveBlogs(blogs) {
    localStorage.setItem("sb_blogs", JSON.stringify(blogs));
  }

  getSession() {
    return JSON.parse(localStorage.getItem("sb_session"));
  }

  setSession(sessionData) {
    localStorage.setItem("sb_session", JSON.stringify(sessionData));
  }
}

const state = new AppState();

// --- DOM ELEMENTS REFERENCE ---
let elements = {};

function initDOMElements() {
  elements = {
    // Navigation
    navMenu: document.getElementById("nav-menu"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    navBrand: document.querySelector(".nav-brand"),
    navLinks: document.querySelectorAll("[data-page]"),
    guestOnly: document.querySelectorAll(".guest-only"),
    studentOnly: document.querySelectorAll(".student-only"),
    adminOnly: document.querySelectorAll(".admin-only"),
    authOnly: document.querySelectorAll(".auth-only"),
    userProfileItem: document.getElementById("user-profile-item"),
    userBadge: document.getElementById("user-badge"),
    navAvatar: document.getElementById("nav-avatar"),
    navUserName: document.getElementById("nav-user-name"),
    logoutBtn: document.getElementById("logout-btn"),
    themeToggleBtn: document.getElementById("theme-toggle-btn"),
    navAddBtn: document.getElementById("nav-add-btn"), // Top Right '+' Button

    // Pages
    pages: document.querySelectorAll(".page"),

    // Grids
    homeBlogsGrid: document.getElementById("home-blogs-grid"),
    exploreBlogsGrid: document.getElementById("explore-blogs-grid"),
    studentBlogsGrid: document.getElementById("student-blogs-grid"),

    // Search & Filter
    searchInput: document.getElementById("search-input"),
    categoryFilters: document.querySelectorAll("#category-filters .pill-opt"),

    // Auth Forms & Toggles
    signupForm: document.getElementById("signup-form"),
    studentLoginForm: document.getElementById("student-login-form"),
    adminLoginForm: document.getElementById("admin-login-form"),
    toggleStudent: document.getElementById("toggle-student"),
    toggleAdmin: document.getElementById("toggle-admin"),
    formStudentBlock: document.getElementById("form-student-block"),
    formAdminBlock: document.getElementById("form-admin-block"),

    // Student Dashboard
    studentWelcome: document.getElementById("student-welcome"),
    dashUploadBtn: document.getElementById("dash-upload-btn"),
    heroUploadBtn: document.getElementById("hero-upload-btn"),

    // Admin Dashboard (Moderation Portal)
    statTotalBlogs: document.getElementById("stat-total-blogs"),
    statPendingBlogs: document.getElementById("stat-pending-blogs"),
    statApprovedBlogs: document.getElementById("stat-approved-blogs"),
    statTotalStudents: document.getElementById("stat-total-students"),
    adminPendingTbody: document.getElementById("admin-pending-tbody"),
    adminPublishedTbody: document.getElementById("admin-published-tbody"),

    // Modals
    uploadModal: document.getElementById("upload-blog-modal"),
    uploadForm: document.getElementById("upload-blog-form"),
    readArticleModal: document.getElementById("read-article-modal"),
    readArticleContent: document.getElementById("read-article-content"),
    modalCloseBtns: document.querySelectorAll(".modal-close-btn, .modal-cancel-btn"),

    // Forms
    contactForm: document.getElementById("contact-form"),
    newsletterForm: document.getElementById("newsletter-form"),

    // Toast Container
    toastContainer: document.getElementById("toast-container")
  };
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initDOMElements();
  setupNavigation();
  setupAuthEvents();
  setupBlogEvents();
  setupThemeToggle();
  setupAuxForms();
  updateSessionUI();
  renderAllFeeds();
});

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = "info") {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <div>${message}</div>
  `;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- NAVIGATION & PAGE ROUTING ---
function setupNavigation() {
  // Mobile Hamburger Toggle
  if (elements.mobileMenuBtn) {
    elements.mobileMenuBtn.addEventListener("click", () => {
      elements.mobileMenuBtn.classList.toggle("open");
      elements.navMenu.classList.toggle("open");
    });
  }

  // Brand click -> home
  if (elements.navBrand) {
    elements.navBrand.addEventListener("click", () => {
      navigateToPage("home");
    });
  }

  // Link click handlers
  document.querySelectorAll("[data-page]").forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = elem.getAttribute("data-page");
      navigateToPage(targetPage);
    });
  });

  // Top-Right '+' Button click handler -> Opens Create Blog Modal
  if (elements.navAddBtn) {
    elements.navAddBtn.addEventListener("click", () => {
      const session = state.getSession();
      if (!session || session.role !== "student") {
        showToast("Please sign in as a Student to write a blog post!", "error");
        navigateToPage("login");
        return;
      }
      openCreateBlogModal();
    });
  }
}

function closeMobileMenu() {
  if (elements.mobileMenuBtn) elements.mobileMenuBtn.classList.remove("open");
  if (elements.navMenu) elements.navMenu.classList.remove("open");
}

function navigateToPage(pageId) {
  state.activePage = pageId;
  closeMobileMenu();

  // Update Page Visibility
  elements.pages.forEach(p => {
    if (p.id === `${pageId}-page`) {
      p.classList.add("active-page");
    } else {
      p.classList.remove("active-page");
    }
  });

  // Update Nav Links Active Highlight
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Re-render dashboard or feeds
  if (pageId === "student-dashboard") {
    renderStudentDashboard();
  } else if (pageId === "admin-dashboard") {
    renderAdminDashboard();
  } else if (pageId === "home" || pageId === "blogs") {
    renderAllFeeds();
  }
}

// --- SESSION & UI UPDATES ---
function updateSessionUI() {
  const session = state.getSession();

  if (session && session.isLoggedIn) {
    // Hide Guest Links (Sign In, Sign Up)
    elements.guestOnly.forEach(el => el.style.display = "none");

    // Show Authenticated Elements
    elements.authOnly.forEach(el => el.style.display = "inline-flex");
    if (elements.userProfileItem) elements.userProfileItem.style.display = "inline-flex";
    if (elements.logoutItem) elements.logoutItem.style.display = "inline-flex";
    if (elements.logoutBtn) elements.logoutBtn.style.display = "inline-flex";

    if (session.role === "student") {
      // STUDENT ROLE
      elements.studentOnly.forEach(el => el.style.display = "flex");
      elements.adminOnly.forEach(el => el.style.display = "none");

      // SHOW TOP-RIGHT '+' BUTTON ONLY FOR STUDENT
      if (elements.navAddBtn) elements.navAddBtn.style.display = "flex";

      if (elements.userBadge) elements.userBadge.classList.remove("admin-badge-active");
      const initials = (session.user && session.user.name) ? session.user.name.substring(0, 2).toUpperCase() : "ST";
      if (elements.navAvatar) elements.navAvatar.textContent = initials;
      if (elements.navUserName) elements.navUserName.textContent = session.user.name || "Student";

    } else if (session.role === "admin") {
      // ADMIN ROLE
      elements.studentOnly.forEach(el => el.style.display = "none");
      elements.adminOnly.forEach(el => el.style.display = "flex");

      // HIDE TOP-RIGHT '+' BUTTON FOR ADMIN (Admin moderation section only)
      if (elements.navAddBtn) elements.navAddBtn.style.display = "none";

      if (elements.userBadge) elements.userBadge.classList.add("admin-badge-active");
      if (elements.navAvatar) elements.navAvatar.textContent = "👑";
      if (elements.navUserName) elements.navUserName.textContent = "Admin Portal";
    }
  } else {
    // GUEST (LOGGED OUT)
    elements.guestOnly.forEach(el => el.style.display = "inline-flex");
    elements.authOnly.forEach(el => el.style.display = "none");
    elements.studentOnly.forEach(el => el.style.display = "none");
    elements.adminOnly.forEach(el => el.style.display = "none");

    if (elements.userProfileItem) elements.userProfileItem.style.display = "none";
    if (elements.logoutItem) elements.logoutItem.style.display = "none";
    if (elements.logoutBtn) elements.logoutBtn.style.display = "none";

    // HIDE TOP-RIGHT '+' BUTTON WHEN LOGGED OUT
    if (elements.navAddBtn) elements.navAddBtn.style.display = "none";
  }
}

// --- AUTHENTICATION LOGIC ---
function setupAuthEvents() {
  // Student / Admin Toggle in Login Form
  if (elements.toggleStudent && elements.toggleAdmin) {
    elements.toggleStudent.addEventListener("click", () => {
      state.loginRole = "student";
      elements.toggleStudent.classList.add("active");
      elements.toggleAdmin.classList.remove("active");
      elements.formStudentBlock.style.display = "block";
      elements.formAdminBlock.style.display = "none";
    });

    elements.toggleAdmin.addEventListener("click", () => {
      state.loginRole = "admin";
      elements.toggleAdmin.classList.add("active");
      elements.toggleStudent.classList.remove("active");
      elements.formAdminBlock.style.display = "block";
      elements.formStudentBlock.style.display = "none";
    });
  }

  // Student Sign Up Form Submission (Create Account)
  if (elements.signupForm) {
    elements.signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim() || "Student User";
      const studentId = document.getElementById("reg-id").value.trim() || ("STU-" + Date.now().toString().slice(-4));
      const email = document.getElementById("reg-email").value.trim() || "student@university.edu";
      const pass = document.getElementById("reg-pass").value;
      const cpass = document.getElementById("reg-cpass").value;
      const course = document.getElementById("reg-course").value;

      if (pass && cpass && pass !== cpass) {
        showToast("Passwords do not match! Please check your password.", "error");
        return;
      }

      const students = state.getStudents();
      const existing = students.find(s => 
        s.email.toLowerCase() === email.toLowerCase() || 
        s.id.toLowerCase() === studentId.toLowerCase()
      );

      if (existing) {
        showToast("An account with this Email or Student ID already exists! Please Sign In.", "error");
        navigateToPage("login");
        const idInput = document.getElementById("stu-identifier");
        if (idInput) idInput.value = email;
        return;
      }

      const newStudent = {
        id: studentId,
        name: name,
        email: email,
        password: pass || "password123",
        course: course,
        dateJoined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      students.push(newStudent);
      state.saveStudents(students);

      showToast(`Account created successfully for ${name}! Please sign in now with your credentials. 🎉`, "success");
      elements.signupForm.reset();

      // Navigate to login and prefill identifier
      navigateToPage("login");
      const identifierInput = document.getElementById("stu-identifier");
      if (identifierInput) {
        identifierInput.value = email;
        const passInput = document.getElementById("stu-pass");
        if (passInput) passInput.focus();
      }
    });
  }

  // Student Login Form Submission: Requires User to Have Signed Up First!
  if (elements.studentLoginForm) {
    elements.studentLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const identifier = document.getElementById("stu-identifier").value.trim();
      const pass = document.getElementById("stu-pass").value;

      const students = state.getStudents();
      const student = students.find(s => 
        (s.email.toLowerCase() === identifier.toLowerCase() || s.id.toLowerCase() === identifier.toLowerCase())
      );

      // User must first sign up and create an account
      if (!student) {
        showToast("Account not found! Please Sign Up and create an account first. 📝", "error");
        const regEmail = document.getElementById("reg-email");
        if (regEmail && identifier.includes("@")) regEmail.value = identifier;
        navigateToPage("signup");
        return;
      }

      // Validate password
      if (student.password && student.password !== pass) {
        showToast("Incorrect password! Please check your credentials or create a new account.", "error");
        return;
      }

      // Successful Login
      state.setSession({ isLoggedIn: true, role: "student", user: student });
      updateSessionUI();
      showToast(`Welcome back, ${student.name}! Use the top-right '+' button to post a blog. 🎓`, "success");
      elements.studentLoginForm.reset();
      navigateToPage("student-dashboard");
    });
  }

  // Admin Login Form Submission: Admin ID is 'admin' and password is '123'
  if (elements.adminLoginForm) {
    elements.adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const admId = document.getElementById("adm-id").value.trim();
      const admPass = document.getElementById("adm-pass").value;

      if (admId === "admin" && admPass === "123") {
        state.setSession({ 
          isLoggedIn: true, 
          role: "admin", 
          user: { name: "Faculty Admin", id: "ADMIN-01" } 
        });
        updateSessionUI();
        showToast("Admin Authentication Successful! Moderation Mode Active (Approve/Delete). 🛡️", "success");
        elements.adminLoginForm.reset();
        navigateToPage("admin-dashboard");
      } else {
        showToast("Invalid credentials! Admin ID is 'admin' and password is '123'. ❌", "error");
      }
    });
  }

  // Logout Action
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      state.setSession(null);
      updateSessionUI();
      showToast("You have logged out successfully. 🚪", "info");
      navigateToPage("home");
    });
  }
}

// --- BLOG MANAGEMENT & MODALS ---
function openCreateBlogModal() {
  if (elements.uploadModal) {
    elements.uploadModal.classList.add("active");
  }
}

function closeCreateBlogModal() {
  if (elements.uploadModal) {
    elements.uploadModal.classList.remove("active");
  }
}

function setupBlogEvents() {
  // Upload buttons in dashboards / hero
  if (elements.dashUploadBtn) elements.dashUploadBtn.addEventListener("click", openCreateBlogModal);
  if (elements.heroUploadBtn) elements.heroUploadBtn.addEventListener("click", openCreateBlogModal);

  // Close modals buttons
  elements.modalCloseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (elements.uploadModal) elements.uploadModal.classList.remove("active");
      if (elements.readArticleModal) elements.readArticleModal.classList.remove("active");
    });
  });

  // Modal backdrop click to close
  window.addEventListener("click", (e) => {
    if (e.target === elements.uploadModal) elements.uploadModal.classList.remove("active");
    if (e.target === elements.readArticleModal) elements.readArticleModal.classList.remove("active");
  });

  // Form Submit: Create New Blog Post
  if (elements.uploadForm) {
    elements.uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const session = state.getSession();
      if (!session || !session.user) {
        showToast("Session expired. Please sign in again.", "error");
        navigateToPage("login");
        return;
      }

      const title = document.getElementById("blog-title").value.trim();
      const category = document.getElementById("blog-category").value;
      const readTime = document.getElementById("blog-readtime").value.trim() || "5 min read";
      const excerpt = document.getElementById("blog-excerpt").value.trim();
      const content = document.getElementById("blog-content").value.trim();

      const blogs = state.getBlogs();
      const newBlog = {
        id: "blog-" + Date.now(),
        title,
        category,
        readTime,
        excerpt,
        content,
        authorName: session.user.name || "Student",
        authorEmail: session.user.email || "student@university.edu",
        status: "pending", // Enters Pending State for Admin Moderation
        dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0
      };

      blogs.unshift(newBlog);
      state.saveBlogs(blogs);

      closeCreateBlogModal();
      elements.uploadForm.reset();

      showToast("🎉 Blog post submitted successfully! Pending Admin approval.", "success");
      
      if (state.activePage === "student-dashboard") {
        renderStudentDashboard();
      } else {
        renderAllFeeds();
      }
    });
  }

  // Real-Time Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderExploreBlogsFeed();
    });
  }

  // Category Filter Pills
  elements.categoryFilters.forEach(pill => {
    pill.addEventListener("click", () => {
      elements.categoryFilters.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.getAttribute("data-cat");
      renderExploreBlogsFeed();
    });
  });
}

// --- RENDER FEEDS & CARDS ---
function renderAllFeeds() {
  renderHomeBlogsFeed();
  renderExploreBlogsFeed();
}

function renderHomeBlogsFeed() {
  if (!elements.homeBlogsGrid) return;
  const blogs = state.getBlogs().filter(b => b.status === "approved");
  elements.homeBlogsGrid.innerHTML = "";

  if (blogs.length === 0) {
    elements.homeBlogsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
        No published articles available yet.
      </div>`;
    return;
  }

  // Display top 3 trending approved articles
  blogs.slice(0, 3).forEach(blog => {
    const card = createBlogCard(blog);
    elements.homeBlogsGrid.appendChild(card);
  });
}

function renderExploreBlogsFeed() {
  if (!elements.exploreBlogsGrid) return;
  let blogs = state.getBlogs().filter(b => b.status === "approved");

  // Category Filter
  if (state.activeCategory !== "all") {
    blogs = blogs.filter(b => b.category === state.activeCategory);
  }

  // Search Filter
  if (state.searchQuery !== "") {
    blogs = blogs.filter(b => 
      b.title.toLowerCase().includes(state.searchQuery) ||
      b.excerpt.toLowerCase().includes(state.searchQuery) ||
      b.authorName.toLowerCase().includes(state.searchQuery) ||
      b.category.toLowerCase().includes(state.searchQuery)
    );
  }

  elements.exploreBlogsGrid.innerHTML = "";

  if (blogs.length === 0) {
    elements.exploreBlogsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px;">
        No articles match your search or filter criteria.
      </div>`;
    return;
  }

  blogs.forEach(blog => {
    const card = createBlogCard(blog);
    elements.exploreBlogsGrid.appendChild(card);
  });
}

function createBlogCard(blog) {
  const card = document.createElement("article");
  card.className = "card";
  
  const initials = blog.authorName ? blog.authorName.substring(0, 2).toUpperCase() : "ST";
  const session = state.getSession();

  // If Admin is viewing, show inline moderation controls on cards
  const adminControlsHTML = (session && session.role === "admin") ? `
    <div style="display: flex; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-color); justify-content: flex-end;">
      ${blog.status !== 'approved' ? `<button class="btn btn-sm btn-success" onclick="approveBlog('${blog.id}')">Approve ✅</button>` : ''}
      <button class="btn btn-sm btn-danger" onclick="deleteBlog('${blog.id}')">Delete 🗑️</button>
    </div>
  ` : '';

  card.innerHTML = `
    <div class="card-top">
      <span class="card-tag">${blog.category}</span>
      <span class="status-badge ${blog.status === 'approved' ? 'status-approved' : 'status-pending'}">
        ${blog.status === 'approved' ? '✅ Live' : '⏳ Pending'}
      </span>
    </div>
    <h3 class="card-title">${blog.title}</h3>
    <p class="card-excerpt">${blog.excerpt}</p>
    <div class="blog-card-action">
      <div class="author">
        <div class="avatar">${initials}</div>
        <span>${blog.authorName}</span>
      </div>
      <span class="read-btn" onclick="openArticleReader('${blog.id}')">Read Article &rarr;</span>
    </div>
    ${adminControlsHTML}
  `;
  return card;
}

// --- STUDENT DASHBOARD RENDERING ---
function renderStudentDashboard() {
  const session = state.getSession();
  if (!session || session.role !== "student") return;

  if (elements.studentWelcome) {
    elements.studentWelcome.textContent = `Welcome back, ${session.user.name}! 🎓`;
  }

  const allBlogs = state.getBlogs();
  const studentBlogs = allBlogs.filter(b => b.authorEmail === session.user.email);

  if (!elements.studentBlogsGrid) return;
  elements.studentBlogsGrid.innerHTML = "";

  if (studentBlogs.length === 0) {
    elements.studentBlogsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; background: var(--bg-card); padding: 50px 20px; border-radius: 18px; border: 1px solid var(--border-color);">
        <h4 style="font-size: 18px; color: var(--text-primary); margin-bottom: 8px;">You haven't published any articles yet</h4>
        <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 14px;">Share your technical tutorials, projects, or study tips with fellow students!</p>
        <button class="btn btn-primary" onclick="openCreateBlogModal()">➕ Write Your First Article</button>
      </div>
    `;
    return;
  }

  studentBlogs.forEach(blog => {
    const card = document.createElement("article");
    card.className = "card";
    
    const statusBadge = blog.status === "approved" 
      ? `<span class="status-badge status-approved">✅ Approved & Live</span>` 
      : `<span class="status-badge status-pending">⏳ Pending Admin Approval</span>`;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="card-tag" style="margin-bottom: 0;">${blog.category}</span>
        ${statusBadge}
      </div>
      <h3 class="card-title">${blog.title}</h3>
      <p class="card-excerpt">${blog.excerpt}</p>
      <div class="blog-card-action">
        <span style="font-size: 12px; color: var(--text-muted);">Submitted: ${blog.dateCreated}</span>
        <span class="read-btn" onclick="openArticleReader('${blog.id}')">Preview Article &rarr;</span>
      </div>
    `;
    elements.studentBlogsGrid.appendChild(card);
  });
}

// --- ADMIN DASHBOARD & MODERATION (APPROVE & DELETE ONLY) ---
function renderAdminDashboard() {
  const session = state.getSession();
  if (!session || session.role !== "admin") return;

  const blogs = state.getBlogs();
  const students = state.getStudents();

  const pendingBlogs = blogs.filter(b => b.status === "pending");
  const approvedBlogs = blogs.filter(b => b.status === "approved");

  // Update Counters
  if (elements.statTotalBlogs) elements.statTotalBlogs.textContent = blogs.length;
  if (elements.statPendingBlogs) elements.statPendingBlogs.textContent = pendingBlogs.length;
  if (elements.statApprovedBlogs) elements.statApprovedBlogs.textContent = approvedBlogs.length;
  if (elements.statTotalStudents) elements.statTotalStudents.textContent = students.length;

  // Render Pending Queue Table
  if (elements.adminPendingTbody) {
    elements.adminPendingTbody.innerHTML = "";

    if (pendingBlogs.length === 0) {
      elements.adminPendingTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
            🎉 All pending blog submissions have been reviewed!
          </td>
        </tr>
      `;
    } else {
      pendingBlogs.forEach(blog => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <strong style="color: var(--text-primary); display: block;">${blog.title}</strong>
            <span style="font-size: 12px; color: #818cf8;">${blog.category}</span>
          </td>
          <td>
            <span style="color: var(--text-primary); font-weight: 600;">${blog.authorName}</span><br>
            <span style="font-size: 12px; color: var(--text-muted);">${blog.authorEmail}</span>
          </td>
          <td>${blog.dateCreated}</td>
          <td><span class="status-badge status-pending">⏳ Pending</span></td>
          <td>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-success btn-sm" onclick="approveBlog('${blog.id}')">Approve ✅</button>
              <button class="btn btn-danger btn-sm" onclick="deleteBlog('${blog.id}')">Delete 🗑️</button>
            </div>
          </td>
        `;
        elements.adminPendingTbody.appendChild(tr);
      });
    }
  }

  // Render Published Articles Table
  if (elements.adminPublishedTbody) {
    elements.adminPublishedTbody.innerHTML = "";

    if (approvedBlogs.length === 0) {
      elements.adminPublishedTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
            No live published articles found.
          </td>
        </tr>
      `;
    } else {
      approvedBlogs.forEach(blog => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <strong style="color: var(--text-primary); display: block;">${blog.title}</strong>
            <span style="font-size: 12px; color: #818cf8;">${blog.category}</span>
          </td>
          <td>
            <span style="color: var(--text-primary);">${blog.authorName}</span>
          </td>
          <td>${blog.dateCreated}</td>
          <td><span class="status-badge status-approved">Live</span></td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteBlog('${blog.id}')">Delete 🗑️</button>
          </td>
        `;
        elements.adminPublishedTbody.appendChild(tr);
      });
    }
  }
}

// ADMIN ACTION: APPROVE BLOG POST
window.approveBlog = function(blogId) {
  const blogs = state.getBlogs();
  const blog = blogs.find(b => b.id === blogId);

  if (blog) {
    blog.status = "approved";
    state.saveBlogs(blogs);
    showToast(`"${blog.title}" has been approved & published live! ✅`, "success");
    renderAdminDashboard();
    renderAllFeeds();
  }
};

// ADMIN ACTION: DELETE BLOG POST
window.deleteBlog = function(blogId) {
  let blogs = state.getBlogs();
  const blog = blogs.find(b => b.id === blogId);
  blogs = blogs.filter(b => b.id !== blogId);
  state.saveBlogs(blogs);

  showToast(`Blog post deleted successfully. 🗑️`, "info");
  
  if (state.activePage === "admin-dashboard") renderAdminDashboard();
  if (state.activePage === "student-dashboard") renderStudentDashboard();
  renderAllFeeds();
};

// --- ARTICLE READER MODAL ---
window.openArticleReader = function(blogId) {
  const blogs = state.getBlogs();
  const blog = blogs.find(b => b.id === blogId);
  if (!blog || !elements.readArticleContent) return;

  const initials = blog.authorName ? blog.authorName.substring(0, 2).toUpperCase() : "ST";

  elements.readArticleContent.innerHTML = `
    <div class="article-header">
      <span class="card-tag">${blog.category}</span>
      <h1>${blog.title}</h1>
      <div class="article-meta">
        <div class="author">
          <div class="avatar">${initials}</div>
          <span>By <strong>${blog.authorName}</strong></span>
        </div>
        <span>•</span>
        <span>📅 ${blog.dateCreated}</span>
        <span>•</span>
        <span>⏱️ ${blog.readTime || '5 min read'}</span>
      </div>
    </div>
    <div class="article-body">
      ${blog.content.split('\n\n').map(p => {
        if (p.startsWith('### ')) {
          return `<h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 22px 0 10px;">${p.replace('### ', '')}</h3>`;
        }
        return `<p style="margin-bottom: 16px;">${p}</p>`;
      }).join('')}
    </div>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <button type="button" class="btn btn-outline btn-sm" onclick="likeArticle('${blog.id}', this)">
        ❤️ Like Article (${blog.likes || 0})
      </button>
      <span class="status-badge ${blog.status === 'approved' ? 'status-approved' : 'status-pending'}">
        ${blog.status === 'approved' ? '✅ Live Article' : '⏳ Pending Review'}
      </span>
    </div>
  `;

  if (elements.readArticleModal) {
    elements.readArticleModal.classList.add("active");
  }
};

window.likeArticle = function(blogId, btn) {
  const blogs = state.getBlogs();
  const blog = blogs.find(b => b.id === blogId);
  if (blog) {
    blog.likes = (blog.likes || 0) + 1;
    state.saveBlogs(blogs);
    btn.innerHTML = `❤️ Liked (${blog.likes})`;
    showToast("You liked this article! ❤️", "success");
  }
};

// --- THEME SWITCHER ---
function setupThemeToggle() {
  if (!elements.themeToggleBtn) return;
  elements.themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("sb_theme", isLight ? "light" : "dark");
  });
}

// --- AUXILIARY FORMS (CONTACT & NEWSLETTER) ---
function setupAuxForms() {
  if (elements.contactForm) {
    elements.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your message has been sent to our campus editorial team.", "success");
      elements.contactForm.reset();
    });
  }

  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Subscribed! You will receive weekly student highlights.", "success");
      elements.newsletterForm.reset();
    });
  }
}
