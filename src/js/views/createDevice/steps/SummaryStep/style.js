import { makeStyles } from '@material-ui/core/styles';

export const useSummaryStepStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  input: {
    width: '100%',
  },
  certificateData: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > :first-child': {
      minWidth: '16rem',
    },
  },
}));
