const ORDERS_API_URL = 'http://localhost:5000/api/orders';

function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const statusEl = document.getElementById('checkout-status');
    const addressInput = document.getElementById('checkout-address');

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', async () => {
        statusEl.textContent = '';
        statusEl.style.color = 'red';

        const token = getToken();
        if (!token) {
            statusEl.textContent = 'Veuillez vous connecter avant de valider la commande.';
            return;
        }

        if (cart.length === 0) {
            statusEl.textContent = 'Votre panier est vide.';
            return;
        }

        const shippingAddress = addressInput.value.trim();
        if (!shippingAddress) {
            statusEl.textContent = 'Veuillez indiquer une adresse de livraison.';
            return;
        }

        const itemsWithoutId = cart.filter(item => !item.productId);
        if (itemsWithoutId.length > 0) {
            statusEl.textContent = 'Certains articles du panier sont invalides (produit sans identifiant). Videz le panier et rajoutez les produits.';
            return;
        }

        const items = cart.map(item => ({
            productId: item.productId,
            quantity: item.qty,
        }));

        try {
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = 'Validation en cours...';

            const response = await fetch(ORDERS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ items, shippingAddress }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la commande.');
            }

            cart = [];
            saveCart();
            renderCart();
            addressInput.value = '';

            statusEl.style.color = 'green';
            statusEl.textContent = 'Commande validee avec succes ! Merci pour votre achat.';
        } catch (error) {
            statusEl.textContent = error.message;
        } finally {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Valider la commande';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCheckout();
});