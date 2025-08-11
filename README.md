# UpTask Admin Panel

A clean and modern admin panel built with Vue.js 3 and Tailwind CSS for managing users and categories.

## Features

- 🔐 **Authentication System** - Secure login with demo credentials
- 📊 **Dashboard** - Overview with statistics and recent activity
- 👥 **User Management** - Full CRUD operations for users
- 📂 **Category Management** - Full CRUD operations for categories
- 👤 **Profile Management** - User profile settings and password change
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 🔍 **Search & Filter** - Advanced filtering capabilities
- ✨ **Modal Animations** - Smooth opening and closing animations
- ⚡ **Fast & Lightweight** - No jQuery, vanilla JavaScript

## Tech Stack

- **Frontend Framework**: Vue.js 3
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Icons**: Heroicons (SVG)
- **Build Tool**: Vue CLI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uptask-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

4. Open your browser and navigate to `http://localhost:8080`

### Demo Credentials

- **Email**: admin@uptask.com
- **Password**: admin123

## Project Structure

```
src/
├── assets/
│   └── main.css          # Tailwind CSS and custom styles
├── components/
│   └── Layout.vue        # Main layout with sidebar and header
├── router/
│   └── index.js          # Vue Router configuration
├── views/
│   ├── Login.vue         # Authentication page
│   ├── Dashboard.vue     # Dashboard overview
│   ├── Users.vue         # User management
│   ├── Categories.vue    # Category management
│   └── Profile.vue       # User profile management
├── App.vue               # Root component
└── main.js              # Application entry point
```

## Features Overview

### Authentication
- Login form with email and password
- Remember me functionality
- Form validation and error handling
- Automatic redirect after login

### Dashboard
- Statistics cards showing key metrics
- Recent activity feed
- Quick action buttons
- Responsive grid layout

### User Management
- User listing with search and filters
- Add new users with role assignment
- Edit existing user information
- Delete users with confirmation
- Status and role badges

### Category Management
- Category listing with search and filters
- Add new categories with color selection
- Edit category details
- Delete categories with confirmation

### Profile Management
- Personal information editing
- Password change functionality
- Security settings overview
- Account statistics display
- Type and status badges

### Layout & Navigation
- Collapsible sidebar navigation
- Responsive header with profile dropdown
- Mobile-friendly design
- Smooth transitions and animations

## Customization

### Colors
The primary color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... more shades
        900: '#1e3a8a',
      }
    }
  },
}
```

### Components
All components are built with Tailwind CSS utility classes and can be easily customized by modifying the CSS classes.

## Building for Production

```bash
npm run build
```

This will create a `dist` folder with optimized production files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
