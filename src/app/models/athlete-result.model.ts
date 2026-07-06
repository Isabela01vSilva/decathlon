export interface AthleteResult {
  athlete: string,
  results: Result[]
}

export interface Result {
  type: string,
  result: string | number
}

export interface ColumnDef {
  field: number
  header: string
}
