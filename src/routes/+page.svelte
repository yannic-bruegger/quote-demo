<script lang="ts">
  import { onMount } from 'svelte';
  import CollectionTile from "../components/collection.svelte";
  import Header from "../components/header.svelte";
	import { Themes, NavBarState } from "$lib/constants";
  import { getMyCollections } from '$lib/api';
  import { getRandomTheme } from '$lib/helper';
	import type { Collection } from "$lib/types";

  let ownedCollections: Array<Collection> = [];
  let moderatedCollections: Array<Collection> = [];
  let followedCollections: Array<Collection> = [];

  onMount(async () => {
    const bearerToken = localStorage.getItem('token');
    if (!bearerToken) throw Error('Could not load bearer token from local storage.');
    const {owns, moderates, follows} = await getMyCollections(bearerToken);
    ownedCollections = owns;
    moderatedCollections = moderates;
    followedCollections = follows;
  })
</script>

<Header
  title="Quote"
  theme={getRandomTheme(Themes)}
  state={NavBarState.MAIN}
></Header>

<div class="collection-container">
  <div class="collections">
    {#each ownedCollections as ownedCollection }
      <CollectionTile
        id={ownedCollection.id}
        name={ownedCollection.name}
        theme={ownedCollection.theme}
        showMenu
      ></CollectionTile>
    {/each}
    {#each moderatedCollections as moderatedCollection }
      <CollectionTile
        id="{moderatedCollection.id}"
        name="{moderatedCollection.name}"
        theme={moderatedCollection.theme}
      ></CollectionTile>
    {/each}
    {#each followedCollections as followedCollection }
      <CollectionTile
        id="{followedCollection.id}"
        name="{followedCollection.name}"
        theme={followedCollection.theme}
      ></CollectionTile>
    {/each}
  </div>

  <div class="actions">
    <button class="default grow">
        <span class="icon-plus"></span>
        <a href="/new-collection">Create Collection</a>
    </button>
  </div>
</div>

<style scoped>
  .collection-container {
    display: flex;
    flex-direction: column;
    padding: var(--app-padding-lr);
    flex-grow: 1;
    gap: .75rem;
  }
  
  .collections {
    display: flex;
    flex-direction: column;
    gap: .75rem;
    flex-grow: 1;
  }

  .actions {
    flex-grow: 0;
  }
</style>
