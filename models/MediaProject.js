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
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase hyphen-separated.'],
    },
    category: {
      type: String, 
      required: true,
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
    
    // Album Cover Photo Object
    coverImage: {
      type: ImageSchema,
      required: [true, 'Cover image is required.'],
    },
    
    // Gallery Photos Inside Album (Max 100)
    galleryImages: {
      type: [ImageSchema],
      default: [],
      validate: { 
        validator: (a) => a.length <= 100, 
        message: 'Max 100 album images allowed.' 
      },
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

const MediaProject = models.MediaProject || model('MediaProject', MediaProjectSchema);
export default MediaProject;