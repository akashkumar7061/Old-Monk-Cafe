# OLD MONK CAFE — Backend API

Production-ready REST API for the OLD MONK CAFE website (Darbhanga, Bihar) — powers the admin dashboard, public menu, table reservations, online ordering, reviews, gallery, contact inquiries, and analytics.

## Tech Stack

Node.js · Express.js · MongoDB Atlas · Mongoose · JWT · Bcrypt · Cloudinary · Nodemailer · Razorpay · Multer · express-validator · Winston

## Folder Structure

```
backend/
├── config/          # DB, Cloudinary, Razorpay client setup
├── controllers/      # Request handlers (business logic)
├── middleware/        # auth, error handling, upload, validation, rate limiting
├── models/            # Mongoose schemas
├── routes/            # Express routers, one per resource
├── services/          # Email, WhatsApp, payment, invoice, analytics logic
├── utils/             # ApiError, ApiResponse, JWT helpers, constants, logger
├── validators/        # express-validator chains per resource
├── scripts/           # One-off scripts (admin seeding)
├── uploads/           # (unused in prod — Cloudinary handles files; kept for local fallback)
├── app.js             # Express app & middleware pipeline
├── server.js          # Entry point — DB connection + HTTP server + graceful shutdown
├── Dockerfile
├── docker-compose.yml
└── ecosystem.config.js  # PM2 cluster config
```

## Getting Started

```bash
cd backend
npm install
cp .env.example .env   # fill in your real credentials
npm run seed:admin     # creates the first admin account from .env values
npm run dev             # nodemon, http://localhost:5000
```

Production:

```bash
npm start                       # plain node
# or
pm2 start ecosystem.config.js   # clustered, auto-restart
# or
docker compose up -d --build    # containerized, with optional local MongoDB
```

### Required Environment Variables

See `.env.example` for the full list. At minimum you need: `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, Cloudinary keys, SMTP credentials, and Razorpay keys. WhatsApp notifications additionally need `npm install twilio` plus the `TWILIO_*` vars (the app boots fine without them — WhatsApp sends are just skipped with a warning).

## Authentication Model

A single `User` model handles **customers, staff, and admins** via a `role` field (`customer` / `staff` / `admin`) rather than separate collections — this keeps auth logic, password reset, and profile management in one place while `authorize(...roles)` middleware still gives you per-route, role-based access control. There is intentionally **no public "register as admin" endpoint** — the first admin is created via `npm run seed:admin`, and that admin can promote other users via `PATCH /api/v1/users/:id`.

JWT is returned both in the JSON body (for mobile/SPA `Authorization: Bearer` usage) and as an `httpOnly` cookie (safer default for a browser-based admin dashboard).

## API Reference

Base URL: `/api/v1`

All responses follow this shape:
```json
{ "success": true, "message": "...", "data": { }, "meta": { "total": 0, "page": 1, "pages": 1 } }
```

### Auth — `/auth`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Customer signup |
| POST | `/login` | Public | Login (any role) |
| POST | `/logout` | Private | Clear auth cookie |
| GET | `/me` | Private | Get current user |
| POST | `/forgot-password` | Public | Email password reset link |
| PATCH | `/reset-password/:token` | Public | Set new password from email link |
| PATCH | `/update-password` | Private | Change password while logged in |

### Users — `/users`
| Method | Route | Access | Description |
|---|---|---|---|
| PATCH | `/me` | Private | Update own profile/addresses |
| PATCH | `/me/avatar` | Private | Upload avatar |
| GET | `/` | Admin | List/search users |
| GET | `/:id` | Admin | Get a user |
| PATCH | `/:id` | Admin | Change role / activate / deactivate |
| DELETE | `/:id` | Admin | Delete a user |

### Categories — `/categories`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/` | Public | List active categories |
| POST | `/` | Admin/Staff | Create category (+ image) |
| PATCH | `/:id` | Admin/Staff | Update category |
| DELETE | `/:id` | Admin | Delete (blocked if items reference it) |

### Menu — `/menu`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/?category=&search=&isVeg=&featured=&minPrice=&maxPrice=&page=&limit=` | Public | Filter/search/paginate menu |
| GET | `/:idOrSlug` | Public | Single item by ID or slug |
| POST | `/` | Admin/Staff | Create item (+ image) |
| PATCH | `/:id` | Admin/Staff | Update item (+ optional new image) |
| PATCH | `/:id/toggle-featured` | Admin/Staff | Quick featured toggle |
| DELETE | `/:id` | Admin | Delete item |

### Reservations — `/reservations`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/availability?date=&timeSlot=` | Public | Check slot capacity |
| POST | `/` | Public | Book a table (guest or logged-in) |
| GET | `/my` | Private | My reservation history |
| PATCH | `/:id/cancel` | Private | Cancel my own reservation |
| GET | `/:id` | Private | View one (owner or admin) |
| GET | `/?status=&date=&page=&limit=` | Admin/Staff | List all reservations |
| PATCH | `/:id/status` | Admin/Staff | Approve/reject + assign table |

