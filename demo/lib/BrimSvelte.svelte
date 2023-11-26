<!-- @component An wrapper for testing parity with the non-svelte adapted components -->
<script>
  import {Brim} from '@brim/svelte'

  export let text = ''
  export let offset = []
  export let space = 0

  let brim
  export const fit = () => brim.fit()
</script>

<div class=brim><Brim bind:this={brim} offset={offset} {space} {text}/></div>