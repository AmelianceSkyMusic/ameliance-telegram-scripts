import { handleAppError } from './handle-app-error';
import { sendMessage } from './send-message';

import { Context } from 'grammy';

export async function sendMessageHTML(
	ctx: Context,
	text: string,
	mode?: 'mention' | '',
	params: Record<string, string> = {},
) {
	try {
		const message = await sendMessage(ctx, text, mode, {
			parse_mode: 'HTML',
			...params,
		});
		return message;
	} catch (error) {
		handleAppError(ctx, error);
	}
}
