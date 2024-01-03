import { RandomPasswordPipe } from './random-password.pipe';

describe('RandomPasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new RandomPasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
