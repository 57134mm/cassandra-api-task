# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install swagger-autogen if it's not already included in your dependencies
RUN npm install swagger-autogen --save-dev

# Generate swagger-output.json
RUN node swagger.js

# Expose port 3000 for the API
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
