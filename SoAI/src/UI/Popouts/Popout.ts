import Utils, { setupFlankStyle } from './Utils'
import DOMUtils from '@/Utils/DOM'

// import ScrollableWrapperInstance from '@/components/UI/ScrollableArea/ScrollableWrapperInstance'

const enum PopoutFlank {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

export type PopoutBehaviourParameters = {
  local?: boolean,
  flank?: PopoutFlank,
  onShow?: (anchor: HTMLElement) => void,
  onHide?: (anchor: HTMLElement) => void
}

export type PopoutAppearanceParameters = {
  minMarginFromBounds?: number,
  marginFromAnchor?: number,
  strictHeight?: number,
  strictWidth?: number
}

export type PopoutParameters = {
  anchor: HTMLElement,
  content: (popout: Popout) => HTMLElement | string,
  boundAncestor?: HTMLElement,

  behaviour?: PopoutBehaviourParameters,
  appearance?: PopoutAppearanceParameters
}

const defaultBehaviourParameters: PopoutBehaviourParameters = {
  local: false,
  flank: PopoutFlank.TOP
}

const defaultAppearanceParameters: PopoutAppearanceParameters = {
  minMarginFromBounds: 15,
  marginFromAnchor: 10
}

export const ATTRIBUTE_ANCHOR_POPOUT_ID = 'data-popout-id'
export const PREFIX_ID = 'popout-'
export const CURRENT_ANCHOR = '@@currentAnchor'
const CURRENT_POPOUT_ID = '@@popoutId'

let popoutWindowHandlers: { [key: string]: EventListenerOrEventListenerObject } | null = null

export const extractPopoutInstanceFromElement = (element: HTMLElement): Popout | null => {
  const id = element.getAttribute('id')
  if (!id || id.indexOf(PREFIX_ID) !== 0) return null

  const currentAnchor: HTMLElement | null = (element as any)[CURRENT_ANCHOR]
  if (!currentAnchor) return null

  return extractPopoutInstance(currentAnchor)
}

export const extractPopoutInstance = (anchor: HTMLElement, id?: string | null): Popout | null => {
  id = id || anchor.getAttribute(ATTRIBUTE_ANCHOR_POPOUT_ID)
  if (!id) return null

  return (anchor as any)['@@' + PREFIX_ID + id] || null
}

export const closeActivePopout = () => {
  const activePopoutId = (window as any)[CURRENT_POPOUT_ID]
  if (!activePopoutId) return

  const element = document.getElementById(PREFIX_ID + activePopoutId)
  if (!element) return

  const popout = extractPopoutInstanceFromElement(element)
  if (!popout) return

  popout.hide()
}

const attachInstance = (parameters: PopoutParameters, id?: string | null): Popout | null => {
  const { anchor } = parameters

  id = id || anchor.getAttribute(ATTRIBUTE_ANCHOR_POPOUT_ID)
  if (!id) return null

  let instance = extractPopoutInstance(anchor)
  if (instance) return instance

  return (anchor as any)['@@' + PREFIX_ID + id] = new Popout(parameters)
}

export const attachLazyPopout = (parameters: PopoutParameters) => {
  const { anchor } = parameters

  const id = anchor.getAttribute(ATTRIBUTE_ANCHOR_POPOUT_ID)
  if (!id) return

  const anchorClickHandler = (e: Event) => {
    e.stopPropagation()

    const source = (e.currentTarget || e.srcElement) as HTMLElement
    if (!source) return

    const id = source.getAttribute(ATTRIBUTE_ANCHOR_POPOUT_ID)
    if (!id) return

    const popout = attachInstance(parameters, id)
    if (!popout) return

    popout.isVisible() ? popout.hide() : popout.show()
  }

  anchor.addEventListener('click', anchorClickHandler)
}

export default class Popout {
  element: HTMLElement | null

  visible: boolean
  id: string
  anchor: HTMLElement
  content: (popout: Popout) => HTMLElement | string
  flanksCheckingOrder: Array<string>
  boundAncestor: HTMLElement | null

  behaviour: PopoutBehaviourParameters
  appearance: PopoutAppearanceParameters

  // scrollableWrapper: ScrollableWrapperInstance | null = null

  constructor ({ anchor, content, boundAncestor, behaviour, appearance }: PopoutParameters) {
    const id = anchor.getAttribute(ATTRIBUTE_ANCHOR_POPOUT_ID)
    if (!id) {
      throw new Error(`[Popout.constructor] Attribute "${ATTRIBUTE_ANCHOR_POPOUT_ID}" is not present on anchor element`)
    }
    this.id = id
    this.visible = false
    this.anchor = anchor
    this.content = content
    this.element = null

    this.behaviour = Object.assign({}, defaultBehaviourParameters)
    this.appearance = Object.assign({}, defaultAppearanceParameters)

    behaviour && Object.assign(this.behaviour, behaviour)
    appearance && Object.assign(this.appearance, appearance)

    this.flanksCheckingOrder = Utils.reorganizeFlanksCheckingOrder(this.behaviour.flank || PopoutFlank.TOP)

    this.boundAncestor = boundAncestor || (this.behaviour.local ? Utils.determineBoundAncestor(anchor) as HTMLElement : null)
  }

  show () {
    this.prepare()

    if (!this.element) return

    this.setActivePopout()

    this.element.style.display = 'block'
    this.visible = true

    setupFlankStyle({
      element: this.element,
      anchor: this.anchor,
      boundAncestor: this.boundAncestor,
      flanksCheckingOrder: this.flanksCheckingOrder,
      minMarginFromBounds: this.appearance.minMarginFromBounds || 15,
      marginFromAnchor: this.appearance.marginFromAnchor || 10
    })

    // this.scrollableWrapper && this.scrollableWrapper.updateProgrammatically()
    this.behaviour.onShow && this.behaviour.onShow(this.anchor)

    popoutWindowHandlers = popoutWindowHandlers || {}
    if (popoutWindowHandlers[this.id]) return

    const closeWindowEvent = popoutWindowHandlers[this.id] = createCloseWindowEvent(this.id)
    window.addEventListener('click', closeWindowEvent)
  }

  hide () {
    this.element && (this.element.style.display = 'none')
    this.visible = false
    this.behaviour.onHide && this.behaviour.onHide(this.anchor)

    destroyCloseWindowEvent(this.id)
    this.clearActivePopout()
  }

  isVisible () {
    return this.visible
  }

  private clearActivePopout () {
    const current = (window as any)[CURRENT_POPOUT_ID]
    if (current !== this.id) return

    delete (window as any)[CURRENT_POPOUT_ID]
  }

  private setActivePopout () {
    closeActivePopout();

    (window as any)[CURRENT_POPOUT_ID] = this.id
  }

  private createPopoutElement (): HTMLElement {
    const style = {
      display: 'none',
      top: '0',
      left: '0'
    }

    const attributes = {
      'class': 'o-popout',
      'id': PREFIX_ID + this.id,
      style
    }

    const contentElement = this.content(this)

    const { strictHeight, strictWidth } = this.appearance
    strictWidth && Object.assign(style, { 'width': strictWidth + 'px' })
    strictHeight && Object.assign(style, { 'height': strictHeight + 'px' })

    // strictHeight && Object.assign(style, { 'height': strictHeight + 'px' })
    // const element = DOMUtils.createElement('div', attributes)
    // this.scrollableWrapper = new ScrollableWrapperInstance({ container: element, embedded: true })
    // this.scrollableWrapper.updateContent(contentElement)

    return DOMUtils.createElement('div', attributes, contentElement)
  }

  private prepare () {
    const anchorParent = this.anchor.parentElement
    if (!anchorParent) return

    const container = this.boundAncestor && Utils.prepareAnchorParent(anchorParent) || document.body

    this.element = document.getElementById(PREFIX_ID + this.id) || this.createPopoutElement()
    this.element.parentNode !== container && container.appendChild(this.element)

    // this.scrollableWrapper && this.scrollableWrapper.activate()

    const currentAnchor: HTMLElement | null = (this.element as any)[CURRENT_ANCHOR]
    if (currentAnchor !== this.anchor) {
      if (currentAnchor) {
        const currentInstance = extractPopoutInstance(currentAnchor, this.id)
        if (!currentInstance) throw new Error('[Popouts.prepare] No instance on previous anchor')

        currentInstance.hide()
      }
      (this.element as any)[CURRENT_ANCHOR] = this.anchor
    }
  }
}

const destroyCloseWindowEvent = (popoutId: string) => {
  if (!popoutWindowHandlers) return

  const event = popoutWindowHandlers[popoutId]
  if (!event) return

  window.removeEventListener('click', event)
  delete popoutWindowHandlers[popoutId]

  Object.keys(popoutWindowHandlers).length === 0 && (popoutWindowHandlers = null)
}

const createCloseWindowEvent = (popoutId: string): EventListenerOrEventListenerObject => (e: Event) => {
  let target = e.target as HTMLElement

  while (target) {
    if (target.id === PREFIX_ID + popoutId) return

    target = target.parentNode as HTMLElement
  }

  const popoutElement = document.getElementById(PREFIX_ID + popoutId)
  if (!popoutElement) return destroyCloseWindowEvent(popoutId)

  const currentAnchor = (popoutElement as any)[CURRENT_ANCHOR] as HTMLElement
  if (!currentAnchor) return destroyCloseWindowEvent(popoutId)

  const popoutInstance = extractPopoutInstance(currentAnchor)
  if (!popoutInstance) return destroyCloseWindowEvent(popoutId)

  popoutInstance.hide()
}
