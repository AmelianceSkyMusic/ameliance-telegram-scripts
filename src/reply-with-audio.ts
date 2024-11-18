import { handleAppError } from './handle-app-error';

import { Context, InputFile } from 'grammy';

export async function replyWithAudio(
	ctx: Context,
	audio: InputFile | string,
	thumbnail?: InputFile,
) {
	try {
		await ctx.replyWithAudio(audio, { thumbnail });
	} catch (error) {
		handleAppError(ctx, error);
	}
}
