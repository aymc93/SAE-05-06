// ================================
//        AJOUTER AU PANIER
// ================================

function ajouterAuPanier(nom, prix, image) {
    // Récupérer le panier existant
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Chercher si le produit existe déjà
    let produit = panier.find(p => p.nom === nom);

    if (produit) {
        // Augmenter la quantité
        produit.quantite++;
    } else {
        // Ajouter un nouveau produit
        panier.push({
            nom: nom,
            prix: parseFloat(prix),
            image: image,
            quantite: 1
        });
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("panier", JSON.stringify(panier));

    // Feedback visuel sur le bouton
    const btn = event.target;
    const originalText = btn.textContent;
    const originalBg = btn.style.background;
    
    btn.textContent = '✅ Ajouté au panier !';
    btn.style.background = '#898A1F';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = originalBg;
        btn.disabled = false;
    }, 1500);
}

// ================================
//   ÉCOUTEURS D'ÉVÉNEMENTS
// ================================

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer tous les boutons "Ajouter au panier"
    const boutonsAjout = document.querySelectorAll(".add-to-cart");

    boutonsAjout.forEach((bouton) => {
        bouton.addEventListener("click", function(e) {
            e.preventDefault(); // Empêcher tout comportement par défaut
            
            const nom = this.getAttribute('data-name');
            const prix = this.getAttribute('data-price');
            const image = this.getAttribute('data-img');

            ajouterAuPanier(nom, prix, image);
        });
    });
});
