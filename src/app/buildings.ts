export class Buildings {
  displayFieldName: string;
  fieldAliases: FieldAliases;
  geometryType: string;
  spatialReference: SpatialReference;
  fields: Field[];
  features: Feature[];
}

export interface FieldAliases {
  OBJECTID: string;
  SITE: string;
  CATEGORY: string;
  SUBCATEGORY: string;
  EXISTING: string;
  YEARBUILT: string;
  FACILITYID: string;
  LOCATION: string;
  LEGACYID: string;
  WEBFORM: string;
}

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}

export interface Field {
  name: string;
  type: string;
  alias: string;
  length?: number;
}

export interface Attributes {
  OBJECTID: number;
  SITE: string;
  CATEGORY: number;
  SUBCATEGORY: string;
  EXISTING: string;
  YEARBUILT: string;
  FACILITYID: string;
  LOCATION: string;
  LEGACYID: string;
  WEBFORM: string;
}

export interface Geometry {
  x: number;
  y: number;
}

export interface Feature {
  attributes: Attributes;
  geometry: Geometry;
}