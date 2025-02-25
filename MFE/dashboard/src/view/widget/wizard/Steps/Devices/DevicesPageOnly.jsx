import React, { Fragment, useCallback, useEffect, useState } from 'react';

import {
  Grid,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { FormCheckBox } from 'sharedComponents/Checkbox';
import { CircularIndeterminate } from 'sharedComponents/Loading';
import { Paginator, usePaginator } from 'sharedComponents/Paginator';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Device as DeviceService } from 'Services/index';
import { useDebounce } from 'use-debounce';

import { useStyles } from './style';

const Devices = ({ validate, ...otherProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const { paginatorData, setPaginatorData, setCurrentPage, setPageSize, setDisablePaginator } =
    usePaginator();

  useEffect(() => {
    setDisablePaginator(true);
    setIsLoading(true);
    DeviceService.getDevicesList(
      { number: paginatorData.currentPage, size: paginatorData.pageSize },
      { label: searchTermDebounced },
    )
      .then(response => {
        const { devices, currentPage, totalPages } = response.getDevices;
        setPaginatorData({ data: devices, currentPage, totalPages });
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error); // TODO tratamento de erro da api
        setDisablePaginator(false);
        setIsLoading(false);
      });
  }, [
    setDisablePaginator,
    setPaginatorData,
    paginatorData.currentPage,
    paginatorData.pageSize,
    searchTermDebounced,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermDebounced, setCurrentPage]);

  const handleChangeSearch = useCallback(e => {
    setSearchTerm(e.target.value);
  }, []);

  const classes = useStyles();

  const { t } = useTranslation(['dashboard']);

  const renderItem = useCallback((label, id) => {
    return (
      <>
        <span className='listTitle'>{label}</span>
        <span className='listId'>{`( ${id} )`}</span>
      </>
    );
  }, []);

  if (isLoading) return <CircularIndeterminate />;

  return (
    <Grid container justifyContent='center'>
      <Grid item className={classes.searchContainer}>
        <TextField
          variant='outlined'
          placeholder={t('devices.search')}
          name='searchDevices'
          onChange={handleChangeSearch}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <List className={classes.root}>
        {!paginatorData.pageData.length ? (
          <ListItem className={classes.notFound}>
            <ListItemText primary={t('devices.notFound')} />
          </ListItem>
        ) : (
          paginatorData.pageData.map(value => {
            const { id, label } = value;
            const labelId = `checkbox-list-label-${id}`;

            return (
              <Fragment key={value.id}>
                <ListItem
                  role={undefined}
                  // button
                  // onClick={() => handleToggle(value)}
                >
                  <ListItemIcon>
                    <Field
                      type='checkbox'
                      color='secondary'
                      name={`${otherProps.name}.chk-${id}`}
                      component={FormCheckBox}
                      format={item => (item ? item.id === id : false)}
                      parse={item => (item ? value : undefined)}
                      callback={() =>
                        otherProps.form.mutators.clearAttributesByDevice(id, 'attributes')
                      }
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={renderItem(label, id)} />
                </ListItem>
                <Divider />
              </Fragment>
            );
          })
        )}
      </List>
      {paginatorData.pageData.length > 0 && (
        <Grid item className={classes.paginationContainer}>
          <Paginator
            totalPages={paginatorData.totalPages}
            currentPage={paginatorData.currentPage}
            pageSize={paginatorData.pageSize}
            onPageChange={(event, page) => setCurrentPage(page)}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            showFirstButton
            showLastButton
            disabled={paginatorData.disabled}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Devices;
