# TuneIn App

## What's inside?

This monorepo includes the following packages and apps:

### Apps and Packages

- `web`: react [vite](https://vitejs.dev) ts app
- `@tunein/audio-player`: is a component library used by `@tunein/audio-player-react` package
- `@tunein/audio-player-react`: is a component library with [Tailwind CSS](https://tailwindcss.com/) used by `web` application
- `@tunein/eslint-config`: shared `eslint` configurations
- `@tunein/tailwind-config`: shared `tailwindcss` configurations
- `@tunein/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/audio-player-react

This example is set up to produce compiled styles for `audio-player-react` components into the `dist` directory. The component `.tsx` files are consumed by the Vite apps directly. This was chosen for several reasons:

- Make sharing one `tailwind.config.ts` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Vite Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `audio-player-react` package can use a `audioplayer-` prefix for it's classes if needed.
- Maintain clear package export boundaries.

Another option is to consume `packages/audio-player-react` directly from source without building. If using this option, you will need to update the `tailwind.config.ts` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.ts](packages/tailwind-config/tailwind.config.ts):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/audio-player-react/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `audio-player-react` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
