<script lang="ts">
	import { goto } from "$app/navigation";
	import { Themes } from "$lib/constants";

  export let name: string = "Collection Name";
  export let description: string = '';
  export let theme: Themes = Themes.BLUE_GRADIENT;
  export let showMenu: boolean = false;
  export let id: string = '';
  
  export let link: string= `/collections/${id}`;
  export let editLink: string= `/collections/${id}/edit`;

  if (!theme) theme = Themes.BLUE_GRADIENT;

  const shareData = {
    title: name,
    url: link,
  };
  const share = async () => {
    await navigator.share(shareData);
  }
</script>


<div class="collection">
  <div class={`color-indicator ${theme}`}></div>
  <div class="details" on:click={() => goto(link)} on:keydown={() => {}} role="button" tabindex="0">
    <h1>{name}</h1>
    <p>{description}</p>
  </div>
  <div class="actions">
    {#if navigator.canShare && navigator.canShare(shareData)}
    <button on:click={() => share()}>
      <span class="icon-share"></span>
    </button>
    {/if}
    {#if showMenu}
      <button on:click={() => goto(editLink)}>
        <span class="icon-context-vertical"></span>
      </button>
    {/if}
  </div>
</div>



<style scoped lang="scss">
  .collection {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px 16px 12px 12px;
    border-radius: var(--radius);
    background-color: var(--foreground);
    box-shadow: var(--shadow);
    min-height: 70px;
  }

  .color-indicator {
    width: 8px;
    border-radius: 8px;
    display: block;
    flex-grow: 0;
  }

  .details {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
      color: var(--text-muted);
    }
  }
  
  .actions {
    display: flex;
    justify-content: center;
    flex-grow: 0;
    gap: 1rem;
  }

  .icon-context-vertical {
    font-size: 24px;
  }
</style>