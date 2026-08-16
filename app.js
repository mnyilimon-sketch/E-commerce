/* =========================================================
   ÉLÉMENTS PRINCIPAUX
   ========================================================= */

const searchContainer = document.querySelector(".search-container");
const btnSearch = document.querySelector("#search-icon");

const cartContent = document.querySelector(".cart-container");
const cartBtn = document.querySelector("#cart-icon");

const userContent = document.querySelector(".user-container");
const userBtn = document.querySelector("#user-icon");

const addBtnIcon = document.querySelector("#add-icon");
const addContent = document.querySelector(".add-container");

const nav = document.querySelector(".navigation");
const burgerBtn = document.querySelector("#burger-menu");

const linkNav = document.querySelectorAll(".navigation a");
const header = document.querySelector("nav");
const sections = document.querySelectorAll("section");


/* =========================================================
   INTERNATIONALISATION (FR / EN)
   Placé tout en haut : toutes les fonctions plus bas
   peuvent s'appuyer dessus en toute sécurité.
   ========================================================= */

const translations = {
    fr: {
        nav_home: "Accueil", nav_promo: "Promos", nav_news: "Nouveautés", nav_products: "Produits", nav_reviews: "Avis",
        nav_about: "À propos", nav_shipping: "Livraison", nav_faq: "FAQ", nav_contact: "Contact",
        search_placeholder: "Que recherchez-vous?",
        cart_view: "Voir panier", cart_total_label: "Total", cart_empty: "Votre panier est vide",
        add_title: "Ajouter un produit", add_name_ph: "Nom du produit", add_price_ph: "Prix (FCFA)",
        add_submit: "Ajouter le produit", add_loading: "Ajout en cours...",
        stars_5: "5 étoiles", stars_4: "4 étoiles", stars_3: "3 étoiles", stars_2: "2 étoiles", stars_1: "1 étoile",
        account_title: "Connectez-vous", account_email_ph: "E-mail", account_pass_ph: "Mot de passe",
        account_submit: "Connexion", account_forgot: "Mot de passe oublié?", account_forgot_link: "Cliquez ici",
        account_noaccount: "Pas de compte?", account_create_link: "Créer un compte!",
        home_tag: "E-commerce", home_title: "Tendance & Tranquilité", home_cta: "En savoir plus",
        home_promo: "🔥 Jusqu'à -25% sur une sélection cette semaine seulement", home_buy: "Acheter maintenant",
        promo_title: "Offres <span>du Moment</span>",
        promo_item1: "Complet Signature", promo_item2: "Robe Prestige", promo_item3: "Manche Longue Deluxe",
        news_title: "Nouvel <span>Arrivage</span>", news_add: "Ajouter panier",
        products_title: "Nos<span>Produits</span>",
        prod_robe: "Robe-Luxass", prod_elegance: "Elégance-homme", prod_manche: "Manche-longue",
        reviews_title: "Avis <span>Clients</span>",
        review_1: "👑 Devenez l'inspiration, pas l'imitation",
        review_2: "S'habiller, c'est déjà se sentir bien 😊",
        review_3: "💪 Portez votre force, affirmez votre style ⚡",
        about_title: "À <span>propos</span>",
        about_p1: "E-SHOP est une boutique togolaise qui propose des vêtements tendance pour homme et femme, pensés pour allier style et confort au quotidien. Depuis notre atelier au Togo, nous sélectionnons chaque pièce avec soin pour vous offrir une expérience shopping fiable et agréable.",
        about_p2: "Notre mission : rendre la mode accessible à tous, avec un service client réactif et une livraison rapide dans toutes les régions du pays.",
        shipping_title: "Livraison <span>& Retours</span>",
        shipping_zones_title: "Zones de livraison",
        shipping_zones_text: "Nous livrons dans toutes les régions du Togo : Maritime, Plateaux, Centrale, Kara et Savanes.",
        shipping_delay_title: "Délais",
        shipping_delay_text: "24h à Lomé, 2 à 4 jours ouvrés dans les autres régions selon la disponibilité.",
        shipping_return_title: "Retours",
        shipping_return_text: "Retour ou échange possible sous 7 jours si l'article n'a pas été porté, avec l'étiquette d'origine.",
        faq_title: "Questions <span>Fréquentes</span>",
        faq_q1: "Quels sont les modes de paiement acceptés ?",
        faq_a1: "Nous acceptons le paiement à la livraison, Mobile Money (T-Money, Flooz) et les cartes bancaires.",
        faq_q2: "Combien coûte la livraison ?",
        faq_a2: "Les frais varient selon la région ; le montant exact s'affiche avant la validation de votre commande.",
        faq_q3: "Puis-je échanger un article qui ne me va pas ?",
        faq_a3: "Oui, sous 7 jours après réception, l'article doit être non porté et dans son état d'origine.",
        faq_q4: "Comment suivre ma commande ?",
        faq_a4: "Un lien de suivi vous est envoyé par SMS ou e-mail dès l'expédition de votre colis.",
        contact_title: "Nous <span>Contacter</span>",
        contact_address: "Lomé, Région Maritime, Togo",
        contact_name_ph: "Votre nom", contact_email_ph: "Votre e-mail", contact_msg_ph: "Votre message",
        contact_submit: "Envoyer",
        footer_info: "Information", footer_terms: "Conditions de vente", footer_legal: "mentions légales",
        footer_support: "Supports", footer_contact_link: "Nous contacter", footer_locations: "Nos locaux",
        footer_payments: "Paiements",
        footer_copy: "© La Minute De Code - tous droits réservés - 2026",

        validation_fill_fields: "Veuillez remplir tous les champs.",
        add_success: '"{name}" a été ajouté avec succès !',
        confirm_delete_product: 'Supprimer "{name}" ?',
        image_error: "Impossible de traiter cette image.",
        save_error: "Impossible de sauvegarder ce produit.",
        contact_success: "Merci {name} ! Votre message a bien été envoyé.",
        default_product_name: "Produit",
        default_news_name: "Nouveauté",
        tooltip_delete: "Supprimer",
        tooltip_addcart: "Ajouter au panier"
    },
    en: {
        nav_home: "Home", nav_promo: "Deals", nav_news: "New In", nav_products: "Products", nav_reviews: "Reviews",
        nav_about: "About", nav_shipping: "Shipping", nav_faq: "FAQ", nav_contact: "Contact",
        search_placeholder: "What are you looking for?",
        cart_view: "View cart", cart_total_label: "Total", cart_empty: "Your cart is empty",
        add_title: "Add a product", add_name_ph: "Product name", add_price_ph: "Price (FCFA)",
        add_submit: "Add product", add_loading: "Adding...",
        stars_5: "5 stars", stars_4: "4 stars", stars_3: "3 stars", stars_2: "2 stars", stars_1: "1 star",
        account_title: "Log in", account_email_ph: "Email", account_pass_ph: "Password",
        account_submit: "Log in", account_forgot: "Forgot your password?", account_forgot_link: "Click here",
        account_noaccount: "No account?", account_create_link: "Create one!",
        home_tag: "E-commerce", home_title: "Trend & Tranquility", home_cta: "Learn more",
        home_promo: "🔥 Up to -25% on a selection this week only", home_buy: "Buy now",
        promo_title: "Current <span>Deals</span>",
        promo_item1: "Signature Suit", promo_item2: "Prestige Dress", promo_item3: "Deluxe Long Sleeve",
        news_title: "New <span>Arrivals</span>", news_add: "Add to cart",
        products_title: "Our<span>Products</span>",
        prod_robe: "Luxass Dress", prod_elegance: "Men's Elegance", prod_manche: "Long Sleeve",
        reviews_title: "Customer <span>Reviews</span>",
        review_1: "👑 Become the inspiration, not the imitation",
        review_2: "Getting dressed already feels good 😊",
        review_3: "💪 Wear your strength, own your style ⚡",
        about_title: "About <span>Us</span>",
        about_p1: "E-SHOP is a Togolese store offering trendy clothing for men and women, designed to combine style and everyday comfort. From our workshop in Togo, we carefully select every piece to give you a reliable, enjoyable shopping experience.",
        about_p2: "Our mission: make fashion accessible to everyone, with responsive customer service and fast delivery across the country.",
        shipping_title: "Shipping <span>& Returns</span>",
        shipping_zones_title: "Delivery zones",
        shipping_zones_text: "We deliver to every region of Togo: Maritime, Plateaux, Centrale, Kara and Savanes.",
        shipping_delay_title: "Delivery times",
        shipping_delay_text: "24h in Lomé, 2 to 4 business days in other regions depending on availability.",
        shipping_return_title: "Returns",
        shipping_return_text: "Return or exchange possible within 7 days if the item is unworn, with its original tag.",
        faq_title: "Frequently <span>Asked Questions</span>",
        faq_q1: "What payment methods do you accept?",
        faq_a1: "We accept cash on delivery, Mobile Money (T-Money, Flooz) and bank cards.",
        faq_q2: "How much does shipping cost?",
        faq_a2: "Fees vary by region; the exact amount is shown before you confirm your order.",
        faq_q3: "Can I exchange an item that doesn't fit?",
        faq_a3: "Yes, within 7 days of receipt, the item must be unworn and in its original condition.",
        faq_q4: "How can I track my order?",
        faq_a4: "A tracking link is sent to you by SMS or email as soon as your parcel ships.",
        contact_title: "Contact <span>Us</span>",
        contact_address: "Lomé, Maritime Region, Togo",
        contact_name_ph: "Your name", contact_email_ph: "Your email", contact_msg_ph: "Your message",
        contact_submit: "Send",
        footer_info: "Information", footer_terms: "Terms of sale", footer_legal: "Legal notice",
        footer_support: "Support", footer_contact_link: "Contact us", footer_locations: "Our locations",
        footer_payments: "Payments",
        footer_copy: "© La Minute De Code - all rights reserved - 2026",

        validation_fill_fields: "Please fill in all fields.",
        add_success: '"{name}" was added successfully!',
        confirm_delete_product: 'Delete "{name}"?',
        image_error: "Unable to process this image.",
        save_error: "Unable to save this product.",
        contact_success: "Thank you {name}! Your message has been sent.",
        default_product_name: "Product",
        default_news_name: "New item",
        tooltip_delete: "Delete",
        tooltip_addcart: "Add to cart"
    }
};

