// Área de consulta: filtro visual da tabela por texto e por status.
const campoPesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");
const formFiltro = document.getElementById("formFiltro");
const linhas = document.querySelectorAll("#tabelaEntregas tbody tr");
const contador = document.getElementById("contador");
const semResultado = document.getElementById("semResultado");

// Remove acentos para "sao jose" encontrar "São José"
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function filtrar() {
    const termo = normalizar(campoPesquisa.value.trim());
    const status = filtroStatus.value;
    let visiveis = 0;

    linhas.forEach((linha) => {
        const texto = normalizar(linha.textContent);
        const statusLinha = linha.querySelector(".status").textContent.trim();
        const mostra = texto.includes(termo) && (status === "" || statusLinha === status);

        linha.classList.toggle("d-none", !mostra);
        if (mostra) visiveis++;
    });

    contador.textContent = visiveis === 1 ? "1 resultado" : `${visiveis} resultados`;
    semResultado.classList.toggle("d-none", visiveis > 0);
}

campoPesquisa.addEventListener("input", filtrar);
filtroStatus.addEventListener("change", filtrar);
formFiltro.addEventListener("submit", (evento) => evento.preventDefault());
formFiltro.addEventListener("reset", () => setTimeout(filtrar, 0));
