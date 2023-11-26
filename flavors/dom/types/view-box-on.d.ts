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
export function viewBoxOn(element: SVGGraphicsElement, ...offset: number[]): string;