let currentLang = localStorage.getItem("eshop-lang") || "fr";

// Récupère un texte traduit, avec remplacement de {variables} dans le texte
function t(key, vars = {}) {
    const dict = translations[currentLang] || translations.fr;
    let text = dict[key] !== undefined ? dict[key] : (translations.fr[key] || key);

    Object.keys(vars).forEach(varKey => {
        text = text.replace(`{${varKey}}`, vars[varKey]);
    });

    return text;
}

function applyLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang] || translations.fr;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    document.querySelectorAll("[data-i18n-value]").forEach(el => {
        const key = el.dataset.i18nValue;
        if (dict[key] !== undefined) el.setAttribute("value", dict[key]);
    });

    document.documentElement.lang = lang;

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    localStorage.setItem("eshop-lang", lang);

    // Re-rendu du panier pour traduire "Total" / "Panier vide"
    renderCart();
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        applyLanguage(btn.dataset.lang);
    });
});


/* =========================================================
   FONCTION POUR FERMER TOUS LES PANNEAUX
   ========================================================= */

function closePanels() {

    if (searchContainer) {
        searchContainer.classList.remove("active");
    }

    if (cartContent) {
        cartContent.classList.remove("active");
    }

    if (userContent) {
        userContent.classList.remove("active");
    }

    if (addContent) {
        addContent.classList.remove("active");
    }
}


