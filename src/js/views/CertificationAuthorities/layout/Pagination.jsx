import React from 'react';

import { Box, TablePagination, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePaginationStyles } from './style';

const Pagination = ({
  page,
  rowsPerPage,
  totalOfPages,
  numberOfSelectedCAs,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { t } = useTranslation('certificationAuthorities');
  const classes = usePaginationStyles();

  return (
    <Box className={classes.pagination} paddingX={2} paddingY={1}>
      <Typography>{t('totalOfPages', { count: totalOfPages })}</Typography>

      {!!numberOfSelectedCAs && (
        <Typography>{t('numberOfSelectedItems', { count: numberOfSelectedCAs })}</Typography>
      )}

      <TablePagination
        page={page}
        component='div'
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        count={totalOfPages * rowsPerPage}
        labelRowsPerPage={t('labelRowsPerPage')}
        nextIconButtonText={t('nextIconButtonText')}
        backIconButtonText={t('backIconButtonText')}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={() => {
          return t('pageInfo', { page: page + 1, totalOfPages });
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalOfPages: PropTypes.number,
  handleChangePage: PropTypes.func,
  numberOfSelectedCAs: PropTypes.number,
  handleChangeRowsPerPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  rowsPerPage: 0,
  totalOfPages: 0,
  handleChangePage: null,
  numberOfSelectedCAs: 0,
  handleChangeRowsPerPage: null,
};

export default Pagination;
