# 🚀 Deployment Guide: Render (Backend) + Vercel (Frontend)

## 📋 Prerequisites
- GitHub repository: `EugeneMuyale/pevu-social-commerce`
- Render account: https://render.com
- Vercel account: https://vercel.com

## 🔧 Backend Deployment (Render)

### Step 1: Deploy Auth Service
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: `pevu-auth-service`
   - **Root Directory**: `backend/auth-service`
   - **Environment**: `Docker`
   - **Plan**: `Free`
5. Add Environment Variables:
   - `SPRING_PROFILES_ACTIVE`: `production`
   - `DATABASE_URL`: Your database URL
6. Deploy

### Step 2: Deploy Other Services
Repeat for each service:
- `backend/product-service` → `pevu-product-service`
- `backend/media-service` → `pevu-media-service`
- `backend/cart-wishlist-service` → `pevu-cart-wishlist-service`
- `backend/order-service` → `pevu-order-service`
- `backend/user-profile-service` → `pevu-user-profile-service`
- `backend/social-interaction-service` → `pevu-social-interaction-service`
- `backend/chatbot-service` → `pevu-chatbot-service`

### Step 3: Get Service URLs
Each service will get a URL like:
- `https://pevu-auth-service.onrender.com`
- `https://pevu-product-service.onrender.com`
- etc.

## 🎨 Frontend Deployment (Vercel)

### Step 1: Deploy Frontend
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend/pevu-client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
6. Deploy

## 🔗 Update Frontend API URLs

After getting all Render URLs, update frontend API calls to use:
- Auth API: `https://pevu-auth-service.onrender.com`
- Product API: `https://pevu-product-service.onrender.com`
- Media API: `https://pevu-media-service.onrender.com`
- etc.

## ✅ Verification

### Backend Health Checks:
- Auth: `https://pevu-auth-service.onrender.com/actuator/health`
- Product: `https://pevu-product-service.onrender.com/actuator/health`
- etc.

### Frontend:
- Main site: `https://your-vercel-domain.vercel.app`

## 🆘 Troubleshooting

### Common Issues:
1. **Build fails**: Check Dockerfile paths
2. **Database connection**: Verify DATABASE_URL
3. **CORS errors**: Update frontend API URLs
4. **Image loading**: Check Next.js image domains

## 📞 Support
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs 