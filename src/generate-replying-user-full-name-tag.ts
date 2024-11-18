import { generateFullName } from './generate-full-name';
import { generateUserTag } from './generate-user-tag';

import { Context } from 'grammy';

export function generateReplyingUserFullNameTag(ctx: Context): string {
	const replyToMessage = ctx.msg?.reply_to_message;

	if (replyToMessage) {
		const repliedMessageUserId = replyToMessage.from?.id || '';
		const repliedMessageUserFirstName = replyToMessage.from?.first_name || '';
		const repliedMessageUserLastName = replyToMessage.from?.last_name || '';
		const repliedMessageUserFullName = generateFullName(
			repliedMessageUserFirstName,
			repliedMessageUserLastName,
		);

		return generateUserTag(repliedMessageUserId, repliedMessageUserFullName);
	}
	return '';
}
