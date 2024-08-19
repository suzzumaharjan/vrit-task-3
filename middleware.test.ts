import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';
import { jest } from '@jest/globals';

jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    next: jest.fn(),
    redirect: jest.fn(),
  },
}));

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should redirect to /login if user is unauthenticated', () => {
    // Mock request object
    const request = {
      cookies: {
        get: jest.fn(() => undefined), // No userId cookie
      },
      url: 'http://localhost/dashboard',
    };

    // Call middleware
    middleware(request as unknown as NextRequest);

    // Assert redirect behavior
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', request.url));
  });

  it('should allow access to authenticated users', () => {
    // Mock request object with valid userId cookie
    const request = {
      cookies: {
        get: jest.fn(() => ({ value: 'suja123' })), // Valid userId cookie
      },
      url: 'http://localhost/dashboard',
    };

    // Call middleware
    middleware(request as unknown as NextRequest);

    // Assert next behavior
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