/* =========================================================
   MENU BURGER
   ========================================================= */

if (burgerBtn && nav) {

    burgerBtn.addEventListener("click", () => {

        nav.classList.toggle("active");
        burgerBtn.classList.toggle("active");

        if (nav.classList.contains("active")) {

            burgerBtn.classList.remove("bx-menu");
            burgerBtn.classList.add("bx-x");

        } else {

            burgerBtn.classList.remove("bx-x");
            burgerBtn.classList.add("bx-menu");
        }

    });
}


/* =========================================================
   FERMER LE MENU APRÈS AVOIR CLIQUÉ SUR UN LIEN
   ========================================================= */

linkNav.forEach(link => {

    link.addEventListener("click", () => {

        if (nav) {
            nav.classList.remove("active");
        }

        if (burgerBtn) {

            burgerBtn.classList.remove("active");
            burgerBtn.classList.remove("bx-x");
            burgerBtn.classList.add("bx-menu");
        }

    });

});


/* =========================================================
   CHANGEMENT DU LIEN ACTIF
   ========================================================= */

linkNav.forEach(link => {

    link.addEventListener("click", () => {

        linkNav.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================================================
   RECHERCHE
   ========================================================= */

if (btnSearch) {

    btnSearch.addEventListener("click", () => {

        if (searchContainer) {
            searchContainer.classList.toggle("active");
        }

        if (cartContent) {
            cartContent.classList.remove("active");
        }

        if (userContent) {
            userContent.classList.remove("active");
        }

        if (addContent) {
            addContent.classList.remove("active");
        }

    });

}


/* =========================================================
   PANIER
   ========================================================= */

if (cartBtn) {

    cartBtn.addEventListener("click", () => {

        if (cartContent) {
            cartContent.classList.toggle("active");
        }

        if (searchContainer) {
            searchContainer.classList.remove("active");
        }

        if (userContent) {
            userContent.classList.remove("active");
        }

        if (addContent) {
            addContent.classList.remove("active");
        }

    });

}


/* =========================================================
   COMPTE
   ========================================================= */

if (userBtn) {

    userBtn.addEventListener("click", () => {

        if (userContent) {
            userContent.classList.toggle("active");
        }

        if (searchContainer) {
            searchContainer.classList.remove("active");
        }

        if (cartContent) {
            cartContent.classList.remove("active");
        }

        if (addContent) {
            addContent.classList.remove("active");
        }

    });

}


/* =========================================================
   AJOUTER UN PRODUIT
   ========================================================= */

if (addBtnIcon) {

    addBtnIcon.addEventListener("click", () => {

        if (addContent) {
            addContent.classList.toggle("active");
        }

        if (searchContainer) {
            searchContainer.classList.remove("active");
        }

        if (cartContent) {
            cartContent.classList.remove("active");
        }

        if (userContent) {
            userContent.classList.remove("active");
        }

    });

}


/* =========================================================
   SWIPER - NOUVEAUTÉS
   ========================================================= */

if (typeof Swiper !== "undefined") {

    new Swiper(".news-cont", {

        spaceBetween: 20,

        loop: true,

        centeredSlides: true,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },

        breakpoints: {

            0: {
                slidesPerView: 1
            },

            500: {
                slidesPerView: 2
            },

            700: {
                slidesPerView: 2
            },

            1020: {
                slidesPerView: 3
            }

        }

    });

}


/* =========================================================
   PANIER
   ========================================================= */

const cartItemsWrapper =
    document.querySelector(".cart-items");

const cartTotalEl =
    document.querySelector(".cart-total");


let cart = [];


try {

    cart =
        JSON.parse(localStorage.getItem("eshop-cart")) || [];

} catch (error) {

    cart = [];

}


/* =========================================================
   SAUVEGARDER LE PANIER
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "eshop-cart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   FORMATER LE PRIX
   ========================================================= */

function parsePrice(value) {

    return parseInt(
        String(value).replace(/[^\d]/g, ""),
        10
    ) || 0;

}


function formatPrice(price) {

    return new Intl.NumberFormat("fr-FR").format(price);

}


/* =========================================================
   AJOUTER AU PANIER
   ========================================================= */
function addToCart(name, price, img, productId) {

    const existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            img: img,
            qty: 1,
            productId: productId
        });

    }

    saveCart();
    renderCart();

}


