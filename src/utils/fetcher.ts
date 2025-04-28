import type {
	DepartmentList,
	DepartmentsResponse,
	ObjectDetails,
	ObjectsResponse,
	SearchResponse,
} from '../types';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`);
	if (!res.ok) throw new Error(`MET API error: ${res.status}`);
	return res.json() as Promise<T>;
}

export const fetcher = {
	getObjects: () => get<ObjectsResponse>('/objects'),
	getObject: (id: number) => get<ObjectDetails>(`/objects/${id}`),
	getDepartments: async (): Promise<DepartmentList> => {
		const response = await get<DepartmentsResponse>('/departments');
		return response.departments;
	},
	search: (q: string) => get<SearchResponse>(`/search?q=${encodeURIComponent(q)}`),
};
