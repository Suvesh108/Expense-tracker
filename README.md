# 💰 Modern Expense Tracker

A beautiful, feature-rich expense tracking application built with vanilla JavaScript, featuring a modern glassmorphism design, dark/light themes, and comprehensive financial management tools.

![Expense Tracker](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** - Translucent cards with blur effects
- **Bluish Dark Theme** - Professional color scheme with animated background orbs
- **Light/Dark Mode Toggle** - Seamless theme switching with persistent preferences
- **Smooth Animations** - Hover effects, slide-ins, and transitions throughout
- **Fully Responsive** - Perfect layout on desktop, tablet, and mobile devices

### 💱 **Multi-Currency Support**
Choose from 10 global currencies:
- 💵 USD (US Dollar)
- 💶 EUR (Euro)
- 💷 GBP (British Pound)
- 💴 JPY (Japanese Yen)
- 💸 INR (Indian Rupee)
- ₽ RUB (Russian Ruble)
- R$ BRL (Brazilian Real)
- A$ AUD (Australian Dollar)
- C$ CAD (Canadian Dollar)
- ₩ KRW (Korean Won)

### 👤 **Profile Customization**
- **Custom Name** - Personalize your profile
- **Avatar Upload** - Use your own profile picture
- **Generated Avatars** - Automatic name-based avatars as fallback
- **Live Preview** - See changes in real-time

### 📊 **Financial Management**
- **Add Transactions** - Track income and expenses
- **Real-time Calculations** - Automatic balance, income, and expense totals
- **Visual Analytics** - Interactive pie chart showing income vs expenses
- **Transaction History** - Complete list with color-coded indicators
- **Delete Functionality** - Easy transaction management
- **Data Persistence** - All data saved to localStorage

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. **Clone or Download** the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8080
     
     # Then visit http://localhost:8080
     ```

## 📖 Usage Guide

### Getting Started

1. **Open the App** - Launch `index.html` in your browser

2. **Customize Your Profile**
   - Click on your profile picture (top-right corner)
   - Enter your name
   - Upload a custom picture or use the generated avatar
   - Click "Save"

3. **Select Your Currency**
   - Click the currency dropdown in the header
   - Choose your preferred currency
   - All amounts update instantly

4. **Toggle Theme** (Optional)
   - Click the sun/moon icon to switch between light and dark modes

### Managing Transactions

#### Adding Transactions
1. Locate the "Add New Transaction" card
2. Enter a description (e.g., "Salary", "Groceries")
3. Enter the amount:
   - **Positive numbers** for income (e.g., `5000`)
   - **Negative numbers** for expenses (e.g., `-150`)
4. Click "Add Transaction"

#### Viewing Analytics
- **Total Balance**: Displayed prominently in the top-left card
- **Income/Expense Breakdown**: View separate totals for income and expenses
- **Pie Chart**: Visual representation of your income vs expenses ratio

#### Managing History
- **View All Transactions**: Scrollable list in the bottom-right card
- **Color Coding**: Green border for income, red for expenses
- **Delete Transactions**: Hover over any item and click the ❌ button

## 🏗️ Project Structure

```
expense-tracker/
├── index.html          # Main HTML structure
├── style.css           # Styling and themes
├── app.js              # Application logic
└── README.md           # This file
```

### Key Files

- **`index.html`** - Application structure and modal dialogs
- **`style.css`** - Glassmorphism design, themes, and responsive layout
- **`app.js`** - Transaction management, chart rendering, and localStorage

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)** - Vanilla JS for functionality
- **Chart.js** - Data visualization (via CDN)
- **Font Awesome** - Icons (via CDN)
- **Google Fonts** - Outfit font family

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:

- Transactions list
- Selected currency
- Theme preference (light/dark)
- User profile name
- Profile picture (base64 encoded)
- Avatar mode preference

**Note**: Data persists across sessions but is browser-specific. Clearing browser data will remove stored information.

## 🎯 Layout Guide

### Desktop Layout (>900px)
```
┌─────────────────┬─────────────────┐
│  Total Balance  │  Expense Chart  │
├─────────────────┼─────────────────┤
│ Add Transaction │    History      │
└─────────────────┴─────────────────┘
```

### Mobile Layout (<900px)
```
┌─────────────────┐
│  Total Balance  │
├─────────────────┤
│  Expense Chart  │
├─────────────────┤
│ Add Transaction │
├─────────────────┤
│    History      │
└─────────────────┘
```

## 🎨 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --bg-color: #0a0e27;           /* Main background */
    --accent-color: #3b82f6;       /* Primary accent */
    --income-color: #10b981;       /* Income indicator */
    --expense-color: #ef4444;      /* Expense indicator */
}
```

### Adding More Currencies

Edit the currency selector in `index.html`:

```html
<option value="¢">¢ YOUR_CURRENCY</option>
```

## 🔮 Future Enhancements

Potential features for future versions:
- Export data to CSV/PDF
- Category-based expense tracking
- Budget goals and alerts
- Monthly/yearly reports
- Multi-device sync
- Recurring transactions
- Receipt scanning

## 🐛 Troubleshooting

**Issue**: Data not persisting
- **Solution**: Check if localStorage is enabled in your browser settings

**Issue**: Chart not displaying
- **Solution**: Ensure you have an active internet connection (Chart.js loads from CDN)

**Issue**: Profile picture not uploading
- **Solution**: Use images under 5MB for best performance

## 📄 License

This project is licensed under the MIT License - feel free to use and modify as needed.

## 👨‍💻 Author

Created with ❤️ by Suvesh

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Beautiful charts
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography

---

**Enjoy tracking your expenses!** 💸✨

For questions or feedback, feel free to reach out or open an issue.
