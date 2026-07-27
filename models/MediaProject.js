import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    altText: { type: String, trim: true, default: '' },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    blurDataUrl: { type: String, default: '' },
    filename: { type: String, default: '' },
  },
  { _id: false }
);

const MediaProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String, required: true, unique: true, trim: true, lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase hyphen-separated.'],
    },
    category: {
      type: String, required: true,
      // 🌟 Yahan nayi categories update kar di hain
      enum: [
        'candid-photography', 
        'cinematography', 
        'wedding', 
        'ring-ceremony', 
        'pre-wedding', 
        'birthday', 
        'maternity', 
        'corporate-events', 
        'drone-led-wall'
      ],
      index: true,
    },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    storyHighlight: { type: String, trim: true, maxlength: 300, default: '' },
    location: {
      city: { type: String, trim: true, default: '' },
      venue: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: 'India' },
    },
    eventDate: { type: Date, default: null, index: true },
    
    // 🌟 ALBUM KA COVER PHOTO 🌟
    coverImage: {
      type: ImageSchema,
      required: [true, 'Cover image is required.'],
    },
    
    // 🌟 ALBUM KI ANDAR KI PHOTOS (Max 100 kar diya hai) 🌟
    galleryImages: {
      type: [ImageSchema],
      default: [],
      validate: { validator: (a) => a.length <= 100, message: 'Max 100 album images allowed.' },
    },
    
    videoEmbedUrl: { type: String, trim: true, default: '' },
    videoThumbnailUrl: { type: String, trim: true, default: '' },
    videoDuration: { type: String, trim: true, default: '' },
    is4K: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: false, index: true },
    metaTitle: { type: String, trim: true, maxlength: 70, default: '' },
    metaDescription: { type: String, trim: true, maxlength: 160, default: '' },
    sortOrder: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true, collection: 'media_projects' }
);

MediaProjectSchema.index({ category: 1, featured: -1, eventDate: -1 });
MediaProjectSchema.index({ isPublished: 1, sortOrder: -1, createdAt: -1 });

// Statics
MediaProjectSchema.statics.findByCategory = function (category, { limit = 12, skip = 0 } = {}) {
  const q = { isPublished: true };
  if (category && category !== 'all') q.category = category;
  return this.find(q).sort({ featured: -1, sortOrder: -1, eventDate: -1 }).skip(skip).limit(limit)
    .select('title slug category storyHighlight coverImage location eventDate is4K featured videoDuration').lean();
};

MediaProjectSchema.statics.findCinemaLounge = function (limit = 10) {
  // 🌟 Yahan 'cinema-4k' ki jagah 'cinematography' kar diya hai
  return this.find({ category: 'cinematography', isPublished: true, videoEmbedUrl: { $ne: '' } })
    .sort({ featured: -1, sortOrder: -1 }).limit(limit)
    .select('title slug storyHighlight coverImage videoEmbedUrl videoThumbnailUrl videoDuration is4K location eventDate').lean();
};

const MediaProject = models.MediaProject || model('MediaProject', MediaProjectSchema);
export default MediaProject;