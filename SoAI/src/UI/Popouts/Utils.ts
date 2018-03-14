import DOMUtils, { searchAncestorByAttribute } from '@/Utils/DOM'

import Popout, { extractPopoutInstanceFromElement } from './Popout'

export const getActivePopoutInstance = (target: HTMLElement, popoutId?: string): Popout | null => {
  const popoutElement = popoutId
    ? searchAncestorByAttribute(target, 'id', popoutId)
    : searchAncestorByAttribute(target, 'class', 'o-popout')

  if (!popoutElement) return null

  const popout = extractPopoutInstanceFromElement(popoutElement as HTMLElement)
  return popout
}

export const executeAtPopout = (event: MouseEvent, fn: Function, shiftHolding?: boolean) => {
  fn(event)

  if (shiftHolding && event.shiftKey) return

  const target = event.target as HTMLElement
  const popout = getActivePopoutInstance(target)
  popout && popout.hide()
}

const Utils = {
  getOppositeDimension: (dimension: string) => dimension === 'height' ? 'width' : 'height',
  getFlanksOf: (dimension: string) => dimension === 'height' ? ['top', 'bottom'] : ['left', 'right'],
  getDimensionOf: (flank: string) => flank === 'top' || flank === 'bottom' ? 'height' : 'width',
  determineBoundAncestor: (anchor: HTMLElement) => DOMUtils.searchAncestorByOverflow(anchor),
  getAnchorProperties: (anchor: HTMLElement) => {
    if (!anchor) return

    const { offsetLeft: left, offsetTop: top, offsetWidth: width, offsetHeight: height } = anchor
    return {
      top, left, width, height
    }
  },
  getTooltipDimensions: (element: HTMLElement) => {
    const { offsetHeight: tooltipHeight, offsetWidth: tooltipWidth } = element
    return { width: tooltipWidth, height: tooltipHeight }
  },
  reorganizeFlanksCheckingOrder: (flank: string) => {
    const checkingOrder = ['top', 'bottom', 'right', 'left']
    if (!flank) return checkingOrder

    const result = []
    const index = checkingOrder.indexOf(flank)
    for (let i = index; i < checkingOrder.length + index; i++) {
      result.push(checkingOrder[i >= checkingOrder.length ? i % checkingOrder.length : i])
    }

    return result
  },
  prepareAnchorParent: (parent: HTMLElement) => {
    if (!parent) return

    const style = window.getComputedStyle(parent)
    const position = style.position || ''

    if (['absolute', 'relative'].indexOf(position) < 0) {
      parent.style.position = 'relative'
    }
    return parent
  },
  createTooltipElement: ({ content, options = {} }: { content: string, options: any }) => {
    const tooltipClassNamePrefix = 'o-tooltip'

    const pointerElm = DOMUtils.createElement('div', {
      'class': `${tooltipClassNamePrefix}-pointer`
    })

    const contentHolderElm = DOMUtils.createElement('div', {
      'class': `${tooltipClassNamePrefix}-content`
    })
    contentHolderElm.innerHTML = content

    !options.maxWidth && contentHolderElm.classList.add('inline-content')

    const style = {
      display: 'none',
      opacity: '0',
      top: '0',
      left: '0',
      backgroundColor: options.backgroundColor,
      color: options.color
    }

    options.maxWidth && Object.assign(style, { 'max-width': options.maxWidth + 'px' })

    const element = DOMUtils.createElement('div', {
      'class': tooltipClassNamePrefix, style
    }, pointerElm, contentHolderElm)

    if (options.iteraction) element.classList.add('iteraction')

    return element
  },
  setTooltipContent: ({ tooltip, content }: { tooltip: HTMLElement, content: string }) => {
    if (!tooltip) return

    const contentElement = tooltip.lastChild
    if (!contentElement) return

    (contentElement as HTMLElement).innerHTML = content
  },
  removeTooltipElement: (element: HTMLElement) => {
    if (!element) return

    DOMUtils.removeElement(element)
  }
}

const getOffsetFromAncestorBounds = (anchor: HTMLElement, boundAncestor: HTMLElement | null) => {
  let ancestorRect = boundAncestor && boundAncestor.getBoundingClientRect()

  ancestorRect = ancestorRect || {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth
  } as ClientRect

  const anchorRect = anchor.getBoundingClientRect()

  if (
    anchorRect.top > ancestorRect.bottom ||
    anchorRect.bottom < ancestorRect.top ||
    anchorRect.left > ancestorRect.right ||
    anchorRect.right < ancestorRect.left
  ) return null

  return {
    top: anchorRect.top - ancestorRect.top,
    bottom: ancestorRect.bottom - anchorRect.bottom,

    left: anchorRect.left - ancestorRect.left,
    right: ancestorRect.right - anchorRect.right
  }
}

