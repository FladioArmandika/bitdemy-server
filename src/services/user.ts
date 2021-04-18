import User, { UserDocument } from "../models/user";

export default class UserService {

    public createUser(userParams: UserDocument, callback: any) {
        const session = new User(userParams);
        session.save().then(callback);
    }

    public getUser(query: any, callback: any) {
        User.findOne(query, callback);
    }

    public deleteUser(userId: string, callback: any) {
        const query = { _id: userId }
        User.deleteOne(query, callback);
    }

    public updateUser(userId: string, updated: any, callback: any) {
        const query = { _id: userId }
        User.findOneAndUpdate(query, updated, callback);
    }

}