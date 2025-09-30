import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';

const CVUpload = ({ onFileUpload, loading, progress, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return;
    }

    // Validate file size (50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 50MB');
      return;
    }

    setUploadedFile(file);
    onFileUpload(file);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-mentor-teal bg-mentor-teal/10 scale-[1.02]' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-mentor-teal'
        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !loading && document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileInput}
          disabled={loading}
        />
        
        {loading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-mentor-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mentor-teal"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analyzing Your CV...
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI is extracting skills and identifying opportunities...
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-mentor-teal h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>
        ) : uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              CV Ready for Analysis
            </h3>
            <div className="bg-white rounded-lg p-4 border">
              <p className="font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-600">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
            <button 
              className="text-mentor-teal hover:text-mentor-blue transition"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedFile(null);
                document.getElementById('file-input').value = '';
              }}
            >
              Upload different file
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-mentor-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-mentor-blue" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Your CV
            </h3>
            <p className="text-gray-600 mb-4">
              Drag & drop your CV here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX • Max 50MB
            </p>
            <button className="btn-primary">
              Choose File
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-800">Upload Failed</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Tips */}
      {!uploadedFile && !loading && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 Tips for best results:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Ensure your CV is in a readable text format (not scanned)</li>
            <li>• Include detailed descriptions of your skills and experience</li>
            <li>• Use standard section headings like "Experience", "Education", "Skills"</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CVUpload;