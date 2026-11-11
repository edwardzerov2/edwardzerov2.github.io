const tabs = document.querySelectorAll(".tab");
const page = document.querySelector("#page");
const clock = document.querySelector("#clock");
const themePicker = document.querySelector("#theme-picker");
const languagePicker = document.querySelector("#language-picker");

const validPages = [...tabs].map(tab => tab.dataset.page);
const validThemes = [...themePicker.options].map(option => option.value);
const validLanguages = [...languagePicker.options].map(option => option.value);

const translations = {
    "nav.about": { "pt-BR": "Sobre", en: "About" },
    "nav.projects": { "pt-BR": "Projetos", en: "Projects" },
    "nav.homelab": { "pt-BR": "HomeLab", en: "HomeLab" },
    "nav.label": { "pt-BR": "Navegação principal", en: "Main navigation" },
    "picker.theme": { "pt-BR": "Tema", en: "Theme" },
    "picker.themeAria": { "pt-BR": "Escolher tema", en: "Choose a theme" },
    "picker.language": { "pt-BR": "Idioma", en: "Language" },
    "picker.languageAria": { "pt-BR": "Escolher idioma", en: "Choose a language" },
    "network.title": { "pt-BR": "Este site roda na EltenThor", en: "This site runs on EltenThor" },
    "about.avatar": { "pt-BR": "Foto de perfil de Eduardo Rod", en: "Eduardo Rod's profile photo" },
    "about.development": { "pt-BR": "Desenvolvimento", en: "Development" },
    "about.openSource": { "pt-BR": "Código aberto", en: "Open Source" },
    "about.whoami": { "pt-BR": "Linux • Código aberto • Desenvolvimento", en: "Linux • Open Source • Development" },
    "about.privateNetwork": { "pt-BR": "internet privada e descentralizada", en: "private, decentralized internet" },
    "about.viaDroidspaces": { "pt-BR": "via Droidspaces", en: "through Droidspaces" },
    "about.contact": { "pt-BR": "Contato", en: "Contact" },
    "about.social": { "pt-BR": "Redes sociais", en: "Social media" },
    "about.links": { "pt-BR": "Links", en: "Links" },
    "common.email": { "pt-BR": "E-mail", en: "Email" },
    "projects.windowTitle": { "pt-BR": "Projetos — Dolphin", en: "Projects — Dolphin" },
    "projects.breadcrumb": { "pt-BR": "Início › Projetos", en: "Home › Projects" },
    "projects.breadcrumbMonoYou": { "pt-BR": "Início › MonoYou", en: "Home › MonoYou" },
    "projects.locations": { "pt-BR": "Locais", en: "Places" },
    "projects.remote": { "pt-BR": "Remoto", en: "Remote" },
    "projects.name": { "pt-BR": "Nome", en: "Name" },
    "projects.type": { "pt-BR": "Tipo", en: "Type" },
    "projects.repository": { "pt-BR": "Repositório", en: "Repository" },
    "projects.projectFolderCount": { "pt-BR": "1 pasta", en: "1 folder" },
    "projects.colorScheme": { "pt-BR": "Esquema de cores", en: "Color scheme" },
    "projects.plasmaTheme": { "pt-BR": "Tema para KDE Plasma", en: "KDE Plasma theme" },
    "projects.gtkTheme": { "pt-BR": "Tema para GTK", en: "GTK theme" },
    "projects.folderCount": { "pt-BR": "3 pastas", en: "3 folders" },
    "homelab.alpineLogo": { "pt-BR": "Logotipo do Alpine Linux", en: "Alpine Linux logo" },
    "homelab.platform": { "pt-BR": "Droidspaces • Android", en: "Droidspaces • Android" },
    "homelab.about": { "pt-BR": "Sobre o lab", en: "About the lab" },
    "homelab.hardware": { "pt-BR": "Hardware", en: "Hardware" },
    "homelab.phone": { "pt-BR": "Um celular Android", en: "An Android phone" },
    "homelab.system": { "pt-BR": "Sistema", en: "System" },
    "homelab.alpineDroidspaces": { "pt-BR": "Alpine Linux rodando via Droidspaces", en: "Alpine Linux running through Droidspaces" },
    "homelab.network": { "pt-BR": "Rede", en: "Network" },
    "homelab.networkDescription": { "pt-BR": "EltenThor, internet privada e descentralizada", en: "EltenThor, private decentralized internet" },
    "homelab.githubDescription": { "pt-BR": "Código dos projetos", en: "Project source code" },
    "homelab.services": { "pt-BR": "Serviços", en: "Services" },
    "homelab.running": { "pt-BR": "Em execução", en: "Running" },
    "homelab.stopped": { "pt-BR": "Parados", en: "Stopped" },
    "homelab.settings": { "pt-BR": "Configuração", en: "Settings" },
    "homelab.networkService": { "pt-BR": "Internet privada e descentralizada. Este site roda nela.", en: "Private, decentralized internet. This site runs on it." },
    "homelab.containerDescription": { "pt-BR": "Container Linux dentro do Android.", en: "Linux container running inside Android." },
    "error.title": { "pt-BR": "Erro", en: "Error" },
    "error.message": { "pt-BR": "Não foi possível carregar esta página.", en: "This page could not be loaded." },
    "error.server": { "pt-BR": "Abra o site por um servidor local, por exemplo:", en: "Open the site through a local server, for example:" }
};

