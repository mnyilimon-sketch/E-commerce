
// =====================================================
// CONFIGURATION
// =====================================================

const AUTH_API_URL = 'http://localhost:5000/api/auth';

let isRegisterMode = false;


// =====================================================
// GESTION DE LA SESSION
// =====================================================

function getToken() {
    return localStorage.getItem('token');
}

function getStoredUser() {

    const raw = localStorage.getItem('user');

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error('Erreur lecture utilisateur :', error);
        return null;
    }
}

function saveSession(token, user) {

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

function clearSession() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
}


// =====================================================
// MISE À JOUR DE L'INTERFACE
// =====================================================

function updateAuthUI() {

    const user = getStoredUser();

    const form = document.getElementById('auth-form');
    const loggedInBox = document.getElementById('auth-logged-in');
    const userNameSpan = document.getElementById('auth-user-name');

    const toggleText = document.getElementById('auth-toggle-text');
    const toggleLink = document.getElementById('auth-toggle-link');

    if (!form || !loggedInBox) {

        console.error(
            'Éléments HTML de connexion introuvables.'
        );

        return;
    }

    if (user) {

        // Utilisateur connecté
        form.style.display = 'none';

        if (toggleText) {
            toggleText.style.display = 'none';
        }

        if (toggleLink) {
            toggleLink.style.display = 'none';
        }

        loggedInBox.style.display = 'block';

        if (userNameSpan) {

            userNameSpan.textContent =
                user.name || user.email;
        }

    } else {

        // Utilisateur non connecté
        form.style.display = 'flex';

        if (toggleText) {
            toggleText.style.display = 'inline';
        }

        if (toggleLink) {
            toggleLink.style.display = 'inline';
        }

        loggedInBox.style.display = 'none';
    }
}


// =====================================================
// BASCULE CONNEXION / INSCRIPTION
// =====================================================

function setupAuthToggle() {

    const toggleLink =
        document.getElementById('auth-toggle-link');

    const toggleText =
        document.getElementById('auth-toggle-text');

    const title =
        document.getElementById('auth-title');

    const nameInput =
        document.getElementById('auth-name');

    const submitBtn =
        document.getElementById('auth-submit');


    if (
        !toggleLink ||
        !toggleText ||
        !title ||
        !nameInput ||
        !submitBtn
    ) {

        console.error(
            'Éléments du formulaire connexion/inscription introuvables.'
        );

        return;
    }


    toggleLink.addEventListener('click', (e) => {

        e.preventDefault();

        isRegisterMode = !isRegisterMode;


        if (isRegisterMode) {

            // MODE INSCRIPTION

            title.textContent =
                'Créer un compte';

            nameInput.style.display =
                'block';

            nameInput.required =
                true;

            submitBtn.value =
                "S'inscrire";

            toggleText.textContent =
                'Déjà un compte ?';

            toggleLink.textContent =
                'Se connecter';


        } else {

            // MODE CONNEXION

            title.textContent =
                'Connectez-vous';

            nameInput.style.display =
                'none';

            nameInput.required =
                false;

            submitBtn.value =
                'Connexion';

            toggleText.textContent =
                'Pas de compte ?';

            toggleLink.textContent =
                'Créer un compte !';
        }

    });
}


// =====================================================
// CONNEXION / INSCRIPTION
// =====================================================

