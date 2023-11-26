<!-- @component
Fits text to its container.

```svelte
<Brim text="SUCH SVELTE" offset={[-10, -2, -10, -4]}/>
```
-->
<script>
  import { tick } from 'svelte';
  import { viewBoxOn } from '@brim/dom/core'

  /**
   * Textual content.
   * @type {string}
   */
  export let text = ''
  /**
   * Offset from the edges of the measured bounding rectangle.
   * 
   * - When one value is specified, it applies the same offset to all four sides.
   * - When two values are specified, the first offset applies to the top and bottom, the second to the left and right.
   * - When three values are specified, the first offset applies to the top, the second to the right and left, the third to the bottom.
   * - When four values are specified, the offsets apply to the top, right, bottom, and left in that order (clockwise).
   * @type {number|number[]}
   */
  export let offset = []
  /**
   * Space between characters.
   * @type {string|number}
   */
  export let space = null
  /** 
   * Function to refit the text.
   * @type {() => void}  */
  export const fit = () => {
    viewBox = Array.isArray(offset)
      ? viewBoxOn(node, ...offset)
      : viewBoxOn(node, offset)
  }

  let viewBox
  let node
  let dx
  $: dx = space ? '0' + Array(text.length).fill(space, 1).join(' ') : null
  // Refits when props change
  $: node && (text, offset, space, true) && tick().then(fit)
</script>

<svg {viewBox}>
  <text bind:this={node} {dx}>
    {text}
  </text>
</svg>

<style>
  svg {
    fill: currentColor;
    overflow: visible;
    display: block;
    width: auto;
    height: auto;
    /* prevent cascade */
    letter-spacing: 0;
  }
  text {
    /* A large font-size helps initial measurement accuracy (especially in WebKit-based browsers). */
    font-size: 100px;
  }
</style>
