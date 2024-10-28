# harry-shorter

This application is my own personal implementation of a URL shortener, converting long and verbose website links to shorter and manageable ones. Think _Bit.ly_ or _TinyUrl_. The name was supposed to bear what I thought to be a rather humorous similarity to _Harry Potter_. Hope you like it! 😁

#### To-do / Coming soon:

-   [ ] Dockerize and deploy the service in the cloud
-   [ ] Deploy (possibly with _Vercel_\*\*) user-friendly UI implementation with React available on the web for consuming this service
-   [ ] Add a SQL DB (Postgres or MySQL) as backup to the Redis main store to be used for storing cold values/least frequently fetched (LFU) data.
-   [x] Implement QR code generator and add to the frontend as well.

## Usage

For local development purposes:

### Frontend Setup - Start the frontend server

1. Move into frontend directory

```
cd frontend
```

2. Install necessary dependencies

```
npm install
```

3. Start dev server

```
npm run dev
```

### Backend Setup - Start the backend servers

1. Move into backend directory

```
cd backend
```

2. Start the web server my running the `main.go` file with:

```
go run main.go
```

3. Start the Redis server in another terminal window with:

```
redis-server
```

Once all setup is complete, navigate to `http://localhost:5173/` in your browser.
