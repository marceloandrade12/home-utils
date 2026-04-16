import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { MasterLayout } from '@/layout/master-layout'
import { ExpensesPage } from '@/pages/expenses-page'
import { HomePage } from '@/pages/home-page'
import { MealsPage } from '@/pages/meals-page'
import { NotFoundPage } from '@/pages/not-found-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
      },
      {
        path: 'meals',
        element: <MealsPage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
