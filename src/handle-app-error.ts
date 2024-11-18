import { ErrorHandler, errorHandler, ReturnErrorHandler } from 'ameliance-scripts';
import { Context } from 'grammy';

export type HandleAppError = ErrorHandler;

export function handleAppError(ctx: Context, error: unknown, status?: number): ReturnErrorHandler {
	const returnedError = errorHandler({
		error,
		status,
		title: process.env.APP_NAME,
		errorDepth: 1,
		wrapperCount: 1,
	});

	String(process.env.LOG_CHAT_ID)
		? ctx.api.sendMessage(
				String(process.env.LOG_CHAT_ID),
				`<blockquote><b>❗️ERROR: ${process.env.APP_NAME} > ${returnedError.code} | ${
					returnedError.message
				}</b></blockquote>\n<code>${new Error().stack
					?.split('\n')
					.map((line) => `   ${line.trim()}`)
					.splice(1, 1)
					.join('\n')}</code>\n@amelianceskymusic`,
				{ parse_mode: 'HTML' },
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  )
		: null;

	return returnedError;
}
