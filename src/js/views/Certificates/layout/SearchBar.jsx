import React, { useRef, useState } from 'react';

import { Box, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ViewModule, List, Search, Add, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { VIEW_MODE } from '../../../common/constants';
import { useDebounce } from '../../../common/hooks';
import { useSearchBarStyles } from './style';

const SearchBar = ({ viewMode, handleSearchCertificate, handleChangeViewMode }) => {
  const { t } = useTranslation('certificates');
  const classes = useSearchBarStyles();
  const history = useHistory();

  const searchInputRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [isShowingClearButton, setIsShowingClearButton] = useState(false);

  const handleDebounce = useDebounce({
    delay: 1000,
    startCallback() {
      setIsTyping(true);
    },
    stopCallback(search) {
      setIsTyping(false);
      handleSearchCertificate(search);
    },
  });

  const handleCreateCertificate = () => {
    history.push('/certificates/new');
  };

  const handleClearSearch = () => {
    handleSearchCertificate('');
    setIsShowingClearButton(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  const handleChangeSearchText = e => {
    handleDebounce(e.target.value);
    setIsShowingClearButton(!!e.target.value);
  };

  return (
    <Box className={classes.searchContainer} paddingY={1} paddingX={2} margin={0}>
      <Box className={classes.leftSide}>
        <IconButton
          color={viewMode === VIEW_MODE.TABLE ? 'primary' : 'default'}
          onClick={() => handleChangeViewMode(VIEW_MODE.TABLE)}
        >
          <List />
        </IconButton>

        <IconButton
          color={viewMode === VIEW_MODE.CARD ? 'primary' : 'default'}
          onClick={() => handleChangeViewMode(VIEW_MODE.CARD)}
        >
          <ViewModule />
        </IconButton>

        <TextField
          inputRef={searchInputRef}
          className={classes.searchTextField}
          size='small'
          variant='outlined'
          placeholder={t('searchInputPh')}
          onChange={handleChangeSearchText}
          InputProps={{
            className: classes.searchInput,
            startAdornment: (
              <InputAdornment position='start'>
                {isTyping ? (
                  <Box marginRight={1} paddingTop={0.5}>
                    <CircularProgress size={16} />
                  </Box>
                ) : (
                  <Search />
                )}
              </InputAdornment>
            ),
            endAdornment: isShowingClearButton ? (
              <InputAdornment position='end'>
                <IconButton onClick={handleClearSearch} size='small'>
                  <Close />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      <IconButton
        className={classes.createButton}
        color='primary'
        aria-label='Create'
        onClick={handleCreateCertificate}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

SearchBar.propTypes = {
  viewMode: PropTypes.oneOf(Object.values(VIEW_MODE)),
  handleSearchCertificate: PropTypes.func,
  handleChangeViewMode: PropTypes.func,
};

SearchBar.defaultProps = {
  viewMode: VIEW_MODE.TABLE,
  handleSearchCertificate: null,
  handleChangeViewMode: null,
};

export default SearchBar;
