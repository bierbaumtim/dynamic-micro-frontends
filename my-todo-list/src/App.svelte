<svelte:options customElement="my-todo-list" />

<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  let elementRef: HTMLElement;

  let showNestedComponent: boolean = false;
  const toggleNestedComponent = async () => {
    const canClose = await canCloseNestedCompontent();

    if (!canClose) {
      alert("Can't close nested component");
      return;
    }

    showNestedComponent = !showNestedComponent;

    if (
      showNestedComponent &&
      !window.customElements.get("my-nested-component")
    ) {
      var script = document.createElement("script");
      script.id = `init_my-nested-component_script`;
      script.type = "module";
      script.src = "http://localhost:3003/my-nested-component.js";

      document.head.appendChild(script);
    }
  };

  async function canCloseNestedCompontent(): Promise<boolean> {
    return new Promise((resolve) => {
      if (showNestedComponent) {
        const event = new CustomEvent("canClose", {
          bubbles: true,
          cancelable: false,
          detail: {
            id: "event-uuid",
          },
        });

        const handleEventResponse = (event: Event) => {
          if (event instanceof CustomEvent) {
            if (event.detail.id === "event-uuid") {
              window.removeEventListener(
                "canCloseResponse",
                handleEventResponse
              );
              resolve(event.detail.canClose);
            }
          }
        };

        window.addEventListener("canCloseResponse", handleEventResponse);

        window.dispatchEvent(event);
      } else {
        resolve(true);
      }
    });
  }
</script>

<main id="my-todo-list-root" bind:this={elementRef}>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>

  <div class="card">
    <button on:click={toggleNestedComponent}>Toggle nested component</button>
  </div>

  {#if showNestedComponent}
    <my-nested-component />
  {/if}
</main>

<style>
  /* :root  */
  #my-todo-list-root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(a) {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  :global(a:hover) {
    color: #535bf2;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  :global(h1) {
    font-size: 3.2em;
    line-height: 1.1;
  }

  .card {
    padding: 2em;
  }

  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  :global(button) {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  :global(button:hover) {
    border-color: #646cff;
  }
  :global(button:focus),
  :global(button:focus-visible) {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    /* :root  */
    #my-todo-list-root {
      color: #213547;
      background-color: #ffffff;
    }
    :global(a:hover) {
      color: #747bff;
    }
    :global(button) {
      background-color: #f9f9f9;
    }
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
