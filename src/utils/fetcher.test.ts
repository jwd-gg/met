import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import type {
	DepartmentList,
	DepartmentsResponse,
	ObjectDetails,
	ObjectsResponse,
	SearchResponse,
} from '../types';
import { fetcher } from './fetcher';

const mockFetch = spyOn(global, 'fetch');
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

describe('fetcher', () => {
	beforeEach(() => {
		// reset the mock before each test
		mockFetch.mockClear();
	});

	describe('getDepartments', () => {
		it('should fetch and return the list of departments', async () => {
			const mockDepartmentsData: DepartmentsResponse = {
				departments: [
					{ departmentId: 1, displayName: 'American Decorative Arts' },
					{ departmentId: 3, displayName: 'Ancient Near Eastern Art' },
				],
			};
			const expectedDepartmentList: DepartmentList = mockDepartmentsData.departments;

			// configure the mock fetch to return a successful response
			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify(mockDepartmentsData), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}),
			);

			const departments = await fetcher.getDepartments();

			// check if fetch was called correctly
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/departments`);

			// check if the returned data is correct
			expect(departments).toEqual(expectedDepartmentList);
		});

		it('should throw an error if the API request fails', async () => {
			const status = 500;
			// configure the mock fetch to return an error response
			mockFetch.mockResolvedValueOnce(
				new Response('Internal Server Error', {
					status: status,
					statusText: 'Internal Server Error',
				}),
			);

			// expect the function call to throw an error
			await expect(fetcher.getDepartments()).rejects.toThrow(`MET API error: ${status}`);

			// verify fetch was still called
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/departments`);
		});
	});

	// tests for getObjects
	describe('getObjects', () => {
		it('should fetch and return the objects response', async () => {
			const mockObjectsData: ObjectsResponse = {
				total: 2,
				objectIDs: [1, 2],
			};

			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify(mockObjectsData), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}),
			);

			const objects = await fetcher.getObjects();

			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/objects`);
			expect(objects).toEqual(mockObjectsData);
		});

		it('should throw an error if the API request fails', async () => {
			const status = 404;
			mockFetch.mockResolvedValueOnce(
				new Response('Not Found', {
					status: status,
					statusText: 'Not Found',
				}),
			);

			await expect(fetcher.getObjects()).rejects.toThrow(`MET API error: ${status}`);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/objects`);
		});
	});

	// tests for getObject
	describe('getObject', () => {
		const objectId = 123;
		it('should fetch and return the object details', async () => {
			const mockObjectDetails: ObjectDetails = {
				objectID: objectId,
				isHighlight: false,
				accessionNumber: '1234.56',
				accessionYear: '1950',
				isPublicDomain: true,
				primaryImage: 'http://example.com/image.jpg',
				primaryImageSmall: 'http://example.com/image_small.jpg',
				additionalImages: [],
				constituents: null,
				department: 'Test Department',
				objectName: 'Test Object Name',
				title: 'Test Object',
				culture: 'Test Culture',
				period: '',
				dynasty: '',
				reign: '',
				portfolio: '',
				artistRole: '',
				artistPrefix: '',
				artistDisplayName: '',
				artistDisplayBio: '',
				artistSuffix: '',
				artistAlphaSort: '',
				artistNationality: '',
				artistBeginDate: '',
				artistEndDate: '',
				objectDate: 'ca. 1950',
				objectBeginDate: 1950,
				objectEndDate: 1950,
				medium: 'Test Medium',
				dimensions: 'H. 10 cm',
				dimensionsParsed: null,
				measurements: null,
				creditLine: 'Gift of Tester, 1950',
				geographyType: '',
				city: '',
				state: '',
				county: '',
				country: '',
				region: '',
				subregion: '',
				locale: '',
				locus: '',
				excavation: '',
				river: '',
				classification: 'Test Classification',
				rightsAndReproduction: '',
				linkResource: '',
				metadataDate: '2023-01-01T00:00:00Z',
				repository: 'MET',
				objectURL: 'http://example.com/object/123',
				tags: null,
				isTimelineWork: false,
				GalleryNumber: '1',
			};

			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify(mockObjectDetails), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}),
			);

			const objectDetails = await fetcher.getObject(objectId);

			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/objects/${objectId}`);
			expect(objectDetails).toEqual(mockObjectDetails);
		});

		it('should throw an error if the API request fails', async () => {
			const status = 503;
			mockFetch.mockResolvedValueOnce(
				new Response('Service Unavailable', {
					status: status,
					statusText: 'Service Unavailable',
				}),
			);

			await expect(fetcher.getObject(objectId)).rejects.toThrow(`MET API error: ${status}`);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/objects/${objectId}`);
		});
	});

	// tests for search
	describe('search', () => {
		const query = 'sunflowers';
		const encodedQuery = encodeURIComponent(query);

		it('should fetch and return the search results', async () => {
			const mockSearchData: SearchResponse = {
				total: 1,
				objectIDs: [456],
			};

			mockFetch.mockResolvedValueOnce(
				new Response(JSON.stringify(mockSearchData), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				}),
			);

			const searchResults = await fetcher.search(query);

			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/search?q=${encodedQuery}`);
			expect(searchResults).toEqual(mockSearchData);
		});

		it('should throw an error if the API request fails', async () => {
			const status = 400;
			mockFetch.mockResolvedValueOnce(
				new Response('Bad Request', {
					status: status,
					statusText: 'Bad Request',
				}),
			);

			await expect(fetcher.search(query)).rejects.toThrow(`MET API error: ${status}`);
			expect(mockFetch).toHaveBeenCalledTimes(1);
			expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/search?q=${encodedQuery}`);
		});
	});
});
