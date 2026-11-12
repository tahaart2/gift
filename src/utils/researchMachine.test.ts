import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SCREENS,
  BASE_MEMES,
  getNextScreen,
  getPrevScreen,
  getProgressPercentage,
  getNextBonusMeme,
  ARABIC_DUA_MAIN,
  PERSONAL_MESSAGE,
  TERMINAL_SIGNATURE
} from './researchMachine';

test('screen transition logic flows sequentially', () => {
  assert.equal(getNextScreen('intro'), 'memes');
  assert.equal(getNextScreen('memes'), 'research');
  assert.equal(getNextScreen('research'), 'final');
  // Wrapping or restarting
  assert.equal(getNextScreen('final'), 'intro');
});

test('previous screen navigation returns correct step', () => {
  assert.equal(getPrevScreen('final'), 'research');
  assert.equal(getPrevScreen('research'), 'memes');
  assert.equal(getPrevScreen('memes'), 'intro');
  assert.equal(getPrevScreen('intro'), 'intro');
});

test('progress percentage calculations are correct and bounded', () => {
  assert.equal(getProgressPercentage('intro'), 25);
  assert.equal(getProgressPercentage('memes'), 50);
  assert.equal(getProgressPercentage('research'), 75);
  assert.equal(getProgressPercentage('final'), 100);
});

test('base meme dataset has exactly 3 requested cat memes', () => {
  assert.equal(BASE_MEMES.length, 3);
  assert.ok(BASE_MEMES[0].caption.includes('17 new ones'));
  assert.ok(BASE_MEMES[1].caption.includes('wrote yesterday'));
  assert.ok(BASE_MEMES[2].caption.includes('computer disagrees'));
});

test('bonus meme rotation cycles infinitely', () => {
  const step1 = getNextBonusMeme(0);
  assert.equal(step1.nextIndex, 1);
  const step2 = getNextBonusMeme(step1.nextIndex);
  assert.equal(step2.nextIndex, 2);
  const step3 = getNextBonusMeme(step2.nextIndex);
  assert.equal(step3.nextIndex, 0);
});

test('Arabic dua and signature contain required text', () => {
  assert.ok(ARABIC_DUA_MAIN.includes('اللهم اجعل بيننا خيرًا'));
  assert.equal(PERSONAL_MESSAGE, 'I just want good things between us. ❤️');
  assert.ok(TERMINAL_SIGNATURE.some(line => line.includes('Missing piece: FOUND')));
  assert.ok(TERMINAL_SIGNATURE.some(line => line.includes('Intentions: Pure')));
});
