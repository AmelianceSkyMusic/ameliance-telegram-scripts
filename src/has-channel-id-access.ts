import 'dotenv/config';
import { Context } from 'grammy';

export function hasChannelIdAccess(ctx: Context, channelIdWithAccess?: (string | number)[] | null) {
	const channels = String(process.env.CHANNEL_IDS_WITH_ACCESS);
	const accessChannels = channelIdWithAccess || channels.split(',');
	const currentChannels = String(ctx.msg?.chat.id);
	const hasAccessMatch = accessChannels.includes(currentChannels);
	return hasAccessMatch;
}
