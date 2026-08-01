class Translator {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {};
    }

    async loadTranslations(lang) {
        try {
            // Absolute path ensures it works from nested folders like /case-study-one/index.html
            const response = await fetch(`/assets/languages/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang}.json`);
            
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            
            this.translatePage();
            
            // Dispatch event so other scripts know translation is done
            window.dispatchEvent(new Event('translationsLoaded'));
        } catch (error) {
            console.error('Translation error:', error);
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(this.translations, key);
            
            if (translation) {
                // Check if element is an input/placeholder or standard text
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation; 
                }
            }
        });
    }

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
}

// Initialize globally
window.translator = new Translator();