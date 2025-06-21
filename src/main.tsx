import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>,
)
