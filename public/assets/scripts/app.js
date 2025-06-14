/* ========== CONSTANTES GLOBAIS ========== */
const API_URL = "http://localhost:3000/filmes";
const FILMES_API_URL = "http://localhost:3000/filmes";

// ========== DETALHES ========== //
function redirectToDetails(movieId) {
  if (!movieId) return;
  window.location.href = `detalhes.html?id=${movieId}`;
}

function loadMovieDetails() {
  if (!window.location.pathname.includes('detalhes.html')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  if (!movieId) return showError("Nenhum ID de filme encontrado na URL");

  console.log("Buscando detalhes do filme com id:", movieId);

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log("Dados retornados da API:", data);
      const filme = data.find(f => f.id == movieId);
      if (filme) {
        renderMovieDetails(filme);
      } else {
        const localFilme = buscarFilmePorIdLocal(movieId);
        if (localFilme) {
          renderMovieDetails(localFilme);
        } else {
          showError("Filme não encontrado");
        }
      }
    })
    .catch(err => {
      console.warn("Erro na API. Tentando localStorage...", err.message);
      const localFilme = buscarFilmePorIdLocal(movieId);
      if (localFilme) {
        renderMovieDetails(localFilme);
      } else {
        showError("Filme não encontrado");
      }
    });
}


function renderMovieDetails(filme) {
  const contentDetails = document.getElementById('content-details');
  if (!contentDetails) return;

  contentDetails.innerHTML = `
    <div class="movie-detail">
      <h1 class="movie-title">${filme.titulo}</h1>
      <p class="movie-oscars">${filme.premiacoes || ''}</p>
      <div class="movie-description">
        <p><strong>Descrição:</strong> ${filme.descricao}</p>
      </div>
      <div class="movie-meta-container">
        <ul class="horizontal-meta-list">
          <li><strong>IMDb:</strong> ${filme.avaliacao}</li>
          <li>${filme.duracao}</li>
          <li>${filme.ano}</li>
        </ul>
      </div>
    </div>
  `;
}

/* ========== FUNÇÕES DE FAVORITOS ========== */
async function loadFavoritos() {
  try {
    const response = await fetch(API_URL);
    const filmes = await response.json();
    const favoritos = filmes.filter(filme => filme.favorito === true);

    exibirFavoritosComoGrade(favoritos); // Troquei para a nova função

  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    showError("Erro ao carregar filmes favoritos");
  }
}

function exibirFavoritosComoGrade(filmes) {
  const container = document.getElementById('favoritos-container');
  if (!container) return;

  container.innerHTML = '';

  if (filmes.length === 0) {
    container.innerHTML = `
      <div class="no-favorites">
        <i class="fas fa-heart-broken"></i>
        <p>Você ainda não tem filmes favoritos</p>
      </div>
    `;
    return;
  }

  const grade = document.createElement('div');
  grade.className = 'favoritos-grade';

  filmes.forEach(filme => {
    const item = document.createElement('div');
    item.className = 'movie-list-item';
    item.dataset.id = filme.id;

    // Mantenha exatamente o mesmo HTML que você já está usando
    item.innerHTML = `
      <img class="movie-list-item-img" 
           src="${filme.logo}" 
           alt="${filme.titulo}"
           onerror="this.src='assets/img/placeholder.jpg'">
      <div class="movie-hover-panel">
        <div class="button-row">
          <button class="play-button"><i class="fas fa-play"></i></button>
          <button class="favorite-button favorited" 
                  data-id="${filme.id}">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="action-button"><i class="fas fa-info-circle"></i></button>
        </div>
        <div class="genre-row">
          ${(filme.generos || []).map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
      </div>
      ${filme.descricao ? `<p class="movie-list-item-desc">${filme.descricao}</p>` : ''}
    `;

    // Mantenha todos os event listeners como estão
    const favButton = item.querySelector('.favorite-button');
    favButton.addEventListener('click', async (e) => {
      e.stopPropagation();
      await toggleFavorito(filme.id);
      loadFavoritos();
    });

    //apaguei

    item.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        redirectToDetails(filme.id);
      }
    });

    grade.appendChild(item);
  });

  container.appendChild(grade);
}

