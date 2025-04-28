export interface ObjectsResponse {
	total: number;
	objectIDs: number[];
}

interface Constituent {
	constituentID: number;
	role: string;
	name: string;
	constituentULAN_URL?: string;
	constituentWikidata_URL?: string;
	gender?: string;
}

interface ElementMeasurements {
	Height?: number;
	Width?: number;
	Depth?: number;
	Length?: number;
	[key: string]: number | undefined;
}

interface Measurement {
	elementName: string;
	elementDescription: string | null;
	elementMeasurements: ElementMeasurements;
}

interface ParsedDimension {
	element: string;
	dimensionType: string;
	dimension: number;
}

interface Tag {
	term: string;
	AAT_URL: string;
	Wikidata_URL?: string;
}

export interface ObjectDetails {
	objectID: number;
	isHighlight: boolean;
	accessionNumber: string;
	accessionYear: string;
	isPublicDomain: boolean;
	primaryImage: string;
	primaryImageSmall: string;
	additionalImages: string[];
	constituents: Constituent[] | null;
	department: string;
	objectName: string;
	title: string;
	culture: string;
	period: string;
	dynasty: string;
	reign: string;
	portfolio: string;
	artistRole: string;
	artistPrefix: string;
	artistDisplayName: string;
	artistDisplayBio: string;
	artistSuffix: string;
	artistAlphaSort: string;
	artistNationality: string;
	artistBeginDate: string;
	artistEndDate: string;
	artistGender?: string;
	artistWikidata_URL?: string;
	artistULAN_URL?: string;
	objectDate: string;
	objectBeginDate: number;
	objectEndDate: number;
	medium: string;
	dimensions: string;
	dimensionsParsed: ParsedDimension[] | null;
	measurements: Measurement[] | null;
	creditLine: string;
	geographyType: string;
	city: string;
	state: string;
	county: string;
	country: string;
	region: string;
	subregion: string;
	locale: string;
	locus: string;
	excavation: string;
	river: string;
	classification: string;
	rightsAndReproduction: string;
	linkResource: string;
	metadataDate: string;
	repository: string;
	objectURL: string;
	tags: Tag[] | null;
	objectWikidata_URL?: string;
	isTimelineWork: boolean;
	GalleryNumber: string;
}

export interface DepartmentsResponse {
	departments: Department[];
}

export interface Department {
	departmentId: number;
	displayName: string;
}

export type DepartmentList = Department[];

export interface SearchResponse {
	total: number;
	objectIDs: number[];
}
