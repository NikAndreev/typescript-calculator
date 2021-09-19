/**
 * @jest-environment jsdom
 */

const {clear, deleteChar, addChar, calculate} = require('./src/ts/template')

test('Clear should return empty string', ()=> {
	expect(clear()).toBe('')
})

test('DeleteChar should return string without last char', ()=> {
	expect(deleteChar('1+2*3')).toBe('1+2*')
})

test('AddChar should return string + another one char', ()=> {
	expect(addChar('1+2*', '3')).toBe('1+2*3')
})

test('Calculate should return result computed from string with math expression', ()=> {
	expect(calculate('(((22+4.5*4/2)*(23-4)/(4*3)*3)/(7-3)*(5+3*2))/(24/4)*(22-4)')).toBe('1214.8125')
})