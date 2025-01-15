import { Stack, Button, Container, Typography, Card, Box, TextField, Checkbox, IconButton, Grid, Breadcrumbs, Link } from '@mui/material';

import Iconify from '../../ui-component/iconify';
import HomeIcon from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'S.No', flex: 1, headerAlign: 'center', align: 'center' },

  {
    field: 'customer',
    headerName: 'Customer ',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },

  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'invoice',
    headerName: 'Invoice',
    type: 'string',
    sortable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  }
];
const rows = [
  { id: 1, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '', date: '10-12-24,4:00 PM', invoice: 'Bill' },
  { id: 2, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '', date: '10-12-24,4:00 PM', invoice: 'Bill' },
  { id: 3, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '', date: '10-12-24,4:00 PM', invoice: 'Bill' },
  { id: 4, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '', date: '10-12-24,4:00 PM', invoice: 'Bill' },
  { id: 5, customer: 'Shubham', email: 'shubh@gmail.com', phone: 9876543210, address: '', date: '10-12-24,4:00 PM', invoice: 'Bill' }
];

const customerView = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="primary" href="/">
      <HomeIcon />
    </Link>,
    <Link underline="hover" key="2" color="primary" href="/material-ui/getting-started/installation/">
      Customer Details
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Details
    </Typography>
  ];

  return (
    <>
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" component="h2">
            <Iconify icon="" /> Customer Details
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Card>
      <Card>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Card>
    </>
  );
};
export default customerView;
