# Dynamic Micro Frontends - Microservice architecture in SPAs

This document describes the concept of a micro frontend that relies heavily on custom elements, aiming for easy interoperability between elements while ensuring loose coupling.

To achieve this, each custom element is lazily loaded, and every service is free to choose the appropriate framework. This makes each service responsible for providing the necessary code to initialize the chosen framework.

## Loading custom element process

To load a custom element, we first need to verify if it is already registered. This can be done by calling `window.customElements.get(custom_element_name)`. If the function returns null, the custom element is not registered.

To register the custom element, create a new `script` element, set its `src` attribute to the URL of the corresponding frontend service, and attach it to the document's head.

```javascript
window.loadFeature = async function (url, custom_element_name) {
  if (!window.customElements.get(custom_element_name)) {
    var script = document.createElement("script");
    script.id = `init_${custom_element_name}_script`;
    script.type = "module";
    script.src = url;

    document.head.appendChild(script);
  }
};
```

Then, we add our new custom element to the DOM. All necessary bootstrapping for the frameworks used should be done within the downloaded JavaScript module.

By following these steps, custom elements can be nested arbitrarily, providing great flexibility and essentially no direct coupling between components and services.

## Intercomponent communication

Each component can provide custom events to promote important data to other components, similar to how microservices use services like Kafka.

These custom events can also facilitate asynchronous function calls between components. This is useful, for example, if you need to intercept navigation to prevent data loss.

### Intercomponent async function calls

The implementation is pretty simple and easily extended to add timeout, cancelation, broadcast events and multicast events with response from each receiver(receiver need to be know upfront).

**Component A - Sends an event**

```javascript
async function foo(): Promise<boolean> {
  // Create new Promise instance
  return new Promise((resolve) => {
    // Create a custom event
    const event = new CustomEvent("canClose", {
      bubbles: true,
      cancelable: false,
      detail: {
        id: "event-uuid", // a unique event id -> ideally an uuid
        // if needed more data
      },
    });

    // define the handler for the response
    const handleEventResponse = (event: Event) => {
      if (event instanceof CustomEvent) {
        // Check if unique event id
        if (event.detail.id === "event-uuid") {
          // remove the handler for further response events
          window.removeEventListener("canCloseResponse", handleEventResponse);
          // resolve the promise with the response data
          resolve(event.detail.canClose);
        }
      }
    };

    // Register handler as event listener for the response event
    window.addEventListener("canCloseResponse", handleEventResponse);

    // Dispatch the event
    window.dispatchEvent(event);
  });
}
```

**Component B - sends response event**

```javascript
// register event listener at appropiate time - ex. init, firstRender. Depends on the framework
window.addEventListener('canClose', this.onCanClose.bind(this));

onCanClose(event: Event): void {
    if (event instanceof CustomEvent) {
        // implement the required handling
        // send response immediatly or save the event-id and send response later like in this example
        this.canCloseId = event.detail.id;
    }
}

sendCanCloseResponse(canClose: boolean): void {
    // Create a new custom event
    const event = new CustomEvent('canCloseResponse', {
      bubbles: true,
      cancelable: false,
      detail: {
        // use the saved unique event id
        id: this.canCloseId,
        // add the necessary data
        canClose: canClose,
      }
    });
   
    // dispatch the event
    window.dispatchEvent(event);
}

// remove event handler at appropiate time - ex. destroy, dispose. Depends on the framework
```

## Stuff to explore
- mixing global and scoped/encapsulated css
- sharing cookies -> ex. for authentication
- versioning of the frontend/caching strategy/possibilities
- shared component library/component styles
- ...

## Example Project

The current focus is to get the foundation running. Each frontend serves the generated starting template of its respective framework. The backends are implemented but have not yet been tested.

### Features

- Authentication
- ToDo List
- Calendar

### Database

- postgresql (Auth)
- mssql (Calendar)
- mongodb (ToDo List)

### Backend Frameworks

- Actix (Rust) (Auth)
- Gin (Golang) (ToDo List)
- ASP.Net (C#) (Calendar)

### Frontend Frameworks

- Blazor (Serves Root Page with Navigation and stuff)
- React (Home Page)
- Vue (Calendar)
- Svelte (ToDo List)

### Deployment

- Docker Compose
- krakend
