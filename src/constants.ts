const BIRD_SRC = new Image();
BIRD_SRC.src = "./assets/imgs/bird.png";

const BACKGROUND_SRC = new Image();
BACKGROUND_SRC.src = "./assets/imgs/background.png";

const GROUND_SRC = new Image();
GROUND_SRC.src = "./assets/imgs/ground.png";

const PIPE_GREEN_SRC = new Image();
PIPE_GREEN_SRC.src = "./assets/imgs/pipe-green.png";

const PIPE_GREEN_INV_SRC = new Image();
PIPE_GREEN_INV_SRC.src = "./assets/imgs/pipe-green-inverted.png";

const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 50;
const INTERVAL = 15;
const JUMP = 300;
const FALL = 10;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 390;
const SPEED = 2;
const GROUND_HEIGHT = 40;
const SPACE_BEETWEN_PIPES = 160;
const PIPES_WIDTH = 1.5 * BIRD_WIDTH;
const PIPES_GAP = 150;
const BIRD_START_Y = Math.round((CANVAS_HEIGHT - GROUND_HEIGHT) / 2 - BIRD_HEIGHT / 2);
const BIRD_START_X = 50;
const STARTING_PIPE_DISTANCE = 300;

export {
  BIRD_SRC,
  BACKGROUND_SRC,
  GROUND_SRC,
  PIPE_GREEN_SRC,
  PIPE_GREEN_INV_SRC,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  INTERVAL,
  JUMP,
  FALL,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SPEED,
  GROUND_HEIGHT,
  SPACE_BEETWEN_PIPES,
  PIPES_WIDTH,
  PIPES_GAP,
  BIRD_START_Y,
  BIRD_START_X,
  STARTING_PIPE_DISTANCE,
};
