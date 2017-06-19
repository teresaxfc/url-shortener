const base58 = require('../base58');
const chai = require('chai');

const expect = chai.expect;

describe('base58 tests', () => {
  describe('encode decimal to base58', () => {
    it('should encode to single-digit base58 number', () => {
      expect(base58.encode('9')).equals('a');
    });

    it('should encode to two-digit base58 number', () => {
      expect(base58.encode('158')).equals('3J');
    });

    it('should encode to three-digit base58 number', () => {
      expect(base58.encode('6470')).equals('2Vy');
    });
  });

  describe('decode base58 to decimal', () => {
    it('should decode single-digit base58 number', () => {
      expect(base58.decode('a')).equals('9');
    });

    it('should decode two-digit base58 number', () => {
      expect(base58.decode('3J')).equals('158');
    });

    it('should decode three-digit base58 number', () => {
      expect(base58.decode('2Vy')).equals('6470');
    });
  });
});
