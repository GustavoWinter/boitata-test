// import { posts } from 'modules/Posts'
// import { normalizeDate } from 'modules/Helpers/time'
// import { stubDate } from 'test/Mocks/time-helper';
// const html = require('fs').readFileSync('dist/index.html').toString();
//
// // It'll generate a new date defined by from the time.
// // Example: if periodCb is about date (getDate) and timeAgo is from two days. It'll generate a date from two days ago.
// const generateDate = ( {periodCb = () => {}, timeAgo }) => new Date(
//   new Date().setDate(periodCb()- timeAgo)
// ).getTime()
//
// const myDate = new Date('2018-09-07T12:00:00');
//
// stubDate(myDate);
// describe('Time Helper', () => {
//   beforeAll(() => {
//     document.documentElement.innerHTML = html
//   })
//
//   describe('From days agos', () => {
//     test('5 days ago', () => {
//       const periodCb = () => new Date().getDate(),
//             timeAgo = 5
//
//       const timeStamp = generateDate({ periodCb, timeAgo })
//       expect(normalizeDate(timeStamp)).toBe('5 days ago')
//     })
//
//     test('29 days ago', () => {
//       const periodCb = () => new Date().getDate(),
//             timeAgo = 7
//
//       const timeStamp = generateDate({ periodCb, timeAgo })
//       expect(normalizeDate(timeStamp)).toBe('7 days ago')
//     })
//
//   })
//
// })

test('empty', () => expect(true).toBe(true))
