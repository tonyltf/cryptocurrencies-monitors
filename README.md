# Cryptocurrencies monitors

## Apps and Packages

- `api`: a [Nest](https://github.com/nestjs/nest) app
- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Build

To build all apps and packages, run the following command:

```shell
docker-compose build
```

## Run

To run all apps and packages, run the following command:

```shell
docker-compose up -d
```

## Design

- Issue:
  - Cryptonator API is being blocked by Cloudflare browser checking so the application cannot directly fetch from that source
  - Solution: A flexable implementation which allow another provider
  - Enhancement: Since another API may not provide `Change` data require, a possible solution is to implement a data storage and calculate the `Change` data ourselves
- Caching:
  - Use Redis as the Caching service to minimize the number of calls to third party API
  - Use TTL 30 seconds which matches the refreshing time of third party API
  - Need to improve the handling if redis service is down
- Scalability:
  - Currently it is using Docker Compose to run apps, ideally using k8s can minimize changes to apps/containers but provide the scalability, i.e. multiple backend services can be run
- Data storage:
  - Currently the application does not use any database service as it is depending on pass throught data

## Timebox

The implementation started at 23 Feb and completed on 26 Feb midnight. Average hours worked per day is 2 - 3. Some blockers faced;

- Cryptonator API is not a reliable source in my case, need to research another API source
- This is the first time I used [Turbo](https://turbo.build/) and [Next.js](https://nextjs.org/). Blocked by creating an optimized build with Docker