function setupAuthForm() {

    const form =
        document.getElementById('auth-form');

    const statusEl =
        document.getElementById('auth-status');


    if (!form || !statusEl) {

        console.error(
            'Formulaire d authentification introuvable.'
        );

        return;
    }


    form.addEventListener('submit', async (e) => {

        e.preventDefault();


        statusEl.textContent = '';
        statusEl.style.color = 'red';


        const email =
            document
                .getElementById('auth-email')
                .value
                .trim();


        const password =
            document
                .getElementById('auth-password')
                .value;


        const name =
            document
                .getElementById('auth-name')
                .value
                .trim();


        // Vérification côté navigateur

        if (!email || !password) {

            statusEl.textContent =
                'Veuillez remplir tous les champs obligatoires.';

            return;
        }


        if (isRegisterMode && !name) {

            statusEl.textContent =
                'Veuillez saisir votre nom.';

            return;
        }


        const endpoint =
            isRegisterMode
                ? '/register'
                : '/login';


        const body =
            isRegisterMode
                ? {
                    name: name,
                    email: email,
                    password: password
                }
                : {
                    email: email,
                    password: password
                };


        try {

            console.log(
                'Requête envoyée :',
                endpoint
            );


            const response =
                await fetch(
                    AUTH_API_URL + endpoint,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(body)
                    }
                );


            let data;


            try {

                data =
                    await response.json();

            } catch (error) {

                throw new Error(
                    'Le serveur a retourné une réponse invalide.'
                );
            }


            console.log(
                'Réponse serveur :',
                data
            );


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    'Erreur d authentification.'
                );
            }


            // Vérification du token

            if (!data.token) {

                throw new Error(
                    'Connexion réussie mais aucun token n’a été reçu.'
                );
            }


         // Sauvegarde session

            saveSession(
                data.token,
                data.user
            );


            // Redirection vers la page de publication, que ce soit inscription ou connexion

            window.location.href = 'publier.html';

            return;


            statusEl.style.color =
                'green';


            statusEl.textContent =
                'Connexion réussie !';


            // Mise à jour interface

            updateAuthUI();


            // Nettoyage formulaire

            form.reset();
        } catch (error) {

            console.error(
                'Erreur authentification :',
                error
            );


            statusEl.style.color =
                'red';


            if (error.name === 'TypeError') {

                statusEl.textContent =
                    'Impossible de contacter le serveur. Vérifiez que votre backend fonctionne sur le port 5000.';

            } else {

                statusEl.textContent =
                    error.message ||
                    'Une erreur est survenue.';
            }
        }

    });
}


// =====================================================
// DÉCONNEXION
// =====================================================

function setupLogout() {

    const logoutLink =
        document.getElementById(
            'auth-logout-link'
        );


    if (!logoutLink) {

        console.warn(
            'Bouton de déconnexion introuvable.'
        );

        return;
    }


    logoutLink.addEventListener(
        'click',
        (e) => {

            e.preventDefault();

            clearSession();

            updateAuthUI();
        }
    );
}


// =====================================================
// MOT DE PASSE OUBLIÉ
// =====================================================

