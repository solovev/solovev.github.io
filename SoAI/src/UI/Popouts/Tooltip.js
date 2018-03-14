import './style.css'

import Utils from './Utils'

export const ATTRIBUTE_TOOLTIP_DESCRIPTION = 'data-description'

const defaultOptions = {
  minMarginFromBounds: 15,
  marginFromAnchor: 10,
  pointerSize: 5,
  backgroundColor: 'var(--primary-color)',
  color: 'var(--text-color)',
  opacityPerFrame: 0.1,
  iteraction: false,
  inline: true
}

class Tooltip {
  constructor ({ anchor, content, local, boundAncestor, immediate, cacheable, flank, shared, once, options, tether, maxWidth }) {
    if (!anchor || !(anchor instanceof Element)) {
      throw Error(`[Tooltip.constructor]: Anchor is not HTML element`)
    }

    if (tether) {
      if (local) throw Error(`[Tooltip.constructor]: "tether" and "local" parameters are enabled, this makes no sense`)
      cacheable = false
    }

    this.options = Object.assign({}, defaultOptions, options)
    maxWidth && Object.assign(this.options, { maxWidth })

    this.anchor = anchor
    this.boundAncestor = boundAncestor || (local ? Utils.determineBoundAncestor(anchor) : null)

    if (this.boundAncestor && !(this.boundAncestor instanceof HTMLElement)) {
      throw Error(`[Tooltip.constructor]: Bound ancestor is not HTML element`)
    }

    this.element = null

    this.content = content
    this.immediate = immediate
    this.cacheable = cacheable
    this.shared = shared
    this.once = once
    this.tether = tether
    this.flanksCheckingOrder = Utils.reorganizeFlanksCheckingOrder(flank)

    this.cachedData = null

    this.tetherBoundAncestor = tether ? Utils.determineBoundAncestor(anchor) : null
    this.tetherCachedAnchorRect = null
  }

  cleanup () {
    Utils.removeTooltipElement(this.element)

    this.element = null
    this.anchor = null
    this.boundAncestor = null

    this.cachedData = null

    this.tetherBoundAncestor = null
    this.tetherCachedAnchorRect = null
  }

  prepare () {
    if (this.element) {
      this.shared && this.updateContent()
      return
    }

    const container = this.boundAncestor && Utils.prepareAnchorParent(this.anchor.parentElement) || document.body

    if (this.shared) {
      const { children } = container
      for (let i in children) {
        const child = children[i]
        if (child instanceof HTMLElement && child.getAttribute('data-tooltip') === 'shared') {
          this.element = child
          this.updateContent()
          return
        }
      }
    }

    if (!this.element) {
      this.element = Utils.createTooltipElement({ content: this.content || this.getDescription(), options: this.options })
      this.element.setAttribute('data-tooltip', this.shared ? 'shared' : 'default')

      container.appendChild(this.element)
    }
  }

  show () {
    this.prepare()

    this.element.style.display = 'block'

    this.tether ? this.startTethering() : this.place()

    if (this.immediate) {
      this.element.style.opacity = '1'
      return
    }

    this.startAnimation({ show: true })
  }

  startTethering () {
    if (!this.anchor || !this.element) return

    const relocated = this.tetheringRelocate()
    this.element.style.visibility = relocated ? 'visible' : 'hidden'

    requestAnimationFrame(this.startTethering.bind(this))
  }

  tetheringRelocate () {
    const anchorRect = this.anchor.getBoundingClientRect()

    if (this.tetherCachedAnchorRect) {
      const { top: previousTop, left: previousLeft } = this.tetherCachedAnchorRect
      const { top, left } = anchorRect

      if (previousTop === top && previousLeft === left) return true
    }

    const windowRect = {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth
    }
    const ancestorRect = this.tetherBoundAncestor && this.tetherBoundAncestor.getBoundingClientRect() || windowRect

    if (
      anchorRect.top > ancestorRect.bottom ||
      anchorRect.bottom < ancestorRect.top ||
      anchorRect.left > ancestorRect.right ||
      anchorRect.right < ancestorRect.left
    ) return null

    const offset = {
      top: anchorRect.top - windowRect.top,
      bottom: windowRect.bottom - anchorRect.bottom,

      left: anchorRect.left - windowRect.left,
      right: windowRect.right - anchorRect.right
    }

    const tooltipDimensions = Utils.getTooltipDimensions(this.element)
    const placed = this.tryToPlace({ offset, tooltipDimensions, anchorProperties: anchorRect })
    if (!placed) return false

    this.tetherCachedAnchorRect = anchorRect

    return true
  }

