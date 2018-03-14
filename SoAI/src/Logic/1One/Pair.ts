import Point from '../Common/Point'

interface JPoint {
  x: number,
  y: number
}

export default class Pair {
  data: Point[]
  bias: number
  speed: number
  color: string

  w1: number
  w2: number

  cacheW1: number
  cacheW2: number
  cacheBias: number

  constructor (public a: any, public b: any) {
    this.data = []
  }

  prepare = ({ speed, bias, data, color }: { speed: number, bias: number, data: Point[], color: string }) => {
    this.w1 = Math.random()
    this.w2 = Math.random()

    this.cacheBias = this.cacheW1 = this.cacheW2 = 0

    this.color = color
    this.speed = speed
    this.bias = bias
    this.data = data.filter(point => point.type === this.a || point.type === this.b)
  }

  step = (): boolean => {
    for (let i = 0; i < this.data.length; i++) {
      const { x, y, type } = this.data[i]

      const value = this.line(x, y)
      const predication = this.decide(value)

      if (type !== predication) {
        this.w1 = this.w1 + x * this.speed * this.sign(type)
        this.w2 = this.w2 + y * this.speed * this.sign(type)

        this.bias = this.bias + this.sign(type) * this.speed
      }
    }

    if (this.cacheW1 === this.w1 && this.cacheW2 === this.w2 && this.cacheBias == this.bias) {
      return true
    }

    this.cacheW1 = this.w1
    this.cacheW2 = this.w2
    this.cacheBias = this.bias

    return false
  }

  getDrawData = () => {
    const value = 3
    const min = -value
    const max = value

    const p1: JPoint = { x: min, y: this.wLine(min) }
    const p2: JPoint = { x: max, y: this.wLine(max) }

    return { p1, p2, color: this.color }
  }

  wLine = (x): number => {
    return -(this.w1 * x + this.bias) / this.w2
  }

  sign = (value) => {
    return value === this.b ? -1 : 1
  }

  decide = (value) => {
    return value < 0 ? this.b : this.a
  }

  isSame = (a, b) => {
    return this.a === b && this.b === a || this.a === a && this.b === b
  }

  getProbability = ({ x, y }) => {
    return this.line(x, y) // this.decide(this.line(x, y))
  }

  getType = ({ x, y }) => this.decide(this.line(x, y))

  private line = (x: number, y: number) => {
    return this.w1 * x + this.w2 * y + this.bias
  }
}

export const createPairs = (types: any[]): any[] => {
  const pairs = []

  const searchSame = (a: any, b: any) => {
    return pairs.some(pair => {
      return pair.isSame(a, b)
    })
  }

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < types.length; j++) {
      const a = types[i];
      const b = types[j];
      if (a === b) continue;

      const same = searchSame(a, b)
      if (same) continue;

      pairs.push(new Pair(a, b))
    }
  }
  return pairs
}