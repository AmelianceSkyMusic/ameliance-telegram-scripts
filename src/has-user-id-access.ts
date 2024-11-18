import 'dotenv/config';
import { Context } from 'grammy';

export function hasUserIdAccess(ctx: Context, userIdWithAccess?: (string | number)[] | null) {
	const userIds = String(process.env.USER_IDS_WITH_ACCESS);
	const accessUserIds = userIdWithAccess || userIds.split(',');
	const currentUserId = String(ctx.msg?.from?.id);
	const hasAccessMatch = accessUserIds.includes(currentUserId);
	return hasAccessMatch;
}
