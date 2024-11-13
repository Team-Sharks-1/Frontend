FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g npm@latest

# Install dependencies and attempt to fix vulnerabilities
RUN npm install && npm audit fix --force

# Copy the application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
