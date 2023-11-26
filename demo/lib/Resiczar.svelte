<script>
  export let as = 'div'
  export let dimensions = null

  let width = 'auto'
  let height = 'min-content'
  $: if (dimensions) {
    const [w, h] = dimensions
    width = `${ w }px`
    height = `${ h }px`
  }

  let root
  const measureRoot = () => {
    const {width, height} = root.getBoundingClientRect()
    dimensions = [width, height]
  }

  let _grabbed = false
  let fromCoords
  /** @param { MouseEvent } e */
  const startDrag = ({clientX: x, clientY: y}) => {
    _grabbed = true
    fromCoords = [x, y]
    if (!dimensions) measureRoot()
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', endDrag, { once: true })
  }
  const drag = (e) => {
    const [w, h] = dimensions
    const [x, y] = fromCoords
    const deltaX = e.clientX - x
    const deltaY = e.clientY - y
    fromCoords = [e.clientX, e.clientY]
    dimensions = [w + deltaX, h + deltaY]
    // Avoids text selection while dragging
    e.preventDefault();
  }
  const endDrag = () => {
    _grabbed = false
    dimensions = null
    document.removeEventListener('mousemove', drag)
  }
  const onBlur = () => _grabbed && endDrag();
</script>

<svelte:element
  bind:this={root}
  this={as}
  class="resiczar"
  style:width style:height style:position="relative"
>
  <slot/>
  <meta
    tabindex="-1"
    class:_grabbed
    on:mousedown={startDrag}
    on:blur={onBlur}/>
</svelte:element>

<style>
  meta {
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 36px;
    height: 36px;
    background: mistyrose;
    transform: translate(50%, 50%);
    cursor: grab;
  }
  meta:focus {
    border: 1px solid deeppink;
  }
  meta._grabbed {
    cursor: grabbing;
  }
</style>