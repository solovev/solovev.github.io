import { getRandomGaussian, round } from './Utils'

let i = 0

export default class {
  key: number = 0
  Wx: number = 0
  Wy: number = 0
  out: number = 0

  cacheWx: number = 0
  cacheWy: number = 0

  fullyTrain: boolean = false

  constructor (public color: string) {
    this.key = Date.now() + i

    this.init(getRandomGaussian(), getRandomGaussian())

    i++
  }

  init (Wx: number, Wy: number) {
    this.Wx = Wx
    this.Wy = Wy

    this.cacheWx = -Number.MAX_VALUE
    this.cacheWy = -Number.MAX_VALUE
  }

  calculateOut = (x, y): number => {
    return this.out = x * this.Wx + y * this.Wy
  }

  train = (x, y, factor): boolean => {
    this.Wx += factor * (x - this.Wx)
    this.Wy += factor * (y - this.Wy)

    const cacheWx = this.cacheWx
    const cacheWy = this.cacheWy

    this.cacheWx = this.Wx
    this.cacheWy = this.Wy

    return this.fullyTrain = cacheWx === this.Wx && cacheWy === this.Wy
  }

  getWx = () => {
    return round(this.Wx)
  }

  getWy = () => {
    return round(this.Wy)
  }
}