/* =========================================================
   AUGMENTER QUANTITÉ
   ========================================================= */

function increaseQuantity(name) {

    const item =
        cart.find(product => product.name === name);

    if (item) {

        item.qty++;

        saveCart();
        renderCart();

    }

}


/* =========================================================
   DIMINUER QUANTITÉ
   ========================================================= */

function decreaseQuantity(name) {

    const item =
        cart.find(product => product.name === name);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        cart =
            cart.filter(product =>
                product.name !== name
            );

    }

    saveCart();
    renderCart();

}


/* =========================================================
   SUPPRIMER DU PANIER
   ========================================================= */

function removeFromCart(name) {

    cart =
        cart.filter(item =>
            item.name !== name
        );

    saveCart();
    renderCart();

}


/* =========================================================
   AFFICHER LE PANIER
   ========================================================= */

function renderCart() {

    if (!cartItemsWrapper || !cartTotalEl) {
        return;
    }

    cartItemsWrapper.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    if (cart.length === 0) {

        cartItemsWrapper.innerHTML =
            `<p class="cart-empty">${t("cart_empty")}</p>`;

    }


    cart.forEach(item => {

        total += item.price * item.qty;

        totalQuantity += item.qty;


        const cartDiv =
            document.createElement("div");

        cartDiv.classList.add("cart");


        cartDiv.innerHTML = `

            <img
                src="${item.img}"
                alt="${item.name}"
            >

            <div class="cart-texte">

                <h3>${item.name}</h3>

                <span>
                    ${formatPrice(item.price)} FCFA
                </span>

                <div class="cart-quantity">

                    <button
                        class="quantity-minus"
                        data-name="${item.name}">
                        −
                    </button>

                    <span>${item.qty}</span>

                    <button
                        class="quantity-plus"
                        data-name="${item.name}">
                        +
                    </button>

                </div>

            </div>

            <i
                class="bx bxs-trash cart-delete"
                data-name="${item.name}">
            </i>

        `;


        cartItemsWrapper.appendChild(cartDiv);

    });


    cartTotalEl.textContent =
        `${t("cart_total_label")} : ${formatPrice(total)} FCFA`;


    /* Bouton + */

    cartItemsWrapper
        .querySelectorAll(".quantity-plus")
        .forEach(button => {

            button.addEventListener("click", () => {

                increaseQuantity(
                    button.dataset.name
                );

            });

        });


    /* Bouton - */

    cartItemsWrapper
        .querySelectorAll(".quantity-minus")
        .forEach(button => {

            button.addEventListener("click", () => {

                decreaseQuantity(
                    button.dataset.name
                );

            });

        });


    /* Supprimer */

    cartItemsWrapper
        .querySelectorAll(".cart-delete")
        .forEach(button => {

            button.addEventListener("click", () => {

                removeFromCart(
                    button.dataset.name
                );

            });

        });


    updateCartBadge(totalQuantity);

}


