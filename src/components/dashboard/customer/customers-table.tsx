'use client';

import * as React from 'react';
import { getcurruntstock } from '@/request/curruntStock';
import { getallsizes } from '@/request/sizes';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
  curruntStock : any
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  curruntStock = [],
}: CustomersTableProps): React.JSX.Element {
  const [sizes, setSizes] = React.useState([]);

  React.useEffect(() => {
    getallsizes().then((res) => {
      setSizes(res.result);
    });
    
  }, []);
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Design Code</TableCell>
              {sizes && sizes.map((item: any, key) => <TableCell key={key}>{item?.name}</TableCell>)}
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curruntStock &&
              rows?.map((row: any, key: React.Key | null | undefined) => {
                return (
                  <TableRow hover key={key}>
                    <TableCell>
                      <Typography variant="subtitle2">{row?.item?.itemcode}</Typography>
                    </TableCell>

                    {row?.sizes &&
                      row?.sizes?.map((item: any, key: number) => <TableCell key={key}>{item?.qty}</TableCell>)}
                    <TableCell>{row?.totalqty}</TableCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <TableCell>Grand Total : {curruntStock.grantTotal}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button>Print</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
