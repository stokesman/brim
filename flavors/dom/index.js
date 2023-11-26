import { viewBoxOn } from './view-box-on';

const SVGNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(SVGNS, 'svg')
const text = document.createElementNS(SVGNS, 'text')

// A large font-size helps initial measurement accuracy (especially in WebKit-based browsers).
text.style.fontSize = '100px'

/**
 * Replaces an element’s content with SVG text fit to its container.
 * 
 * @example
 * ```html
 * <p class="brim">Simple</p>
 * 
 * <p class="brim">SPACEY</p>
 * 
 * <p class="brim">Tighty</p>
 * 
 * <script type="module">
 *   import { brim } from 'brim.js'
 * 
 *   const [first, second, third] = document.getElementsByClassName('brim')
 *   
 *   brim(first)
 * 
 *   // Adjust spacing with the space prop
 *   brim(second, { space: 0 })
 * 
 *   // Adjust the edges of the fitting with the offset prop
 *   brim(third, { offset: [-10, -2, -10, -4] })
 * </script>
 * ```
 * @param {HTMLElement} element        The element whose content will be replaced
 * 
 * @param {{
 *  offset?: number|number[]; 
 *  space?: number;
 * }} [options]
 * @param               options.offset Adjustments to the text fitting. Works like CSS border/margin/padding:
 * 
 * - When one value is specified, it applies the same offset to all four sides.
 * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * 
 * @param               options.space  Space between characters
 * 
 * @return {() => void} A function to refit the text
 */
export const brim = (element, {offset = [], space} = {}) => {
  if (!Array.isArray(offset)) offset = [offset]
  const { textContent } = element
  const textEl = /** @type {SVGTextElement} */(text.cloneNode())
  textEl.appendChild(document.createTextNode(textContent))
  if (space) { /** @todo support space being an array */
    const nCharacters = textContent.length;
    let spacing = '0'
    for (let i = 0; i < nCharacters; i++) spacing += ` ${space}`
    textEl.setAttribute('dx', spacing )
  }
  const svgEl = /** @type {SVGSVGElement} */ (svg.cloneNode())
  svgEl.append(textEl)
  element.textContent = ''
  element.append(svgEl)
  const fit = () =>
    svgEl.setAttribute('viewBox', viewBoxOn(textEl, ...offset))
  fit()
  return fit
}