export const setupFlankStyle = ({ element, anchor, boundAncestor, flanksCheckingOrder, minMarginFromBounds, marginFromAnchor }:
  {
    element: HTMLElement,
    anchor: HTMLElement,
    boundAncestor: HTMLElement | null,
    flanksCheckingOrder: Array<string>,
    minMarginFromBounds: number,
    marginFromAnchor: number
  }): boolean => {
  const offset = getOffsetFromAncestorBounds(anchor, boundAncestor)
  if (!offset) return false

  const tooltipDimensions = Utils.getTooltipDimensions(element)
  const anchorProperties = boundAncestor ? Utils.getAnchorProperties(anchor) : anchor.getBoundingClientRect()
  if (!anchorProperties) return false

  for (let flank of flanksCheckingOrder) {
    const dimension = Utils.getDimensionOf(flank)
    const dimensionLength = tooltipDimensions[dimension]
    const dimensionLengthWithMargin = dimensionLength + minMarginFromBounds + marginFromAnchor

    // Если тултип не вмещается между стороной и самим элементом-якорем, то нужна искать другую сторону
    let canFit = dimensionLengthWithMargin < (offset as any)[flank]
    if (!canFit) continue

    // Проверяем переферийные границы
    const oppositeDimension = Utils.getOppositeDimension(dimension)
    const oppositeFlanks = Utils.getFlanksOf(oppositeDimension)
    const [offsetFlankA, offsetFlankB] = oppositeFlanks.map(f => (offset as any)[f])

    // Если какая-то из переферийных границ не видна, то тултип поставить не выйдеm
    if (offsetFlankA < 0 || offsetFlankB < 0) continue

    const oppositeDimensionLength = tooltipDimensions[oppositeDimension]
    const freeSpace = offsetFlankA + offsetFlankB - minMarginFromBounds * 2

    // Если тултип не вмещается между переферийными границами, то идем к другой стороне
    canFit = freeSpace < oppositeDimensionLength
    if (canFit) continue

    // Калибровка между двумя переферийными границами
    const halfOppositeDimensionLength = oppositeDimensionLength / 2
    const oppositeAnchorDimensionLength = anchorProperties[oppositeDimension]
    const halfOppositeAnchorDimensionLength = oppositeAnchorDimensionLength / 2
    const apparentHalfLength = halfOppositeDimensionLength - halfOppositeAnchorDimensionLength

    const offsetFlankAWithMargin = offsetFlankA - minMarginFromBounds
    const overflowFromFlankA = offsetFlankAWithMargin > apparentHalfLength ? 0 : Math.abs(apparentHalfLength - offsetFlankAWithMargin)

    const offsetFlankBWithMargin = offsetFlankB - minMarginFromBounds
    const overflowFromFlankB = offsetFlankBWithMargin > apparentHalfLength ? 0 : Math.abs(apparentHalfLength - offsetFlankBWithMargin)

    // Setup main axis
    let sign = flank === 'top' || flank === 'left' ? -1 : 1
    const mainAxisFlank = flank === 'top' || flank === 'bottom' ? 'top' : 'left'
    const relative = sign > 0 ? anchorProperties : tooltipDimensions
    let resultMainOffset = anchorProperties[mainAxisFlank]
    resultMainOffset += (relative[Utils.getDimensionOf(flank)] + marginFromAnchor) * sign
    element.style[mainAxisFlank] = resultMainOffset + 'px'

    // Setup opposite axis
    const [oppositeFlank] = oppositeFlanks
    const sideOffset = Math.max(overflowFromFlankA, overflowFromFlankB)

    sign = overflowFromFlankA > overflowFromFlankB ? 1 : -1
    let resultOppositeOffset = (anchorProperties as any)[oppositeFlank]
    resultOppositeOffset += -halfOppositeDimensionLength
    resultOppositeOffset += halfOppositeAnchorDimensionLength
    resultOppositeOffset += sideOffset * sign;
    (element.style as any)[oppositeFlank] = resultOppositeOffset + 'px'

    return true
  }
  return false
}

export default Utils
