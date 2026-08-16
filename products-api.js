const API_URL = 'http://localhost:5000/api/products';

function createProductBox(product) {
    const starsCount = product.stars || 0;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += i < starsCount
            ? "<i class='bx bxs-star'></i>"
            : "<i class='bx bx-star'></i>";
    }

    return `
        <div class="products-box" data-id="${product.id}">
            <img src="${product.image || './img.png/vetement.webp'}" alt="${product.name}">
            <div class="products-box-content">
                <h2>${product.name}</h2>
                <div class="stars">${starsHtml}</div>
                <span>${product.price}FCFA</span>
                <i class='bx bxs-cart-alt'></i>
            </div>
        </div>
    `;
}

async function loadProducts() {
    alert('ETAPE 1 : le script demarre');

    const container = document.querySelector('.products-container');

    if (!container) {
        alert('ERREUR : le conteneur .products-container est introuvable dans la page');
        return;
    }

    alert('ETAPE 2 : conteneur trouve, appel de l API en cours');

    try {
        const response = await fetch(API_URL);
        alert('ETAPE 3 : reponse recue, statut = ' + response.status);

        if (!response.ok) throw new Error('Erreur reseau, statut ' + response.status);
        const products = await response.json();

        alert('ETAPE 4 : ' + products.length + ' produits recus');

        if (products.length === 0) {
            container.innerHTML = '<p>Aucun produit pour le moment.</p>';
            return;
        }

        container.innerHTML = products.map(createProductBox).join('');
    } catch (error) {
        alert('ERREUR lors du fetch : ' + error.message);
        container.innerHTML = '<p>Impossible de charger les produits.</p>';
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function setupAddProductForm() {
    const form = document.getElementById('add-product-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('add-name').value;
        const price = document.getElementById('add-price').value;
        const stars = document.getElementById('add-stars').value;
        const imgFile = document.getElementById('add-img').files[0];

        if (!imgFile) {
            alert('Veuillez selectionner une image.');
            return;
        }

        try {
            const imageBase64 = await fileToBase64(imgFile);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    price: parseFloat(price),
                    image: imageBase64,
                    stars: parseInt(stars),
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Erreur lors de la creation');
            }

            form.reset();
            await loadProducts();
            alert('Produit ajoute avec succes !');
        } catch (error) {
            alert('Erreur : ' + error.message);
        }
    });
}

alert('ETAPE 0 : le fichier products-api.js est bien charge');

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupAddProductForm();
});