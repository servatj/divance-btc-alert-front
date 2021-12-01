import calc from '../../lib/calc'

describe('Calc', () => {

  describe('Get Drop Calculation', () => {
    it('Should show drop from ath properly',  () => {
      const currentPrice = 80;
      const highPrice = 100;

      const result = calc.getDrop(currentPrice, highPrice);
      expect(result).toEqual(20)
    })


    it('Should show 0 if price is higher than ATH',  () => {
      const currentPrice = 110;
      const highPrice = 100;

      const result = calc.getDrop(currentPrice, highPrice);
      expect(result).toEqual(0)
    })
  })

  describe('Get Drop Bar Calculation', () => {
    it('Should show drop from ath properly',  () => {
      const currentPrice = 80;
      const highPrice = 100;

      const result = calc.getDropBar(currentPrice, highPrice);
      expect(result).toEqual(80)
    })


    it('Should show 100 if price is higher than ATH',  () => {
      const currentPrice = 110;
      const highPrice = 100;

      const result = calc.getDropBar(currentPrice, highPrice);
      expect(result).toEqual(100)
    })
  })


})