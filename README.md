# gRPC Demo with Spring Framework

This project demonstrates the integration of gRPC within a Spring Framework environment. The system comprises a RESTful API server developed using Spring Boot, which communicates with a Next.js frontend. Data management is handled through a MySQL database, focusing on user account information. Additionally, the server facilitates communication with another gRPC server, implemented in Java, for processing OpenAI API requests.

## Tech Stack

[![Tech Stack](https://skillicons.dev/icons?i=spring,react,tailwind,docker,mysql,nextjs,&perline=7)](https://skills.thijs.gg)

- **Spring Boot**: For building the RESTful API server.
- **Spring Security**: Ensures secure communication and authentication.
- **Spring AI**: For utilizing OpenAPI API.
- **Next.js**: Powers the frontend interface.
- **React**: Used in conjunction with Next.js for frontend development.
- **Tailwind CSS**: Facilitates rapid UI development and styling.
- **gRPC**: Enables efficient, high-performance RPC communication.
- **MySQL**: Provides the database backend for managing user account data.

## Usage

### Prerequisites
- Java Development Kit (JDK)
- Node.js
- Docker

### Installation
1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. Install protocol buffter jar into the local maven repository
   ```bash
   cd grpc-lib
   ./mvnw clean install
   ```
3. Run gRPC server

    Run the server with your IDE or something like that.
4. Run Rest API server

    Run the server with your IDE with an environment variable, OPENAI_API_KEY. Set your API key that you made on OPEN AI platform.
4. Run frontend Next.js server
    ```bash
    cd grpc-frontend
    npm run dev 
    ```