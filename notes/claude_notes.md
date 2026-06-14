# Durak — Project Reference

## Stack
| Layer | Technology |
|-------|-----------|
| Frontend UI | React |
| Game Rendering | Phaser.js |
| Build Tool | Vite |
| Backend | Node.js + Express |
| Realtime | Socket.IO |
| Database | PostgreSQL |
| Hosting (frontend) | Vercel |
| Hosting (backend) | Railway |

---

## Phases

### Phase 1 — Foundations (3–5 weeks)
- Modern JS: ES6+, async/await, modules, destructuring
- Node.js: npm, event loop, running scripts
- Express: routes, middleware, JSON request/response
- **Milestone:** `/card` endpoint returning a random card, tested with Postman

### Phase 2 — Frontend & Game Rendering (4–6 weeks)
- React: components, hooks, state
- Phaser.js: scenes, sprites, input, animations
- Connecting React + Phaser: React for UI/menus, Phaser for game canvas
- **Milestone:** Single-player Durak hand rendered in Phaser inside a React app

### Phase 3 — Multiplayer & Accounts (5–7 weeks)
- Socket.IO: rooms, events, broadcasting game state
- PostgreSQL + Prisma: schema, queries, migrations
- Auth: registration, bcrypt passwords, JWT sessions
- **Milestone:** Two browser tabs playing real-time Durak with login

### Phase 4 — Deploy & Polish (2–4 weeks)
- Deploy frontend to Vercel, backend to Railway
- HTTPS, environment variables, secrets management
- Lobby system: room creation, shareable links
- **Milestone:** Live URL you can send to friends

---

## HTTP vs Socket.IO split

| HTTP (Express) | Socket.IO |
|---------------|-----------|
| POST /auth/register | attack |
| POST /auth/login | defend |
| POST /game/room | pile_on |
| GET /game/room/:code | pass |
| GET /game/history | state_update ← server push |
| | game_over ← server push |

---

## In-memory vs Database split

| In-Memory | Database |
|-----------|----------|
| Active game state | Users |
| Cards on table | Game history |
| Current hands | Room records |
| Whose turn | Final results |
| Socket connections | |
| Race windows (подкидывание) | |

---

## Folder Structure

```
durak/
├── backend/
│   ├── src/
│   │   ├── index.js              ← entry point, starts server + socket
│   │   ├── app.js                ← Express setup, middleware, routes
│   │   ├── socket.js             ← Socket.IO event handlers
│   │   │
│   │   ├── config/
│   │   │   └── config.js         ← env variables, constants
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js           ← POST /auth/register, POST /auth/login
│   │   │   └── game.js           ← POST /game/room, GET /game/room/:code
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── gameController.js
│   │   │
│   │   ├── game/                 ← pure functions, no Express or DB
│   │   │   ├── deck.js           ← buildDeck, shuffle
│   │   │   ├── gameState.js      ← newGameState, initial state shape
│   │   │   ├── actions.js        ← applyAction, handleAttack, handleDefend
│   │   │   └── rules.js          ← canAttack, canDefend, canPileOn, isDurak
│   │   │
│   │   ├── middleware/
│   │   │   ├── requireLogin.js   ← JWT check, attaches req.user
│   │   │   └── errorHandler.js   ← global error handler
│   │   │
│   │   └── db/
│   │       ├── db.js             ← database connection
│   │       ├── roomQueries.js    ← insertRoom, findRoom, updateRoom, deleteRoom
│   │       └── userQueries.js    ← createUser, findUserByUsername
│   │
│   ├── .env                      ← PORT, DATABASE_URL, JWT_SECRET
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx              ← React entry point
│   │   ├── App.jsx               ← root component, routing
│   │   │
│   │   ├── scenes/               ← Phaser scenes
│   │   │   ├── GameScene.js
│   │   │   └── PreloadScene.js
│   │   │
│   │   ├── components/           ← React UI components
│   │   │   ├── Lobby.jsx
│   │   │   ├── Login.jsx
│   │   │   └── GameCanvas.jsx    ← mounts Phaser inside React
│   │   │
│   │   └── socket.js             ← Socket.IO client setup
│   │
│   ├── public/                   ← static assets
│   │   └── assets/
│   │       ├── cards.png
│   │       └── cards.json
│   │
│   ├── .env                      ← VITE_BACKEND_URL
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── notes/                        ← your reference docs
│   └── durak-reference.md
│
└── .gitignore
```
