# Real Estate Backend - Express & MongoDB

Backend server for the Real Estate application built with Express.js and MongoDB.

## Quick Start

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Setup Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` and configure your MongoDB URI and other settings.

3. **Seed Database (Create Admin User & Sample Data)**
```bash
npm run seed
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- Sample categories (Residential, Commercial, Land)
- Default settings

4. **Start Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your-secret-key-here

# Optional
PORT=5000
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Settings
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Properties
- `GET /api/properties` - Get all properties (with filters)
  - Query params: `category`, `search`, `available`, `limit`, `skip`
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)

### Enquiries
- `GET /api/enquiries` - Get all enquiries (admin only)
  - Query params: `status`, `limit`, `skip`
- `POST /api/enquiries` - Create enquiry (public)
- `PUT /api/enquiries/:id` - Update enquiry (admin only)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin only)

### Upload
- `POST /api/upload/images` - Upload images (admin only)

### Health Check
- `GET /api/health` - Server health check

## Database Models

### AdminUser
- `username` (String, required, unique)
- `password` (String, required, hashed)
- `email` (String, required, unique)
- `role` (String: admin/superadmin)

### Category
- `name` (String, required, unique)
- `slug` (String, required, unique)
- `description` (String)
- `active` (Boolean, default: true)

### Property
- `title` (String, required)
- `slug` (String, required, unique)
- `description` (String, required)
- `category` (ObjectId, ref: Category)
- `price` (Number, required)
- `area` (Number, required)
- `location` (String, required) - Location name visible in Google Maps
- `photos` (Array of Strings)
- `youtubeUrl` (String)
- `status` (String: available/sold/pending)
- `featured` (Boolean, default: false)

### Enquiry
- `property` (ObjectId, ref: Property)
- `name` (String, required)
- `phone` (String, required)
- `email` (String)
- `address` (String)
- `message` (String)
- `status` (String: new/read/replied/closed)
- `notes` (String)

### Setting
- `key` (String, required, unique)
- `value` (Mixed, required)
- `type` (String: string/number/boolean/object/array)
- `description` (String)

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Get the token by logging in via `/api/auth/login`.

## Frontend Integration

Update your frontend API URL in `src/services/api.ts`:

```typescript
private baseUrl = 'http://localhost:5000/api';
```

## Production Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Run `npm start`
4. Configure CORS in `server.js` for your frontend domain

## Notes

- Location field now accepts user-friendly location names (e.g., "Beverly Hills, CA", "New York, NY") that can be found on Google Maps
- Removed latitude/longitude fields - use location name instead
- File uploads are currently stored locally in `/uploads` directory
- For production, configure Cloudinary for cloud-based image storage
- WhatsApp/Email notifications need to be implemented in enquiry routes
