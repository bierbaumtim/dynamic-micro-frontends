import './app.css'
import App from './App.svelte'

const target = document.getElementById('svelte-app');

let app: App | undefined = undefined;

if (target) {
    app = new App({
        target,
    });
}


export default app;