/* ========== FUNÇÕES DO CARROSSEL ========== */
// Configura o comportamento dos carrosséis
function setupCarousel() {
  document.querySelectorAll('.movie-list-wrapper').forEach(carousel => {
    const movieList = carousel.querySelector('.movie-list');
    const arrowLeft = carousel.querySelector('.fa-chevron-left');
    const arrowRight = carousel.querySelector('.fa-chevron-right');

    if (!movieList) return;

    const movieItemWidth = movieList.querySelector('.movie-list-item')?.offsetWidth || 200;
    const scrollAmount = movieItemWidth * 3;
    let isScrolling = false;

    const scrollHandler = (direction) => {
      if (isScrolling) return;
      isScrolling = true;
      movieList.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(() => isScrolling = false, 500);
    };

    arrowRight?.addEventListener('click', () => scrollHandler(1));
    arrowLeft?.addEventListener('click', () => scrollHandler(-1));

    const checkArrows = () => {
      // CORREÇÃO: Margem maior para detectar fim do scroll
      const atStart = movieList.scrollLeft <= 10;
      const atEnd = movieList.scrollLeft >= movieList.scrollWidth - movieList.clientWidth - 50;

      if (arrowLeft) arrowLeft.style.visibility = atStart ? 'hidden' : 'visible';
      if (arrowRight) arrowRight.style.visibility = atEnd ? 'hidden' : 'visible';
    };

    // Verifica inicialmente
    checkArrows();

    // Configura listeners
    movieList.addEventListener('scroll', checkArrows);
    window.addEventListener('resize', checkArrows);
  });
}

/* ========== CARREGAMENTO INICIAL E CONFIGURAÇÃO ========== */
// Carrega os dados iniciais da API
async function loadInitialData() {
  try {
    const response = await fetch(API_URL);
    const filmes = await response.json();

    if (!filmes?.length) throw new Error("Nenhum filme encontrado");

    setupAllCarousels(filmes);
    setupCarousel();

  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
    const filmesLocais = listarFilmesLocal();
    if (filmesLocais.length) setupAllCarousels(filmesLocais);
  }
}

// Configura todos os carrosséis com os filmes filtrados por categoria
function setupAllCarousels(filmes) {
  const carouselConfig = [
    { title: "Obras inspiradas em J.R.R. Tolkien", category: "tolkien" },
    { title: "Obras inspiradas em J.K. Rowling", category: "rowling" },
    { title: "Filmes do Estúdio Ghibli", category: "ghibli" },
    { title: "Filmes de Ação e Aventura", category: "acao" }
  ];

  carouselConfig.forEach(config => {
    const container = [...document.querySelectorAll('.movie-list-container')]
      .find(c => c.querySelector('.movie-list-title').textContent === config.title);

    if (!container) return;

    const movieList = container.querySelector('.movie-list');
    if (!movieList) return;

    // Limpa TODOS os itens (estáticos e dinâmicos) - CORREÇÃO AQUI
    movieList.innerHTML = '';

    // Filtra filmes por categoria (case insensitive) com verificação rigorosa
    filmes
      .filter(filme => {
        // Verifica se a categoria existe e corresponde exatamente
        return filme.categoria &&
          filme.categoria.toString().toLowerCase() === config.category.toLowerCase();
      })
      .forEach(filme => createMovieItem(movieList, filme));
  });
}

