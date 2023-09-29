export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PipeCoordinates {
  x: number;
  y: number;
}

export type GameState =
  | "gameOver"
  | "gamePaused"
  | "gameRunning"
  | "gameResuming";
