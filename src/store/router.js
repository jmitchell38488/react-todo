import { Router } from 'director/build/director';
import { autorun } from 'mobx';

export function startRouter(store) {
    // update state on url change
    const router = Router({
            '/': () => store.showAllTodos(),
            '/active': () => store.showActiveTodos(),
            '/completed': () => store.showCompletedTodos()
        }).configure({
            notfound: () => store.showAllTodos(),
            html5history: true
        });

    router.init('/');

    // update url on state changes
    autorun(() => {
        const path = store.currentPath;
        if (path !== window.location.pathname) {
            window.history.pushState(null, null, path)
        }
    })

}