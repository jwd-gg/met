![npm](https://img.shields.io/npm/v/@jwd-gg/met?color=blue) ![bun](https://img.shields.io/badge/runtime-Bun-pink) ![license](https://img.shields.io/badge/license-MIT-green)

A lightweight TypeScript client for the Metropolitan Museum of Art Collection API.

---

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [`fetcher.getObjects()`](#fetchergetobjects)
  - [`fetcher.getObject(id)`](#fetchergetobjectid)
  - [`fetcher.getDepartments()`](#fetchergetdepartments)
  - [`fetcher.search(query, options?)`](#fetchersearchquery-options)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install with Bun:

```bash
bun add @jwd-gg/met
```

Or with npm/yarn:

```bash
npm install @jwd-gg/met --save
# or
yarn add @jwd-gg/met
```

## Usage

```ts
import { fetcher } from '@jwd-gg/met';

async function main() {
  try {
    const { total, objectIDs } = await fetcher.getObjects();
    console.log(`Found ${total} objects. First IDs:`, objectIDs.slice(0, 5));

    const firstId = objectIDs[0];
    const details = await fetcher.getObject(firstId);
    console.log(`Title of object ${firstId}:`, details.title);
  } catch (err) {
    console.error(err);
  }
}

main();
// Found 495651 objects. First IDs: [ 1, 2, 3, 4, 5 ]
// Title of object 1: One-dollar Liberty Head Coin
```


## API Reference

### `fetcher.getObjects()`

Fetches the total number of objects and a list of all object IDs currently in the collection that are available via the API.

**Signature:**
```typescript
fetcher.getObjects(): Promise<ObjectsResponse>
```

**Returns:** `Promise<ObjectsResponse>`

<details>
  <summary>View <code>ObjectsResponse</code> Type</summary>

  ```typescript
  export interface ObjectsResponse {
    /** The total number of object IDs */
    total: number;
    /** An array of object IDs */
    objectIDs: number[];
  }
  ```
</details>

---

### `fetcher.getObject(id)`

Retrieves detailed information for a single object identified by its `objectID`.

**Signature:**
```typescript
fetcher.getObject(id: number): Promise<ObjectDetails>
```

**Parameters:**
- `id` (number): The unique identifier for the object.

**Returns:** `Promise<ObjectDetails>`

<details>
  <summary>View <code>ObjectDetails</code> Type</summary>

  ```typescript
  // Note: Some fields are optional and may not be present for all objects.

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
    /** A unique identifier for the object */
    objectID: number;
    /** Indicates if the object is a highlight */
    isHighlight: boolean;
    /** The object's accession number */
    accessionNumber: string;
    /** The year the object was accessioned */
    accessionYear: string;
    /** Indicates if the object is in the public domain */
    isPublicDomain: boolean;
    /** URL to the primary image */
    primaryImage: string;
    /** URL to a smaller version of the primary image */
    primaryImageSmall: string;
    /** URLs to additional images, if available */
    additionalImages: string[];
    /** Information about the artists or makers */
    constituents: Constituent[] | null;
    /** The department associated with the object */
    department: string;
    /** The type of object */
    objectName: string;
    /** The title of the object */
    title: string;
    /** Information about the culture or people associated with the object */
    culture: string;
    /** The historical period */
    period: string;
    /** The dynasty, if applicable */
    dynasty: string;
    /** The reign, if applicable */
    reign: string;
    /** Portfolio information, if applicable */
    portfolio: string;
    /** Role of the primary artist */
    artistRole: string;
    /** Prefix for the artist's name */
    artistPrefix: string;
    /** Display name for the artist */
    artistDisplayName: string;
    /** Biographical information for the artist */
    artistDisplayBio: string;
    /** Suffix for the artist's name */
    artistSuffix: string;
    /** Sorted version of the artist's name */
    artistAlphaSort: string;
    /** Nationality of the artist */
    artistNationality: string;
    /** Start year of the artist's life */
    artistBeginDate: string;
    /** End year of the artist's life */
    artistEndDate: string;
    /** Gender of the artist */
    artistGender?: string;
    /** Wikidata URL for the artist */
    artistWikidata_URL?: string;
    /** ULAN URL for the artist */
    artistULAN_URL?: string;
    /** Date of the object's creation or origin */
    objectDate: string;
    /** Start year for the object's date */
    objectBeginDate: number;
    /** End year for the object's date */
    objectEndDate: number;
    /** Materials used to create the object */
    medium: string;
    /** Text description of the object's dimensions */
    dimensions: string;
    /** Parsed dimensions, if available */
    dimensionsParsed: ParsedDimension[] | null;
    /** Detailed measurements, if available */
    measurements: Measurement[] | null;
    /** Credit line for the object */
    creditLine: string;
    /** Type of geographical location associated with the object */
    geographyType: string;
    /** City associated with the object */
    city: string;
    /** State associated with the object */
    state: string;
    /** County associated with the object */
    county: string;
    /** Country associated with the object */
    country: string;
    /** Region associated with the object */
    region: string;
    /** Subregion associated with the object */
    subregion: string;
    /** Locale associated with the object */
    locale: string;
    /** Locus associated with the object */
    locus: string;
    /** Excavation site, if applicable */
    excavation: string;
    /** River associated with the object */
    river: string;
    /** General classification of the object */
    classification: string;
    /** Rights and reproduction information */
    rightsAndReproduction: string;
    /** Link to an external resource, often the object page on metmuseum.org */
    linkResource: string;
    /** Date the metadata was last updated */
    metadataDate: string;
    /** Repository where the object is held (usually "The Metropolitan Museum of Art") */
    repository: string;
    /** URL to the object's page on metmuseum.org */
    objectURL: string;
    /** Associated tags or keywords */
    tags: Tag[] | null;
    /** Wikidata URL for the object */
    objectWikidata_URL?: string;
    /** Indicates if the object is considered a timeline work */
    isTimelineWork: boolean;
    /** Gallery number where the object might be displayed */
    GalleryNumber: string;
  }
  ```
</details>

---

### `fetcher.getDepartments()`

Retrieves the list of museum departments, including their names and IDs.

**Signature:**
```typescript
fetcher.getDepartments(): Promise<DepartmentList>
```

**Returns:** `Promise<DepartmentList>`

<details>
  <summary>View <code>DepartmentList</code> & <code>Department</code> Types</summary>

  ```typescript
  export interface Department {
    /** A unique identifier for the department */
    departmentId: number;
    /** The display name of the department */
    displayName: string;
  }

  /** An array of Department objects */
  export type DepartmentList = Department[];
  ```
</details>

---

### `fetcher.search(query, options?)`

Performs a search across the collection based on a keyword or query string. Returns the total number of matching objects and their IDs.

**Signature:**
```typescript
fetcher.search(q: string, options?: SearchOptions): Promise<SearchResponse>
```

**Parameters:**
- `q` (string): The search query string (required).
- `options` (SearchOptions, optional): An object containing filter parameters.

**Returns:** `Promise<SearchResponse>`

<details>
  <summary>View <code>SearchOptions</code> Type</summary>

  ```typescript
  export interface SearchOptions {
    /** Set to true to search only for highlighted objects. */
    isHighlight?: boolean;
    /** Set to true to search only against the title field. */
    title?: boolean;
    /** Set to true to search only against the subject keyword tags field. */
    tags?: boolean;
    /** Restricts search to a specific department by ID. */
    departmentId?: number;
    /** Set to true to search only for objects currently on view. */
    isOnView?: boolean;
    /** Set to true to search only against the artist name or culture field. */
    artistOrCulture?: boolean;
    /** Filter by medium. Accepts a single string or an array of strings (e.g., "Paintings", ["Ceramics", "Furniture"]). */
    medium?: string | string[];
    /** Set to true to search only for objects with images. */
    hasImages?: boolean;
    /** Filter by geographic location. Accepts a single string or an array of strings (e.g., "Europe", ["France", "Paris"]). */
    geoLocation?: string | string[];
    /** Start year for date range filter (inclusive). Requires dateEnd. */
    dateBegin?: number;
    /** End year for date range filter (inclusive). Requires dateBegin. */
    dateEnd?: number;
  }
  ```
</details>

<details>
  <summary>View <code>SearchResponse</code> Type</summary>

  ```typescript
  export interface SearchResponse {
    /** The total number of objects matching the search query */
    total: number;
    /** An array of object IDs matching the search query. Can be null if no results are found. */
    objectIDs: number[] | null; // API documentation notes it can be null
  }
  ```
</details>

---

## Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jwd-gg/met.git
    cd met
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Build:**
    ```bash
    bun run build
    ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the **MIT** License. See the [LICENSE](LICENSE) file for details, or refer to [https://choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/).
