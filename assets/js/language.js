document.addEventListener('DOMContentLoaded', () => {
    const translator = window.translator;
    const isFirstVisit = !localStorage.getItem('language');
    
    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
        { code: 'da', name: 'Dansk', flag: '🇩🇰' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'no', name: 'Norsk', flag: '🇳🇴' }
    ];

    injectStyles();
    buildFloatingSelector();

    if (isFirstVisit) {
        showModal();
    } else {
        translator.loadTranslations(translator.currentLang);
        updateFloatingButtonUI(translator.currentLang);
    }

    // 1. The First-Visit Modal
    function showModal() {
        const overlay = document.createElement('div');
        overlay.id = 'lang-modal-overlay';
        
        let optionsHtml = languages.map(lang => `
            <div class="lang-option" data-lang="${lang.code}">
                <span class="lang-flag">${lang.flag}</span>
                <span class="lang-name">${lang.name}</span>
            </div>
        `).join('');

        overlay.innerHTML = `
            <div id="lang-modal">
                <h2 data-i18n="modal.welcome">Welcome</h2>
                <p data-i18n="modal.choose" style="color: #666; margin-bottom: 24px;">Choose your preferred language</p>
                <div class="lang-list">
                    ${optionsHtml}
                </div>
                <button id="lang-continue" disabled data-i18n="modal.continue">Continue</button>
            </div>
        `;

        document.body.appendChild(overlay);
        translator.loadTranslations('en'); 

        let selectedLang = null;
        const options = overlay.querySelectorAll('.lang-option');
        const continueBtn = overlay.querySelector('#lang-continue');

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedLang = opt.getAttribute('data-lang');
                continueBtn.disabled = false;
                translator.loadTranslations(selectedLang);
            });
        });

        continueBtn.addEventListener('click', () => {
            if (selectedLang) {
                localStorage.setItem('language', selectedLang);
                updateFloatingButtonUI(selectedLang);
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }

    // 2. The Floating Selector
    function buildFloatingSelector() {
        const wrapper = document.createElement('div');
        wrapper.id = 'floating-lang-wrapper';
        
        let menuOptions = languages.map(lang => `
            <button class="floating-lang-option" data-lang="${lang.code}">
                <span class="floating-lang-flag">${lang.flag}</span>
                <span class="floating-lang-name">${lang.name}</span>
            </button>
        `).join('');

        wrapper.innerHTML = `
            <div id="floating-lang-menu">
                ${menuOptions}
            </div>
            <button id="floating-lang-toggle" aria-label="Change Language">
                <span id="floating-current-flag">🇬🇧</span>
                <span id="floating-current-code">EN</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><path d="m18 15-6-6-6 6"/></svg>
            </button>
        `;

        document.body.appendChild(wrapper);

        const toggleBtn = document.getElementById('floating-lang-toggle');
        const menu = document.getElementById('floating-lang-menu');
        const options = document.querySelectorAll('.floating-lang-option');

        // Toggle menu open/close
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            toggleBtn.classList.toggle('active');
        });

        // Handle language selection
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                const newLang = opt.getAttribute('data-lang');
                translator.loadTranslations(newLang);
                updateFloatingButtonUI(newLang);
                menu.classList.remove('show');
                toggleBtn.classList.remove('active');
            });
        });

        // Close menu if clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                menu.classList.remove('show');
                toggleBtn.classList.remove('active');
            }
        });
    }

    // 3. Update the floating button text/active states
    function updateFloatingButtonUI(langCode) {
        const langData = languages.find(l => l.code === langCode) || languages[0];
        
        // Update the button UI
        document.getElementById('floating-current-flag').textContent = langData.flag;
        document.getElementById('floating-current-code').textContent = langData.code.toUpperCase();

        // Update active states in the dropdown list
        document.querySelectorAll('.floating-lang-option').forEach(opt => {
            if (opt.getAttribute('data-lang') === langCode) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // 4. Injected CSS
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Modal Styles (Unchanged) */
            #lang-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
                z-index: 999999; display: flex; align-items: center; justify-content: center;
                opacity: 1; transition: opacity 0.3s ease;
            }
            #lang-modal {
                background: #fff; padding: 40px; border-radius: 16px;
                max-width: 400px; width: 90%;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15); text-align: center;
            }
            #lang-modal h2 { margin-bottom: 8px; font-size: 1.5rem; }
            .lang-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
            .lang-option {
                display: flex; align-items: center; gap: 16px; padding: 14px 20px;
                border: 2px solid #E8E1D4; border-radius: 12px; cursor: pointer;
                transition: all 0.2s; font-weight: 500; color: #171717;
            }
            .lang-option:hover { border-color: #d1c8b8; background: #fafafa; }
            .lang-option.selected { border-color: #171717; background: #fafafa; }
            #lang-continue {
                width: 100%; padding: 16px; background: #171717; color: #fff;
                border: none; border-radius: 999px; cursor: pointer;
                font-weight: 600; font-size: 1rem; transition: background 0.2s;
            }
            #lang-continue:disabled { background: #E8E1D4; color: #9CA3AF; cursor: not-allowed; }
            #lang-continue:not(:disabled):hover { background: #333; }

            /* Floating Selector Styles */
            #floating-lang-wrapper {
                position: fixed;
                bottom: 32px;
                right: 32px;
                z-index: 99999;
                font-family: inherit;
            }
            #floating-lang-toggle {
                display: flex;
                align-items: center;
                gap: 8px;
                background: #171717;
                color: #F8F5EF;
                border: none;
                padding: 12px 20px;
                border-radius: 999px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                transition: transform 0.2s, background 0.2s;
            }
            #floating-lang-toggle:hover {
                transform: translateY(-2px);
                background: #2a2a2a;
            }
            #floating-lang-toggle svg {
                transition: transform 0.3s ease;
            }
            #floating-lang-toggle.active svg {
                transform: rotate(180deg);
            }
            
            #floating-lang-menu {
                position: absolute;
                bottom: calc(100% + 12px);
                right: 0;
                background: #F8F5EF;
                border: 1px solid #E8E1D4;
                border-radius: 12px;
                padding: 8px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.15);
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.2s ease;
                min-width: 180px;
            }
            #floating-lang-menu.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .floating-lang-option {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                font-size: 14px;
                color: #171717;
                background: transparent;
                border: none;
                width: 100%;
                text-align: left;
                transition: background 0.2s;
            }
            .floating-lang-option:hover {
                background: rgba(23, 23, 23, 0.05);
            }
            .floating-lang-option.active {
                background: #171717;
                color: #F8F5EF;
            }
        `;
        document.head.appendChild(style);
    }
});