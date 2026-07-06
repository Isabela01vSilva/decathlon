export interface AthleteResult {
  athlete: string;
  results: EventResult[];
}

export interface EventResult {
  type: string;
  result: string | number;
}

export interface ColumnDef {
  field: string;
  header: string;
}
