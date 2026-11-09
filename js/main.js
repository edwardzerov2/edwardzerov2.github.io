const tabs = document.querySelectorAll(".tab");
const page = document.querySelector("#page");
const clock = document.querySelector("#clock");

const validPages = [...tabs].map(tab => tab.dataset.page);


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

        // guarda a aba na URL (#projects) para poder compartilhar o link
        history.replaceState(null, "", `#${tab.dataset.page}`);

        setActive(tab.dataset.page);

    });

});


// Relógio do painel

function updateClock() {

    clock.textContent = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}

updateClock();
setInterval(updateClock, 15000);


// inicia na página do hash, ou em Sobre

const start = location.hash.slice(1);

setActive(validPages.includes(start) ? start : "about");
