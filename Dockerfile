FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g npm@latest

# Install dependencies and attempt to fix vulnerabilities
RUN npm install 
# && npm audit fix --force

# Copy the application source code
COPY . .

# # Use Nginx to serve the built application
# FROM nginx:latest
# COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
