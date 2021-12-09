import React from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TemplateCreation } from '../../common/components/WizardForms';
import { useTemplateCreationState } from '../../common/hooks';
import { actions as templateActions } from '../../redux/modules/templates';
import { ViewContainer } from '../stateComponents';
import useStyles from './style';

const CreateTemplate = () => {
  const { t } = useTranslation(['createTemplate', 'common']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const {
    attrs,
    templateLabel,
    canSaveTemplate,
    setTemplateLabel,
    handleCreateAttr,
    handleDeleteAttr,
    handleUpdateAttr,
    getAttrsWithoutId,
  } = useTemplateCreationState();

  const handleLeaveTemplateCreation = () => {
    if (history.length) history.goBack();
    else history.push('/templates');
  };

  const handleSaveTemplate = () => {
    dispatch(
      templateActions.createTemplate({
        label: templateLabel,
        attrs: getAttrsWithoutId(),
        successCallback: handleLeaveTemplateCreation,
      }),
    );
  };

  return (
    <ViewContainer headerTitle={t('title')}>
      <Box className={classes.container} padding={4}>
        <Box className={classes.content}>
          <TemplateCreation
            className={classes.templateCreation}
            attrs={attrs}
            templateLabel={templateLabel}
            setTemplateLabel={setTemplateLabel}
            handleCreateAttr={handleCreateAttr}
            handleDeleteAttr={handleDeleteAttr}
            handleUpdateAttr={handleUpdateAttr}
          />

          <Box className={classes.actions} paddingTop={4}>
            <Button size='large' variant='text' onClick={handleLeaveTemplateCreation}>
              {t('common:cancel')}
            </Button>

            <Button
              size='large'
              color='primary'
              variant='contained'
              disabled={!canSaveTemplate}
              onClick={handleSaveTemplate}
            >
              {t('common:save')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default CreateTemplate;
