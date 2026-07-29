// Application Logic

// State
let currentLang = 'ar'; // Default language is Arabic
let isDarkMode = false; // Default theme is Light

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const aboutTextElement = document.getElementById('about-text');
const showroomsGrid = document.getElementById('showrooms-grid');

// Translations
const translations = {
    navAbout: { en: "About Us", ar: "من نحن" },
    navBranches: { en: "Branches", ar: "فروعنا" },
    navGallery: { en: "Gallery", ar: "المعرض" },
    navContact: { en: "Contact Us", ar: "تواصل معنا" },
    heroTitle: {
        en: "Malhamat Jowharat Shami",
        ar: "ملحمة جوهرة الشامي"
    },
    heroSubtitle: {
        en: "Hashi - Sheep - Veal",
        ar: "حاشي - خروف - بتالو"
    },
    aboutTitle: {
        en: "About Us",
        ar: "من نحن"
    },
    showroomsTitle: {
        en: "Our Branches",
        ar: "فروعنا"
    },
    galleryTitle: {
        en: "Gallery",
        ar: "المعرض"
    },
    galleryEmpty: {
        en: "No photos in the gallery yet.",
        ar: "لا توجد صور في المعرض حالياً."
    },
    contactTitle: {
        en: "Contact Us",
        ar: "تواصل معنا"
    },
    contactDesc: {
        en: "For inquiries and orders, please contact us on our unified number:",
        ar: "للإستفسارات والطلبات، يرجى التواصل معنا على الرقم الموحد:"
    },
    callBtn: {
        en: "Call",
        ar: "إتصال"
    },
    footerText: {
        en: "© 2026 Malhamat Jowharat Shami. All rights reserved.",
        ar: "© 2026 ملحمة جوهرة الشامي. جميع الحقوق محفوظة."
    }
};

// Initialize App
function init() {
    renderShowrooms();
    updateLanguage();
    
    // Event Listeners
    themeToggleBtn.addEventListener('click', toggleTheme);
    langToggleBtn.addEventListener('click', toggleLanguage);
}

// Render Showrooms Cards
function renderShowrooms() {
    showroomsGrid.innerHTML = '';
    
    appData.showrooms.forEach(showroom => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${showroom.image}" alt="${showroom.name[currentLang]}" class="card-img" onerror="this.src='https://via.placeholder.com/400x250?text=Showroom+Photo'">
            </div>
            <div class="card-content">
                <h3 class="card-title">${showroom.name[currentLang]}</h3>
                
                <div class="card-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="card-detail-text">
                        <a href="${showroom.map}" target="_blank">${showroom.address[currentLang]}</a>
                    </div>
                </div>
                
                <div class="card-detail">
                    <i class="fas fa-phone-alt"></i>
                    <div class="card-detail-text" dir="ltr" style="text-align: ${currentLang === 'ar' ? 'right' : 'left'};">
                        <a href="tel:${showroom.phone.replace(/\s+/g, '')}">${showroom.phone}</a>
                    </div>
                </div>
                
                <div class="card-actions">
                    <a href="tel:${showroom.phone.replace(/\s+/g, '')}" class="btn btn-primary">
                        <i class="fas fa-phone"></i>
                        <span class="btn-text" data-btn="call">${currentLang === 'ar' ? 'إتصال' : 'Call'}</span>
                    </a>
                    <a href="https://wa.me/${showroom.whatsapp}" target="_blank" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span class="btn-text" data-btn="whatsapp">${currentLang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                    </a>
                </div>
            </div>
        `;
        showroomsGrid.appendChild(card);
    });
}

// Toggle Theme
function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle Language
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage();
}

// Update Language UI
function updateLanguage() {
    // Update HTML dir attribute for RTL/LTR
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    
    // Update toggle button text
    langToggleBtn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
    
    // Update static translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key] && translations[key][currentLang]) {
            element.textContent = translations[key][currentLang];
        }
    });
    
    // Update About Section elements
    const d = appData.about[currentLang];
    document.getElementById('about-p1').textContent = d.p1;
    document.getElementById('about-p2').textContent = d.p2;
    document.getElementById('about-tagline').textContent = d.tagline;
    document.getElementById('stat1Label').textContent = d.stat1Label;
    document.getElementById('stat2Label').textContent = d.stat2Label;
    document.getElementById('stat3Label').textContent = d.stat3Label;
    document.getElementById('meat1').textContent = d.meat1;
    document.getElementById('meat2').textContent = d.meat2;
    document.getElementById('meat3').textContent = d.meat3;
    
    // Re-render showrooms and gallery for language update
    renderShowrooms();
    if (typeof renderGallery === 'function') renderGallery();
}

// Run init on load
document.addEventListener('DOMContentLoaded', init);