/* ========== CRIAÇÃO DE ITEM DE FILME ========== */
// Cria e configura um elemento de filme para o carrossel
function createMovieItem(container, filme) {
  // 1. Cria o elemento container do filme
  const item = document.createElement('div');
  item.className = 'movie-list-item';
  item.dataset.id = filme.id;

  // 2. Define o HTML do filme com dados dinâmicos
  item.innerHTML = `
    <img class="movie-list-item-img" 
         src="${filme.logo}" 
         alt="${filme.titulo}"
         onerror="this.src='assets/img/placeholder.jpg'">
    <div class="movie-hover-panel">
      <div class="button-row">
        <button class="play-button"><i class="fas fa-play"></i></button>
        <button class="favorite-button ${filme.favorito ? 'favorited' : ''}" 
                data-id="${filme.id}">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button class="action-button"><i class="fas fa-info-circle"></i></button>
      </div>
      <div class="genre-row">
        ${(filme.generos || []).map(g => `<span class="genre-tag">${g}</span>`).join('')}
      </div>
    </div>
    ${filme.descricao ? `<p class="movie-list-item-desc">${filme.descricao}</p>` : ''}
  `;

  // ========== CONFIGURAÇÃO DE EVENTOS ========== //

  // 3. Configura o botão de favoritos
  const favButton = item.querySelector('.favorite-button');
  favButton.addEventListener('click', async (e) => {
    e.stopPropagation();

    // Animação instantânea de feedback
    const heartIcon = favButton.querySelector('i');
    heartIcon.style.transform = 'scale(1.3)';

    // Atualiza no banco de dados
    const foiFavoritado = await toggleFavorito(filme.id);

    // Atualização visual após resposta
    if (foiFavoritado !== undefined) {
      favButton.classList.toggle('favorited', foiFavoritado);
      heartIcon.style.color = foiFavoritado ? '#ff6b9d' : '';
    }

    // Finaliza animação
    setTimeout(() => {
      heartIcon.style.transform = 'scale(1)';
    }, 300);
  });

  // 4. Configura o botão de play
  const playButton = item.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Redirecionando para filme ID:', filme.id); // Para debug
      redirectToDetails(filme.id);
    });
  }

  // 5. Configura clique no item (exceto em botões)
  item.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
      redirectToDetails(filme.id);
    }
  });

  // 6. Adiciona o filme ao carrossel
  container.appendChild(item);
}

/* ========== FUNÇÕES DE FAVORITOS ========== */
async function toggleFavorito(filmeId) {
  try {
    const response = await fetch(`${API_URL}/${filmeId}`);
    const filme = await response.json();

    // Atualiza o estado
    const novoEstado = !filme.favorito;

    const updateResponse = await fetch(`${API_URL}/${filmeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...filme, favorito: novoEstado })
    });

    return novoEstado;

  } catch (error) {
    console.error("Erro ao atualizar favorito:", error);
    return false;
  }
}

/* ========== BARRA DE PESQUISA COMPLETA ========== */
function setupSearchBar() {
  // Elementos da DOM
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchResults = document.querySelector('.search-results'); // Usa o que já existe no HTML

  // Verifica se os elementos existem
  if (!searchIcon || !searchBar || !searchWrapper || !searchResults) return;

  // Variável para controlar o timeout da busca
  let searchTimeout;

  // Mostrar/ocultar barra de pesquisa
  searchIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    searchBar.classList.toggle('active');
    
    if (searchBar.classList.contains('active')) {
      searchBar.focus(); // Foca na barra quando abre
    } else {
      hideSearchResults();
      searchBar.value = ''; // Limpa a busca ao fechar
    }
  });

  // Busca em tempo real com debounce
  searchBar.addEventListener('input', async function(e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();

    // Mostra resultados apenas para 2+ caracteres
    if (query.length < 2) {
      hideSearchResults();
      return;
    }

    // Delay para evitar buscas a cada tecla pressionada
    searchTimeout = setTimeout(async () => {
      const resultados = await searchMovies(query);
      displaySearchResults(resultados);
    }, 300);
  });

  // Fechar com tecla ESC
  searchBar.addEventListener('keyup', function(e) {
    if (e.key === 'Escape') {
      searchBar.classList.remove('active');
      hideSearchResults();
      searchBar.value = '';
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', function(e) {
    if (!searchWrapper.contains(e.target)) {
      searchBar.classList.remove('active');
      hideSearchResults();
      searchBar.value = '';
    }
  });
}

// Função de busca nos filmes (mantida igual)
async function searchMovies(query) {
  try {
    const response = await fetch(API_URL);
    const filmes = await response.json();

    return filmes.filter(filme =>
      filme.titulo.toLowerCase().includes(query.toLowerCase()) ||
      (filme.descricao && filme.descricao.toLowerCase().includes(query.toLowerCase())) ||
      (filme.generos && filme.generos.some(g => g.toLowerCase().includes(query.toLowerCase())))
    );
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
}

// Exibe os resultados da busca (modificada)
function displaySearchResults(filmes) {
  const searchResults = document.querySelector('.search-results');
  searchResults.innerHTML = '';

  if (filmes.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Nenhum filme encontrado</div>';
    searchResults.style.display = 'block';
    return;
  }

  filmes.forEach(filme => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <img src="${filme.logo || 'assets/img/placeholder.jpg'}" 
           alt="${filme.titulo}"
           onerror="this.src='assets/img/placeholder.jpg'">
      <div class="search-result-info">
        <h3>${filme.titulo}</h3>
        <p>${filme.descricao?.substring(0, 100) || 'Descrição não disponível'}...</p>
      </div>
    `;

    resultItem.addEventListener('click', () => {
      redirectToDetails(filme.id);
      hideSearchResults();
    });

    searchResults.appendChild(resultItem);
  });

  searchResults.style.display = 'block';
}

