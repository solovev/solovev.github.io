import Tooltip from '@/UI/Popouts/Tooltip'

const ctx = '@@Tooltip'

const events = {
  mouseenter: function (e) {
    const anchor = e.srcElement || e.target

    const context = anchor[ctx]
    if (!context) return

    const { content, flank, local, cacheable, options } = context

    if (!context.tooltipData) {
      context.tooltipData = new Tooltip({ anchor, content, flank, local, shared: !local, options, cacheable })
    }

    context.tooltipData.show()
  },
  mouseleave: function (e) {
    const anchor = e.srcElement || e.target
    const { tooltipData } = anchor[ctx]

    tooltipData && tooltipData.hide()
  }
}

const attach = function () {
  const context = this
  const { element } = context

  Object.keys(events).forEach(name => {
    context[name] = events[name].bind(context)
    element.addEventListener(name, context[name])
  })
}

const detach = function () {
  const context = this
  const { element, local, tooltipData } = context

  Object.keys(events).forEach(name => {
    element.removeEventListener(name, context[name])
  })

  if (tooltipData) {
    tooltipData.hide(true)
    local && tooltipData.cleanup()
  }
}

export default {
  inserted (e, b) {
    if (!b.value) return

    const { text, align, local, cacheable, options } = b.value
    e[ctx] = {
      content: text,
      flank: align,
      local,
      cacheable,
      options,

      element: e,
      tooltipData: null
    }
    attach.call(e[ctx])
  },
  unbind (e) {
    if (!e || !e[ctx]) return

    detach.call(e[ctx])
    delete e[ctx]
  }
}

// import './style.css'

// import './Controller'

// const ctx = '@@Tooltip'
// const defaultClassName = 'default-tooltip'

// const TIME_BEFORE_APPEAR = 300
// const TOOLTIP_MARGIN_Y = 25
// const TOOLTIP_MARGIN_X = 10

// let timeoutId = null

// const createTooltipElement = _ => {
//   const element = document.createElement('div')
//   element.setAttribute('class', defaultClassName)

//   const { body } = document
//   return body.insertBefore(element, body.firstChild)
// }

// const tooltipElement = createTooltipElement()

// const mouseEnter = function () {
//   stopTimeout()

//   timeoutId && clearTimeout(timeoutId)

//   const context = this
//   const { element, text, align } = context

//   if (!text) return

//   tooltipElement.classList.add(align)

//   tooltipElement.innerHTML = text

//   timeoutId = setTimeout(_ => {
//     const { height: tooltipHeight, width: tooltipWidth } = tooltipElement.getBoundingClientRect()
//     const { width, height, top, left } = element.getBoundingClientRect()

//     const { x, y } = { x: left + width / 2, y: top + height / 2 }

//     const { style } = tooltipElement
//     switch (align) {
//       case 'bottom': {
//         style.top = `${y + TOOLTIP_MARGIN_Y}px`
//         style.left = `${x - tooltipWidth / 2}px`
//         break
//       }
//       case 'right': {
//         style.top = `${y - tooltipHeight / 2}px`
//         style.left = `${x + width / 2 + TOOLTIP_MARGIN_X}px`
//         break
//       }
//       case 'left': {
//         style.top = `${y - tooltipHeight / 2}px`
//         style.left = `${x - tooltipWidth - width / 2 - TOOLTIP_MARGIN_X}px`
//         break
//       }
//       default: {
//         style.top = `${y - (tooltipHeight + TOOLTIP_MARGIN_Y)}px`
//         style.left = `${x - tooltipWidth / 2}px`
//         break
//       }
//     }

//     tooltipElement.classList.add('visible')
//   }, TIME_BEFORE_APPEAR)
// }

// const mouseLeave = function () {
//   tooltipElement.className = defaultClassName

//   stopTimeout()
// }

// const stopTimeout = _ => {
//   timeoutId && clearTimeout(timeoutId)
//   timeoutId = null
// }

// const attach = function () {
//   const context = this
//   const { element } = context

//   context.mouseEnter = mouseEnter.bind(context)
//   context.mouseLeave = mouseLeave.bind(context)

//   element.addEventListener('mouseenter', context.mouseEnter)
//   element.addEventListener('mouseleave', context.mouseLeave)
// }

// const detach = function () {
//   stopTimeout()

//   tooltipElement.className = defaultClassName

//   const context = this
//   const { element } = context

//   element.removeEventListener('mouseenter', context.mouseEnter)
//   element.removeEventListener('mouseleave', context.mouseLeave)
// }

// const tooltip = {
//   inserted (e, b) {
//     const { text, align } = b.value
//     e[ctx] = {
//       text,
//       align: align || 'top',
//       element: e
//     }
//     attach.call(e[ctx])
//   },
//   update (e, b) {
//     const { repaint } = b.value
//     if (!repaint) return

//     tooltip.unbind(e)
//     tooltip.inserted(e, b)
//   },
//   unbind (e) {
//     if (!e || !e[ctx]) return

//     detach.call(e[ctx])
//     delete e[ctx]
//   }
// }

// export default tooltip

