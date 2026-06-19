# Deployment Guide

Complete guide for deploying Project Management System to production.

## Pre-Deployment Checklist

- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL/TLS certificates ready
- [ ] Security review completed
- [ ] Performance tested
- [ ] Documentation updated

## Backend Deployment

### Option 1: Deploy to Heroku

#### Prerequisites
- Heroku CLI installed
- Heroku account

#### Steps

1. Create Heroku app:
```bash
cd backend
heroku create project-management-api
```

2. Set environment variables:
```bash
heroku config:set DB_HOST=your_db_host
heroku config:set DB_USER=your_db_user
heroku config:set DB_PASSWORD=your_db_password
heroku config:set DB_NAME=your_db_name
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
```

3. Deploy:
```bash
git push heroku main
```

### Option 2: Deploy to AWS EC2

#### Prerequisites
- AWS account
- EC2 instance running Ubuntu

#### Setup Steps

1. Connect to instance:
```bash
ssh -i "your-key.pem" ubuntu@your-instance-public-ip
```

2. Install Node.js:
```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Install MySQL client:
```bash
sudo apt-get install -y mysql-client
```

4. Clone repository:
```bash
git clone https://github.com/your-repo.git
cd project-management/backend
```

5. Install dependencies:
```bash
npm install
```

6. Create .env file:
```bash
cp .env.example .env
# Edit .env with production values
nano .env
```

7. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name "project-mgmt-api"
pm2 startup
pm2 save
```

8. Setup Nginx reverse proxy:
```bash
sudo apt-get install -y nginx

# Edit /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
```

Add configuration:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Setup SSL with Let's Encrypt:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

10. Enable firewall:
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Option 3: Deploy with Docker

#### Prerequisites
- Docker installed
- Docker Hub account

#### Steps

1. Create Dockerfile in backend:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

2. Create .dockerignore:
```
node_modules
.git
.gitignore
README.md
.env
```

3. Build image:
```bash
docker build -t project-management-api:1.0.0 .
```

4. Run container:
```bash
docker run -d \
  -e DB_HOST=your_db_host \
  -e DB_USER=your_db_user \
  -e DB_PASSWORD=your_db_password \
  -e DB_NAME=your_db_name \
  -e JWT_SECRET=your_secret \
  -p 5000:5000 \
  --name project-mgmt-api \
  project-management-api:1.0.0
```

5. Push to Docker Hub:
```bash
docker tag project-management-api:1.0.0 your-username/project-management-api:1.0.0
docker push your-username/project-management-api:1.0.0
```

## Frontend Deployment

### Option 1: Deploy to Vercel

#### Prerequisites
- Vercel account
- GitHub repository

#### Steps

1. Sign in to Vercel
2. Import project from GitHub
3. Set environment variables:
   - `REACT_APP_API_URL=https://your-api-domain.com/api`
4. Deploy

### Option 2: Deploy to Netlify

#### Steps

1. Build application:
```bash
cd frontend
npm run build
```

2. Deploy using Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

3. Set environment variables:
   - In Netlify dashboard, go to Site settings
   - Add `REACT_APP_API_URL`

### Option 3: Deploy to AWS S3 + CloudFront

#### Steps

1. Build application:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

3. Upload files:
```bash
aws s3 sync build/ s3://your-bucket-name
```

4. Create CloudFront distribution:
   - Point to S3 bucket
   - Configure SSL certificate
   - Set cache policies

5. Update DNS records to point to CloudFront

### Option 4: Deploy to DigitalOcean App Platform

#### Prerequisites
- DigitalOcean account
- GitHub repository

#### Steps

1. Go to DigitalOcean dashboard
2. Create new App
3. Connect GitHub repository
4. Configure build commands:
   - Build command: `npm run build`
   - Run command: `serve -s build -l 3000`
5. Set environment variables
6. Deploy

## Database Deployment

### Option 1: AWS RDS MySQL

1. Create RDS instance:
```bash
aws rds create-db-instance \
  --db-instance-identifier project-management-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password your-password \
  --allocated-storage 20
```

