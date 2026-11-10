const tabs = document.querySelectorAll(".tab");
const page = document.querySelector("#page");
const clock = document.querySelector("#clock");
const themePicker = document.querySelector("#theme-picker");

const validPages = [...tabs].map(tab => tab.dataset.page);
const validThemes = [...themePicker.options].map(option => option.value);

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

async function changePage(name) {

    try {

        const response = await fetch(`pages/${name}.html`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        page.innerHTML = await response.text();

    } catch (error) {

        page.innerHTML = `
        <div class="tile">
            <div class="win">
                <div class="win-title"><h2>Erro</h2></div>
                <div class="win-body">
                    <p>Não foi possível carregar esta página.</p>
                    <p>Abra o site por um servidor local, por exemplo:
                    <code>python -m http.server</code></p>
                </div>
            </div>
        </div>
        `;

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

function updateClock() {

    clock.textContent = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}

updateClock();
setInterval(updateClock, 15000);

themePicker.addEventListener("change", () => setTheme(themePicker.value));

let savedTheme = "monoyou";
try {
    savedTheme = localStorage.getItem("site-theme") || savedTheme;
} catch (error) {
    console.warn("Não foi possível ler o tema salvo.", error);
}
setTheme(savedTheme);

const start = location.hash.slice(1);

setActive(validPages.includes(start) ? start : "about");