// Oculta os resultados (simplificada)
function hideSearchResults() {
  const searchResults = document.querySelector('.search-results');
  searchResults.style.display = 'none';
}

/* ========== FUNÇÃO DE LOGOUT ========== */
function logout() {
  // 1. Remove dados de sessão
  localStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('tempData');

  // 2. Redireciona para login (com timeout para feedback visual)
  const btnSair = document.getElementById('btn-sair');
  if (btnSair) {
    btnSair.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Saindo...';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  }
}

/* ========== CONFIGURAÇÃO DO EVENTO ========== */
document.addEventListener('DOMContentLoaded', () => {
  const btnSair = document.getElementById('btn-sair');
  if (btnSair) {
    btnSair.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
});


/* ========== INICIALIZAÇÃO ========== */
document.addEventListener('DOMContentLoaded', () => {
  // Configurações iniciais
  loadInitialData();
  loadMovieDetails();
  setupSearchBar(); // Adicionado para resolver o problema da lupa

  // Efeito na navbar ao rolar
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.background = window.scrollY > 50
        ? "rgba(0, 0, 0, 0.7)"
        : "transparent";
    });
  }
});

/* ========== FUNÇÕES AUXILIARES ========== */
function showError(message) {
  console.error(message);
  const container = document.getElementById('content-details') || document.body;
  container.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      <p>${message}</p>
      <button onclick="window.location.href='index.html'">Voltar</button>
    </div>
  `;
}

// ========== CRUD PARA FILMES ========== //

// Exibe mensagem na div de mensagens
function displayMessage(msg, type = 'warning') {
  $('#msg').html(`<div class="alert alert-${type}">${msg}</div>`);
}

// Carrega filmes do servidor
async function carregarFilmes() {
  try {
    const response = await fetch(FILMES_API_URL);
    const filmes = await response.json();
    exibeFilmes(filmes);
  } catch (error) {
    console.error("Erro ao carregar filmes:", error);
    displayMessage("Erro ao carregar filmes. Usando dados locais.", 'danger');
    const filmes = listarFilmesLocal();
    exibeFilmes(filmes);
  }
}

// Exibe filmes na tabela
function exibeFilmes(filmes) {
  const tabela = $("#table-filmes");
  tabela.empty();

  if (filmes.length === 0) {
    tabela.append("<tr><td colspan='7'>Nenhum filme cadastrado.</td></tr>");
    return;
  }

  filmes.forEach(filme => {
    tabela.append(`
            <tr>
                <td>${filme.id}</td>
                <td>${filme.titulo}</td>
                <td>${filme.ano || 'N/A'}</td>
                <td>${filme.diretor || 'N/A'}</td>
                <td>${Array.isArray(filme.generos) ? filme.generos.join(', ') : filme.generos || 'N/A'}</td>
                <td>${filme.duracao || 'N/A'}</td>
                <td>${filme.avaliacao || 'N/A'}</td>
            </tr>
        `);
  });
}

// Insere um novo filme
async function inserirFilme(filme) {
  try {
    // Primeiro tenta na API
    const response = await fetch(FILMES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filme)
    });

    const novoFilme = await response.json();
    displayMessage("Filme inserido com sucesso na API", 'success');
    carregarFilmes();
  } catch (error) {
    console.error("Erro na API, salvando localmente:", error);
    salvarFilmeLocal(filme);
    displayMessage("Filme salvo localmente", 'info');
    carregarFilmes();
  }
}

// Atualiza um filme existente
async function atualizarFilme(id, filme) {
  try {
    const response = await fetch(`${FILMES_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filme)
    });

    await response.json();
    displayMessage("Filme atualizado com sucesso", 'success');
    carregarFilmes();
  } catch (error) {
    console.error("Erro ao atualizar na API:", error);
    displayMessage("Erro ao atualizar filme", 'danger');
  }
}

