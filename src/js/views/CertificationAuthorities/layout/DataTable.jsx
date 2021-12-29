import React, { useMemo } from 'react';

import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  Tooltip,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataTableHead } from '../../../common/components/DataTable';
import { DATA_ORDER } from '../../../common/constants';
import { useCertificateComputedData } from '../../../common/hooks';
import { getComparator } from '../../../common/utils';
import { useDataTableStyles } from './style';

const DataTable = ({
  order,
  orderBy,
  certificationAuthorities,
  selectedCertificationAuthorities,
  setOrder,
  setOrderBy,
  handleSetOptionsMenu,
  handleSelectCertificationAuthority,
}) => {
  const { t } = useTranslation('certificationAuthorities');
  const classes = useDataTableStyles();

  const handleGetCertificateComputedData = useCertificateComputedData();

  const headCells = useMemo(
    () => [
      {
        id: 'cafingerprint',
        label: t('dataTableHead.caFingerprint'),
      },
      {
        id: 'subjectDN',
        label: t('dataTableHead.subjectDN'),
      },
      {
        id: 'validity',
        label: t('dataTableHead.validity'),
      },
      {
        id: 'status',
        label: t('dataTableHead.status'),
      },
      {
        id: 'actions',
        label: t('dataTableHead.actions'),
        disableOrderBy: true,
      },
    ],
    [t],
  );

  const valueFormatters = useMemo(
    () => ({
      validity(certificationAuthority) {
        const { validityInitialDate, validityFinalDate } = handleGetCertificateComputedData(
          certificationAuthority.validity,
        );
        return `${validityInitialDate} - ${validityFinalDate}`;
      },
      status(certificationAuthority) {
        const { statusText } = handleGetCertificateComputedData(certificationAuthority.validity);
        return statusText;
      },
    }),
    [handleGetCertificateComputedData],
  );

  const handleRequestSort = (_, property) => {
    const isSameProperty = orderBy === property;
    if (isSameProperty) {
      const isAsc = order === DATA_ORDER.ASC;
      setOrder(isAsc ? DATA_ORDER.DESC : DATA_ORDER.ASC);
      setOrderBy(isAsc ? property : '');
    } else {
      setOrder(DATA_ORDER.ASC);
      setOrderBy(property);
    }
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      handleSelectCertificationAuthority(certificationAuthorities.map(row => row.caFingerprint));
      return;
    }

    handleSelectCertificationAuthority([]);
  };

  const handleSelectRow = fingerprint => {
    const selectedIndex = selectedCertificationAuthorities.indexOf(fingerprint);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCertificationAuthorities, fingerprint);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCertificationAuthorities.slice(1));
    } else if (selectedIndex === selectedCertificationAuthorities.length - 1) {
      newSelected = newSelected.concat(selectedCertificationAuthorities.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCertificationAuthorities.slice(0, selectedIndex),
        selectedCertificationAuthorities.slice(selectedIndex + 1),
      );
    }

    handleSelectCertificationAuthority(newSelected);
  };

  const handleStopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size='small'>
          <DataTableHead
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            cells={headCells}
            rowCount={certificationAuthorities.length}
            numSelected={selectedCertificationAuthorities.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {certificationAuthorities
              .slice()
              .sort(getComparator(order === DATA_ORDER.DESC, orderBy, valueFormatters[orderBy]))
              .map(certificationAuthority => {
                const { caFingerprint, validity } = certificationAuthority;
                const isSelected = selectedCertificationAuthorities.indexOf(caFingerprint) !== -1;

                const {
                  statusColor,
                  statusText,
                  validityFinalDate,
                  validityInitialDate,
                } = handleGetCertificateComputedData(validity);

                const handleSelectThisRow = () => {
                  handleSelectRow(caFingerprint);
                };

                const handleShowOptionsMenu = e => {
                  handleSetOptionsMenu({
                    anchorElement: e.target,
                    certificationAuthority,
                  });
                };

                return (
                  <TableRow
                    key={caFingerprint}
                    tabIndex={-1}
                    role='checkbox'
                    selected={isSelected}
                    aria-checked={isSelected}
                    hover
                  >
                    <TableCell onClick={handleStopPropagation}>
                      <Checkbox
                        color='primary'
                        checked={isSelected}
                        onChange={handleSelectThisRow}
                      />
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        title={certificationAuthority.caFingerprint}
                        classes={{ tooltip: classes.tooltip }}
                        placement='right'
                        interactive
                        arrow
                      >
                        <div className={classes.truncatedText}>
                          {certificationAuthority.caFingerprint}
                        </div>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        title={certificationAuthority.subjectDN}
                        classes={{ tooltip: classes.tooltip }}
                        placement='right'
                        interactive
                        arrow
                      >
                        <div className={classes.truncatedText}>
                          {certificationAuthority.subjectDN}
                        </div>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      {validityInitialDate && validityFinalDate
                        ? `${validityInitialDate} - ${validityFinalDate}`
                        : t('validityNotDefined')}
                    </TableCell>

                    <TableCell>
                      <Chip
                        style={{ background: statusColor, color: 'white' }}
                        label={statusText}
                        size='small'
                      />
                    </TableCell>

                    <TableCell onClick={handleStopPropagation}>
                      <IconButton onClick={handleShowOptionsMenu}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DataTable.propTypes = {
  order: PropTypes.oneOf([DATA_ORDER.ASC, DATA_ORDER.DESC]).isRequired,
  orderBy: PropTypes.string.isRequired,
  certificationAuthorities: PropTypes.array.isRequired,
  selectedCertificationAuthorities: PropTypes.array.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  handleSetOptionsMenu: PropTypes.func.isRequired,
  handleSelectCertificationAuthority: PropTypes.func.isRequired,
};

export default DataTable;
