export const rnd = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const getColor = (index: number = -1): string => {
  const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1', '#54a0ff', '#5f27cd', '#576574', '#009432', '#C4E538']

  return colors[index] || `rgb(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)})`
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