/* =========================================================
   COMPTEUR DU PANIER
   ========================================================= */

function updateCartBadge(quantity) {

    if (!cartBtn) return;


    let badge =
        cartBtn.parentElement.querySelector(
            ".cart-badge"
        );


    if (!badge) {

        badge =
            document.createElement("span");

        badge.classList.add("cart-badge");

        cartBtn.parentElement.style.position =
            "relative";

        cartBtn.parentElement.appendChild(badge);

    }


    badge.textContent = quantity;

    badge.style.display =
        quantity > 0 ? "flex" : "none";

}


/* =========================================================
   PRODUITS EXISTANTS
   ========================================================= */

function attachAddToCart(box) {

    const addBtn =
        box.querySelector(".bxs-cart-alt");

    if (!addBtn) return;
const productId = box.dataset.id || box.dataset.productId || null;


    const name =
        box.querySelector("h2")
            ?.textContent
            .trim() || t("default_product_name");


    const priceElement =
        box.querySelector(
            ".products-box-content span"
        );


    const price =
        parsePrice(
            priceElement?.textContent || "0"
        );


    const image =
        box.querySelector("img");


    const img =
        image?.getAttribute("src") || "";


   addBtn.addEventListener("click", () => {

        addToCart(name, price, img, productId);

        if (cartContent) {
            cartContent.classList.add("active");
        }

        closeOtherPanels();

    });

}


function closeOtherPanels() {

    if (searchContainer) {
        searchContainer.classList.remove("active");
    }

    if (userContent) {
        userContent.classList.remove("active");
    }

    if (addContent) {
        addContent.classList.remove("active");
    }

}


/* =========================================================
   PRODUITS DE LA SECTION PRODUITS
   ========================================================= */

document
    .querySelectorAll(".products-box")
    .forEach(box => {

        attachAddToCart(box);

    });


/* =========================================================
   NOUVEAUTÉS
   ========================================================= */

document
    .querySelectorAll(".news-cont .box")
    .forEach(box => {

        const addBtn =
            box.querySelector(".btn");

        if (!addBtn) return;


        const name =
            box.dataset.name || t("default_news_name");


        const price =
            parsePrice(
                box.dataset.price || "0"
            );


        const image =
            box.querySelector("img");


        const img =
            image?.getAttribute("src") || "";


        addBtn.addEventListener("click", event => {

            event.preventDefault();

            addToCart(
                name,
                price,
                img
            );

            if (cartContent) {
                cartContent.classList.add("active");
            }

            closeOtherPanels();

        });

    });


