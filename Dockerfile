FROM node:18-alpine

WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn && yarn cache clean

# Copy the entire project to the container
COPY . .

# Expose the desired port
EXPOSE 5000

# Start the Vite development server
CMD ["yarn", "run start:dev"]