import { hasChannelIdAccess } from './has-channel-id-access';
import { hasChatIdAccess } from './has-chat-id-access';
import { hasUserIdAccess } from './has-user-id-access';
import { hasUsernameAccess } from './has-username-access';
import { logUserInfo } from './log-user-info';

import { Context } from 'grammy';

type HasNoAccess = {
	ctx: Context;
	chatIdWithAccess?: (string | number)[] | null;
	channelIdWithAccess?: (string | number)[] | null;
	userIdWithAccess?: (string | number)[] | null;
	usernameWithAccess?: (string | number)[] | null;
	checkChatId?: boolean;
	checkChannelId?: boolean;
	checkUserId?: boolean;
	checkUsername?: boolean;
};

export function hasNoAccess({
	ctx,
	chatIdWithAccess,
	channelIdWithAccess,
	userIdWithAccess,
	usernameWithAccess,
	checkChatId = true,
	checkChannelId = true,
	checkUserId = true,
	checkUsername = true,
}: HasNoAccess) {
	const hasCurrentChatIdAccess = checkChatId ? hasChatIdAccess(ctx, chatIdWithAccess) : true;
	const hasCurrentChannelIdAccess = checkChannelId
		? hasChannelIdAccess(ctx, channelIdWithAccess)
		: true;
	const hasCurrentUserIdAccess = checkUserId ? hasUserIdAccess(ctx, userIdWithAccess) : true;
	const hasCurrentUsernameAccess = checkUsername
		? hasUsernameAccess(ctx, usernameWithAccess)
		: true;

	if (
		hasCurrentChatIdAccess ||
		hasCurrentChannelIdAccess ||
		hasCurrentUserIdAccess ||
		hasCurrentUsernameAccess
	) {
		return false;
	}

	logUserInfo(ctx, `has no access`);
	return true;
}
