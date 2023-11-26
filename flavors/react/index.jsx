import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { viewBoxOn } from '@brim/dom/core'

/** @typedef {string | number} BrimChild */

/**
 * @typedef BrimProps
 * @prop {BrimChild | BrimChild[]} children
 * @prop {number|number[]} offset Offset from the edges.
 *
 * - When one value is specified, it applies the same offset to all four sides.
 * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * @prop {number} space Space between characters.
 */

/**
 * @typedef {() => void} BrimFit A function to refit the text.
 */

/**
 * Fits text to its container.
 *   
 * @example
 * ```js
 * <Brim space={10} offset={[-10, -5]}>IMPORTANT</Brim>
 * ```
 * @type {import('react').ForwardRefRenderFunction<BrimFit, BrimProps>} 
 */
const Brim = forwardRef(({children, offset = [], space}, ref) => {
  const [t, r, b, l] = Array.isArray(offset) ? offset : [offset]
  const actualize = useRef()
  const initialize = useCallback((node) => {
    children, space // Avoids “unnecessary dependencies” warning from react-hooks/exhaustive-deps
    actualize.current = () => {
      if (node)
        node.parentNode.setAttribute('viewBox', viewBoxOn(node, t, r, b, l))
    }
    actualize.current()
  }, [children, space, t, r, b, l])

  useImperativeHandle(ref, () => actualize.current, [])

  let dx
  if (space) dx = '0' + Array(children.length).fill(space, 1).join(' ')

  return (
    <svg viewBox="0 0 0 0">
      {/* A large font-size helps initial measurement accuracy (especially in WebKit-based browsers). */}
      <text ref={initialize} dx={dx} style={{fontSize: '100px'}}>
        { children }
      </text>
    </svg>
  )
})

Brim.displayName = 'Brim'

export {Brim, viewBoxOn}