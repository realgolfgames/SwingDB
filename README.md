# SwingDB

**SwingDB** is an open-source golf swing analysis platform designed to allow users to upload, analyze, and group their golf swing videos. By leveraging the power of MongoDB Atlas, SwingDB efficiently manages video data, providing insights to improve your golfing performance. SwingDB is a part of the RealGolf.Games ecosystem, enabling a seamless user experience across related applications.

## Features

- **Video Uploads**: Upload golf swing videos (up to 10MB) for analysis.
- **User Management**: Shared user accounts with RealGolf.Games for a unified experience.
- **Video Analysis**: Analyze uploaded videos to identify areas for improvement.
- **Data Management**: Efficiently store and manage videos using MongoDB Atlas with base64 encoding and sharding.

## Technology Stack

- **Frontend**: SvelteKit (for building a responsive user interface)
- **Backend**: SvelteKit (serving as a full-stack framework)
- **Database**: MongoDB Atlas (for data storage and retrieval)
- **Language**: TypeScript (for type safety and enhanced development)

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- MongoDB Atlas account
- An IDE or text editor of your choice

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/swingdb.git
   cd swingdb
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure your MongoDB Atlas connection in the .env file:

   ```env
    SECRET_MONGODB_CONNECTION_STRING=your_mongodb_uri
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

## Usage

- Navigate to the upload page to submit your golf swing videos.
- View the analysis results to gain insights into your swing performance.

## Contributing

Contributions are welcome! If you would like to contribute to SwingDB, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/yourfeature`).
3. Make your changes and commit them.

   ```bash
    git commit -am 'Add new feature'
    ```

4. Push the changes to your branch (`git push origin feature/yourfeature`).
5. Create a new pull request.

## License

SwingDB is licensed under the GNU Affero General Public License (AGPL) v3.0. See the [LICENSE](LICENSE) file for more information.

## Contact

For questions or support, please contact the SwingDB team at [support@realgolf.games](mailto:support@realgolf.games).

## Acknowledgments

Inspired by the need for an efficient way to analyze golf swings.
Thank you to the contributors of the Svelte and MongoDB communities.
