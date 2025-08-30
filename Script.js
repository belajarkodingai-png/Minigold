// Simulasi Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        alert('Login berhasil! Selamat datang, ' + username);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'flex';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert('Mohon masukkan username dan password!');
    }
});

// Simulasi Logout
document.getElementById('logout').addEventListener('click', () => {
    alert('Logout berhasil!');
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
});

// Simulasi Beli Emas
document.getElementById('buy-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('buy-amount').value;
    alert(`Berhasil membeli ${amount} gram emas!`);
});

// Kalkulator Investasi
document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('calc-amount').value);
    const buyPrice = 1858000; // Harga beli per gram (IDR)
    if (amount && amount > 0) {
        const value = (amount * buyPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
        document.getElementById('calc-result').textContent = `Nilai investasi: ${value}`;
    } else {
        document.getElementById('calc-result').textContent = 'Masukkan jumlah emas yang valid!';
    }
});