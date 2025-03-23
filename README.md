## **About the Project**

This project is a **full-stack e-commerce application** designed to provide users with a seamless shopping experience. It includes features such as product browsing, user authentication, profile management, and cart functionality. The application is built using modern technologies like React.js for the frontend, Node.js/Express.js for the backend, and MongoDB for the database.

### **Key Features**
1. **User Authentication and Profile Management**:
   - Secure registration and login system.
   - Users can view and update their personal details (e.g., first name, last name, phone number, address, etc.).
   - Session handling ensures users are redirected to the login page if their session expires or they are not logged in.

2. **Product Catalog**:
   - Detailed product pages with images, descriptions, pricing, and stock availability.
   - Image gallery with thumbnail navigation for viewing multiple product images.
   - Tabs for product descriptions and additional information.

3. **Shopping Cart**:
   - Add products to the cart with customizable quantities.
   - Direct "Buy Now" option to proceed to checkout instantly.
   - Cart management integrated with the backend.

4. **Responsive Design**:
   - Built with a mobile-first approach to ensure compatibility across devices (desktop, tablet, and mobile).
   - Styled using **Tailwind CSS** for a clean and modern UI.

5. **Error Handling**:
   - Robust error handling ensures meaningful feedback for actions like failed login attempts or expired sessions.

## **Technologies Used**

### **Frontend**
- **React.js**: JavaScript library for building the user interface.
- **React Router**: For navigation and dynamic routing.
- **React Redux**: State management for handling global states like authentication and user profiles.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Flowbite React**: Pre-built components for modals, buttons, inputs, etc.
- **React Icons**: For integrating icons (e.g., heart, checkmark, plus/minus).
- **React Toastify**: For displaying notifications and alerts.

### **Backend**
- **Node.js & Express.js**: For building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data, product details, and cart information.
- **Mongoose**: ODM for MongoDB to define schemas and interact with the database.

### **Authentication**
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.

## **How to Install and Run the Project**

### **Prerequisites**
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or connection string for a cloud-hosted database)

### **Steps to Install**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:
   Navigate to both the `frontend` and `backend` directories and install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**:
   Create `.env` files in both the `frontend` and `backend` directories.

   **Frontend `.env`:**
   ```plaintext
   REACT_APP_API_URL=http://localhost:8000
   ```

   **Backend `.env`:**
   ```plaintext
   PORT=8000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   ```

4. **Start the Backend Server**:
   In the `backend` directory, start the server:
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:8000`.

5. **Start the Frontend Application**:
   In the `frontend` directory, start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:5176`.

6. **Access the Application**:
   Open your browser and navigate to `http://localhost:5176` to access the application.

## **Folder Structure**

The project follows a modular structure for better maintainability:

### **Frontend**
- **`components/`**: Reusable UI components (e.g., Navbar, Buttons, Modals).
- **`pages/`**: Main pages like `UserProfilePage`, `ProductItemPage`, etc.
- **`services/`**: API service functions for interacting with the backend (e.g., `fetchUserProfile`, `addToCart`).
- **`utils/`**: Utility functions for error handling and other shared logic.
- **`assets/`**: Static assets like images and styles.

### **Backend**
- **`models/`**: Mongoose schemas for database collections (e.g., `User`, `Product`, `Cart`).
- **`routes/`**: API routes for handling requests (e.g., `/auth`, `/products`, `/cart`).
- **`controllers/`**: Functions to handle business logic for each route.
- **`middleware/`**: Custom middleware for authentication and error handling.

## **API Endpoints**

### **Auth**
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and return a JWT token.
- `PUT /auth/update/:userId`: Update user details.

### **Products**
- `GET /products`: Fetch all products.
- `GET /products/:id`: Fetch a single product by ID.

### **Cart**
- `POST /cart/add`: Add a product to the cart.
- `GET /cart/:userId`: Fetch the cart for a specific user.

## **Future Enhancements**
- **Admin Dashboard**: Add an admin panel for managing products and user accounts.
- **Wishlist Feature**: Allow users to save products to a wishlist.

## **Contributions**
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

## **Acknowledgments**
- Special thanks to the developers of **React**, **Tailwind CSS**, and **Flowbite** for their amazing tools and libraries.
- Inspiration drawn from popular e-commerce platforms like Amazon and Shopify.