// Remove um filme
async function removerFilme(id) {
  try {
    await fetch(`${FILMES_API_URL}/${id}`, {
      method: "DELETE"
    });
    displayMessage("Filme removido com sucesso", 'success');
    carregarFilmes();
  } catch (error) {
    console.error("Erro ao remover filme:", error);
    displayMessage("Erro ao remover filme", 'danger');
  }
}

// Inicializa a página de filmes
function initFilmes() {
  // Só executa se estiver na página de filmes
  if (!document.getElementById('form-filme')) return;

  // Carrega os filmes
  carregarFilmes();

  // Configura os eventos
  $("#btnInsert").click(function () {
    const filme = {
      titulo: $("#inputTitulo").val(),
      ano: $("#inputAno").val(),
      diretor: $("#inputDiretor").val(),
      generos: [$("#inputGenero").val()],
      duracao: $("#inputDuracao").val(),
      avaliacao: $("#inputAvaliacao").val()
    };

    if (!$('#form-filme')[0].checkValidity()) {
      displayMessage("Preencha todos os campos obrigatórios");
      return;
    }

    inserirFilme(filme);
    $("#form-filme")[0].reset();
  });

  $("#btnUpdate").click(function () {
    const id = $("#inputId").val();
    if (!id) {
      displayMessage("Selecione um filme para alterar");
      return;
    }

    const filme = {
      titulo: $("#inputTitulo").val(),
      ano: $("#inputAno").val(),
      diretor: $("#inputDiretor").val(),
      generos: [$("#inputGenero").val()],
      duracao: $("#inputDuracao").val(),
      avaliacao: $("#inputAvaliacao").val()
    };

    atualizarFilme(id, filme);
    $("#form-filme")[0].reset();
  });

  $("#btnDelete").click(function () {
    const id = $("#inputId").val();
    if (!id) {
      displayMessage("Selecione um filme para excluir");
      return;
    }
    removerFilme(id);
    $("#form-filme")[0].reset();
  });

  $("#btnClear").click(function () {
    $("#form-filme")[0].reset();
  });

  // Preenche o formulário ao clicar em uma linha da tabela
  $("#grid-filmes").on("click", "tr", function () {
    const colunas = $(this).find("td");
    if (colunas.length === 0) return;

    $("#inputId").val(colunas.eq(0).text());
    $("#inputTitulo").val(colunas.eq(1).text());
    $("#inputAno").val(colunas.eq(2).text());
    $("#inputDiretor").val(colunas.eq(3).text());
    $("#inputGenero").val(colunas.eq(4).text().split(', ')[0]);
    $("#inputDuracao").val(colunas.eq(5).text());
    $("#inputAvaliacao").val(colunas.eq(6).text());
  });
}

