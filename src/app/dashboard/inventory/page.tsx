"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import { getcurruntstock } from '@/request/curruntStock';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { AddInventory } from '@/components/dashboard/customer/addInventoryForm';



export default function Page(): React.JSX.Element {
  const [curruntStock, setCurruntStock] = React.useState({ items: [], grantTotal: 0 });

  const page = 0;
  const rowsPerPage = 5;

  const paginatedInventory = applyPagination(curruntStock.items, page, rowsPerPage);

  const getInventoryData = () => {
    getcurruntstock().then((res) => {
      setCurruntStock(res.result);
    });
  };
  React.useEffect(() => {
    getInventoryData();
  }, []);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Inventory</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <AddInventory />
      <CustomersFilters />
      <CustomersTable
        curruntStock={curruntStock}
        count={paginatedInventory.length}
        page={page}
        rows={paginatedInventory}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
