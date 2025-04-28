import type {
	DepartmentList,
	DepartmentsResponse,
	ObjectDetails,
	ObjectsResponse,
	SearchOptions,
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
	search: (q: string, options?: SearchOptions) => {
		const params = new URLSearchParams();
		params.set('q', q);

		if (options) {
			for (const [key, value] of Object.entries(options)) {
				if (value !== undefined && value !== null) {
					if (Array.isArray(value)) {
						params.set(key, value.join('|'));
					} else {
						params.set(key, String(value));
					}
				}
			}
		}

		const path = `/search?${params.toString()}`;
		return get<SearchResponse>(path);
	},
};
