import { SECRET_MONGODB_CONNECTION } from '$env/static/private';
import mongoose from 'mongoose';

export async function connectToDB() {
	try {
		return await mongoose.connect(SECRET_MONGODB_CONNECTION);
	} catch (err) {
		console.log(err);
	}
}
