const Job = require('../models/Job');
const CV = require('../models/CV');

exports.getJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      type,
      level,
      remote,
      category,
      minSalary,
      maxSalary,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Location filter
    if (location) {
      filter.location = new RegExp(location, 'i');
    }

    // Remote filter
    if (remote !== undefined) {
      filter.isRemote = remote === 'true';
    }

    // Type filter
    if (type) {
      filter.type = type;
    }

    // Level filter
    if (level) {
      filter.level = level;
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Salary range filter
    if (minSalary || maxSalary) {
      const salaryFilter = {};
      if (minSalary) salaryFilter.$gte = parseInt(minSalary);
      if (maxSalary) salaryFilter.$lte = parseInt(maxSalary);
      
      filter.$or = [
        { 'salary.min': salaryFilter },
        { 'salary.max': salaryFilter }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    // Execute query
    const jobs = await Job.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    // Increment views for each job
    await Promise.all(
      jobs.map(job => job.incrementViews())
    );

    res.status(200).json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        filters: {
          search,
          location,
          type,
          level,
          remote,
          category
        }
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs'
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job || !job.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment views
    await job.incrementViews();

    res.status(200).json({
      success: true,
      data: {
        job
      }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job details'
    });
  }
};

exports.getRecommendedJobs = async (req, res) => {
  try {
    const { sessionId } = req.query;
    let recommendedJobs = [];

    if (sessionId) {
      // Get session's latest CV analysis
      const latestCV = await CV.findOne({ sessionId })
        .sort({ analysisDate: -1 });

      if (latestCV && latestCV.analysis) {
        // Use CV analysis to recommend jobs
        const userSkills = latestCV.analysis.skills.map(skill => skill.name);
        
        // Find jobs that match user skills
        recommendedJobs = await Job.find({
          isActive: true,
          $or: [
            { 'skills.name': { $in: userSkills } },
            { tags: { $in: userSkills } }
          ]
        })
        .sort({ 'salary.max': -1, createdAt: -1 })
        .limit(6)
        .select('title company location type level salary tags');
      }
    }

    // Fallback: return featured jobs if no CV analysis or no sessionId
    if (recommendedJobs.length === 0) {
      recommendedJobs = await Job.find({ isActive: true })
        .sort({ views: -1, createdAt: -1 })
        .limit(6)
        .select('title company location type level salary tags');
    }

    res.status(200).json({
      success: true,
      data: {
        jobs: recommendedJobs
      }
    });
  } catch (error) {
    console.error('Get recommended jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommended jobs'
    });
  }
};

exports.getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          avgMinSalary: { $avg: '$salary.min' },
          avgMaxSalary: { $avg: '$salary.max' },
          byType: { $push: '$type' },
          byLevel: { $push: '$level' },
          byCategory: { $push: '$category' }
        }
      }
    ]);

    // Process stats
    const processedStats = stats[0] ? {
      totalJobs: stats[0].totalJobs,
      avgSalary: Math.round((stats[0].avgMinSalary + stats[0].avgMaxSalary) / 2),
      typeDistribution: countDistribution(stats[0].byType),
      levelDistribution: countDistribution(stats[0].byLevel),
      categoryDistribution: countDistribution(stats[0].byCategory)
    } : {
      totalJobs: 0,
      avgSalary: 0,
      typeDistribution: {},
      levelDistribution: {},
      categoryDistribution: {}
    };

    res.status(200).json({
      success: true,
      data: {
        stats: processedStats
      }
    });
  } catch (error) {
    console.error('Get job stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job statistics'
    });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { q, location, remote } = req.query;

    const filter = { isActive: true };

    if (q) {
      filter.$text = { $search: q };
    }

    if (location) {
      filter.location = new RegExp(location, 'i');
    }

    if (remote !== undefined) {
      filter.isRemote = remote === 'true';
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(20)
      .select('title company location type level salary tags');

    res.status(200).json({
      success: true,
      data: {
        jobs,
        count: jobs.length
      }
    });
  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching jobs'
    });
  }
};

// Helper function to count distribution
function countDistribution(array) {
  return array.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}