/* =========================================================
   OFFRES DU MOMENT (Acheter maintenant)
   ========================================================= */

document
    .querySelectorAll(".promo-box")
    .forEach(box => {

        const buyBtn =
            box.querySelector(".promo-buy");

        if (!buyBtn) return;


        const name =
            box.dataset.name || t("default_product_name");


        const price =
            parsePrice(
                box.dataset.price || "0"
            );


        const image =
            box.querySelector("img");


        const img =
            image?.getAttribute("src") || "";


        buyBtn.addEventListener("click", event => {

            event.preventDefault();

            addToCart(
                name,
                price,
                img
            );

            if (cartContent) {
                cartContent.classList.add("active");
            }

            closeOtherPanels();

        });

    });


/* =========================================================
   RECHERCHE DES PRODUITS
   ========================================================= */

const searchInput =
    searchContainer?.querySelector(
        "input[type='search']"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const search =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const products =
                document.querySelectorAll(
                    ".products-box"
                );


            products.forEach(product => {

                const name =
                    product
                        .querySelector("h2")
                        ?.textContent
                        .toLowerCase() || "";


                if (
                    search === "" ||
                    name.includes(search)
                ) {

                    product.style.display = "";

                } else {

                    product.style.display =
                        "none";

                }

            });

        }
    );

}


/* =========================================================
   FORMULAIRE DE CONTACT
   ========================================================= */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                contactForm
                    .querySelector(
                        'input[type="text"]'
                    )?.value
                    .trim();


            const email =
                contactForm
                    .querySelector(
                        'input[type="email"]'
                    )?.value
                    .trim();


            const message =
                contactForm
                    .querySelector("textarea")
                    ?.value
                    .trim();


            if (!name || !email || !message) {

                alert(t("validation_fill_fields"));

                return;

            }


            alert(t("contact_success", { name }));


            contactForm.reset();

        }
    );

}


/* =========================================================
   PRODUITS AJOUTÉS PAR L'ADMINISTRATEUR
   ========================================================= */

const productsContainer =
    document.querySelector(
        ".products-container"
    );


const addProductForm =
    document.querySelector(
        "#add-product-form"
    );


let extraProducts = [];


try {

    extraProducts =
        JSON.parse(
            localStorage.getItem(
                "eshop-extra-products"
            )
        ) || [];

} catch (error) {

    extraProducts = [];

}


/* =========================================================
   SAUVEGARDER LES PRODUITS
   ========================================================= */

function saveExtraProducts() {

    try {

        localStorage.setItem(
            "eshop-extra-products",
            JSON.stringify(extraProducts)
        );

    } catch (error) {

        alert(t("save_error"));

    }

}


/* =========================================================
   ÉTOILES
   ========================================================= */

function buildStars(count) {

    let stars = "";

    for (let i = 0; i < count; i++) {

        stars +=
            `<i class="bx bxs-star"></i>`;

    }

    return stars;

}


/* =========================================================
   REDIMENSIONNER L'IMAGE
   ========================================================= */

