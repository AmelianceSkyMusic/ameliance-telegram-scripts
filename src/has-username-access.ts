import 'dotenv/config';
import { Context } from 'grammy';

export function hasUsernameAccess(ctx: Context, usernameWithAccess?: (string | number)[] | null) {
	const users = String(process.env.USERNAMES_WITH_ACCESS);
	const accessUsernames = usernameWithAccess || users.toLocaleLowerCase().split(',');
	const username = String(ctx.msg?.from?.username).toLocaleLowerCase();
	const hasAccessMatch = accessUsernames.includes(username);
	return hasAccessMatch;
}
