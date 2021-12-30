import app from './handler';

addEventListener('fetch', (event) => {
  event.respondWith(app.handle(event));
});
