import {children, createEffect, on} from 'solid-js'
import { viewBoxOn } from '@brim/dom/core' 

/** @typedef {string | number} BrimChild */
/**
 * @template T
 * @typedef {import('solid-js').Ref<T>} Ref
 */
/**
 * @typedef BrimProps
 * @prop {BrimChild | BrimChild[]} children
 * @prop {number|number[]}         offset   Offset from the edges of the measured bounding rectangle.
 *
 *  - When one value is specified, it applies the same offset to all four sides.
 *  - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 *  - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 *  - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * @prop {number}                  space    Space between characters.
 * 
 * @prop {Ref<() => void>}         ref      A function to refit the text.
 */

/**
 * Fits text to its container.
 * 
 * @example
 * ```js
 * <Brim space={10} offset={[-10, -5]}>IMPORTANT</Brim>
 * ```
 * @type {import('solid-js').Component<BrimProps>}
 */
const Brim = (props) => {
  const offset = () => {
    if (props.offset === undefined) return []
    else return Array.isArray(props.offset) ? props.offset : [props.offset]
  }

  const c = children(() => props.children)
  const nCharacters = () => {
    const cValue = c()
    return (Array.isArray(cValue) ? cValue.join('') : cValue).length
  }

  const dx = () => {
    if (props.space) 
      return '0' + Array(nCharacters()).fill(props.space, 1).join(' ')
  }

  let rootEl
  let textEl
  const fit = () =>
    rootEl.setAttribute('viewBox', viewBoxOn(textEl, ...offset()))

  if (typeof props.ref === 'function') props.ref(fit)
  else props.ref = fit

  createEffect(on([c, offset, () => props.space], fit))

  return (
    <svg ref={rootEl}>
      {/* A large font-size helps initial measurement accuracy (especially in WebKit-based browsers). */}
      <text ref={textEl} dx={dx()} style="font-size: 100px">
        { props.children }
      </text>
    </svg>
  )
}

export { Brim, viewBoxOn }
