import { generateUserFullNameTag } from './generate-user-full-name-tag';
import { handleAppError } from './handle-app-error';

import { AbortSignal } from 'abort-controller';
import { Context, RawApi } from 'grammy';
import { Other } from 'grammy/out/core/api';

export type Params = Other<RawApi, 'sendMessage', 'text' | 'chat_id'> & { mention?: boolean };

export async function sendMessagesToChats(
	ctx: Context,
	userIds: (number | string)[],
	text: string,
	params?: Params,
	signal?: AbortSignal,
) {
	const preparedUserIds = userIds.filter((id) => String(id).trim().length > 0);
	try {
		if (!preparedUserIds || preparedUserIds.length === 0) throw new Error('User ids not found');

		const { mention = false, ...restParams } = params || {};
		const messageText = mention ? `${generateUserFullNameTag(ctx)}, ${text}` : text;

		return await Promise.all(
			userIds.map((id) => ctx.api.sendMessage(id, messageText, restParams, signal)),
		);
	} catch (error) {
		handleAppError(ctx, error);
	}
}
