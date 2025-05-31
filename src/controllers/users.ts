import express from 'express';
import { UserModel } from '../db/user';
import mongoose from 'mongoose';

export interface IUserController {
    getUserById(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}

export const usersController: IUserController = {
    async getUserById(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
        try {
            // Bonus: Gracefully handle the invalid ObjectId error
            const userId = req.params.id;
            if (!mongoose.isValidObjectId(userId)) {
                return res.status(400).send('Invalid Id: The id you entered was not a valid MongoDB id');
            }

            /*
            I find this 'Unique Twist' solution more satisfying, as it sends a more detailed failure response by providing a specific error message that clearly explains why the request failed.
             */
            const existingUser = await UserModel.findOne({ _id: userId });
            if (existingUser) {
                if (existingUser.age < 22) {
                    return res.status(404).send('User not found: The user you were searching for is under age, and can’t be looked up.');
                }
                return res.status(200).json(existingUser);
            }

            return res.status(404).send('User not found: Make sure that the id you entered is correct, and try again.');

            /*
            I think this is the solution that the 'Unique Twist' prompt was expecting, by simply modifying the MongoDB query.
            However, I deliberately chose to NOT use the database query route in order to provide more specific error messaging to the user.
            */
            // const existingUser = await UserModel.findOne({ _id: userId, age: { $gt: 21 } });
            // if (existingUser) {
            //   return res.status(200).json(existingUser);
            // }

            // return res
            //   .status(404)
            //   .send('User not found: Make sure that the id you entered is correct, and that the user is older than 21 before trying again.');
        } catch (error) {
            return res.status(400);
        }
    }
};
