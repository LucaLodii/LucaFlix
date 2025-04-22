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
  },
  {
    id: "rohirrim",
    logo: "img/logoprime.png",
    titulo: "Senhor dos Anéis: A Guerra dos Rohirrim",
    oscars: "Indicado em 2025", // Ainda não lançado (previsão Dez/2024)
    descricao: "A história do Rei Helm Pé-de-Marte e a lendária batalha no Abismo de Helm, séculos antes dos eventos da trilogia original.",
    avaliacao: "N/A",
    duracao: "2 h 10 min", // Estimativa
    ano: "2024",
    generos: ["Fantasia Épica", "Guerra", "História"]   // História = foco na lore da Terra-média
  },
  {
    id: "aneis-do-poder",
    logo: "img/logoprime.png",
    titulo: "O Senhor dos Anéis: Os Anéis de Poder",
    oscars: "1 Emmy", // Vencedor de Melhores Efeitos Visuais (2023)
    descricao: "Milênios antes de 'O Hobbit', esta série explora a Segunda Era da Terra-média, incluindo a forja dos Anéis de Poder.",
    avaliacao: "6.9",
    duracao: "50 min/ep", // Duração média por episódio
    ano: "2022",
    generos: ["Fantasia", "Drama Político", "Origem"]   // Foco em Númenor e relações entre elfos/ancões
  },
  {
    id: "hp1",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e a Pedra Filosofal",
    oscars: "3 Indicações", // Melhor Trilha Sonora, Direção de Arte, Figurino (2002)
    descricao: "Harry descobre que é um bruxo e começa sua jornada em Hogwarts, onde enfrenta seu primeiro grande desafio.",
    avaliacao: "7.6",
    duracao: "2 h 32 min",
    ano: "2001",
    generos: ["Fantasia", "Magia", "Aventura"]
  },
  {
    id: "hp2",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e a Câmara Secreta",
    oscars: "0 Oscars", // Nenhuma vitória
    descricao: "Estranhos ataques começam a ocorrer em Hogwarts, levando Harry a desvendar o mistério da Câmara Secreta.",
    avaliacao: "7.4",
    duracao: "2 h 41 min",
    ano: "2002",
    generos: ["Fantasia", "Mistério", "Suspense"]
  },
  {
    id: "hp3",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e o Prisioneiro de Azkaban",
    oscars: "2 Indicações", // Melhor Trilha Sonora, Efeitos Visuais (2004)
    descricao: "Sirius Black escapa de Azkaban, e Harry descobre verdades sobre seu passado e seus pais.",
    avaliacao: "7.9",
    duracao: "2 h 22 min",
    ano: "2004",
    generos: ["Fantasia", "Drama", "Viagem no Tempo"]
  },
  {
    id: "hp4",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e o Cálice de Fogo",
    oscars: "1 Oscar", // Melhor Direção de Arte (2006)
    descricao: "Harry é misteriosamente selecionado para o Torneio Tribruxo e enfrenta desafios mortais.",
    avaliacao: "7.7",
    duracao: "2 h 37 min",
    ano: "2005",
    generos: ["Fantasia", "Torneio", "Ação"]
  },
  {
    id: "hp5",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e a Ordem da Fênix",
    oscars: "0 Oscars", // Nenhuma indicação
    descricao: "O Ministério da Magia nega o retorno de Voldemort, enquanto Harry lidera a Armada de Dumbledore.",
    avaliacao: "7.5",
    duracao: "2 h 18 min",
    ano: "2007",
    generos: ["Fantasia", "Rebelião", "Poder"]
  },
  {
    id: "hp6",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e o Enigma do Príncipe",
    oscars: "0 Oscars", // Nenhuma indicação
    descricao: "Dumbledore revela detalhes do passado de Voldemort e Harry descobre os horcruxes.",
    avaliacao: "7.6",
    duracao: "2 h 33 min",
    ano: "2009",
    generos: ["Fantasia", "Suspense", "Memórias"]
  },
  {
    id: "hp7p1",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e as Relíquias da Morte - Parte 1",
    oscars: "2 Indicações", // Melhor Direção de Arte, Efeitos Visuais (2011)
    descricao: "Harry, Rony e Hermione fogem de Hogwarts para destruir os horcruxes de Voldemort.",
    avaliacao: "7.7",
    duracao: "2 h 26 min",
    ano: "2010",
    generos: ["Fantasia", "Fuga", "Sobrevivência"]
  },
  {
    id: "hp7p2",
    logo: "img/hp_logo.png",
    titulo: "Harry Potter e as Relíquias da Morte - Parte 2",
    oscars: "0 Oscars", // 3 Indicações (sem vitórias)
    descricao: "A batalha final em Hogwarts determina o destino do mundo bruxo e o confronto entre Harry e Voldemort.",
    avaliacao: "8.1",
    duracao: "2 h 10 min",
    ano: "2011",
    generos: ["Fantasia", "Guerra", "Épico"]
  },
  {
    "id": "chihiro",
    "logo": "img/ghibli_logo.png",
    "titulo": "A Viagem de Chihiro",
    "oscars": "1 Oscar", // Melhor Filme de Animação (2003)
    "descricao": "Chihiro e seus pais entram em um mundo mágico, onde ela deve trabalhar para resgatar seus pais transformados em porcos.",
    "avaliacao": "8.6",
    "duracao": "2 h 5 min",
    "ano": "2001",
    "generos": ["Fantasia", "Magia", "Aventura"]
  },
  {
    "id": "castelo",
    "logo": "img/ghibli_logo.png",
    "titulo": "O Castelo Animado",
    "oscars": "1 Indicação", // (sem vitórias)
    "descricao": "Sophie, transformada em idosa por uma bruxa, embarca em uma jornada com o misterioso mago Howl e seu castelo ambulante.",
    "avaliacao": "8.2",
    "duracao": "1 h 59 min",
    "ano": "2004",
    "generos": ["Fantasia", "Romance", "Steampunk"]
  },
  {
    "id": "totoro",
    "logo": "img/ghibli_logo.png",
    "titulo": "Meu Amigo Totoro",
    "oscars": "0 Oscars", // (cult classic)
    "descricao": "As irmãs Satsuki e Mei descobrem criaturas mágicas na floresta e fazem amizade com o gentil espírito da natureza, Totoro.",
    "avaliacao": "8.2",
    "duracao": "1 h 26 min",
    "ano": "1988",
    "generos": ["Família", "Infantil", "Natureza"]
  },
  {
    "id": "mononoke",
    "logo": "img/ghibli_logo.png",
    "titulo": "Princesa Mononoke",
    "oscars": "0 Oscars", // (indicado ao Urso de Ouro)
    "descricao": "Ashitaka se envolve na luta entre humanos e espíritos da floresta, encontrando a guerreira San e tentando restaurar a paz.",
    "avaliacao": "8.4",
    "duracao": "2 h 14 min",
    "ano": "1997",
    "generos": ["Épico", "Ecologia", "Conflito"]
  },
  {
    "id": "kiki",
    "logo": "img/ghibli_logo.png",
    "titulo": "O Serviço de Entregas da Kiki",
    "oscars": "0 Oscars", // (cult classic)
    "descricao": "Kiki, uma jovem bruxa em treinamento, abre um serviço de entregas aéreo enquanto busca encontrar seu lugar no mundo.",
    "avaliacao": "7.8",
    "duracao": "1 h 43 min",
    "ano": "1989",
    "generos": ["Coming-of-age", "Bruxaria", "Independência"]
  },
  {
    "id": "ponyo",
    "logo": "img/ghibli_logo.png",
    "titulo": "Ponyo: Uma Amizade que Veio do Mar",
    "oscars": "0 Oscars", // (indicado ao Annie Award)
    "descricao": "Ponyo, um peixinho mágico, deseja se tornar humana após se apaixonar por um menino chamado Sosuke.",
    "avaliacao": "7.7",
    "duracao": "1 h 41 min",
    "ano": "2008",
    "generos": ["Infantil", "Amizade", "Mar"]
  },
  {
    "id": "garça",
    "logo": "img/ghibli_logo.png",
    "titulo": "O Menino e a Garça",
    "oscars": "1 Oscar", // Melhor Filme de Animação (2024)
    "descricao": "Um jovem lida com o luto e descobre um mundo mágico após encontrar uma garça enigmática que o guia por uma jornada fantástica.",
    "avaliacao": "7.6",
    "duracao": "2 h 4 min",
    "ano": "2023",
    "generos": ["Fantasia", "Luto", "Mundo Paralelo"]
  },
  {
    "id": "porco",
    "logo": "img/ghibli_logo.png",
    "titulo": "Porco Rosso: O Último Herói Romântico",
    "oscars": "0 Oscars", // (cult classic)
    "descricao": "Um piloto amaldiçoado com a aparência de um porco combate piratas aéreos enquanto lida com seu passado misterioso.",
    "avaliacao": "7.8",
    "duracao": "1 h 33 min",
    "ano": "1992",
    "generos": ["Ação", "Avião", "Comédia"]
  }

  // ... (outros filmes permanecem iguais)
];

// ========== FUNÇÕES PRINCIPAIS ========== //
//function 

function renderizarCards() {
  const $container = $('.movie-list');
  filmes.forEach(filme => {
    // tinha algo aqui
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

$(document).ready(function () {
  // Cards na página inicial
  if ($('.movie-list').length) {
    renderizarCards();
    $('.movie-list').on('click', '.movie-list-item', function () {
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
document.querySelectorAll('.menu-list-item').forEach(item => {
  item.addEventListener('click', () => {
      document.getElementById('menuToggle').checked = false;
  });
});

