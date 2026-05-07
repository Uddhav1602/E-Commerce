# E-Commerce Platform (ec-clone)

A full-stack, modern e-commerce web application built with Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS v4, and MongoDB.

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Library:** [React 19.2.3](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** React Context API (Cart Context)
- **Language:** TypeScript
- **Icons & Notifications:** `react-hot-toast`, standard React icons (if any)

### Backend
- **Framework:** Next.js Route Handlers (`app/api/*`)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM (Object Data Modeling):** [Mongoose](https://mongoosejs.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Configured for Google Provider & potential Credentials integration)

## 📁 Project Structure

```text
ec-clone/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── admin/          # Admin Dashboard pages
│   │   ├── api/            # Backend API Route Handlers (auth, orders, products)
│   │   ├── auth/           # Authentication pages (login, register)
│   │   ├── cart/           # Shopping cart page
│   │   ├── components/     # Reusable UI components
│   │   ├── home/           # Homepage or landing page segments
│   │   ├── orders/         # User's order history page
│   │   ├── products/       # Product listing and detail pages
│   │   ├── layout.tsx      # Root layout, includes Context Providers and Header
│   │   ├── page.tsx        # Main application entry point
│   │   └── providers.tsx   # Global state & NextAuth Session providers wrapper
│   ├── context/            # React Context API files (e.g., CartContext.tsx)
│   ├── dbConfig/           # MongoDB Connection configuration and caching
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, Authentication Helpers
│   └── models/             # Mongoose schemas (productModel, orderModel, userModel)
├── next.config.ts          # Next.js specific configuration
├── tailwind.config.ts      # Tailwind configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript compilation strictness flags
```

## ⚙️ System Flow

### 1. Database Connection Logic
- The project utilizes a caching mechanism for MongoDB connections to prevent creating excessive connections during Next.js hot-reloads in development via `src/dbConfig/dbConfig.ts`.

### 2. User Authentication (NextAuth.js)
- Authentication flows through the NextAuth backend (`src/app/api/auth/[...nextauth]/route.ts`).
- By default, it's structured to use the **Google Provider** (`clientId` and `clientSecret` configured through env variables) with capabilities of handling session-based validation for protected routes (Admin Panel, Orders, Cart checkout).

### 3. Product Listing & Admin Panels
- **Customers** can browse products loaded dynamically via generic REST-like API calls mapped under `src/app/api/products/route.ts`.
- **Admin Users** have access to the `/admin` routes. This space acts as a CMS (Content Management System) where admins perform CRUD operations (Create, Read, Update, Delete) on inventory using protected APIs interacting directly with the `ProductModel`.

### 4. Shopping Cart & State Management
- Global shopping cart state is managed across the client using **React Context** (`src/context/CartContext.tsx`).
- Variables like item quantity, price calculations, additions, and removals are handled via Context and preserved implicitly locally or synchronized at checkout.
- State hydration and sync leverage `localStorage` to keep the user's cart populated even after physical page reloads.

### 5. Order Management
- Users check out their cart, invoking an API request to `src/app/api/orders/route.ts`. 
- The backend API verifies the authentication tokens, captures the items from the cart, and securely saves an `Order` document within MongoDB, attaching the order to the respective `UserId`.

## 📦 Database Schemas (Models)

The application centers around three primary Mongoose documents defined in `src/models`:

1. **User Model (`userModel.js`)**: Tracks `username`, `email`, `password` (hashed if credentials are used), `isVerified`, and `isAdmin` flags for role-based access control.
2. **Product Model (`productModel.js`)**: (Presumably) Contains product metadata like `title`, `description`, `price`, `images`, `category`, and current stock levels.
3. **Order Model (`orderModel.js`)**: Documents transactional details connecting a user ID with an array of product IDs and final checkout amounts/payment status.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en) (v20+)
- MongoDB Atlas cluster URL or local MongoDB instance.

### 1. Clone & Install
```bash
git clone <repository_url>
cd ec-clone
npm install
```

### 2. Environment Variables
Create a local `.env` or `.env.local` file at the root containing your keys:
```env
# MongoDB Connection String
MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce"

# NextAuth secrets
NEXTAUTH_SECRET="your-secret-key-for-jwt"
NEXTAUTH_URL="http://localhost:3000"

# Google Auth Keys (If Google Auth remains active)
GOOGLE_CLIENT_ID="[Your Google Client ID]"
GOOGLE_CLIENT_SECRET="[Your Google Client Secret]"
```

### 3. Run Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the client and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

## 🛠 Commands
- `npm run dev`: Starts local development testing server
- `npm run build`: Generates optimized production build payload
- `npm run start`: Simulates a Node server to run the deployment build locally
- `npm run lint`: Triggers ESLint strict rule checks for finding architectural code flaws
