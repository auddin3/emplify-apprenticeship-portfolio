# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the client code
COPY . .

# Expose the client app’s port
EXPOSE 3001

# Start the client app
CMD ["npm", "start"]
