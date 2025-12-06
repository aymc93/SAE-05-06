// Tableau des images à faire défiler
const imagesHero = [
    "images/aujourd'hui.jpg",
    "images/madoudinette.jpg",
    "images/Madou-Yassa.jpg",
    "images/madouYassa.jpg"
];

// Sélection de la section hero
const hero = document.getElementById("hero");

let index = 0;

// Fonction pour changer l'image toutes les 4 secondes
function changerImage() {
    index = (index + 1) % imagesHero.length; // Boucle infinie
    hero.style.backgroundImage = `url('${imagesHero[index]}')`;
}

// Lancer le défilement auto
setInterval(changerImage, 4000);
