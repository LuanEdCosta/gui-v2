import React from 'react';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { GetApp, Publish } from '@material-ui/icons';
import ActionButtons from '../../layout/ActionButtons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useImportStepStyles } from './style';
import DevicesBoilerplateCSV from 'Assets/devicesBoilerplate.csv';

const ImportStep = ({
  file,
  setFile,
  fileName,
  setFileName,
  setCurrentStep,
  setIsShowingCancelModal,
  handleCreateDevicesCSV,
}) => {
  const classes = useImportStepStyles();
  const { t } = useTranslation('createDevicesCSV');

  const handleOpenCancelModal = () => {
    setIsShowingCancelModal(true);
  };

  const handleChangeCsvFile = e => {
    const maxFileSize = 1024 * 1024; // 1mb
    const file = e.target.files[0];

    if (file.size > maxFileSize) {
      setFileName('');
      setFile(null);
      dispatchEvent(EVENT.GLOBAL_TOAST, {
        duration: 15000,
        i18nMessage: 'fileSizeLimit',
        type: 'error',
      });
    } else {
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleFinish = () => {
    handleCreateDevicesCSV();
    setCurrentStep(1);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.importationWrapper} marginBottom={4}>
          <Typography>
            <strong>{t('importStep.csvFileInputTitle')}</strong>
          </Typography>

          <TextField
            value={fileName}
            label={t('importStep.csvFileInputPh')}
            className={classes.csvInputFileName}
            helperText='Máx: 1mb'
            variant='outlined'
            disabled
          />

          <input
            id='csv-file'
            type='file'
            accept='.csv'
            onChange={handleChangeCsvFile}
            className={classes.csvFileInput}
          />

          <label htmlFor='csv-file'>
            <Button
              variant='outlined'
              color='inherit'
              size='small'
              startIcon={<Publish />}
              component='span'
            >
              {t('importStep.fileUploadButtonText')}
            </Button>
          </label>
        </Box>

        <Box marginBottom={4}>
          <Typography>{t('importStep.csvBoilerplateTitle')}</Typography>

          <Button variant='text' className={classes.boilerplateButton} startIcon={<GetApp />}>
            <a className={classes.link} href={DevicesBoilerplateCSV} download>
              <u>{t('importStep.devicesBoilerplate')}</u>
            </a>
          </Button>
        </Box>

        <Box className={classes.csvFormatHint}>
          <Typography className={classes.csvFormatHint}>
            {t('importStep.csvFormatHint.title')}
          </Typography>

          <Typography className={classes.csvFormatHint}>
            {t('importStep.csvFormatHint.paragraph1')}
          </Typography>

          <Typography className={classes.csvFormatHint}>
            {t('importStep.csvFormatHint.paragraph2')}
          </Typography>

          <Typography className={classes.csvFormatHint}>
            {t('importStep.csvFormatHint.paragraph3')}
          </Typography>
        </Box>
      </Box>

      <ActionButtons
        isLastStep
        isNextButtonDisabled={!file}
        handleClickNextButton={handleFinish}
        handleClickCancelButton={handleOpenCancelModal}
      />
    </Box>
  );
};

ImportStep.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setIsShowingCancelModal: PropTypes.func.isRequired,
  handleCreateDevicesCSV: PropTypes.func.isRequired,
};

export default ImportStep;
