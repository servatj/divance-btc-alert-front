import calc from '../../lib/calc'

describe('Calc', () => {

  it('Should show drop from ath properly',  () => {
    const currentPrice = 80;
    const highPrice = 100;

    const result = calc.getDrop(currentPrice, highPrice);
    expect(result).toEqual(20)
  })

  it('', () => {

  })

})