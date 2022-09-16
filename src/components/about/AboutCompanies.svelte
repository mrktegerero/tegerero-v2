<script>

    export let items;
</script>


<div class="flex justify-center items-center">
  {#each items as item }
  <div class="w-[9rem] mx-14 img">
    <img src={item.img} alt="" class="w-full"/>
  </div>
  {/each}
</div>

<style>
  .img {
    filter: brightness(0) saturate(100%) invert(41%) sepia(0%) saturate(1597%) hue-rotate(85deg) brightness(93%) contrast(86%);
  }

  .img:first-child {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(196deg) brightness(108%) contrast(101%);
  }
</style>