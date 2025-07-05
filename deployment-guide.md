# 🚀 Free Deployment Guide for Social Commerce Platform

## 📋 Prerequisites
- GitHub account (free)
- Vercel account (free)
- Railway account (free)

## 🎯 Deployment Strategy
**Frontend**: Vercel (Free)  
**Backend**: Railway (Free tier)  
**Database**: Railway PostgreSQL (Free tier)  
**Storage**: Railway MinIO (Free tier)

## 📦 Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 1.2 Update Environment Variables
Copy `frontend/pevu-client/env.production.example` to `frontend/pevu-client/.env.production` and update URLs after deployment.

## 🌐 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project

### 2.2 Deploy Each Service
For each backend service (auth, product, media, order, cart-wishlist, user-profile, social-interaction):

1. **Add Service** → **Deploy from GitHub repo**
2. **Select your repository**
3. **Set root directory** to `backend/[service-name]`
4. **Add environment variables**:
   ```
   SPRING_DATASOURCE_URL=jdbc:postgresql://[RAILWAY_POSTGRES_URL]
   SPRING_DATASOURCE_USERNAME=[POSTGRES_USER]
   SPRING_DATASOURCE_PASSWORD=[POSTGRES_PASSWORD]
   ```

### 2.3 Deploy Database
1. **Add Service** → **Database** → **PostgreSQL**
2. **Copy connection details** to all backend services

### 2.4 Deploy Storage
1. **Add Service** → **Database** → **MinIO**
2. **Add environment variables** to media-service:
   ```
   MINIO_URL=http://[MINIO_SERVICE_URL]
   MINIO_ACCESS_KEY=[MINIO_ACCESS_KEY]
   MINIO_SECRET_KEY=[MINIO_SECRET_KEY]
   ```

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. **Import Project** → **Import Git Repository**

### 3.2 Configure Frontend
1. **Framework Preset**: Next.js
2. **Root Directory**: `frontend/pevu-client`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### 3.3 Set Environment Variables
In Vercel dashboard → **Settings** → **Environment Variables**:
```
NEXT_PUBLIC_API_URL=https://[YOUR_RAILWAY_APP].railway.app/api
NEXT_PUBLIC_MEDIA_URL=https://[YOUR_RAILWAY_APP].railway.app/api/media
```

## 🔧 Step 4: Update API Configuration

### 4.1 Update Frontend API Base URL
Update `frontend/pevu-client/api/axios.ts`:
```typescript
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';
```

### 4.2 Update CORS Settings
Add CORS configuration to all backend services:
```java
@CrossOrigin(origins = {"https://your-vercel-app.vercel.app"})
```

## 🌍 Step 5: Custom Domain (Optional)

### 5.1 Free Domain Options
- **Freenom**: Free .tk, .ml, .ga domains
- **GitHub Pages**: username.github.io
- **Vercel**: your-app.vercel.app

### 5.2 Configure Domain
1. **Vercel**: Settings → Domains → Add domain
2. **Railway**: Settings → Domains → Add custom domain

## 💰 Cost Breakdown
- **Vercel**: $0/month (free tier)
- **Railway**: $0/month (free tier, 500 hours)
- **Domain**: $0-10/year (optional)
- **Total**: $0-10/year

## 🚀 Step 6: Deploy!

1. **Push changes** to GitHub
2. **Railway** will auto-deploy backend services
3. **Vercel** will auto-deploy frontend
4. **Test** your live application!

## 🔍 Monitoring
- **Vercel**: Dashboard shows frontend performance
- **Railway**: Dashboard shows backend logs and metrics
- **GitHub**: Version control and CI/CD

## 🛠️ Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS origins in backend
2. **Database connection**: Check Railway PostgreSQL URL
3. **Media uploads**: Verify MinIO configuration
4. **Environment variables**: Ensure all are set in Vercel/Railway

### Support:
- **Vercel**: Excellent documentation and support
- **Railway**: Good Discord community
- **GitHub**: Extensive community resources

## 🎉 Success!
Your social commerce platform is now live for free! 🚀 