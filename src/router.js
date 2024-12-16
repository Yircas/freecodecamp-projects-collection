import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import QuotesApp from './pages/QuotesApp';
import MarkdownApp from './pages/MarkdownApp'
import DrumApp from './pages/DrumApp';
import CalculatorApp from './pages/CalculatorApp';
import Layout from './components/Layout';

// Define routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // This uses the Layout component
        children: [
            { path: '', element: <Home /> },
            { path: 'quotesApp', element: <QuotesApp /> },
            { path: 'markdownApp', element: <MarkdownApp /> },
            { path: 'drumApp', element: <DrumApp /> },
            { path: 'calculatorApp', element: <CalculatorApp /> },
            ],
    },
]);

export default router;