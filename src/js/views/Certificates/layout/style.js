import { makeStyles } from '@material-ui/core/styles';

export const useSearchBarStyles = makeStyles(theme => ({
  searchContainer: {
    background: theme.palette.grey[100],
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
}));

export const useCardsStyles = makeStyles(() => ({
  card: {
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

export const useDetailsModalStyles = makeStyles(theme => ({
  dataGroup: {
    background: '#f2f2f2',
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 'none',
  },
  dataGroupTitleIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  tableCellBold: {
    fontWeight: 'bold',
  },
  tableCellSecondary: {
    color: theme.palette.text.secondary,
  },
}));

export const useMassActionsStyles = makeStyles(theme => ({
  massActionsContainer: {
    background: theme.palette.primary.main,
  },
  massActionsLabel: {
    color: theme.palette.background.default,
  },
  massActionsButton: {
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
  },
  massActionsCloseButton: {
    color: theme.palette.background.default,
  },
}));

export const useDataTableStyles = makeStyles(theme => ({
  tableHead: {
    background: theme.palette.grey[100],
  },
  clickableCell: {
    cursor: 'pointer',
    color: '#7B92FF',
    textDecoration: 'underline',
  },
  truncatedFingerprint: {
    maxWidth: '120px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
