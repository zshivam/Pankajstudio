import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CinemaVideoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true }, // YouTube Embed URL
    caption: { type: String, trim: true, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'cinema_lounge_videos' }
);

const CinemaVideo = models.CinemaVideo || model('CinemaVideo', CinemaVideoSchema);
export default CinemaVideo;