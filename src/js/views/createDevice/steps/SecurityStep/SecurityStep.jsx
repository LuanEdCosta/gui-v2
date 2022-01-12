import React, { useEffect, useState } from 'react';

import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { constants } from 'Redux/certificates';
import { certificatesSelector, paginationControlSelector } from 'Selectors/certificatesSelector';

import { useIsLoading } from '../../../../common/hooks';
import { actions as certificatesActions } from '../../../../redux/modules/certificates';
import ActionButtons from '../../layout/ActionButtons';
import SecurityTable from './SecurityTable';
import { useSecurityStepStyles } from './style';

const SecurityStep = ({
  selectedCertificate,
  createdCertificates,
  handleGoToNextStep,
  setCreatedCertificates,
  setSelectedCertificate,
  handleCancelDeviceCreation,
  handleGoToPreviousStep,
}) => {
  const { t } = useTranslation('createDevice');
  const classes = useSecurityStepStyles();
  const dispatch = useDispatch();

  const certificates = useSelector(certificatesSelector);
  const { totalPages = 0 } = useSelector(paginationControlSelector);

  const isLoadingCertificates = useIsLoading(constants.GET_CERTIFICATES);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnClickCreation = () => {
    dispatch(
      certificatesActions.createCertificateOneClick({
        shouldGetCurrentPageAgain: true,
        successCallback(certificateData) {
          const fingerprint = certificateData.certificateFingerprint;

          setCreatedCertificates(currentCreatedCertificates => {
            return { ...currentCreatedCertificates, [fingerprint]: certificateData };
          });

          setSelectedCertificate({
            fingerprint,
            caCertificate: undefined,
            pem: certificateData.certificatePem,
            publicKey: certificateData.publicKeyPEM,
            privateKey: certificateData.privateKeyPEM,
          });
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      certificatesActions.getCertificateById({
        id: 'null',
        page: {
          number: page + 1,
          size: rowsPerPage,
        },
      }),
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    return () => {
      dispatch(
        certificatesActions.getNewGeneratedCertificate({
          certificateData: null,
        }),
      );
    };
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.header} marginBottom={2}>
          <Typography>{t('securityStep.hint')}</Typography>

          <Tooltip
            placement='left'
            classes={{ tooltip: classes.tooltip }}
            title={t('securityStep.createCertificateWithOneClick')}
          >
            <IconButton className={classes.headerButton} onClick={handleOnClickCreation}>
              <Add />
            </IconButton>
          </Tooltip>
        </Box>

        <Box className={classes.stepComponent} marginBottom={2}>
          <SecurityTable
            page={page}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            certificates={certificates}
            createdCertificates={createdCertificates}
            selectedCertificate={selectedCertificate}
            isLoading={isLoadingCertificates}
            handleChangePage={handleChangePage}
            setSelectedCertificate={setSelectedCertificate}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      <ActionButtons
        isNextButtonDisabled={false}
        handleClickNextButton={handleGoToNextStep}
        handleClickBackButton={handleGoToPreviousStep}
        handleClickCancelButton={handleCancelDeviceCreation}
        withBackButton
      />
    </Box>
  );
};

SecurityStep.propTypes = {
  selectedCertificate: PropTypes.object.isRequired,
  createdCertificates: PropTypes.object.isRequired,
  handleGoToNextStep: PropTypes.func.isRequired,
  setCreatedCertificates: PropTypes.func.isRequired,
  setSelectedCertificate: PropTypes.func.isRequired,
  handleCancelDeviceCreation: PropTypes.func.isRequired,
};

export default SecurityStep;
