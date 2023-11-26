<!-- @component An adapter for using the DOM version in Svelte -->
<script>
  import {brim} from '@brim/dom'

  export let text = ''
  export let offset = []
  export let space = 0

  let actualize
  export const fit = () => actualize()

  const brimIt = node => {
    actualize = brim(node, {offset, space})
  };
</script>

<div use:brimIt class=brim>{text}</div>