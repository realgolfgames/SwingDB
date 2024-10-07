import mongoose from 'mongoose';

export const golf_swing_chunks_schema = new mongoose.Schema({
	video_id: {
		type: String,
		required: true
	},
    item_number: {
        type: Number,
        required: true
    },
	chunk: {
		type: String,
		required: true
	}
});

export const golf_swing_chunks_model = mongoose.model(
	'golf_swing_chunks',
	golf_swing_chunks_schema
);
