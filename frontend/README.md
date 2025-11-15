##### ackee-vault
This folder contains the front-end code for Solana Vault Program for keeping lamports in different numbered vaults.

This is a Next.js app containing:

- Tailwind and Shadcn UI for styling
- [Gill](https://gill.site/) Solana SDK
- Shadcn [Wallet UI](https://registry.wallet-ui.dev) components
- A basic Greeter Solana program written in Anchor
- [codama](https://github.com/codama-idl/codama) to generate a JS sdk for the program
- UI components for interacting with the program

## Getting Started

### Installation
```
git clone https://github.com/School-of-Solana/program-anurg-1.git
cd program-anurg-1/frontend/
```

#### Install Dependencies

```shell
npm install
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the app

```shell
npm run dev
```

Build the app

```shell
npm run build
```
