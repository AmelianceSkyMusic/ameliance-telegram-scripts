import { handleAppError } from './handle-app-error';

import { Context } from 'grammy';

export async function getHTMLData(ctx: Context, url: string) {
	try {
		const data = await fetch(url);
		const contentType = data.headers.get('Content-Type');
		let encoding = 'utf-8';

		if (contentType) {
			const match = contentType.match(/charset=([^;]+)/);
			if (match) encoding = match[1];
		}

		const arrayBuffer = await data.arrayBuffer();
		const decoder = new TextDecoder(encoding);

		const html = decoder.decode(arrayBuffer);

		return html;
	} catch (error) {
		handleAppError(ctx, error);
	}
}
