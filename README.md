## How to run

To launch the project, please run:

```bash
docker-compose up
```

from the root directory, and open `http://localhost`

It spins up three containers:

- nestjs backend service that returns properties listing.
- next.js web service that displays the listing.
- nginx service to serve static files (property images mainly).

The API is built with GraphQL and supports basic offset/limit pagination functionality with the use of infinity scroll. It also handles the property status change (`active`/`expired`).

The project is set up as Yarn monorepo with some of the common types reused between Server and Web packages.

The server persists properties list in memory, and is reset if server is restarted.

### Folder/File structure for Web package

- **components**\
  Reusable presentation components.

- **lib**\
  Set up Apollo client.

- **utils**\
  Helper functions.

### Testing

- Unit test for `Property` component and utility functions.
- Simple Cypress e2e test for property listing functionality. To run Cypress test, please run `yarn` first from `e2e-test` directory first and than `yarn cypress:open`.

### CI

- Eslint check with Husky.
- Github Action for unit testing.

### Technologies used

- Next.js
- NestJS
- Typescript
- GraphQL
- Jest, React Testing Library, Cypress (with Testing Library module)
