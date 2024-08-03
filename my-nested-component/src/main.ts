import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

async function webComponentApp() {
  const app = await createApplication(appConfig);

  const element = createCustomElement(AppComponent, { injector: app.injector });
  customElements.define('my-nested-component', element);
}

(async function () {
  await webComponentApp();
})();