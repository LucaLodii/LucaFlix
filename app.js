// Banco de dados dos filmes (JSON completo) 
const filmes = [
  {
    id: "lotr1",
    logo: "img/logoprime.png",
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    oscars: "4X Ganhador do OSCAR",
    descricao: "Frodo Bolseiro recebe um anel poderoso e embarca em uma jornada para destruí-lo antes que Sauron recupere seu poder.",
    avaliacao: "8.8",
    duracao: "2 h 58 min",
    ano: "2001",
    generos: ["Fantasia Épica", "Aventura", "Onírico"] 
  },
  {
    id: "lotr2",
    logo: "img/logoprime.png", // Assuming same logo
    titulo: "O Senhor dos Anéis: As Duas Torres",
    oscars: "2X Ganhador do OSCAR", // Actual Oscar wins for Two Towers
    descricao: "A Sociedade se separa, enquanto Frodo segue rumo a Mordor e Aragorn luta contra as forças de Saruman.",
    avaliacao: "8.7",
    duracao: "2 h 59 min",
    ano: "2002",
    generos: ["Fantasia Épica", "Guerra", "Drama"] 
  },
  {
    id: "lotr3",
    logo: "img/logoprime.png",
    titulo: "O Senhor dos Anéis: O Retorno do Rei",
    oscars: "11X Ganhador do OSCAR",
    descricao: "A batalha final pelo destino da Terra Média se aproxima enquanto Frodo se esforça para destruir o Anel.",
    avaliacao: "8.9",
    duracao: "3 h 21 min",
    ano: "2003",
    generos: ["Fantasia Épica", "Guerra", "Épico"] 
  },
{
  id: "hobbit1",
  logo: "img/logoprime.png",
  titulo: "O Hobbit: Uma Jornada Inesperada",
  oscars: "1X Ganhador do OSCAR", // Na verdade ganhou 1 Oscar (Melhor Edição de Som)
  descricao: "Bilbo Bolseiro se junta a um grupo de anões para recuperar o reino de Erebor do dragão Smaug.",
  avaliacao: "7.8",
  duracao: "2 h 49 min",
  ano: "2012",
  generos: ["Fantasia", "Aventura", "Humor"] 
},
{
  id: "hobbit2",
  logo: "img/logoprime.png",
  titulo: "O Hobbit: A Desolação de Smaug",
  oscars: "0 Oscars", // Indicado a 3, mas não venceu
  descricao: "A jornada continua enquanto a companhia enfrenta aranhas gigantes, elfos e o perigoso dragão Smaug.",
  avaliacao: "7.8",
  duracao: "2 h 41 min",
  ano: "2013",
  generos: ["Fantasia", "Ação", "Suspense"] // Gêneros ajustados para o tom sombrio
},
{
  id: "hobbit3",
  logo: "img/logoprime.png",
  titulo: "O Hobbit: A Batalha dos Cinco Exércitos",
  oscars: "0 Oscars", // Indicado a 1 (Melhor Mixagem de Som)
  descricao: "A disputa pelo tesouro de Erebor desencadeia uma guerra épica entre cinco exércitos.",
  avaliacao: "7.4",
  duracao: "2 h 24 min", // Versão teatral
  ano: "2014",
  generos: ["Fantasia", "Guerra", "Drama"] // Foco na batalha final e desfecho
}


  // ... (outros filmes permanecem iguais)
];

// ========== FUNÇÕES PRINCIPAIS ========== //
//function 

function renderizarCards() {
  const $container = $('.movie-list');
  filmes.forEach(filme => {
    $container.append(`
      <div class="movie-list-item" data-id="${filme.id}">
        <span class="movie-list-item-title">${filme.titulo}</span>
        <p class="movie-list-item-desc">${filme.descricao}</p>
      </div>
    `);
  });
}

function redirectToDetails(movieId) {
  if (!movieId) return;
  window.location.href = `detalhes.html?id=${movieId}`;
}

