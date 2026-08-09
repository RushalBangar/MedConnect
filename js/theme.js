/**
 * MedConnect - Theme Controller (Light & Dark Theme Toggle)
 */

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('medconnect_theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);

        window.addEventListener('DOMContentLoaded', () => {
            this.bindThemeButtons();
        });
    }

    toggleTheme() {
        const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme);
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        localStorage.setItem('medconnect_theme', themeName);
        this.applyTheme(themeName);

        // Notify components (e.g. Leaflet map) to switch tiles
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
    }

    applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        const iconEl = document.getElementById('theme-toggle-icon');
        if (iconEl) {
            iconEl.textContent = themeName === 'dark' ? '🌙' : '☀️';
        }
    }

    bindThemeButtons() {
        const btns = document.querySelectorAll('.theme-toggle-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => this.toggleTheme());
        });
    }
}

window.themeManager = new ThemeManager();