function resizeImage(
    file,
    maxSize = 600,
    quality = 0.75
) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onerror = () => {

                reject(
                    new Error(
                        "Lecture du fichier impossible"
                    )
                );

            };


            reader.onload = () => {

                const img =
                    new Image();


                img.onerror = () => {

                    reject(
                        new Error(
                            "Image invalide"
                        )
                    );

                };


                img.onload = () => {

                    let width =
                        img.width;

                    let height =
                        img.height;


                    if (
                        width > height &&
                        width > maxSize
                    ) {

                        height =
                            Math.round(
                                height *
                                (maxSize / width)
                            );

                        width =
                            maxSize;

                    } else if (
                        height > maxSize
                    ) {

                        width =
                            Math.round(
                                width *
                                (maxSize / height)
                            );

                        height =
                            maxSize;

                    }


                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    canvas.width =
                        width;

                    canvas.height =
                        height;


                    const ctx =
                        canvas.getContext(
                            "2d"
                        );


                    ctx.drawImage(
                        img,
                        0,
                        0,
                        width,
                        height
                    );


                    resolve(
                        canvas.toDataURL(
                            "image/jpeg",
                            quality
                        )
                    );

                };


                img.src =
                    reader.result;

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   CRÉER UNE CARTE PRODUIT
   ========================================================= */

function createProductBox(
    name,
    price,
    img,
    stars,
    id
) {

    if (!productsContainer) return;


    const box =
        document.createElement("div");


    box.classList.add(
        "products-box"
    );


    box.dataset.productId =
        id;


    box.innerHTML = `

        <i
            class="bx bxs-trash product-delete"
            title="${t("tooltip_delete")}">
        </i>

        <img
            src="${img}"
            alt="${name}"
        >

        <div class="products-box-content">

            <h2>${name}</h2>

            <div class="stars">
                ${buildStars(stars)}
            </div>

            <span>
                ${formatPrice(price)} FCFA
            </span>

            <i
                class="bx bxs-cart-alt"
                title="${t("tooltip_addcart")}">
            </i>

        </div>

    `;


    productsContainer.appendChild(box);


    attachAddToCart(box);


    /* SUPPRIMER */

    const deleteBtn =
        box.querySelector(
            ".product-delete"
        );


    deleteBtn.addEventListener(
        "click",
        () => {

            const confirmation =
                confirm(
                    t("confirm_delete_product", { name })
                );


            if (!confirmation) return;


            box.remove();


            extraProducts =
                extraProducts.filter(
                    product =>
                        product.id !== id
                );


            saveExtraProducts();

        }
    );

}


/* =========================================================
   RESTAURER LES PRODUITS
   ========================================================= */
// désactivé : les produits sont maintenant chargés depuis l'API (voir products-api.js)
// extraProducts.forEach(product => {
//     createProductBox(product.name, product.price, product.img, product.stars, product.id);
// });


/* =========================================================
   AJOUTER UN PRODUIT
   ========================================================= */

if (false && addProductForm) { // désactivé : la gestion des produits se fait maintenant via products-api.js

    addProductForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document
                    .querySelector("#add-name")
                    ?.value
                    .trim();


            const price =
                parsePrice(
                    document
                        .querySelector("#add-price")
                        ?.value || "0"
                );


            const fileInput =
                document.querySelector(
                    "#add-img"
                );


            const stars =
                parseInt(
                    document
                        .querySelector("#add-stars")
                        ?.value || "5",
                    10
                );


            if (
                !name ||
                !price ||
                !fileInput?.files?.[0]
            ) {

                alert(t("validation_fill_fields"));

                return;

            }


            const submitBtn =
                addProductForm.querySelector(
                    'input[type="submit"]'
                );


            const originalLabel =
                submitBtn.value;


            submitBtn.value = t("add_loading");


            submitBtn.disabled =
                true;


            try {

                const img =
                    await resizeImage(
                        fileInput.files[0]
                    );


                const id =
                    Date.now().toString(36) +
                    Math.random()
                        .toString(36)
                        .slice(2, 7);


                createProductBox(
                    name,
                    price,
                    img,
                    stars,
                    id
                );


                extraProducts.push({

                    id,
                    name,
                    price,
                    img,
                    stars

                });


                saveExtraProducts();


                addProductForm.reset();


                if (addContent) {

                    addContent.classList.remove(
                        "active"
                    );

                }


                alert(t("add_success", { name }));


            } catch (error) {

                alert(t("image_error"));

            } finally {

                submitBtn.value =
                    originalLabel;

                submitBtn.disabled =
                    false;

            }

        }
    );

}


/* =========================================================
   SCROLL DE LA NAVIGATION
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 50) {

            header.classList.add("active");

        } else {

            header.classList.remove("active");

        }

    }
);


/* =========================================================
   FERMER LES PANNEAUX EN CLIQUANT AILLEURS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const target =
            event.target;


        if (
            !target.closest("nav")
        ) {

            closePanels();

            if (nav) {
                nav.classList.remove(
                    "active"
                );
            }

            if (burgerBtn) {

                burgerBtn.classList.remove(
                    "active"
                );

                burgerBtn.classList.remove(
                    "bx-x"
                );

                burgerBtn.classList.add(
                    "bx-menu"
                );

            }

        }

    }
);


/* =========================================================
   APPLIQUER LA LANGUE AU CHARGEMENT
   (fait aussi le premier rendu du panier)
   ========================================================= */

applyLanguage(currentLang);