import { makeStyles } from '@material-ui/core/styles';

export const useSearchBarStyles = makeStyles(theme => ({
  searchContainer: {
    background: theme.palette.background.shade[500],
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchTextField: {
    marginLeft: theme.spacing(1),
    width: '400px',
  },
  searchInput: {
    borderRadius: '100px',
  },
  createButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  tooltip: {
    fontSize: '1rem',
  },
}));

export const useCardsStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    cursor: 'default',
  },
  cardIcon: {
    fontSize: '40px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    wordBreak: 'break-all',
    paddingRight: '1.4rem',
  },
  link: {
    color: theme.palette.primary.light,
  },
}));

export const useCertificateOptionsStyles = makeStyles(theme => ({
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItemText: {
    margin: theme.spacing(0, 1.5),
  },
}));

export const usePaginationStyles = makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const useMassActionsStyles = makeStyles(theme => ({
  massActionsContainer: {
    background: theme.palette.secondary.main,
  },
  massActionsLabel: {
    color: theme.palette.background.default,
  },
  massActionsButton: {
    color: theme.palette.text.primary,
    background: theme.palette.background.shade[500],
  },
  massActionsCloseButton: {
    color: theme.palette.background.default,
  },
}));

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.background.shade[500],
  },
  clickableCell: {
    cursor: 'pointer',
    color: '#7B92FF',
    textDecoration: 'underline',
  },
  truncatedText: {
    maxWidth: '125px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  tooltip: {
    fontSize: '1rem',
  },
  fingerprintField: {
    display: 'flex',
    alignItems: 'center',
  },
  deviceIdLink: {
    color: theme.palette.primary.light,
  },
}));

export const useAssociateToDeviceModalStyles = makeStyles(theme => ({
  tableContainer: {
    background: theme.palette.background.shade[500],
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
      background: theme.palette.background.shade[500],
    },
  },
}));
