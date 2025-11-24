const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const expenseChartCanvas = document.getElementById('expenseChart');
const themeToggle = document.getElementById('themeToggle');
const currencySelector = document.getElementById('currencySelector');
const profileModal = document.getElementById('profileModal');
const userNameInput = document.getElementById('userName');
const saveProfileBtn = document.getElementById('saveProfile');
const cancelProfileBtn = document.getElementById('cancelProfile');
const closeModalBtn = document.getElementById('closeModal');
const userProfileImg = document.querySelector('.user-profile img');
const profilePreview = document.getElementById('profilePreview');
const useGeneratedAvatarBtn = document.getElementById('useGeneratedAvatar');
const uploadPictureBtn = document.getElementById('uploadPictureBtn');
const profilePictureInput = document.getElementById('profilePictureInput');

// LocalStorage Transactions
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

let chartInstance = null;
let currentCurrency = localStorage.getItem('currency') || '$';
let userName = localStorage.getItem('userName') || 'User';
let profilePicture = localStorage.getItem('profilePicture') || null;
let useCustomPicture = localStorage.getItem('useCustomPicture') === 'true';

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? '' : 'light');
    localStorage.setItem('theme', newTheme);

    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Update chart colors
    updateChart();
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Currency Change Handler
function changeCurrency() {
    currentCurrency = currencySelector.value;
    localStorage.setItem('currency', currentCurrency);
    updateValues();
    init();
}

// Load saved currency
function loadCurrency() {
    const savedCurrency = localStorage.getItem('currency') || '$';
    currentCurrency = savedCurrency;
    currencySelector.value = savedCurrency;
}

// Profile Name Functions
function openProfileModal() {
    userNameInput.value = userName;
    updateProfilePreview();
    profileModal.classList.add('show');
    userNameInput.focus();

    // Update button states
    if (useCustomPicture) {
        uploadPictureBtn.classList.add('active');
        useGeneratedAvatarBtn.classList.remove('active');
    } else {
        useGeneratedAvatarBtn.classList.add('active');
        uploadPictureBtn.classList.remove('active');
    }
}

function closeProfileModal() {
    profileModal.classList.remove('show');
}

function saveProfileName() {
    const newName = userNameInput.value.trim();
    if (newName) {
        userName = newName;
        localStorage.setItem('userName', userName);
    }

    localStorage.setItem('useCustomPicture', useCustomPicture);
    if (useCustomPicture && profilePicture) {
        localStorage.setItem('profilePicture', profilePicture);
    }

    updateProfileAvatar();
    closeProfileModal();
}

function updateProfilePreview() {
    if (useCustomPicture && profilePicture) {
        profilePreview.src = profilePicture;
    } else {
        const encodedName = encodeURIComponent(userName);
        profilePreview.src = `https://ui-avatars.com/api/?name=${encodedName}&background=3b82f6&color=fff&bold=true&size=100`;
    }
}

function updateProfileAvatar() {
    if (useCustomPicture && profilePicture) {
        userProfileImg.src = profilePicture;
    } else {
        const encodedName = encodeURIComponent(userName);
        userProfileImg.src = `https://ui-avatars.com/api/?name=${encodedName}&background=3b82f6&color=fff&bold=true`;
    }
}

function handleUseGeneratedAvatar() {
    useCustomPicture = false;
    useGeneratedAvatarBtn.classList.add('active');
    uploadPictureBtn.classList.remove('active');
    updateProfilePreview();
}

function handleUploadPicture() {
    profilePictureInput.click();
}

function handlePictureUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profilePicture = event.target.result;
            useCustomPicture = true;
            uploadPictureBtn.classList.add('active');
            useGeneratedAvatarBtn.classList.remove('active');
            updateProfilePreview();
        };
        reader.readAsDataURL(file);
    }
}

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        updateChart();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${currentCurrency}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fa-solid fa-xmark"></i></button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `${currentCurrency}${total}`;
    money_plus.innerText = `+${currentCurrency}${income}`;
    money_minus.innerText = `-${currentCurrency}${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
    updateChart();
}

// Update Chart.js
function updateChart() {
    const amounts = transactions.map(transaction => transaction.amount);

    // Calculate categories (Positive vs Negative for simplicity in this demo, 
    // but could be categorized by tag if we added that feature)
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    );

    if (chartInstance) {
        chartInstance.destroy();
    }

    // Get theme-aware colors
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const incomeColor = isLight ? '#059669' : '#10b981';
    const expenseColor = isLight ? '#dc2626' : '#ef4444';
    const legendColor = isLight ? '#475569' : '#94a3b8';

    chartInstance = new Chart(expenseChartCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [income, expense],
                backgroundColor: [
                    incomeColor,
                    expenseColor
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: legendColor,
                        font: {
                            family: "'Outfit', sans-serif"
                        }
                    }
                }
            }
        }
    });
}

// Event Listeners
form.addEventListener('submit', addTransaction);
themeToggle.addEventListener('click', toggleTheme);
currencySelector.addEventListener('change', changeCurrency);

// Profile Modal Event Listeners
userProfileImg.addEventListener('click', openProfileModal);
saveProfileBtn.addEventListener('click', saveProfileName);
cancelProfileBtn.addEventListener('click', closeProfileModal);
closeModalBtn.addEventListener('click', closeProfileModal);
useGeneratedAvatarBtn.addEventListener('click', handleUseGeneratedAvatar);
uploadPictureBtn.addEventListener('click', handleUploadPicture);
profilePictureInput.addEventListener('change', handlePictureUpload);

// Close modal when clicking outside
profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        closeProfileModal();
    }
});

// Save on Enter key
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveProfileName();
    }
});

// Update preview when name changes
userNameInput.addEventListener('input', () => {
    if (!useCustomPicture) {
        updateProfilePreview();
    }
});

// Initialize
loadTheme();
loadCurrency();
updateProfileAvatar();
init();

