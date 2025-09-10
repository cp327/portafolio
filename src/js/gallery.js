let galleries = {};
let currentGallery = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Buscar todas las imágenes con data-gallery
  document.querySelectorAll("[data-gallery]").forEach(img => {
    const galleryName = img.dataset.gallery;
    const index = parseInt(img.dataset.index);

    if (!galleries[galleryName]) {
      galleries[galleryName] = [];
    }

    galleries[galleryName].push(img.src);

    img.addEventListener("click", () => openModal(galleryName, index));
  });

  // Cerrar con clic fuera
  document.getElementById("imageModal").addEventListener("click", (e) => {
    if (e.target.id === "imageModal") {
      closeModal();
    }
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
});

function openModal(galleryName, index) {
  currentGallery = galleries[galleryName];
  currentIndex = index;

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  modalImg.src = currentGallery[currentIndex];
  modalImg.classList.remove("scale-90", "opacity-0");
  modalImg.classList.add("scale-100", "opacity-100");
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.classList.add("scale-90", "opacity-0");
  modalImg.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateImage();
}

function updateImage() {
  const modalImg = document.getElementById("modalImage");
  modalImg.classList.add("scale-90", "opacity-0");

  setTimeout(() => {
    modalImg.src = currentGallery[currentIndex];
    modalImg.classList.remove("scale-90", "opacity-0");
    modalImg.classList.add("scale-100", "opacity-100");
  }, 200);
}
