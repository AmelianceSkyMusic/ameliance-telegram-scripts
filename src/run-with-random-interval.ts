import { getCurrentTimeWithOffset, getRandomNumber } from 'ameliance-scripts';
import { Context } from 'grammy';

const oneMinInMs = 1000 * 60;

export async function runWithRandomInterval(
	ctx: Context,
	callback: () => void,
	min: number,
	max: number,
) {
	callback();

	const randomInterval = getRandomNumber(min, max) * oneMinInMs;
	ctx.reply(
		`Next post will be sent at: ${getCurrentTimeWithOffset(randomInterval)}\nPost delay: ${
			randomInterval / oneMinInMs
		} minutes`,
	);

	setTimeout(() => {
		runWithRandomInterval(ctx, callback, min, max);
	}, randomInterval);
}
