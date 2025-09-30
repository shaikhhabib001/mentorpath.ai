const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyLogo: String,
  location: {
    type: String,
    required: true
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    default: 'full-time'
  },
  level: {
    type: String,
    enum: ['intern', 'junior', 'mid', 'senior', 'lead', 'principal', 'executive'],
    default: 'mid'
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  skills: [{
    name: String,
    importance: {
      type: String,
      enum: ['required', 'preferred', 'bonus'],
      default: 'required'
    }
  }],
  category: {
    type: String,
    enum: ['engineering', 'design', 'product', 'marketing', 'sales', 'support', 'other'],
    default: 'engineering'
  },
  tags: [String],
  applicationUrl: String,
  contactEmail: String,
  isActive: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  },
  applications: {
    type: Number,
    default: 0
  },
  expiryDate: Date
}, {
  timestamps: true
});

// Indexes for search and filtering
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ location: 1, isRemote: 1 });
jobSchema.index({ type: 1, level: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ isActive: 1, expiryDate: 1 });
jobSchema.index({ createdAt: -1 });

// Virtual for formatted salary
jobSchema.virtual('formattedSalary').get(function() {
  if (!this.salary.min && !this.salary.max) return 'Negotiable';
  
  const formatNumber = (num) => {
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };

  if (this.salary.min && this.salary.max) {
    return `${formatNumber(this.salary.min)} - ${formatNumber(this.salary.max)}`;
  } else if (this.salary.min) {
    return `From ${formatNumber(this.salary.min)}`;
  } else {
    return `Up to ${formatNumber(this.salary.max)}`;
  }
});

// Method to increment views
jobSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method for active jobs
jobSchema.statics.getActiveJobs = function() {
  return this.find({
    isActive: true,
    $or: [
      { expiryDate: { $exists: false } },
      { expiryDate: null },
      { expiryDate: { $gt: new Date() } }
    ]
  });
};

module.exports = mongoose.model('Job', jobSchema);