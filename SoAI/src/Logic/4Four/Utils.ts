export const rnd = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const getRandomGaussian = (mean: number = 0.0, stddev: number = 1.0) => {
  let u = 0
  let v = 0
  let s = 0
  let t = 0

  do {
    u = 2 * Math.random() - 1
    v = 2 * Math.random() - 1
  } while (u*u + v*v > 1 || (u === 0 && v === 0))

  s = u*u + v*v
  t = Math.sqrt((-2.0 * Math.log(s)) / s)

  return stddev * u * t + mean
}

export const round = (value: number, p = 100): number => {
  return Math.round(value * p) / p
}