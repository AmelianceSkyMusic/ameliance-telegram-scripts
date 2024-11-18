import { Message } from 'grammy/types';

export function getLinksFromMessage(msg: Message | undefined): string[] | null {
	if (!msg) return null;
	const urlEntities = msg.entities?.filter((entity) => entity.type === 'url');

	const urls = urlEntities?.map((entity) =>
		String(msg.text).slice(entity.offset, entity.offset + entity.length),
	);

	if (urls && urls.length > 0) return urls;
	return null;
}
