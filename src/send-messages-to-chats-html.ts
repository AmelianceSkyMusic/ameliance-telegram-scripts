import { handleAppError } from './handle-app-error';
import { Params, sendMessagesToChats } from './send-messages-to-chats';

import { AbortSignal } from 'abort-controller';
import { Context } from 'grammy';

export async function sendMessagesToChatsHTML(
	ctx: Context,
	userIds: (number | string)[],
	text: string,
	params?: Params,
	signal?: AbortSignal,
) {
	try {
		const messages = await sendMessagesToChats(
			ctx,
			userIds,
			text,
			{ parse_mode: 'HTML', ...params },
			signal,
		);
		return messages;
	} catch (error) {
		handleAppError(ctx, error);
	}
}
