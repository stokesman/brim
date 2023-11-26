/**
 * @param {SVGGraphicsElement} element Graphic element to measure.
 * @param {...number} offset Adjustments to the resulting viewbox. Works like CSS border/margin/padding:
 *
 * - When one value is specified, it applies the same offset to all four sides.
 * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
 * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
 * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
 * @return {string} Value for viewBox attribute.
 */
export function viewBoxOn(element, ...offset) {
  const [v1 = 0, h1 = v1, v2 = v1, h2 = h1] = offset
  const { x, y, width, height } = element.getBBox()
  return (
    `${
    x - h2 } ${
    y - v1 } ${
    h2 + width + h1 } ${
    v1 + height + v2 }`
  )
}
