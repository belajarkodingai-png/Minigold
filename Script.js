// Elemen DOM utama
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
const profile = document.getElementById('profile');
const profileDropdown = document.getElementById('profileDropdown');
const darkModeToggle = document.getElementById('darkModeToggle');
const notifBadge = document.getElementById('notifBadge');

// Contoh data untuk cards & produk
const summaryData = {
  totalSales: 12543000,
  productsSold: 815,
  ordersCount: 1024,
  customersCount: 487,
};

const productData = [
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/40?text=1',
    name: 'Emas Kadar 24K',
    stock: 50,
    price: 950000,
  },
  {
    id: 2,
    thumbnail: 'https://via.placeholder.com/40?text=2',
    name: 'Emas Kadar 22K',
    stock: 30,
    price: 880000,
  },
  {
    id: 3,
    thumbnail: 'https://via.placeholder.com/40?text=3',
    name: 'Emas Antam 5 gram',
    stock: 20,
    price: 4600000,
  },
  {
    id: 4,
    thumbnail: 'https://via.placeholder.com/40?text=4',
    name: 'Kalung Emas 18K',
    stock: 15,
    price: 1200000,
  },
  {
    id: 5,
    thumbnail: 'https://via.placeholder.com/40?text=5',
    name: 'Cincin Emas 18K',
    stock: 25,
    price: 850000,
  },
  // ... tambah produk lain jika perlu
];

// Utility: format angka ke IDR rupiah
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);
}

// Sidebar toggle
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Profil dropdown toggle
profile.addEventListener('click', (e) => {
  e.stopPropagation();
  profile.classList.toggle('active');
});

document.body.addEventListener('click', () => {
  profile.classList.remove('active');
});

// Dark mode toggle
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark');
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark');
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Cek preferensi dark mode user
let darkModePref = localStorage.getItem('darkMode');
if (darkModePref === 'enabled') {
  setDarkMode(true);
}

darkModeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setDarkMode(!isDark);
});

// Notifikasi badge animasi contoh update (looped)
let notifCount = 3;
setInterval(() => {
  notifCount = (notifCount % 9) + 1;
  notifBadge.textContent = notifCount;
}, 5000);

// Count up animation untuk cards
function countUp(element, endValue, duration = 1500) {
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / endValue));
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    let current = Math.min(Math.floor((progress / duration) * endValue), endValue);
    element.textContent = formatNumber(current);
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }

  function formatNumber(num) {
    if (endValue >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (endValue >= 1000) return num.toLocaleString();
    return num;
  }

  requestAnimationFrame(animate);
}

// Set nilai count up cards
countUp(document.getElementById('totalSales'), summaryData.totalSales);
countUp(document.getElementById('productsSold'), summaryData.productsSold);
countUp(document.getElementById('ordersCount'), summaryData.ordersCount);
countUp(document.getElementById('customersCount'), summaryData.customersCount);

// Chart.js sales chart
const ctx = document.getElementById('salesChart').getContext('2d');

// Contoh data harian / mingguan / bulanan
const salesSampleData = {
  daily: {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [{ label: 'Penjualan', data: [120, 150, 180, 130, 200, 250, 220], borderColor: '#daa520', backgroundColor: 'rgba(218,165,32,0.3)', fill: true, tension: 0.3 }],
  },
  weekly: {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [{ label: 'Penjualan', data: [980, 1120, 1350, 1200], borderColor: '#b8860b', backgroundColor: 'rgba(184,134,11,0.3)', fill: true, tension: 0.3 }],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'],
    datasets: [{ label: 'Penjualan', data: [4000, 4500, 4800, 5200, 6100, 6300, 7000, 7200], borderColor: '#ffd700', backgroundColor: 'rgba(255, 215, 0,0.35)', fill: true, tension: 0.3 }],
  },
};

let currentRange = 'daily';
let salesChart = new Chart(ctx, {
  type: 'line',
  data: salesSampleData[currentRange],
  options: {
    responsive: true,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    plugins: {
      legend: { display: true, labels: { color: '#b8860b'} },
      tooltip: { enabled: true, mode: 'nearest', intersect: false },
    },
    scales: {
      x: { ticks: { color: '#b8860b' }, grid: { display: false } },
      y: { 
        beginAtZero: true, 
        ticks: { color: '#b8860b' },
        grid: {
          color: 'rgba(184, 134, 11, 0.15)',
          borderDash: [5, 5],
        },
      },
    },
  },
});

// Filter buttons event
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(btn.dataset.range === currentRange) return;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentRange = btn.dataset.range;

    // Update chart data
    salesChart.data = salesSampleData[currentRange];
    salesChart.update();
  });
});

// Produk table rendering, search & pagination
const productTableBody = document.querySelector('#productTable tbody');
const productSearch = document.getElementById('productSearch');
const paginationContainer = document.getElementById('pagination');
const rowsPerPage = 4;
let currentPage = 1;
let filteredProducts = [...productData];

// Fungsi render tabel
function renderTablePage(page = 1) {
  currentPage = page;
  const startIdx = (page -1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const rows = filteredProducts.slice(startIdx, endIdx);

  productTableBody.innerHTML = '';
  rows.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.thumbnail}" class="thumbnail" alt="thumbnail ${p.name}"></td>
      <td>${p.name}</td>
      <td>${p.stock}</td>
      <td>${formatRupiah(p.price)}</td>
      <td>
        <button class="action-btn edit" data-id="${p.id}">Edit</button>
        <button class="action-btn delete" data-id="${p.id}">Hapus</button>
      </td>
    `;
    productTableBody.appendChild(tr);
  });

  renderPagination();
}

// Render pagination buttons
function renderPagination() {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(filteredProducts.length / rowsPerPage);
  for(let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('page-btn');
    if(i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      renderTablePage(i);
    });
    paginationContainer.appendChild(btn);
  }
}

// Search filtering
productSearch.addEventListener('input', () => {
  const term = productSearch.value.toLowerCase();
  filteredProducts = productData.filter(p => p.name.toLowerCase().includes(term));
  renderTablePage(1);
});

// Event delegation untuk tombol aksi Edit & Hapus
productTableBody.addEventListener('click', e => {
  if(e.target.classList.contains('edit')) {
    const id = parseInt(e.target.dataset.id);
    alert('Edit produk id: ' + id);
    // Bisa ditambah modal edit nanti
  } else if(e.target.classList.contains('delete')) {
    const id = parseInt(e.target.dataset.id);
    if(confirm('Yakin ingin menghapus produk id: ' + id + '?')) {
      const idx = productData.findIndex(p => p.id === id);
      if(idx > -1) {
        productData.splice(idx, 1);
        filteredProducts = filteredProducts.filter(p => p.id !== id);
        renderTablePage(currentPage);
      }
    }
  }
});

// Tambah produk dummy
document.getElementById('addProductBtn').addEventListener('click', () => {
  const newId = productData.length ? productData[productData.length - 1].id + 1 : 1;
  const newProduct = {
    id: newId,
    thumbnail: 'https://via.placeholder.com/40?text=New',
    name: 'Produk Baru',
    stock: 1,
    price: 100000,
  };
  productData.push(newProduct);
  filteredProducts = [...productData];
  renderTablePage(currentPage);
});

// Inisialisasi render tabel awal
renderTablePage();

