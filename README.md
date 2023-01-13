# Web Lab 4

## Technologies in use

### Client-side

- `React` - core ui library.
- `Redux Toolkit` - manage state and request data.
- `React Toolbox` - ui components.
- `react-hook-form` - forms validation.
- `Webpack` - bundle assets.

### Server-side

- `WildFly` - application server implements `Jakarta EE`
- `Jakarta Security` - user authentication based on Session Cookie.
- `jax-rs` - provides API endpoints according to REST.
- `EJB/CDI` - provides dependency injection.
- `Hibernate + MetaModel API` - manages mapping entities to a relational representation.
- `PostgreSQL` - stores users and their points.
- `Docker + docker-compose` - configure and run PostgreSQL and WildFly in containers.

## How to build

1. Create `.env` file in the root of the project with the following content:

   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   DB_NAME=main_db_name

   WILDFLY_USER=widfly_username
   WILDFLY_PASS=wildfly_password
   ```

2. Build client sources: `cd client && npm run build`
3. Copy static files (`*.html`, `*.css`, `*.js`) to `webapp` folder.
4. Build the server sources with `gradle build`. I should find output `war` file in `build/libs/`.
5. run `docker-compoe up` to start containers.
