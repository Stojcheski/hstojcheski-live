import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blogImage: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likesCount: [
    {
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  dislikesCount: [
    {
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  sharesCount: [
    {
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bookmarksCount: [
    {
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  readTime: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  isScheduled: {
    type: Boolean,
    default: false,
  },
  scheduledAt: {
    type: Date,
    default: null,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
    default: null,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isRestricted: {
    type: Boolean,
    default: false,
  },
  isUnlisted: {
    type: Boolean,
    default: false,
  },
  isSponsored: {
    type: Boolean,
    default: false,
  },
  isPromoted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnHomepage: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnCategoryPage: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnTagPage: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnAuthorPage: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnSearchPage: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnRelatedPosts: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnPopularPosts: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnTrendingPosts: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnLatestPosts: {
    type: Boolean,
    default: false,
  },
  isFeaturedOnMostReadPosts: {
    type: Boolean,
    default: false,
  },
})

blogSchema.index({ slug: 1 })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
