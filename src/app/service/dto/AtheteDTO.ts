export interface AthleteDTOComPosicao extends AthleteDTO {
  position: string;
}

export interface AthleteDTO {
  name: string,
  modalityPoints: ModalityPointsDTO[]
}

export interface ModalityPointsDTO {
  name: string
  points: number
}
