export const searchAncestor = (element: Node | null, fn: Function): (Node | null) => {
  if (!element) return null

  const match = fn(element)
  if (!match) return searchAncestor(element.parentNode, fn)

  return element
}

const _query = (query: string) => (element: HTMLElement) => element && element.matches(query)
const _overflow = (overflow: string) => (element: HTMLElement): boolean => {
  const validElement = element && element instanceof HTMLElement
  if (!validElement) return false

  const style = window.getComputedStyle(element)
  return style.overflowX === overflow && style.overflowY === overflow
}
const _attribute = (key: string, value?: string) => (element: HTMLElement): boolean => {
  if (!element) return false

  if (!(element instanceof HTMLElement)) return false

  const attributeValue = element.getAttribute(key)
  return value ? attributeValue === value : !!attributeValue
}

export const searchAncestorByAttribute = (element: Node, key: string, value?: string) => {
  return searchAncestor(element, _attribute(key, value))
}

export const isDescendantOf = (element: Node | null, ancestor: Node): boolean => {
  while (element) {
    if (element === ancestor) return true

    element = element.parentNode
  }
  return false
}

export const prepend = (container: Node, element: Node) => container.insertBefore(element, container.firstChild)

export const toClassList = (list: { [key: string]: boolean }) => Object.keys(list).filter(key => list[key]).join(' ')

export const flushElement = (element: Node) => {
  while (element.lastChild) element.removeChild(element.lastChild)
}

export const insertAfter = (element: HTMLElement, referenceElement: HTMLElement): HTMLElement | null => {
  const parent = referenceElement.parentNode
  return parent ? parent.insertBefore(element, referenceElement.nextSibling) : null
}

export const calculateTopOffset = (child: HTMLElement, container?: HTMLElement): number => {
  let offset = child.offsetTop
  // defaultLogger.warn(child.className, offset)

  const parent = child.parentElement as HTMLElement
  if (!parent) return offset

  if (container && parent !== container || parent.className !== 'scrollable-content') {
    offset += calculateTopOffset(parent, container)
  }

  return offset
}

export const appendSort = ({ container, element, attribute, predicate, startFromTop = true }: { container: HTMLElement, element: HTMLElement, attribute: string, predicate?: Function | null, startFromTop?: boolean }): HTMLElement | null => {
  const { children } = container
  const value = element.getAttribute(attribute) || ''

  if (!predicate) {
    predicate = (value: string, childValue: string, startFromTop: boolean) => {
      return startFromTop ? (childValue > value) : (childValue < value)
    }
  }

  if (startFromTop) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const childValue = child.getAttribute(attribute)
      if (childValue == null) continue

      if (predicate(value, childValue, startFromTop)) {
        return container.insertBefore(element, child)
      }
    }
    return container.appendChild(element)
  } else {
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i] as HTMLElement
      const childValue = child.getAttribute(attribute)
      if (childValue == null) continue

      if (predicate(value, childValue, startFromTop)) {
        return insertAfter(element, child)
      }
    }
    return container.appendChild(element)
  }
}

export const measureHeight = (element: HTMLElement, containerQuery: string): number => {
  if (!element) return -1

  const container = containerQuery && document.querySelector(containerQuery) || document.body
  if (!container) return -1

  const clone = element.cloneNode(true) as HTMLElement

  clone.style.visibility = 'hidden'
  clone.style.position = 'absolute'

  container.appendChild(clone)
  const { scrollHeight } = clone
  container.removeChild(clone)

  return scrollHeight
}

export const persistScrollPosition = async ({ container, callback }: { container: HTMLElement, callback: Function }) => {
  if (!container || !callback) return

  const persistedScrollTopValue = container.scrollTop
  const persistedScrollHeightValue = container.scrollHeight

  await callback()

  const scrollDifference = container.scrollHeight - persistedScrollHeightValue
  const persistedScrollPosition = persistedScrollTopValue + scrollDifference

  container.scrollTop = persistedScrollPosition
}

export const persistScrollPositionSync = ({ container, callback }: { container: HTMLElement, callback: Function }) => {
  if (!container || !callback) return

  const persistedScrollTopValue = container.scrollTop
  const persistedScrollHeightValue = container.scrollHeight

  callback()

  const scrollDifference = container.scrollHeight - persistedScrollHeightValue
  const persistedScrollPosition = persistedScrollTopValue + scrollDifference

  container.scrollTop = persistedScrollPosition
}

export const createSVGElement = (tag: string, attrs?: { [key: string]: any }, ...children: Array<Node | string | null>): SVGElement => {
  const ns = 'http://www.w3.org/2000/svg'

  const element = document.createElementNS(ns, tag)

  if (attrs && typeof attrs === 'object') {
    attrs['xmlns'] = ns
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      element.setAttribute(key, value)
    })
  }

  children && children.forEach(child => {
    if (!child) return

    child = child instanceof Node ? child : document.createTextNode(child)
    element.appendChild(child)
  })

  return element
}

const DOMUtils = {
  getCenter: (element: HTMLElement): { x: number, y: number } | null => {
    if (!element || !(element instanceof Element)) return null

    const rect = element.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  },
  searchAncestorByQuery: (element: Node, query: string) => {
    return searchAncestor(element, _query(query))
  },
  searchAncestorByOverflow: (element: Node, value = 'hidden') => {
    return searchAncestor(element, _overflow(value))
  },
  createElement: (tag: string, attrs?: { [key: string]: any }, ...children: Array<Node | string | null>) => {
    const element = document.createElement(tag)

    if (attrs && typeof attrs === 'object') {
      Object.keys(attrs).forEach(key => {
        const value = attrs[key]
        if (key !== 'style') {
          element.setAttribute(key, value)
          return
        }

        Object.keys(value).forEach(style => {
          (element.style as { [key: string]: any })[style] = value[style]
        })
      })
    }

    children && children.forEach(child => {
      if (!child) return

      child = child instanceof Node ? child : document.createTextNode(child)
      element.appendChild(child)
    })

    return element
  },
  removeElement: (element?: Node) => element && element.parentNode && element.parentNode.removeChild(element)
}

export default DOMUtils
