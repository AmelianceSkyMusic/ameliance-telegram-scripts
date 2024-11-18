import { generateUserFullNameTag } from './generate-user-full-name-tag';
import { handleAppError } from './handle-app-error';
import { removeMessageById } from './remove-message-by-id';
import { replyHTML } from './reply-html';
import { sendMessageHTML } from './send-message-html';

import { Context } from 'grammy';

interface AutoRemovableMessage {
	ctx: Context;
	text: string;
	reply?: boolean;
	mention?: boolean;
	ms?: number;
}

export async function autoRemovableMessage({
	ctx,
	text,
	reply = false,
	mention = false,
	ms = 3600,
}: AutoRemovableMessage) {
	const messageId = ctx.msg?.message_id;

	const messageUserTag = mention ? `${generateUserFullNameTag(ctx)}, ` : '';

	let sendMessage = null;
	try {
		if (reply) {
			await replyHTML(ctx, text, 'mention', messageId);
		} else {
			sendMessage = await sendMessageHTML(ctx, `${messageUserTag}${text}`);
		}

		if (sendMessage) {
			await removeMessageById({ ctx, messageId: sendMessage.message_id, ms });
		}
	} catch (error) {
		handleAppError(ctx, error);
	}
}
