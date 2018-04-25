FROM nodered/node-red-docker

RUN npm install node-red-node-mongodb
RUN npm install node-red-dashboard
RUN npm install moment
RUN npm install util

COPY src/settings.js /data
COPY src/tsutil.js /data

ENV NODE_PATH=/usr/src/node-red/node_modules:/data/node_modules
