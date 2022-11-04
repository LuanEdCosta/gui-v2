import React from 'react';

import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import PropTypes from 'prop-types';

import useStyles from './style';

const DataCard = ({
  className,
  footer,
  children,
  headerIcon,
  headerTitle,
  onClick,
  onOptionsClick,
}) => {
  const classes = useStyles();

  return (
    <Card className={className} classes={{ root: classes.root }} onClick={onClick}>
      <CardHeader
        className={classes.header}
        title={headerTitle}
        avatar={headerIcon}
        action={
          <IconButton size='small' aria-label='options' onClick={onOptionsClick}>
            <MoreHoriz />
          </IconButton>
        }
      />

      <CardContent className={classes.content}>{children}</CardContent>
      <CardContent className={classes.footer}>{footer}</CardContent>
    </Card>
  );
};

DataCard.propTypes = {
  className: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node,
  headerIcon: PropTypes.node,
  headerTitle: PropTypes.node,
  onClick: PropTypes.func,
  onOptionsClick: PropTypes.func,
};

DataCard.defaultProps = {
  className: '',
  footer: null,
  children: null,
  headerIcon: null,
  headerTitle: null,
  onClick: null,
  onOptionsClick: null,
};

export default DataCard;
