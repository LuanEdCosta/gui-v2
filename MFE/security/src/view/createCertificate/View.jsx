import React, { useEffect, useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { actions } from '../../redux/modules/certificates';
import { certificateDataSelector } from '../../redux/selectors/certificatesSelector';
import { ViewContainer } from 'sharedComponents/Containers';
import { CONSTANTS } from './constants';
import CreateCertificateCA from './layout/CreateCertificateCA';
import CreateCertificateCSR from './layout/CreateCertificateCSR';
import CreateCertificateOneClick from './layout/CreateCertificateOneClick';
import useStyles from './style';

const CreateCertificate = () => {
  const { t } = useTranslation('createCertificate');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const certificateData = useSelector(certificateDataSelector);

  const [expandedCard, setExpandedCard] = useState('');
  const [csrPEM, setCsrPEM] = useState('');
  const [certificateChain, setCertificateChain] = useState('');

  useEffect(() => {
    return () => {
      dispatch(actions.getNewGeneratedCertificate({ certificateData: null }));
    };
  }, [dispatch]);

  const handleLeaveCertificateCreation = () => {
    history.push('/certificates');
  };

  const handleToggleContent = constant => () => {
    if (certificateData) return;

    if (expandedCard === constant) {
      setExpandedCard('');
    } else {
      setExpandedCard(constant);
    }
  };

  const handleCreateCertificateOneClick = () => {
    dispatch(actions.createCertificateOneClick());
  };

  const handleCreateCertificateCSR = () => {
    dispatch(actions.createCertificateCSR({ csrPEM }));
  };

  const handleRegisterExternalCertificate = () => {
    dispatch(actions.registerExternalCertificate({ certificateChain }));
  };

  const handleClearState = () => {
    setExpandedCard('');
    setCsrPEM('');
    setCertificateChain('');
    dispatch(actions.getNewGeneratedCertificate({ certificateData: null }));
  };

  const handleChangeCsrPEM = e => {
    setCsrPEM(e.target.value);
  };

  const handleChangeCertificateChain = e => {
    setCertificateChain(e.target.value);
  };

  return (
    <ViewContainer headerTitle={t('headerTitle')}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <CreateCertificateOneClick
            certificateData={certificateData}
            isShowing={expandedCard === CONSTANTS.ONE_CLICK}
            handleToggleContent={handleToggleContent(CONSTANTS.ONE_CLICK)}
            handleCreateCertificateOneClick={handleCreateCertificateOneClick}
          />

          <CreateCertificateCSR
            csrPEM={csrPEM}
            certificateData={certificateData}
            isShowing={expandedCard === CONSTANTS.CSR}
            handleChangeCsrPEM={handleChangeCsrPEM}
            handleToggleContent={handleToggleContent(CONSTANTS.CSR)}
            handleCreateCertificateCSR={handleCreateCertificateCSR}
          />

          <CreateCertificateCA
            certificateData={certificateData}
            certificateChain={certificateChain}
            isShowing={expandedCard === CONSTANTS.CA}
            handleToggleContent={handleToggleContent(CONSTANTS.CA)}
            handleChangeCertificateChain={handleChangeCertificateChain}
            handleRegisterExternalCertificate={handleRegisterExternalCertificate}
          />
        </Box>

        <Box className={classes.footer}>
          {certificateData ? (
            <>
              <Button variant='text' color='secondary' onClick={handleClearState}>
                {t('createOtherCertificate')}
              </Button>

              <Button
                variant='contained'
                color='secondary'
                onClick={handleLeaveCertificateCreation}
                className={classes.goToCertificatesButton}
              >
                {t('goToCertificatesButton')}
              </Button>
            </>
          ) : (
            <Button className={classes.cancelButton} onClick={handleLeaveCertificateCreation}>
              {t('cancelButton')}
            </Button>
          )}
        </Box>
      </Box>
    </ViewContainer>
  );
};

export default CreateCertificate;
