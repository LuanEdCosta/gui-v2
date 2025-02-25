import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useOptionsMenuStyles } from './style';

const CaOptionsMenu = ({ isShowingMenu, anchorElement, handleDelete, handleHideOptionsMenu }) => {
  const { t } = useTranslation(['certificationAuthorities', 'common']);
  const classes = useOptionsMenuStyles();

  return (
    <Menu
      id='options-menu'
      open={isShowingMenu}
      anchorEl={anchorElement}
      onClose={handleHideOptionsMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleDelete}>
        <Delete />
        <span className={classes.menuItemText}>{t('common:exclude')}</span>
      </MenuItem>
    </Menu>
  );
};

CaOptionsMenu.propTypes = {
  isShowingMenu: PropTypes.bool,
  anchorElement: PropTypes.object,
  handleDelete: PropTypes.func,
  handleHideOptionsMenu: PropTypes.func,
};

CaOptionsMenu.defaultProps = {
  isShowingMenu: false,
  anchorElement: null,
  handleDelete: null,
  handleHideOptionsMenu: null,
};

export default CaOptionsMenu;