  hide (immediate = null) {
    if (!this.element) return

    const hideImmediately = immediate !== null ? immediate : this.immediate

    if (hideImmediately && this.once) {
      this.cleanup()
      return
    }

    if (hideImmediately) {
      this.element.style.display = 'none'
      this.element.style.opacity = '0'
      return
    }

    this.startAnimation({
      show: false,
      finish: () => {
        this.once && this.cleanup()
        if (this.element) {
          this.element.style.display = 'none'
          this.element.style.opacity = '0'
        }
      }
    })
  }

  startAnimation ({ show, finish }) {
    this.animationOpacityStep = this.options.opacityPerFrame * (show ? 1 : -1)
    this.animationFinishCallback = finish

    this.element['animationKey'] = this.animationOpacityStep

    this.animate()
  }

  animate () {
    if (!this.element || !this.anchor) {
      this.animationFinishCallback && this.animationFinishCallback()
      return
    }

    if (this.element['animationKey'] !== this.animationOpacityStep) return

    const currentOpacity = +this.element.style.opacity
    if (this.animationOpacityStep > 0 && currentOpacity >= 1 || this.animationOpacityStep < 0 && currentOpacity <= 0) {
      this.animationFinishCallback && this.animationFinishCallback()
      return
    }

    this.element.style.opacity = currentOpacity + this.animationOpacityStep

    requestAnimationFrame(this.animate.bind(this))
  }

  restoreFromCache () {
    if (!this.element) return

    const { tooltip, pointer } = this.cachedData
    Object.keys(tooltip).forEach(property => {
      this.element.style[property] = tooltip[property] + 'px'
    })

    const pointerElm = this.getPointerElement()
    if (!pointerElm) return

    pointerElm.style.cssText = ''

    Object.keys(pointer).forEach(property => {
      pointerElm.style[property] = pointer[property]
    })
  }

  place () {
    if (this.cachedData) {
      this.restoreFromCache()
      return
    }

    const offset = this.getOffsetFromAncestorBounds()
    if (!offset) return

    const tooltipDimensions = Utils.getTooltipDimensions(this.element)
    const anchorProperties = this.boundAncestor ? Utils.getAnchorProperties(this.anchor) : this.anchor.getBoundingClientRect()

    this.tryToPlace({ offset, tooltipDimensions, anchorProperties })
  }

