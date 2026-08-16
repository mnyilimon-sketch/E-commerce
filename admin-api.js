const adminGroup = document.getElementById('admin-icons-group');

    function updateAdminVisibility() {
        const show = isAdmin();
        adminGroup.style.display = show ? 'inline-flex' : 'none';
    }