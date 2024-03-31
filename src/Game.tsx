import { useEffect, useRef, useState } from 'react';
import {
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
	STARTING_PIPE_DISTANCE
} from './constants';
import EndGameStats from './EndGameStats';
import { BoundingBox, PipeCoordinates } from './types';
import { GameLoopController } from './GameLoopController';

function Game() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const gameLoop = useRef<GameLoopController>();
	let birdYPos = BIRD_START_Y;
	let birdYGravity = 0;
	let groundX = 0;
	let firstPipeX = STARTING_PIPE_DISTANCE;
	let secondPipeX = firstPipeX + PIPES_WIDTH + SPACE_BEETWEN_PIPES;
	let thirdPipeX = secondPipeX + PIPES_WIDTH + SPACE_BEETWEN_PIPES;
	let firstPipeY = generatePipeBottomYPos();
	let secondPipeY = generatePipeBottomYPos();
	let thirdPipeY = generatePipeBottomYPos();
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	/**
	 * Draw entire game screen
	 * @param canvasContext
	 */
	const drawGame = (canvasContext: CanvasRenderingContext2D) => {
		canvasContext.fillStyle = '#71c5cf';
		canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(BACKGROUND_SRC, groundX, CANVAS_HEIGHT * 0.9 - GROUND_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT * 0.1);
		canvasContext.drawImage(BACKGROUND_SRC, groundX + CANVAS_WIDTH, CANVAS_HEIGHT * 0.9 - GROUND_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT * 0.1);
		canvasContext.drawImage(PIPE_GREEN_SRC, firstPipeX, firstPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(PIPE_GREEN_INV_SRC, firstPipeX, -CANVAS_HEIGHT - PIPES_GAP + firstPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(PIPE_GREEN_SRC, secondPipeX, secondPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(PIPE_GREEN_INV_SRC, secondPipeX, -CANVAS_HEIGHT - PIPES_GAP + secondPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(PIPE_GREEN_SRC, thirdPipeX, thirdPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(PIPE_GREEN_INV_SRC, thirdPipeX, -CANVAS_HEIGHT - PIPES_GAP + thirdPipeY, PIPES_WIDTH, CANVAS_HEIGHT);
		canvasContext.drawImage(BIRD_SRC, BIRD_START_X, birdYPos, BIRD_HEIGHT, BIRD_WIDTH);
		canvasContext.drawImage(GROUND_SRC, groundX, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
		canvasContext.drawImage(GROUND_SRC, groundX + CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
	};

	/**
	 *
	 * @returns Random Y position to lower pipe
	 */
	function generatePipeBottomYPos() {
		return Math.round(Math.random() * 200) + 250;
	}

	/**
	 * Helper function to check collision
	 * @param birdBoundingBox
	 * @param pipeBoundingBox
	 * @returns collision state
	 */
	const checkCollision = (birdBoundingBox: BoundingBox, pipeBoundingBox: BoundingBox) => {
		if (
			birdBoundingBox.x <= pipeBoundingBox.x + pipeBoundingBox.width &&
			birdBoundingBox.x + birdBoundingBox.width >= pipeBoundingBox.x &&
			birdBoundingBox.y <= pipeBoundingBox.y + pipeBoundingBox.height &&
			birdBoundingBox.y + birdBoundingBox.height >= pipeBoundingBox.y
		) {
			return true;
		}
		return false;
	};

	/**
	 *  Update global game variables
	 */
	const updateGameLogic = () => {
		if (groundX <= -CANVAS_WIDTH) {
			groundX = 0;
		}

		if (firstPipeX <= -PIPES_WIDTH) {
			firstPipeX = thirdPipeX + PIPES_WIDTH + SPACE_BEETWEN_PIPES;
			firstPipeY = generatePipeBottomYPos();
			setScore((prevScore) => ++prevScore);
		}

		if (secondPipeX <= -PIPES_WIDTH) {
			secondPipeX = firstPipeX + PIPES_WIDTH + SPACE_BEETWEN_PIPES;
			secondPipeY = generatePipeBottomYPos();
			setScore((prevScore) => ++prevScore);
		}

		if (thirdPipeX <= -PIPES_WIDTH) {
			thirdPipeX = secondPipeX + PIPES_WIDTH + SPACE_BEETWEN_PIPES;
			thirdPipeY = generatePipeBottomYPos();
			setScore((prevScore) => ++prevScore);
		}

		birdYPos += Math.round(birdYGravity * (INTERVAL / 1000));
		birdYGravity += FALL;
		groundX -= SPEED;
		firstPipeX -= SPEED;
		secondPipeX -= SPEED;
		thirdPipeX -= SPEED;
	};

	useEffect(() => {
		if (canvasRef.current && !isGameOver) {
			const canvasContext = canvasRef.current.getContext('2d');
			if (canvasContext) {
				spaceEventListener();

				gameLoop.current = new GameLoopController(() => {
					checkIfGameOver();
					drawGame(canvasContext);
					updateGameLogic();
				}, INTERVAL);
			}
		}

		return () => {
			gameLoop.current?.end();
			window.removeEventListener('keypress', handleKeyPress);
			window.removeEventListener('mousedown', handleMouseDown);
		};
	}, [isGameOver]);

	/**
	 * Helper function to collision detection logic
	 * @param firstPipeX
	 * @param secondPipeX
	 * @param thirdPipeX
	 * @param firstPipeY
	 * @param secondPipeY
	 * @param thirdPipeY
	 * @returns X and Y coordinates to nearest pipe
	 */
	const findNearestPipe = (
		firstPipeX: number,
		secondPipeX: number,
		thirdPipeX: number,
		firstPipeY: number,
		secondPipeY: number,
		thirdPipeY: number
	): PipeCoordinates => {
		const pipes: PipeCoordinates[] = [
			{ x: firstPipeX, y: firstPipeY },
			{ x: secondPipeX, y: secondPipeY },
			{ x: thirdPipeX, y: thirdPipeY }
		];
		pipes.sort((pipeA, pipeB) => pipeA.x - pipeB.x);
		// Filter out pipes with negative X positions
		const validPipes = pipes.filter((pipe) => pipe.x >= 0);
		// Find the closest pipe based on X position
		const closestPipe = validPipes[0];
		return closestPipe;
	};

	/**
	 * Collision detection logic
	 */
	const checkIfGameOver = () => {
		const { x: nearestPipeX, y: nearestPipeY } = findNearestPipe(firstPipeX, secondPipeX, thirdPipeX, firstPipeY, secondPipeY, thirdPipeY);

		const birdHitbox: BoundingBox = {
			x: BIRD_START_X,
			y: birdYPos,
			width: BIRD_WIDTH + 8,
			height: BIRD_HEIGHT - 8
		};

		const upperPipe: BoundingBox = {
			x: nearestPipeX,
			y: 0,
			width: PIPES_WIDTH,
			height: nearestPipeY - PIPES_GAP
		};

		const lowerPipe: BoundingBox = {
			x: nearestPipeX,
			y: nearestPipeY,
			width: PIPES_WIDTH,
			height: CANVAS_HEIGHT - nearestPipeY
		};

		if (checkCollision(birdHitbox, upperPipe) || checkCollision(birdHitbox, lowerPipe) || birdHitbox.y + birdHitbox.height > CANVAS_HEIGHT - GROUND_HEIGHT) {
			gameLoop.current?.end();
			setIsGameOver(true);
		}

		// if (birdHitbox.y + birdHitbox.height > CANVAS_HEIGHT - GROUND_HEIGHT) {
		//   gameLoop.current?.end();
		//   setIsGameOver(true);
		// }
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			birdYGravity = -JUMP;
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		if (e.button === 0) {
			birdYGravity = -JUMP;
		}
	};

	const spaceEventListener = () => {
		window.addEventListener('keypress', handleKeyPress);
		window.addEventListener('mousedown', handleMouseDown);
	};

	return (
		<>
			<canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
			{!isGameOver && (
				<span
					style={{
						color: '#fff',
						fontSize: '72px',
						position: 'absolute',
						left: '50%',
						top: '100px',
						transform: 'translateX(-50%)',
						textShadow: '2px 2px 4px black'
					}}>
					{score}
				</span>
			)}
			{isGameOver && <EndGameStats setScore={setScore} setIsGameOver={setIsGameOver} score={score}></EndGameStats>}
		</>
	);
}

export default Game;
