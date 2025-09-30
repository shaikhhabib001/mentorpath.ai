import { renderHook, act } from '@testing-library/react-hooks';
import { useCVAnalysis } from '../useCVAnalysis';
import { cvAPI } from '../../utils/api';

// Mock the API
jest.mock('../../utils/api', () => ({
  cvAPI: {
    upload: jest.fn(),
    getAnalysis: jest.fn(),
    getUserCVs: jest.fn()
  }
}));

describe('useCVAnalysis Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful CV upload', async () => {
    const mockResponse = {
      data: {
        cvId: '123',
        analysis: { skills: [], experience: {} }
      }
    };
    
    cvAPI.upload.mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useCVAnalysis());

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    await act(async () => {
      const promise = result.current.uploadCV(file);
      await waitForNextUpdate();
      await promise;
    });

    expect(result.current.analysis).toEqual(mockResponse.data);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle upload error', async () => {
    const errorMessage = 'Upload failed';
    cvAPI.upload.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useCVAnalysis());

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });

    await act(async () => {
      try {
        await result.current.uploadCV(file);
      } catch (error) {
        // Expected to throw
      }
      await waitForNextUpdate();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });
});