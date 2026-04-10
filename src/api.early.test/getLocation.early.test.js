import { getLocation } from '../api';

global.fetch = jest.fn();

describe('getLocation() getLocation method', () => {
    const OLD_ENV = process.env;
    const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...OLD_ENV, API_KEY: 'test_api_key' };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('should fetch weather data for a valid location string', async () => {
        const location = "London,UK";
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'sunny' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${location}?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should fetch weather data for a location with spaces and special characters', async () => {
        const location = "New York,US";
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'cloudy' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${location}?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should handle empty location string', async () => {
        const location = "";
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'unknown' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should handle location as null', async () => {
        const location = null;
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'unknown' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}null?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should handle location as undefined', async () => {
        const location = undefined;
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'unknown' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}undefined?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should propagate fetch rejection (network error)', async () => {
        const location = "Paris,FR";
        const error = new Error('Network error');
        fetch.mockRejectedValueOnce(error);

        await expect(getLocation(location)).rejects.toThrow('Network error');
        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${location}?key=test_api_key`);
    });

    test('should use undefined API_KEY if not set in environment', async () => {
        delete process.env.API_KEY;
        const location = "Berlin,DE";
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'rainy' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${location}?key=undefined`);
        expect(response).toBe(mockResponse);
    });

    test('should handle location as a number', async () => {
        const location = 12345;
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'numeric' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}12345?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });

    test('should handle location as an object', async () => {
        const location = { city: "Tokyo" };
        const mockResponse = { ok: true, status: 200, json: async () => ({ weather: 'object' }) };
        fetch.mockResolvedValueOnce(mockResponse);

        const response = await getLocation(location);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}[object Object]?key=test_api_key`);
        expect(response).toBe(mockResponse);
    });
});