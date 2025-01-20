import React, {Suspense, lazy} from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import SideMenu from '../components/SideMenu';
import { Route, Routes } from 'react-router';

const Products = lazy(() => import("../pages/products"))
const Categories = lazy(() => import("../pages/categories"))




const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />
          <Stack sx={{
            width: '100%',
            p: 1
          }}>
          <Routes>
            <Route path="/" element={<Suspense fallback={<p>Loading...</p>}>
              <Products />
            </Suspense>} />
            <Route path="/categories" element={<Suspense fallback={<p>Loading...</p>}>
              <Categories />
            </Suspense>} />
          </Routes>
          </Stack>
    </Box>
  )
}

export default Layout
