# Product Cache App

Flow: Route -> Middleware -> Controller -> Service -> Database

Run: `npm install && npm start` (data is stored in db.json; reads take 1.5s to simulate a slow DB)

Test (check the `X-Cache` header with `curl -i`):
    curl -i localhost:3000/products        # X-Cache: MISS
    curl -i localhost:3000/products        # X-Cache: HIT
    curl -X POST localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Mouse","price":800}'
    curl -i localhost:3000/products        # MISS again (cache invalidated)
    # wait >60s -> MISS again (TTL expired)
