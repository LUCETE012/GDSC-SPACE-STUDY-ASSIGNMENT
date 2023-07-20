import './tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { RootLayout } from './app/layout'
import { DiaryRouter } from './router'
import { DiaryProvider } from './provider/Diary'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <DiaryProvider>
            <RootLayout>
                <DiaryRouter />
            </RootLayout>
        </DiaryProvider>
    // </React.StrictMode>
)
