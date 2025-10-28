# Multi-framework-ticketr

This repository houses multiple frontend implementations of a TicketApp, showcasing different frameworks for comparison and learning purposes.

## Live Url
* React : https://react-ticketr.netlify.app/
* Vue : https://ticketr-vue.netlify.app/
* Twig : https://react-ticketr.netlify.app/

  
## Key Features & Benefits

*   **Multi-Framework Implementations:** Demonstrates the same application built with React, and future Vue 3 and Twig implementations.
*   **Code Comparison:** Allows developers to compare and contrast different framework approaches to solving the same problem.
*   **Learning Resource:** Provides practical examples for learning different frontend frameworks.
*   **Reusable Components (Potentially):** Shared assets are used across implementations, showcasing component reusability.
*   **Dockerized Development:** (Planned) A future enhancement to streamline development environments using Docker.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js:**  JavaScript runtime environment.  (Required for React implementation)
    *   Check installation with: `node -v`
*   **npm or Yarn:**  Package manager for JavaScript. (Required for React implementation)
    *   Check installation with: `npm -v` or `yarn -v`
*   **Docker:** Containerization platform for consistent development environments. (Planned future enhancement)

Specific dependencies for each framework implementation are listed in their respective `package.json` files (e.g., `react-implementation/package.json`).

## Installation & Setup Instructions

### React Implementation

1.  **Navigate to the React directory:**

    ```bash
    cd react-implementation
    ```

2.  **Install Dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev   # or yarn dev
    ```

    This will typically start the application at `http://localhost:5173/` (or a similar address), as configured by Vite.

### Other Implementations (Future)

Instructions for setting up the Vue 3 and Twig implementations will be added as those implementations are completed.

## Usage Examples & API Documentation

### React Implementation

*   **Landing Page:**  The landing page provides an overview of the application.
*   **Authentication (Login/Signup):**  Simulated authentication using `localStorage`. No external API is required for this demo.
*   **Dashboard & Tickets:**  Protected routes accessible after "login".
*   **Ticket CRUD:** Create, Read, Update, and Delete operations are supported via a mock API (using `json-server`).

### Running the Mock API (React Implementation)

For the React implementation's CRUD operations to work, you need to start the mock API:

1. **Navigate to the react-implementation directory:**
   ```bash
   cd react-implementation
   ```

2. **Start the JSON server:**
   ```bash
   npm run server
   ```
   This will start the mock API based on the `db.json` file.
   This starts the API server with json-server at port 3000 (by default).

## Configuration Options

### React Implementation

*   **Environment Variables:**  While this implementation does not heavily rely on environment variables, you can define them in a `.env` file in the `react-implementation` directory. Vite will automatically load them.
*   **`netlify.toml`:** Configuration file used for Netlify deployments. It specifies build commands and publish directory.
*   **`eslint.config.js`:** Configuration file for ESLint, defining linting rules for JavaScript/JSX files.  Adjust this to customize the linting behavior.

## Contributing Guidelines

We welcome contributions! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and descriptive messages.
4.  Submit a pull request to the main branch.

Please follow these guidelines:

*   Adhere to the coding style and conventions used in the project.
*   Write clear and concise commit messages.
*   Include tests for your changes.
*   Document any new features or changes.

## License Information

License not specified. All rights reserved by Gbagamsyle.

## Acknowledgments

*   This project utilizes the following open-source libraries and tools:
    *   React
    *   Vite
    *   json-server
    *   classnames
    *   prop-types
    *   react-router-dom
    *   react-toastify
    *   uuid
    *   ESLint
    *   and their respective dependencies.