2. Import schema:
```bash
mysql -h your-rds-endpoint.amazonaws.com -u admin -p project_management < database.sql
```

### Option 2: DigitalOcean Managed Database

1. Create MySQL cluster
2. Configure firewall rules
3. Import schema using mysql-client

### Option 3: Self-Hosted MySQL

1. Install MySQL server
2. Configure for production
3. Setup automated backups
4. Enable SSL connections

## Security Checklist

### Backend Security
- [ ] Use HTTPS only
- [ ] Enable CORS properly
- [ ] Set strong JWT_SECRET
- [ ] Implement rate limiting
- [ ] Enable password hashing
- [ ] Update dependencies
- [ ] Remove debug logs
- [ ] Set NODE_ENV=production
- [ ] Use environment variables
- [ ] Enable security headers

### Frontend Security
- [ ] Use HTTPS
- [ ] Remove console logs
- [ ] Validate user input
- [ ] Use secure API endpoints
- [ ] Update dependencies
- [ ] Enable CORS headers
- [ ] Implement CSP headers

### Database Security
- [ ] Use strong passwords
- [ ] Limit user permissions
- [ ] Enable SSL connections
- [ ] Regular backups
- [ ] Monitor access logs
- [ ] Update MySQL version
- [ ] Remove default accounts

## Performance Optimization

### Backend
1. Enable caching
2. Optimize database queries
3. Use CDN for static assets
4. Enable gzip compression
5. Use connection pooling
6. Monitor performance
7. Setup load balancing

### Frontend
1. Minimize bundle size
2. Lazy load components
3. Optimize images
4. Enable caching
5. Use CDN
6. Monitor performance

### Database
1. Add indexes
2. Optimize queries
3. Archive old data
4. Monitor performance
5. Setup replication

## Monitoring and Logging

### Backend Monitoring
```javascript
// Add to server.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Setup Monitoring Service
- Use CloudWatch (AWS)
- Use DataDog
- Use New Relic
- Use Sentry for error tracking

### Setup Alerts
- CPU usage > 80%
- Memory usage > 80%
- API response time > 2s
- Error rate > 1%
- Database connection issues

## Backup Strategy

### Daily Backups
```bash
0 2 * * * /usr/local/bin/backup-db.sh
```

### Backup Script Example
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p$MYSQL_PASSWORD project_management > /backups/db_$DATE.sql
aws s3 cp /backups/db_$DATE.sql s3://backups-bucket/
```

### Restore from Backup
```bash
mysql -u root -p project_management < /backups/db_20240101_000000.sql
```

## Troubleshooting

### Backend Issues

**Problem**: Connection timeout
- Solution: Check firewall rules, database credentials

**Problem**: 502 Bad Gateway
- Solution: Check backend service status, memory usage

**Problem**: High response times
- Solution: Optimize database queries, add indexes

### Frontend Issues

**Problem**: Blank page
- Solution: Check console errors, verify API URL

**Problem**: API calls failing
- Solution: Check CORS settings, verify backend URL

### Database Issues

**Problem**: Connection refused
- Solution: Verify MySQL is running, check host/port

**Problem**: Out of disk space
- Solution: Cleanup old logs, optimize tables

## Rollback Procedure

1. Stop current deployment
2. Revert to previous version:
```bash
git revert HEAD
npm run build
npm run deploy
```

## Maintenance

### Weekly Tasks
- [ ] Check system logs
- [ ] Monitor performance
- [ ] Verify backups
- [ ] Security updates

### Monthly Tasks
- [ ] Database maintenance
- [ ] Performance optimization
- [ ] Security audit
- [ ] Dependency updates

### Quarterly Tasks
- [ ] Full security review
- [ ] Load testing
- [ ] Capacity planning
- [ ] Documentation updates

## Production URLs

Update these in your configuration:
- Backend API: `https://api.your-domain.com`
- Frontend: `https://your-domain.com`
- Database: `your-rds-endpoint.amazonaws.com`

## Support

For deployment issues:
1. Check logs
2. Review error messages
3. Verify configuration
4. Contact support if needed

---

For more information, see the main README.md or respective component documentation.
