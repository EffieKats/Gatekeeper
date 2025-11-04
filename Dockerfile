# Use official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose the port for keep-alive
EXPOSE 3000

# Run the bot
CMD ["node", "index.js"]
