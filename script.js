// ===== Menu mobile (burger) =====
const burger = document.querySelector('.burger');
const navLiens = document.querySelector('.nav-liens');

burger.addEventListener('click', () => {
  const ouvert = navLiens.classList.toggle('ouvert');
  burger.classList.toggle('ouvert', ouvert);
  burger.setAttribute('aria-expanded', ouvert);
});

// Referme le menu mobile quand on clique sur un lien
navLiens.querySelectorAll('a').forEach((lien) => {
  lien.addEventListener('click', () => {
    navLiens.classList.remove('ouvert');
    burger.classList.remove('ouvert');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ===== Surligne le lien du menu correspondant à la section visible =====
const sections = document.querySelectorAll('section[id], header[id]');
const liensParId = {};
navLiens.querySelectorAll('a[href^="#"]').forEach((lien) => {
  liensParId[lien.getAttribute('href').slice(1)] = lien;
});

const observateur = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      const lien = liensParId[entree.target.id];
      if (!lien) return;
      if (entree.isIntersecting) {
        navLiens.querySelectorAll('a').forEach((a) => a.classList.remove('actif'));
        lien.classList.add('actif');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observateur.observe(s));

document.addEventListener("DOMContentLoaded", () => {
  // On cible le bloc de code dans le HTML
  const codeBlock = document.querySelector('.code-body code');
  
  // Sécurité : si le bloc n'existe pas, on arrête tout
  if (!codeBlock) return;
  
  // On sauvegarde tout le code HTML actuel (avec les couleurs) et on vide le bloc
  const codeHTML = codeBlock.innerHTML;
  codeBlock.innerHTML = '';
  
  let i = 0;
  let textActuel = '';
  
  function typeWriter() {
    if (i < codeHTML.length) {
      // Si on détecte une balise HTML (ex: <span class="c-kw">), on l'ajoute d'un seul coup
      if (codeHTML.charAt(i) === '<') {
        while (codeHTML.charAt(i) !== '>' && i < codeHTML.length) {
          textActuel += codeHTML.charAt(i);
          i++;
        }
        textActuel += '>'; // On ajoute le chevron fermant
        i++;
        typeWriter(); // On relance la fonction immédiatement, sans faire de pause
        return;
      }
      
      // Si c'est une lettre normale (le vrai texte du code), on l'ajoute
      textActuel += codeHTML.charAt(i);
      
      // On met à jour l'écran avec le texte tapé + le curseur
      codeBlock.innerHTML = textActuel + '<span class="curseur">_</span>';
      i++;
      
      // Pause aléatoire entre 10ms et 30ms pour simuler une vraie frappe humaine !
      setTimeout(typeWriter, Math.floor(Math.random() * 20) + 10);
    }
  }
  
  // On attend une demi-seconde (500ms) avant de commencer à taper, pour que l'utilisateur ait le temps de voir
  setTimeout(typeWriter, 500);
});

// ===== Scroll Reveal =====
  // On crée l'observateur
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se déclenche quand 15% de l'élément est visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // L'animation ne se joue qu'une seule fois
      }
    });
  }, observerOptions);

  // On ajoute la classe "reveal" à tous les éléments qu'on veut animer
  const elementsToReveal = document.querySelectorAll('section h2, .etiquette, .etape, .projet, .comp-ligne, .contact-carte');
  
  elementsToReveal.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  