  tryToPlace ({ offset, tooltipDimensions, anchorProperties }) {
    for (let flank of this.flanksCheckingOrder) {
      const dimension = Utils.getDimensionOf(flank)
      const dimensionLength = tooltipDimensions[dimension]
      const dimensionLengthWithMargin = dimensionLength + this.options.minMarginFromBounds + this.options.marginFromAnchor

      // Если тултип не вмещается между стороной и самим элементом-якорем, то нужна искать другую сторону
      let canFit = dimensionLengthWithMargin < offset[flank]
      if (!canFit) continue

      // Проверяем переферийные границы
      const oppositeDimension = Utils.getOppositeDimension(dimension)
      const oppositeFlanks = Utils.getFlanksOf(oppositeDimension)
      const [offsetFlankA, offsetFlankB] = oppositeFlanks.map(f => offset[f])

      // Если какая-то из переферийных границ не видна, то тултип поставить не выйдеm
      if (offsetFlankA < 0 || offsetFlankB < 0) continue

      const oppositeDimensionLength = tooltipDimensions[oppositeDimension]
      const freeSpace = offsetFlankA + offsetFlankB - this.options.minMarginFromBounds * 2

      // Если тултип не вмещается между переферийными границами, то идем к другой стороне
      canFit = freeSpace < oppositeDimensionLength
      if (canFit) continue

      // Калибровка между двумя переферийными границами
      const halfOppositeDimensionLength = oppositeDimensionLength / 2
      const oppositeAnchorDimensionLength = anchorProperties[oppositeDimension]
      const halfOppositeAnchorDimensionLength = oppositeAnchorDimensionLength / 2
      const apparentHalfLength = halfOppositeDimensionLength - halfOppositeAnchorDimensionLength

      const offsetFlankAWithMargin = offsetFlankA - this.options.minMarginFromBounds
      const overflowFromFlankA = offsetFlankAWithMargin > apparentHalfLength ? 0 : Math.abs(apparentHalfLength - offsetFlankAWithMargin)

      const offsetFlankBWithMargin = offsetFlankB - this.options.minMarginFromBounds
      const overflowFromFlankB = offsetFlankBWithMargin > apparentHalfLength ? 0 : Math.abs(apparentHalfLength - offsetFlankBWithMargin)

      // Setup main axis
      let sign = flank === 'top' || flank === 'left' ? -1 : 1
      const mainAxisFlank = flank === 'top' || flank === 'bottom' ? 'top' : 'left'
      const relative = sign > 0 ? anchorProperties : tooltipDimensions
      let resultMainOffset = anchorProperties[mainAxisFlank]
      resultMainOffset += (relative[Utils.getDimensionOf(flank)] + this.options.marginFromAnchor) * sign
      this.element.style[mainAxisFlank] = resultMainOffset + 'px'

      // Setup opposite axis
      const [oppositeFlank] = oppositeFlanks
      const sideOffset = Math.max(overflowFromFlankA, overflowFromFlankB)

      sign = overflowFromFlankA > overflowFromFlankB ? 1 : -1
      let resultOppositeOffset = anchorProperties[oppositeFlank]
      resultOppositeOffset += -halfOppositeDimensionLength
      resultOppositeOffset += halfOppositeAnchorDimensionLength
      resultOppositeOffset += sideOffset * sign
      this.element.style[oppositeFlank] = resultOppositeOffset + 'px'

      const pointerOffset = sideOffset === 0
        ? '50%'
        : `${halfOppositeDimensionLength + (sideOffset * -sign)}px`
      const style = this.placePointer(flank, pointerOffset)

      if (this.cacheable) {
        this.cachedData = {
          tooltip: { [mainAxisFlank]: resultMainOffset, [oppositeFlank]: resultOppositeOffset },
          pointer: style
        }
      }
      return true
    }
  }

  getPointerElement () {
    return this.element && this.element.firstChild
  }

  placePointer (pointFrom, offset) {
    const pointerElm = this.getPointerElement()
    if (!pointerElm) return

    pointerElm.style.cssText = ''

    const verticalFlank = pointFrom === 'bottom' ? pointFrom : 'top'
    const horizontalFlank = pointFrom === 'right' ? pointFrom : 'left'

    const isVertical = pointFrom === 'top' || pointFrom === 'bottom'
    const marginFlank = isVertical ? 'left' : 'top'

    const style = {
      'border-width': `${this.options.pointerSize}px`,
      [verticalFlank]: isVertical ? '100%' : offset,
      [horizontalFlank]: isVertical ? offset : '100%',
      [`margin-${marginFlank}`]: `-${this.options.pointerSize}px`,
      [`border-${pointFrom}-color`]: this.element.style.backgroundColor
    }

    Object.keys(style).forEach(property => {
      pointerElm.style[property] = style[property]
    })

    return style
  }

  getOffsetFromAncestorBounds () {
    let ancestorRect = this.boundAncestor && this.boundAncestor.getBoundingClientRect()

    ancestorRect = ancestorRect || {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth
    }

    const anchorRect = this.anchor.getBoundingClientRect()

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

  getDescription () {
    return this.anchor.getAttribute(ATTRIBUTE_TOOLTIP_DESCRIPTION)
  }

  updateContent () {
    if (!this.element) return

    Utils.setTooltipContent({ tooltip: this.element, content: this.content || this.getDescription() })
    this.place()
  }
}
export default Tooltip
