# Portfolio Website

A personal portfolio website built with Next.js, React, and Tailwind CSS. This project features a modern, dark-themed design with glassmorphism effects and an interactive terminal component known as "TiwarminalX".

## Features

### Core Sections
*   **Hero Section**: Introduces the developer with a profile image and social links.
*   **About Me**: A brief bio highlighting professional focus.
*   **Experience**: Lists professional experience and roles.
*   **Skills**: Displays technical skills in a grid layout.
*   **Projects**: Showcases featured projects with descriptions and links.
*   **Contact**: A section for getting in touch (email).

### TiwarminalX (Interactive Terminal)
A custom-built terminal emulator embedded in the website.
*   **Commands**: Supports commands like `help`, `about`, `experience`, `skills`, `projects`, `whois`, and `clear`.
*   **Minigames**: Includes interactive GUI-based games:
    *   **Tic Tac Toe**: Play against an AI opponent (Ujjwal) with a Minimax algorithm for optimal evaluation.
    *   **Guess the Number**: A number guessing game with history tracking.
    *   **Rock Paper Scissors**: A classic game with score tracking.
    *   **Connect Four**: A strategy game against an AI opponent.
*   **Design**: Features a macOS-style window design with glassmorphism effects.

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Library**: React
*   **Styling**: Tailwind CSS v4
*   **Icons**: React Icons (Fa, Si, etc.)

## Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/BEAST6869/Portfolio.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Portfolio
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## Project Structure

*   `app/`: Main application routes and layouts (Next.js App Router).
*   `components/`: Reusable React components (Navbar, Hero, Terminal, Games, etc.).
*   `public/`: Static assets (images, fonts).

## Customization

*   **Content**: Edit components in the `components/` directory to update text and data.
*   **Styling**: Modify `app/globals.css` or use Tailwind utility classes within components.

## License

This project is open for personal use and modification.