### Orders — `/orders`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/` | Public | Place order (COD instant-confirm, or Razorpay → pending) |
| POST | `/verify-payment` | Public | Verify Razorpay signature, confirm order |
| GET | `/my` | Private | My order history |
| GET | `/:id` | Private | Track an order |
| GET | `/:id/invoice` | Private | Get/generate PDF invoice URL |
| GET | `/?status=&orderType=&from=&to=&page=&limit=` | Admin/Staff | List all orders |
| PATCH | `/:id/status` | Admin/Staff | Update status (triggers email/WhatsApp) |

### Reviews — `/reviews`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/?menuItem=&page=&limit=` | Public | Approved reviews only |
| POST | `/` | Public | Submit review (guest or logged-in, + up to 4 images) |
| GET | `/admin/all?isApproved=&page=&limit=` | Admin/Staff | All reviews for moderation |
| PATCH | `/:id/moderate` | Admin/Staff | Approve/reject |
| PATCH | `/:id/respond` | Admin/Staff | Admin reply |
| DELETE | `/:id` | Admin | Delete review |

### Gallery — `/gallery`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/?category=` | Public | Active images, filterable |
| POST | `/` | Admin/Staff | Upload up to 10 images |
| PATCH | `/:id` | Admin/Staff | Update caption/category/order |
| DELETE | `/:id` | Admin | Delete (removes from Cloudinary) |

### Contact — `/contact`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/` | Public | Submit inquiry |
| GET | `/?status=&page=&limit=` | Admin/Staff | List inquiries |
| PATCH | `/:id/respond` | Admin/Staff | Reply + mark resolved |
| PATCH | `/:id/status` | Admin/Staff | Update status |

### Analytics — `/analytics` (all Admin/Staff)
| Method | Route | Description |
|---|---|---|
| GET | `/summary` | Today's orders, revenue, customers, pending reservations |
| GET | `/revenue-trend?days=14` | Daily revenue/orders for line chart |
| GET | `/popular-items?limit=10` | Best-selling dishes by quantity |
| GET | `/reservations` | Reservation status breakdown |
| GET | `/orders-breakdown` | Order status breakdown |

## Online Ordering & Payments

1. Client sends `{ items: [{menuItem, quantity}], orderType, paymentMethod, deliveryAddress?, guestDetails? }` to `POST /orders`.
2. Server **recomputes prices from the live MenuItem collection** — client-sent prices are never trusted.
3. `paymentMethod: "cod"` → order is confirmed immediately.
4. `paymentMethod: "razorpay"` → server creates a Razorpay order and returns `{ order, razorpayOrder, razorpayKeyId }`. Frontend opens Razorpay Checkout with that data, then POSTs the returned `razorpay_order_id/payment_id/signature` to `/orders/verify-payment`, which HMAC-verifies the signature server-side before confirming.

## Reservation Capacity

`MAX_PER_SLOT` in `reservationController.js` (default `8`) caps how many pending/confirmed reservations can share one date+timeSlot combination. Replace with a real table-map model if you need per-table assignment logic later.

## Security Measures Included

- `helmet` for secure HTTP headers
- `express-rate-limit` (global + a stricter limiter on auth routes)
- `express-mongo-sanitize` + `xss-clean` + `hpp` against injection/XSS/param pollution
- Passwords hashed with bcrypt (cost factor 12), never returned in API responses
- JWT in httpOnly cookie + Bearer header support
- Server-side price recalculation on every order (never trusts client totals)
- Centralized `ApiError` / global error handler — no stack traces leak in production

## Suggested Next Steps / Real-World Optimizations

- **Caching**: add Redis for `/menu` and `/categories` (high-read, low-write) to cut DB load during traffic spikes.
- **Image pipeline**: Cloudinary `transformation` params are already set to `auto` quality/format — also add responsive `srcset` breakpoints on the frontend.
- **Multer v2**: the project currently pins `multer@1.4.5-lts.1` for stability; migrate to `multer@2.x` once you've tested your upload routes, since 1.x has known CVEs.
- **xss-clean**: this package is unmaintained; for a hardened production deploy, replace with manual sanitization via `validator.escape()` in your validators or a maintained fork.
- **Webhook safety net**: wire up a Razorpay webhook endpoint (signature verified via `verifyWebhookSignature` in `paymentService.js`, already included) as a fallback in case the client never calls `/verify-payment` (e.g. browser closed mid-checkout).
- **Queueing**: move email/WhatsApp/invoice generation to a BullMQ + Redis job queue once order volume grows, instead of fire-and-forget promises.
- **Refresh tokens**: `generateRefreshToken` is scaffolded in `utils/generateToken.js` but not yet wired into a `/refresh` route — add one for longer-lived mobile sessions without forcing frequent re-logins.
- **Testing**: add Jest + Supertest with `mongodb-memory-server` for integration tests on the checkout and reservation flows specifically, since those carry the most business risk.
- **Observability**: ship Winston logs to a service (Datadog/Logtail) and add a `/metrics` endpoint for Prometheus once you're past MVP.

## License

Proprietary — built for OLD MONK CAFE, Darbhanga.
