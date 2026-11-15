import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
const {default:worker}=await import('../dist/server/index.js');
async function render(path='/') {const response=await worker.fetch(new Request('http://localhost'+path,{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}}); return {response,html:await response.text()};}
test('home renders indexable salon content and service links',async()=>{const {response,html}=await render();assert.equal(response.status,200);assert.match(html,/Nail Salon in Winter Garden/);assert.match(html,/name="robots"[^>]+index/);assert.match(html,/openingHoursSpecification/);assert.match(html,/Business hours/);assert.doesNotMatch(html,/Short, practical advice can be added|Your site is taking shape/);for(const slug of ['pedicures','gel-x','acrylic-nails','manicures'])assert.ok(html.includes('/services/'+slug));});
for(const slug of ['pedicures','gel-x','acrylic-nails','manicures'])test(slug+' has unique canonical and rendered menu',async()=>{const {response,html}=await render('/services/'+slug);assert.equal(response.status,200);assert.ok(html.includes('https://nailslovely.com/services/'+slug));assert.match(html,/Services and starting prices/);assert.match(html,/3317 Daniels Rd/);assert.match(html,/Book Appointment/);});
test('unknown service returns 404',async()=>{const {response}=await render('/services/not-a-real-service');assert.equal(response.status,404);});
test('sitemap lists all five pages',async()=>{const xml=await readFile(new URL('../public/sitemap.xml',import.meta.url),'utf8');assert.equal((xml.match(/<loc>/g)||[]).length,5);});

test('confirmed acrylic length prices render in service guide', async()=>{const {html}=await render('/services/acrylic-nails'); for(const [name,price] of [['Medium Length','+$7'],['Long Length','+$10'],['Extra-Long Length','+$15']]) {assert.ok(html.includes(name)); assert.ok(html.includes(price));} assert.ok(!html.includes('>Extra Length<'));});
test('confirmed regular manicure price renders', async()=>{const {html}=await render('/services/manicures');assert.match(html,/Regular Manicure/);assert.ok(html.includes('$25'));});
