# Backend Integration Guide - Express + MongoDB + React

## Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create `server/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Seed Database (First time only)

```bash
npm run seed
```

Creates admin user: **username:** `admin` **password:** `admin123`

### 4. Start Backend Server

```bash
npm run dev
```

Server runs on http://localhost:5000

### 5. Configure Frontend

Create `.env` file in root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start Frontend

```bash
npm run dev
```

## How It Works

### Data Flow (Admin → Database → User Pages)

1. **Admin Panel**: Make changes (create/edit/delete properties, categories, settings)
2. **Express Backend**: Validates and saves changes to MongoDB
3. **User Pages**: Automatically fetch and display updated data from MongoDB
4. **Real-time**: All changes in admin panel instantly reflect on user pages

### Complete Integration Features

✅ Admin authentication with JWT
✅ Create, edit, delete properties
✅ Manage categories
✅ Update site settings
✅ Handle enquiries
✅ Image uploads (Cloudinary integration)
✅ WhatsApp notifications (optional)

## API Endpoints

### Public Endpoints (No Auth)

- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get single property
- `GET /api/categories` - List all categories
- `GET /api/settings` - Get site settings
- `POST /api/enquiries` - Submit enquiry

### Admin Endpoints (Auth Required)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/enquiries` - List enquiries
- `PUT /api/enquiries/:id` - Update enquiry
- `PUT /api/settings` - Update settings
- `POST /api/upload` - Upload images

## Mongoose Models

```javascript
// AdminUser
{ name, email(unique), passwordHash, role, createdAt, updatedAt }

// Setting (single document)
{ siteTitle, companyDescription, youtubeUrl, instagramUrl, facebookUrl,
  contactEmail, contactPhone, officeAddress, googleMapsEmbedUrl, updatedAt }

// Category
{ name, slug(unique), description, coverImage, createdAt, updatedAt }

// Property
{ category: ObjectId, title, slug(unique), photos: [String], description,
  price: Number, details: { area, location, dimensions, availability: Boolean },
  isFeatured: Boolean, createdAt, updatedAt }

// Enquiry
{ name, phone, email, address, message, property: ObjectId|null,
  status: ['new','contacted','archived'], createdAt }
```

## Security Features

- JWT authentication for admin routes
- Helmet for security headers
- CORS configuration
- Rate limiting on public endpoints
- Input validation with express-validator
- Password hashing with bcrypt

## WhatsApp Integration

Uses provider pattern with mock fallback:

- `providers/twilio.ts`
- `providers/metaWhatsApp.ts`
- `providers/mock.ts` (default for dev)

## Frontend Integration

Update these API URLs in your React apps:

- User frontend: `const API_URL = 'http://localhost:5000/api'`
- Admin frontend: Same base URL with `/admin` endpoints
