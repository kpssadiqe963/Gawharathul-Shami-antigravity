/*
 * ============================================================
 * GALLERY MANAGER - Easy to edit!
 * ============================================================
 * To ADD a new photo to the gallery:
 *   1. Put the photo file inside the "images/gallery/" folder.
 *   2. Add its filename to the list below, e.g. "gallery6.jpg"
 *
 * To REMOVE a photo:
 *   1. Delete its filename from the list below.
 *
 * Supported formats: .jpg, .jpeg, .png, .webp
 * ============================================================
 */

const galleryImages = [
  "gallery1.jpg",
  "gallery2.jpg",
  "gallery3.jpg",
  "gallery4.jpg",
  "gallery5.jpg",
  "gallery6.jpg",
  "gallery7.jpg",
  "gallery8.jpg",
  "gallery9.jpg",
  "gallery10.jpg",
  "gallery11.jpg",
  "gallery12.jpg",
];

// Renders gallery images on the page
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  if (galleryImages.length === 0) {
    grid.innerHTML = `<p class="gallery-empty" data-i18n="galleryEmpty">لا توجد صور في المعرض حالياً.</p>`;
    return;
  }

  grid.innerHTML = '';
  galleryImages.forEach((filename, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img 
        src="images/gallery/${filename}" 
        alt="Gallery image ${index + 1}" 
        class="gallery-img"
        loading="lazy"
        onclick="openLightbox(this.src)"
      >
    `;
    grid.appendChild(item);
  });
}

// Simple lightbox to view photos full size on click
function openLightbox(src) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" onclick="this.closest('.lightbox-overlay').remove()">&times;</button>
      <img src="${src}" class="lightbox-img" alt="Gallery photo">
    </div>
  `;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

renderGallery();
