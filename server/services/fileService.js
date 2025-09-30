const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

class FileService {
  async extractTextFromFile(filePath, fileType) {
    try {
      switch (fileType) {
        case 'application/pdf':
          return await this.extractTextFromPDF(filePath);
        
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await this.extractTextFromWord(filePath);
        
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error(`Failed to extract text from file: ${error.message}`);
    }
  }

  async extractTextFromPDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  }

  async extractTextFromWord(filePath) {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      throw new Error(`Word document extraction failed: ${error.message}`);
    }
  }

  async cleanupFile(filePath) {
    try {
      await fs.unlink(filePath);
      console.log(`Cleaned up file: ${filePath}`);
    } catch (error) {
      console.error('File cleanup error:', error);
      // Don't throw error for cleanup failures
    }
  }

  validateFileSize(fileSize, maxSize = 50 * 1024 * 1024) {
    if (fileSize > maxSize) {
      throw new Error(`File size ${fileSize} exceeds maximum allowed size ${maxSize}`);
    }
    return true;
  }

  getFileType(mimetype, originalName) {
    const ext = path.extname(originalName).toLowerCase();
    
    const typeMap = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };

    return typeMap[ext] || mimetype;
  }
}

module.exports = new FileService();