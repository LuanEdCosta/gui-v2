import { makeStyles } from '@material-ui/core/styles';

export const useAssociateDeviceModalStyles = makeStyles(theme => ({
  tableContainer: {
    background: theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
  },
  tableHeadCell: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selectableTableRow: {
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
