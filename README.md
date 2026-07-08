# G11.5 Agency Portal

The G11.5 Agency Portal is a secure, web-based intelligence and operations dashboard designed for a fictional paranormal investigation agency. The system serves as a central hub for field agents and administrators to track active cases, document anomalies, coordinate agent dossiers, manage specialized gear inventory, and review incoming paranormal reports from the public, all protected by a classified administrative clearance gate.

## Tech Stack

The application is built using the following modern web technologies:
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with custom animations and design tokens)
- **Database ORM:** Prisma ORM
- **Database:** PostgreSQL (hosted on Neon Serverless Postgres)

## Setup Instructions

Follow these steps to set up and run the application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Loki-Snape/G11.5.git
   cd G11.5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment template and populate it with your database credentials and clearance secrets:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `ADMIN_CODE`: The clearance code for accessing classified administrative routes.
   - `NEXT_PUBLIC_SITE_URL`: (Optional) The site domain URL for routing.

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the portal.

## Project Structure Overview

- **Public Access Routes:**
  - `/`: Main dashboard home showcasing recent alerts, active status summary, and general agency information.
  - `/about`: Agency history and departmental functions.
  - `/apply`: Public portal for recruiting promising field investigators.
  - `/report-case`: Public submission form for reporting anomalies and paranormal occurrences.
  - `/team`: Directory of active G11.5 field agents and staff dossiers.
  - `/inventory`: Log of specialized containment and detection equipment.
  - `/entities` / `/ghostopedia`: Reference database of classified entities, classification classes, and containment protocols.
- **Classified Access Routes:**
  - `/clearance`: Passcode clearance gate to access administrative areas.
  - `/admin`: Five-section administrative control panel for reviewing case submissions, managing agent status, updating equipment logs, and authorizing candidate applications.

## Acknowledgments

Planning assistance from Gemini, design assistance from Claude, debugging assistance from GitHub Copilot and Antigravity.

## Creator

Mridul Jha
