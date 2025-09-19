/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react';
import usePagination from './usePagination';
describe('usePagination', () => {
  const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePagination({
      data: mockData,
      itemsPerPage: 3
    }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.currentData).toEqual([1, 2, 3]);
  });

  test('should use default itemsPerPage when not provided', () => {
    const { result } = renderHook(() => usePagination({
      data: mockData
    }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentData).toEqual(mockData);
  });

  test('should navigate to next page', () => {
    const { result } = renderHook(() => usePagination({
      data: mockData,
      itemsPerPage: 3
    }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual([4, 5, 6]);
  });

  test('should handle empty data', () => {
    const { result } = renderHook(() => usePagination({
      data: [],
      itemsPerPage: 3
    }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.currentData).toEqual([]);
  });
});