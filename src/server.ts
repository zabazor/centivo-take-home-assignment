import http from 'http';
import express from 'express';

import { SERVER_CONFIG } from './config/config';
import { usersController } from './controllers/users';
import mongoose from 'mongoose';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    // Initializing API
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    // Defining Controller Routes
    application.get('/user/:id', (req, res) => {
        return usersController.getUserById(req, res);
    });

    // Add a route not found handler for bad routes
    application.use((req, res) => {
        res.status(404).send("Route Not Found");
    });

    httpServer = http.createServer(application);
    httpServer.listen(SERVER_CONFIG.SERVER_PORT, () => {
        console.log(`Server started on ${SERVER_CONFIG.SERVER_HOSTNAME}:${SERVER_CONFIG.SERVER_PORT}`);
    });

    if (process.env.MONGO_URL) {
        mongoose.Promise = Promise;
        mongoose.connect(process.env.MONGO_URL);
        mongoose.connection.on('error', (error: Error) => {
            console.log(error);
        });
    }
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
