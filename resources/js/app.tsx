import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = {
    ...import.meta.glob('./Pages/**/*.tsx'),
    ...import.meta.glob('./Pages/**/*.jsx'),
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        const page =
            pages[`./Pages/${name}.tsx`] ||
            pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return page();
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});