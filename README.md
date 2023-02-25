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

- Cryptonator API is being blocked by Cloudflare browser checking
  - Solution: A flexable implementation which allow another provider
- Caching:
  - Use Redis as the Caching service to minimize the number of calls to third party API
  - Use TTL 30 seconds which matches the refreshing time of third party API
  - Need to improve the handling if redis service is down
- Scalability:
  - Currently it is using Docker Compose to run apps, ideally using k8s can minimize changes to apps/containers but provide the scalability, i.e. multiple backend services can be run
  - Frontend app can be improved by hosting on CDN such as AWS S3 and CloudFront
