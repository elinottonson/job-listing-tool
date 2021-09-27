# This image makes use of a Node image running on Linux Alpine
FROM node:15-alpine3.13

# A work directory is required to be used by npm install
WORKDIR /var/db-setup

# Copy all project files to the container
# Files in the location of this file are copied to WORKDIR in the container
COPY . .

# Makes sure npm is up to date otherwise install dependencies attempts will fail
RUN npm install -g npm

# Install dependencies
RUN npm install

RUN sleep 5

RUN node db-init.js