import React from 'react';

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { useAttrDataList } from './style';

const AttrDataList = ({
  title,
  caption,
  children,
  isContentVisible,
  isCaptionHighlighted,
  handleToggleContent,
}) => {
  const classes = useAttrDataList({ isContentVisible });

  return (
    <List className={classes.container}>
      <ListItem className={classes.header} onClick={handleToggleContent} disableGutters>
        <ListItemText
          primary={
            <Typography className={classes.title} component='span'>
              <Box component='span' marginRight={1}>
                {title}
              </Box>

              <Typography
                component='i'
                variant='caption'
                color={isCaptionHighlighted ? 'primary' : 'inherit'}
              >
                {isCaptionHighlighted ? <strong>{caption}</strong> : caption}
              </Typography>
            </Typography>
          }
        />

        <ListItemIcon>
          <ChevronRight className={classes.icon} />
        </ListItemIcon>
      </ListItem>

      <Collapse in={isContentVisible} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
};

AttrDataList.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isContentVisible: PropTypes.bool.isRequired,
  isCaptionHighlighted: PropTypes.bool,
  handleToggleContent: PropTypes.func.isRequired,
};

AttrDataList.defaultProps = {
  isCaptionHighlighted: false,
};

export default AttrDataList;
