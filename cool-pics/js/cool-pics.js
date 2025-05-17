// Handle menu toggle
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Handle window resizing
function handleResize() {
  if (window.innerWidth > 1000) {
    navMenu.classList.add("show"); // Show links on wide screens
  } else {
    navMenu.classList.remove("show"); // Hide links on small screens
  }
}

window.addEventListener("resize", handleResize);
window.addEventListener("DOMContentLoaded", handleResize);

// Modal image viewer
const gallery = document.querySelector(".gallery");

// Create and append modal element
const modal = document.createElement("dialog");
modal.classList.add("image-viewer");
document.body.appendChild(modal);

// Add click handler for gallery
gallery.addEventListener("click", (event) => {
  const clickedImg = event.target.closest("img");
  if (!clickedImg) return;

  // ✅ FIXED: use the same image the user clicked
  const fullSrc = clickedImg.getAttribute("src");

  modal.innerHTML = `
    <img src="${fullSrc}" alt="${clickedImg.alt}">
    <button class="close-viewer">X</button>
  `;

  modal.showModal();

  const closeBtn = modal.querySelector(".close-viewer");
  closeBtn.addEventListener("click", () => {
    modal.close();
  });
});

// Close modal on background click
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
