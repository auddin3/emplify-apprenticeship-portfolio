# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the server code
COPY . .

# Expose the server app’s port
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]
