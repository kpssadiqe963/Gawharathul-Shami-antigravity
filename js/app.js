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
    navContact: { en: "Contact Us", ar: "تواصل معنا" },
    heroTitle: {
        en: "Malhama Gawharat Al-sham",
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
    contactTitle: {
        en: "Contact Us",
        ar: "تواصل معنا"
    },
    contactDesc: {
        en: "For inquiries and orders, please contact us on our unified number:",
        ar: "للإستفسارات والطلبات، يرجى التواصل معنا على الرقم الموحد:"
    },
    footerText: {
        en: "© 2026 Malhama Gawharat Al-sham. All rights reserved.",
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
    
    // Update dynamic text
    aboutTextElement.textContent = appData.about[currentLang];
    
    // Re-render showrooms for language update
    renderShowrooms();
}

// Run init on load
document.addEventListener('DOMContentLoaded', init);
