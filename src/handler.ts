import { Router, Sunder } from 'sunder';
import { renderErrorsAsJSON } from 'sunder/middleware/render';
import { pickKeys } from './util';
import { Comment, GetResponse, StoredComment } from './types';

const app = new Sunder();
const router = new Router();

router.get('/comments/:article', async ({ params, response }) => {
  const content: GetResponse = { comments: [] };
  const article = params.article;

  const values = await COMMENTS_KV.list({
    prefix: article + '-',
  });
  for (const key of values.keys) {
    console.log('Found comment: ' + key.name);
    const jsonComment = (await COMMENTS_KV.get(key.name)) as string;
    const storedComment = JSON.parse(jsonComment) as StoredComment;
    const comment = pickKeys(storedComment, [
      'name',
      'profile',
      'content',
      'time',
    ]);
    content.comments.push(comment);
  }

  response.status = 200;
  response.body = content;
  response.headers.set('Cache-Control', 'public, max-age=300');
});

router.post('/comments/:article', async ({ request, response, params }) => {
  const time = Date.now();
  const body: Comment = await request.json();
  const key = `${params.article.replace('/', '')}-${Date.now()}`;
  const digest = await crypto.subtle.digest(
    'MD5',
    new TextEncoder().encode(body.email),
  );
  const profile =
    'https://www.gravatar.com/avatar/' +
    Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  const comment: StoredComment = {
    ...body,
    user_ip: request.headers.get('cf-connecting-ip') ?? '',
    user_agent: request.headers.get('User-Agent') ?? '',
    referrer: request.headers.get('Referer') ?? '',
    profile,
    time: time,
  };
  await COMMENTS_KV.put(key, JSON.stringify(comment));
  response.body = {
    ...body,
    profile,
    time,
  };
});

app.use(renderErrorsAsJSON);
app.use(router.middleware);
export default app;
