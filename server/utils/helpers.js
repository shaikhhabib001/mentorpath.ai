// Generate random session ID
const generateSessionId = (prefix = 'sess') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Async handler to avoid try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validate email format (for future use)
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random string
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Calculate match percentage between skills
const calculateSkillMatch = (userSkills, jobSkills) => {
  if (!userSkills.length || !jobSkills.length) return 0;
  
  const userSkillSet = new Set(userSkills.map(skill => skill.toLowerCase()));
  const jobSkillSet = new Set(jobSkills.map(skill => skill.toLowerCase()));
  
  const intersection = new Set([...userSkillSet].filter(skill => jobSkillSet.has(skill)));
  
  return Math.round((intersection.size / jobSkillSet.size) * 100);
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate file type
const validateFileType = (mimetype, allowedTypes) => {
  return allowedTypes.includes(mimetype);
};

// Calculate experience level
const calculateExperienceLevel = (totalYears) => {
  if (totalYears < 2) return 'Junior';
  if (totalYears < 5) return 'Mid-level';
  if (totalYears < 10) return 'Senior';
  return 'Expert';
};

// Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Parse JSON safely
const safeJSONParse = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
};

module.exports = {
  generateSessionId,
  asyncHandler,
  isValidEmail,
  generateRandomString,
  formatFileSize,
  calculateSkillMatch,
  sanitizeInput,
  validateFileType,
  calculateExperienceLevel,
  delay,
  safeJSONParse
};