function setupForgotPassword() {

    const forgotLink =
        document.getElementById(
            'forgot-link'
        );


    const backLink =
        document.getElementById(
            'back-to-login-link'
        );


    const loginForm =
        document.getElementById(
            'auth-form'
        );


    const forgotForm =
        document.getElementById(
            'forgot-form'
        );


    const resetForm =
        document.getElementById(
            'reset-form'
        );


    const authLinks =
        document.getElementById(
            'auth-links'
        );


    const backBox =
        document.getElementById(
            'back-to-login'
        );


    const title =
        document.getElementById(
            'auth-title'
        );


    const statusEl =
        document.getElementById(
            'auth-status'
        );


    // Vérification des éléments

    if (
        !forgotLink ||
        !backLink ||
        !loginForm ||
        !forgotForm ||
        !resetForm ||
        !authLinks ||
        !backBox ||
        !title ||
        !statusEl
    ) {

        console.error(
            'Un ou plusieurs éléments du système mot de passe oublié sont introuvables.'
        );

        return;
    }


    // -------------------------------------------------
    // OUVRIR MOT DE PASSE OUBLIÉ
    // -------------------------------------------------

    forgotLink.addEventListener(
        'click',
        (e) => {

            e.preventDefault();

            statusEl.textContent = '';

            loginForm.style.display =
                'none';

            forgotForm.style.display =
                'flex';

            resetForm.style.display =
                'none';

            authLinks.style.display =
                'none';

            backBox.style.display =
                'block';

            title.textContent =
                'Mot de passe oublié';
        }
    );


    // -------------------------------------------------
    // RETOUR CONNEXION
    // -------------------------------------------------

    backLink.addEventListener(
        'click',
        (e) => {

            e.preventDefault();

            statusEl.textContent = '';

            forgotForm.style.display =
                'none';

            resetForm.style.display =
                'none';

            loginForm.style.display =
                'flex';

            authLinks.style.display =
                'block';

            backBox.style.display =
                'none';

            title.textContent =
                'Connectez-vous';
        }
    );


    // -------------------------------------------------
    // ENVOYER EMAIL DE RÉINITIALISATION
    // -------------------------------------------------

    forgotForm.addEventListener(
        'submit',
        async (e) => {

            e.preventDefault();


            statusEl.style.color =
                'red';

            statusEl.textContent =
                '';


            const email =
                document
                    .getElementById(
                        'forgot-email'
                    )
                    .value
                    .trim();


            if (!email) {

                statusEl.textContent =
                    'Veuillez saisir votre adresse e-mail.';

                return;
            }


            try {

                console.log(
                    'Demande réinitialisation pour :',
                    email
                );


                const response =
                    await fetch(
                        AUTH_API_URL +
                        '/forgot-password',
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body:
                                JSON.stringify({
                                    email: email
                                })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    'Réponse forgot-password :',
                    data
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        'Erreur lors de l’envoi de l’e-mail.'
                    );
                }


                statusEl.style.color =
                    'green';


                statusEl.textContent =
                    data.message ||
                    'Si ce compte existe, un email a été envoyé.';


                forgotForm.reset();


            } catch (error) {

                console.error(
                    'Erreur mot de passe oublié :',
                    error
                );


                statusEl.style.color =
                    'red';


                statusEl.textContent =
                    error.message ||
                    'Une erreur est survenue.';
            }

        }
    );


    // -------------------------------------------------
    // RÉINITIALISER LE MOT DE PASSE
    // -------------------------------------------------

    resetForm.addEventListener(
        'submit',
        async (e) => {

            e.preventDefault();


            statusEl.style.color =
                'red';

            statusEl.textContent =
                '';


            const params =
                new URLSearchParams(
                    window.location.search
                );


            const token =
                params.get(
                    'resetToken'
                );


            const newPassword =
                document
                    .getElementById(
                        'reset-password'
                    )
                    .value;


            if (!token) {

                statusEl.textContent =
                    'Token de réinitialisation manquant.';

                return;
            }


            if (!newPassword) {

                statusEl.textContent =
                    'Veuillez saisir un nouveau mot de passe.';

                return;
            }


            if (newPassword.length < 6) {

                statusEl.textContent =
                    'Le nouveau mot de passe doit contenir au moins 6 caractères.';

                return;
            }


            try {

                const response =
                    await fetch(
                        AUTH_API_URL +
                        '/reset-password',
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body:
                                JSON.stringify({
                                    token: token,
                                    newPassword:
                                        newPassword
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        'Erreur lors de la réinitialisation.'
                    );
                }


                statusEl.style.color =
                    'green';


                statusEl.textContent =
                    'Mot de passe réinitialisé ! Vous pouvez vous connecter.';


                resetForm.reset();


                // Retour à la connexion après 2 secondes

                setTimeout(() => {

                    resetForm.style.display =
                        'none';

                    loginForm.style.display =
                        'flex';

                    authLinks.style.display =
                        'block';

                    backBox.style.display =
                        'none';

                    title.textContent =
                        'Connectez-vous';


                    // Supprime le resetToken de l'URL

                    window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname
                    );

                }, 2000);


            } catch (error) {

                console.error(
                    'Erreur reset-password :',
                    error
                );


                statusEl.style.color =
                    'red';


                statusEl.textContent =
                    error.message ||
                    'Une erreur est survenue.';
            }
        }
    );


    // -------------------------------------------------
    // SI RESETTOKEN PRÉSENT DANS L'URL
    // -------------------------------------------------

    const params =
        new URLSearchParams(
            window.location.search
        );


    const resetToken =
        params.get(
            'resetToken'
        );


    if (resetToken) {

        loginForm.style.display =
            'none';

        forgotForm.style.display =
            'none';

        resetForm.style.display =
            'flex';

        authLinks.style.display =
            'none';

        backBox.style.display =
            'block';

        title.textContent =
            'Nouveau mot de passe';
    }
}


// =====================================================
// INITIALISATION
// =====================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        console.log(
            'Système d authentification chargé.'
        );


        updateAuthUI();

        setupAuthToggle();

        setupAuthForm();

        setupLogout();

        setupForgotPassword();
    }
);

