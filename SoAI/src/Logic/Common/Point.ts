let i = 0
export default class {
  created: number

  constructor (public x: number, public y: number, public type: number, public color?: string) {
    this.created = Date.now() + i

    i++
  }
}
