import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CVUpload from '../cv/CVUpload';
import { beforeEach } from '@jest/globals';

/* global describe, it, expect, jest */

describe('CVUpload Component', () => {
  const mockOnFileUpload = jest.fn();

  beforeEach(() => {
    mockOnFileUpload.mockClear();
  });

  it('renders upload area correctly', () => {
    render(<CVUpload onFileUpload={mockOnFileUpload} />);
    
    expect(screen.getByText('Upload Your CV')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop your CV here or click to browse')).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    render(<CVUpload onFileUpload={mockOnFileUpload} />);
    
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/file input/i);
    
    await userEvent.upload(input, file);
    
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  it('shows loading state', () => {
    render(
      <CVUpload 
        onFileUpload={mockOnFileUpload} 
        loading={true} 
        progress={50} 
      />
    );
    
    expect(screen.getByText('Analyzing Your CV...')).toBeInTheDocument();
    expect(screen.getByText('50% complete')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'File upload failed';
    render(
      <CVUpload 
        onFileUpload={mockOnFileUpload} 
        error={errorMessage} 
      />
    );
    
    expect(screen.getByText('Upload Failed')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});