// Adicione ao event listener existente
document.addEventListener('DOMContentLoaded', function () {
  // ... seu código existente ...

  // Inicializa a página de filmes se for o caso
  if (document.getElementById('form-filme')) {
    initFilmes();
  }
});

// MÓDULO DE GRÁFICOS - CONFIGURAÇÃO CENTRALIZADA
const ConfigGrafico = {
  // Cores personalizadas para seu tema
  cores: [
    '#4CAF50', '#2E7D32', '#81C784',
    '#388E3C', '#A5D6A7', '#66BB6A',
    '#1B5E20', '#8BC34A'
  ],

  // Estilo da borda
  borda: {
    cor: '#2c6b2f',
    largura: 2
  },

  // Fonte
  fonte: {
    familia: "'Roboto', sans-serif",
    tamanho: 14,
    corLegenda: '#FFFFFF',
    corTitulo: '#4CAF50'
  }
};

// FUNÇÕES PRINCIPAIS
function iniciarGraficoGeneros() {
  // Verifica se o elemento do gráfico existe
  if (!document.getElementById('genreChart')) return;

  // Carrega dados e renderiza
  carregarDadosGeneros()
    .then(dados => {
      if (dados.labels.length > 0) {
        renderizarGrafico(dados);
      } else {
        exibirMensagem('Nenhum dado de gênero disponível.', 'info');
      }
    })
    .catch(erro => {
      console.error('Erro:', erro);
      exibirMensagem('Erro ao carregar dados.', 'erro');
    });
}

// FUNÇÕES AUXILIARES

async function carregarDadosGeneros() {
  try {
    // 1. Tenta carregar da API
    const resposta = await fetch('http://localhost:3000/filmes');
    const filmes = await resposta.json();

    // 2. Processa os gêneros
    return processarGeneros(filmes);

  } catch (erro) {
    // 3. Fallback para localStorage
    console.warn('Usando dados locais:', erro);
    const dadosLocais = JSON.parse(localStorage.getItem('dadosGeneros')) || {
      labels: [],
      valores: []
    };
    return dadosLocais;
  }
}

function processarGeneros(filmes) {
  const contagem = {};

  // Contagem de gêneros
  filmes.forEach(filme => {
    filme.generos?.forEach(genero => {
      contagem[genero] = (contagem[genero] || 0) + 1;
    });
  });

  // Ordena e formata
  return {
    labels: Object.keys(contagem),
    valores: Object.values(contagem)
  };
}

function renderizarGrafico(dados) {
  const ctx = document.getElementById('genreChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut', // Gráfico de rosca - moderno
    data: {
      labels: dados.labels,
      datasets: [{
        data: dados.valores,
        backgroundColor: ConfigGrafico.cores,
        borderColor: ConfigGrafico.borda.cor,
        borderWidth: ConfigGrafico.borda.largura
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%', // Central mais larga
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: ConfigGrafico.fonte.corLegenda,
            font: {
              size: ConfigGrafico.fonte.tamanho,
              family: ConfigGrafico.fonte.familia
            },
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.label}: ${ctx.raw} ${ctx.raw === 1 ? 'filme' : 'filmes'}`
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
}

function exibirMensagem(texto, tipo = 'info') {
  const container = document.querySelector('.graph');
  const cor = tipo === 'erro' ? '#FF5252' : '#4CAF50';

  container.insertAdjacentHTML('beforeend', `
    <p class="mensagem-${tipo}" 
       style="text-align: center; color: ${cor}; margin-top: 20px;">
      ${texto}
    </p>
  `);
}

/* ========== VERIFICAÇÃO DE PÁGINA ========== */
function isDetailsPage() {
  return window.location.pathname.includes('detalhes.html');
}

function isGeneroPage() {
  return window.location.pathname.includes('genero.html');
}

function isFavoritosPage() {
  return window.location.pathname.includes('favoritos.html');
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', iniciarGraficoGeneros)