import { Router, Sunder } from 'sunder';
import { renderErrorsAsJSON } from 'sunder/middleware/render';
import { hash, pickKeys } from './util';
import { Comment, GetResponse, StoredComment } from './types';
import { config } from './config';
import { commentValidator } from './validators';
import { BadRequest } from 'http-errors';
import { corsHeaders } from './middleware';

const app = new Sunder();
const router = new Router();

router.get('/comments/:article', async ({ request, params, response }) => {
  const content: GetResponse = { comments: [], cursor: null };
  const article = await hash('SHA-512', params.article);
  const urlParams = new URLSearchParams(request.url.substring(request.url.indexOf('?')));
  console.log('url', request.url);
  console.log('limit', urlParams.get('limit'));
  console.log('cursor', urlParams.get('cursor'));
  const values = await COMMENTS_KV.list({
    prefix: article,
    limit: parseInt(urlParams.get('limit') ?? '1000'),
    cursor: urlParams.get('cursor'),
  });
  for (const key of values.keys) {
    console.log('Found comment: ' + key.name);
    const jsonComment = (await COMMENTS_KV.get(key.name)) as string;
    const storedComment = JSON.parse(jsonComment) as StoredComment;
    const comment = pickKeys(storedComment, ['name', 'profile', 'content', 'time']);
    content.comments.push({ ...comment, time: new Date(comment.time).toISOString(), id: key.name });
    if (values.cursor != null) {
      content.cursor = values.cursor;
    }
  }

  response.status = 200;
  response.body = content;
  response.headers.set('Cache-Control', 'public, max-age=300');
});

router.post('/comments/:article', async ({ request, response, params }) => {
  const time = Date.now();
  const body: Comment = await request.json();
  const valResult = commentValidator.validate(body);
  if (!valResult.valid)
    throw new BadRequest(
      'Invalid body. Errors:' +
        valResult.errors.reduce((prevValue, currentValue) => prevValue + ', ' + currentValue.error, '')
    );
  const now = Date.now().toString();
  let timestamp: string;
  if (config.reverseOrder) {
    const max = BigInt('9'.repeat(128));
    const nowBig = BigInt(now);
    timestamp = (max - nowBig).toString();
  } else {
    timestamp = '0'.repeat(128 - now.length) + now;
  }
  const key = `${await hash('SHA-512', params.article)}-${timestamp}`;
  const profile = 'https://www.gravatar.com/avatar/' + (await hash('MD5', body.email));

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
app.use(corsHeaders);
app.use(renderErrorsAsJSON);
app.use(router.middleware);
export default app;