let currentLanguage = "pt-BR";

function setTheme(name) {
    const theme = validThemes.includes(name) ? name : "monoyou";

    document.documentElement.dataset.theme = theme;
    themePicker.value = theme;

    try {
        localStorage.setItem("site-theme", theme);
    } catch (error) {
        console.warn("Não foi possível salvar o tema selecionado.", error);
    }
}

function applyTranslations(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(element => {
        const translation = translations[element.dataset.i18n]?.[currentLanguage];
        if (translation) element.textContent = translation;
    });

    root.querySelectorAll("[data-i18n-title]").forEach(element => {
        const translation = translations[element.dataset.i18nTitle]?.[currentLanguage];
        if (translation) element.title = translation;
    });

    root.querySelectorAll("[data-i18n-aria]").forEach(element => {
        const translation = translations[element.dataset.i18nAria]?.[currentLanguage];
        if (translation) element.setAttribute("aria-label", translation);
    });

    root.querySelectorAll("[data-i18n-alt]").forEach(element => {
        const translation = translations[element.dataset.i18nAlt]?.[currentLanguage];
        if (translation) element.alt = translation;
    });
}

function setLanguage(language) {
    currentLanguage = validLanguages.includes(language) ? language : "pt-BR";
    languagePicker.value = currentLanguage;
    document.documentElement.lang = currentLanguage;
    applyTranslations();
    updateClock();

    try {
        localStorage.setItem("site-language", currentLanguage);
    } catch (error) {
        console.warn("Não foi possível salvar o idioma selecionado.", error);
    }
}

async function changePage(name) {
    try {
        const response = await fetch(`pages/${name}.html`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        page.innerHTML = await response.text();
        applyTranslations(page);
    } catch (error) {
        page.innerHTML = `
        <div class="tile">
            <div class="win">
                <div class="win-title"><h2 data-i18n="error.title">Erro</h2></div>
                <div class="win-body">
                    <p data-i18n="error.message">Não foi possível carregar esta página.</p>
                    <p><span data-i18n="error.server">Abra o site por um servidor local, por exemplo:</span>
                    <code>python -m http.server</code></p>
                </div>
            </div>
        </div>
        `;
        applyTranslations(page);
        console.error(error);
    }
}

function setActive(name) {
    tabs.forEach(tab => {
        const active = tab.dataset.page === name;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-current", active ? "page" : "false");
    });

    changePage(name);
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        history.replaceState(null, "", `#${tab.dataset.page}`);
        setActive(tab.dataset.page);
    });
});

page.addEventListener("click", event => {
    const button = event.target.closest("[data-directory]");
    if (!button || !page.contains(button)) return;

    const directory = button.dataset.directory;
    page.querySelectorAll("[data-directory]").forEach(item => {
        item.classList.toggle("active", item === button);
    });
    page.querySelectorAll("[data-directory-view]").forEach(view => {
        view.hidden = view.dataset.directoryView !== directory;
    });

    const breadcrumb = page.querySelector("#project-breadcrumb");
    if (breadcrumb) {
        breadcrumb.dataset.i18n = directory === "monoyou"
            ? "projects.breadcrumbMonoYou"
            : "projects.breadcrumb";
        applyTranslations(page);
    }
});

function updateClock() {
    const locale = currentLanguage === "en" ? "en-US" : "pt-BR";
    clock.textContent = new Date().toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit"
    });
}

themePicker.addEventListener("change", () => setTheme(themePicker.value));
languagePicker.addEventListener("change", () => setLanguage(languagePicker.value));

let savedTheme = "monoyou";
let savedLanguage = "pt-BR";
try {
    savedTheme = localStorage.getItem("site-theme") || savedTheme;
    savedLanguage = localStorage.getItem("site-language") || savedLanguage;
} catch (error) {
    console.warn("Não foi possível ler as preferências salvas.", error);
}

setTheme(savedTheme);
setLanguage(savedLanguage);
setInterval(updateClock, 15000);

const start = location.hash.slice(1);
setActive(validPages.includes(start) ? start : "about");