function loadMovieDetails() {
  if (!window.location.pathname.includes('detalhes.html')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  if (!movieId) return showError("Nenhum ID de filme encontrado na URL");

  const filme = filmes.find(f => f.id === movieId);
  if (!filme) return showError(`Filme não encontrado para o ID: ${movieId}`);

  renderMovieDetails(filme);
}

// ========== FUNÇÕES AUXILIARES ========== //

function showError(message) {
  console.error(message);
  $('#content-details').html(`
    <div class="error-movie">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${message}</p>
      <button onclick="window.location.href='index.html';">Voltar</button>
    </div>
  `);
}

//se tiver imagem roda a imagem se não titulo SUBSTITUIR ESSA FUNCAO NO H1

function renderMovieDetails(filme) {
    $('#content-details').html(`
        <div class="movie-detail">
        <img src=${filme.logo}>
          <h1 class="movie-title">${filme.titulo}</h1>
          <p class="movie-oscars">${filme.oscars}</p>
          <div class="movie-description">
            <p><strong>Descrição:</strong> ${filme.descricao}</p>
          </div>
          
          <div class="movie-meta-container">
            <ul class="horizontal-meta-list">
              <li><strong>IMDb:</strong> ${filme.avaliacao}</li>
              <li>${filme.duracao}</li>
              <li>${filme.ano}</li>
              ${filme.genero ? `<li>${filme.genero}</li>` : ''}
            </ul>
          </div>
        </div>
      `);

  setupButtonEvents(filme);
}

function setupButtonEvents(filme) {
  $('.btn-watch').click(() => alert(`Iniciando: ${filme.titulo}`));
  $('.btn-trailer').click(() => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.titulo + ' trailer')}`, '_blank');
  });
}

// ========== INICIALIZAÇÃO ========== //

// Add this to detect detalhes.html
if (window.location.pathname.includes('detalhes.html')) {
    document.body.classList.add('detalhes-page');
}

$(document).ready(function() {
  // Cards na página inicial
  if ($('.movie-list').length) {
    renderizarCards();
    $('.movie-list').on('click', '.movie-list-item', function() {
      redirectToDetails($(this).data('id'));
    });
  }

  // Página de detalhes
  if (window.location.pathname.includes('detalhes.html')) {
    loadMovieDetails();
  }

  // Configuração do carrossel
  setupCarousel();
});

// ========== CÓDIGOS DE TERCEIROS ========== //

function setupCarousel() {
  const carousels = document.querySelectorAll('.movie-list-wrapper');
    
  carousels.forEach(carousel => {
    const movieList = carousel.querySelector('.movie-list');
    const arrowLeft = carousel.querySelector('.fa-chevron-left');
    const arrowRight = carousel.querySelector('.fa-chevron-right');
    
    if (!movieList) return;

    const movieItem = movieList.querySelector('.movie-list-item');
    const scrollAmount = movieItem ? movieItem.offsetWidth * 2 : 500;
    let isScrolling = false;
    
    arrowRight?.addEventListener('click', () => {
      if (isScrolling) return;
      isScrolling = true;
      movieList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => isScrolling = false, 500);
    });
    
    arrowLeft?.addEventListener('click', () => {
      if (isScrolling) return;
      isScrolling = true;
      movieList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(() => isScrolling = false, 500);
    });
    
    const checkArrows = () => {
      if (arrowLeft) arrowLeft.style.display = movieList.scrollLeft <= 10 ? 'none' : 'flex';
      if (arrowRight) {
        const atEnd = movieList.scrollLeft >= movieList.scrollWidth - movieList.clientWidth - 10;
        arrowRight.style.display = atEnd ? 'none' : 'flex';
      }
    };
    
    checkArrows();
    movieList.addEventListener('scroll', checkArrows);
  });
}

// Navbar scroll (otimizado)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.background = window.scrollY > 50 
    ? "rgba(0, 0, 0, 0.7)" 
    : "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))";
});

// Search toggle (otimizado)
document.querySelector(".search-icon")?.addEventListener("click", () => {
  document.querySelector(".search-bar")?.classList.toggle("active");
});