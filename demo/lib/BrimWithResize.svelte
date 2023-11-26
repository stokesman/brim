<script>
  import { onMount } from 'svelte'
  import { Brim } from '@brim/svelte'

  let self

  onMount(() => {
    let ignoreNext = false;
    const observer = new ResizeObserver((entries) => {
      if (!ignoreNext) {
        /** Might want to debounce this or make it chunk to `threshold` pixels */
        self.brim();
        ignoreNext = true;
        tick().then(() => ignoreNext = false)
      }
    })
    observer.observe(node.parentNode)
    return () => observer.disconnect()
  })
</script>

<Brim bind:this={self} {...$$props}/>