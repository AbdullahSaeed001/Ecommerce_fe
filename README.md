# eCommerce Store for Sellers

This project is an eCommerce store designed specifically for sellers. Sellers can perform CRUD (Create, Read, Update, Delete) operations on their products. 

## Technologies Used

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14 or later)
- MongoDB (locally or using a cloud provider)

### Installation

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Backend Setup**

   Navigate to the backend directory and install dependencies:

   ```sh
   cd backend
   npm install
   ```

   Start the backend server using `nodemon`:

   ```sh
   nodemon start
   ```

   The backend server should now be running at `http://localhost:5000`.

3. **Frontend Setup**

   Navigate to the frontend directory and install dependencies:

   ```sh
   cd ../frontend
   npm install
   ```

   Start the frontend development server:

   ```sh
   npm start
   ```

   The frontend should now be running at `http://localhost:3000`.

### Configuration

Update the configuration files as needed for your environment, such as database connection strings and API endpoints.

### API Endpoints

- **GET /api/products** - Retrieve a list of products.
- **POST /api/products** - Create a new product.
- **PUT /api/products/:id** - Update a product by ID.
- **DELETE /api/products/:id** - Delete a product by ID.

### Frontend

The frontend is built with React and provides an interface for managing products. Sellers can view, create, update, and delete products.

### Error Handling

If you encounter any issues, check the server logs for detailed error messages and ensure that all services (backend and MongoDB) are running correctly.

### Contributing

Feel free to submit issues or pull requests. For major changes or feature requests, please open an issue to discuss.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
