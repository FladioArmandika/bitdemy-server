import Rating, { RatingDocument } from "../models/rating";

export default class RatingService {

    public getRating(ratingId: string, callback: any) {
        Rating.findOne({_id: ratingId})
            .populate('user')
            .populate('course')
            .exec(callback);
    }

    public getRatingsByCourse(courseId: string, callback: any) {
        Rating.find({course: courseId})
            .populate('user')
            .populate('course')
            .exec(callback);
    }

    public getRatingsByUser(userId: string, callback: any) {
        Rating.find({user: userId})
            .populate('user')
            .populate('course')
            .exec(callback);
    }

    public createRating(ratingParams: RatingDocument, callback: any) {
        const rating: RatingDocument = new Rating(ratingParams);
        rating.save();
    }

    public deleteRating(ratingId: string, callback: any) {
        Rating.findOneAndDelete({_id: ratingId})
            .exec(callback);
    }

    public updateRating(ratingId: string, updated: any, callback: any) {
        Rating.findOneAndUpdate({_id:ratingId}, updated)
            .exec(callback);
    }

}