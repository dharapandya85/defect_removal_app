import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

import React from 'react';
import List from './List';

const SearchList: React.FC = () => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Fraud Transaction List</Typography>
      </Breadcrumbs>
      <div className="item-title-big csp-mt-10">
        <ViewHeadlineIcon className="icon" />
        Fraud Transaction List
        <div className="csp-title">
          <TextField
            id="datetime-local"
            type="datetime-local"
            defaultValue="2021-01-24T10:30"
            className="csp-w-250"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span className="csp-to">to</span>
          <TextField
            id="datetime-local"
            type="datetime-local"
            defaultValue="2021-02-24T10:30"
            className="csp-w-250"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div>
        <List />
      </div>
    </div>
  );
};

export default SearchList;