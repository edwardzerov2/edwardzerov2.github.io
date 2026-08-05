const tabs = document.querySelectorAll(".tab");
const page = document.querySelector("#page");


async function changePage(name) {

    try {

        const response = await fetch(`pages/${name}.html`);

        const content = await response.text();

        page.innerHTML = content;


    } catch (error) {

        page.innerHTML = `
        <h1>Erro</h1>
        <p>
        Não foi possível carregar esta página.
        </p>
        `;

        console.error(error);

    }

}



tabs.forEach(tab => {

    tab.addEventListener("click", () => {


        // remove ativo das tabs

        tabs.forEach(item => {

            item.classList.remove("active");

        });



        // adiciona ativo na tab clicada

        tab.classList.add("active");



        // carrega a página

        changePage(tab.dataset.page);


    });

});



// inicia na página Sobre

changePage("about");
