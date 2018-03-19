export class Districts {
  displayFieldName: string;
  fieldAliases: FieldAliases;
  geometryType: string;
  spatialReference: SpatialReference;
  fields: Field[];
  features: Feature[];
}

export interface Feature {
  attributes: Attributes;
  geometry: Geometry;
}

export interface Geometry {
  rings: number[][][];
}

export interface Attributes {
  OBJECTID: number;
  DISTRICT: string;
  BM_AQ: string;
  BM_PL: string;
  BM_HVAC: string;
  BM_BL: string;
  BM_EL: string;
  BM_IR_BF: string;
  'SHAPE.AREA': number;
  'SHAPE.LEN': number;
  BM_AQ_ID: number;
  BM_PL_ID: number;
  BM_HVAC_ID: number;
  BM_BL_ID: number;
  BM_EL_ID: number;
  BM_IR_BF_ID: number;
  BM_FS: string;
  BM_FS_ID: number;
  BM_AERIAL: string;
  BM_AERIAL_ID: number;
  BM_FIR_SPR_SYS: string;
  BM_FIR_SPR_SYS_ID: number;
  BM_FIR_BRG_PNL: string;
  BM_FIR_BRG_PNL_ID: number;
  BM_CNTRLS: string;
  BM_CNTRLS_ID: number;
  BM_DIST_FOM: string;
  BM_DIST_FOM_ID: number;
}

export interface Field {
  name: string;
  type: string;
  alias: string;
  length?: number;
}

export interface SpatialReference {
  wkid: number;
  latestWkid: number;
}

export interface FieldAliases {
  OBJECTID: string;
  DISTRICT: string;
  BM_AQ: string;
  BM_PL: string;
  BM_HVAC: string;
  BM_BL: string;
  BM_EL: string;
  BM_IR_BF: string;
  'SHAPE.AREA': string;
  'SHAPE.LEN': string;
  BM_AQ_ID: string;
  BM_PL_ID: string;
  BM_HVAC_ID: string;
  BM_BL_ID: string;
  BM_EL_ID: string;
  BM_IR_BF_ID: string;
  BM_FS: string;
  BM_FS_ID: string;
  BM_AERIAL: string;
  BM_AERIAL_ID: string;
  BM_FIR_SPR_SYS: string;
  BM_FIR_SPR_SYS_ID: string;
  BM_FIR_BRG_PNL: string;
  BM_FIR_BRG_PNL_ID: string;
  BM_CNTRLS: string;
  BM_CNTRLS_ID: string;
  BM_DIST_FOM: string;
  BM_DIST_FOM_ID: string;
}