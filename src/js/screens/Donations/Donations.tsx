import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import strings from '../../../i18n/strings';
import {Button} from '../../components/common';
import {ReactComponent as DownloadIcon} from '../../../images/icons/students/download.svg';
import DonationsStore from '../../store/DonationsStore';
import DonationsTable from './DonationsTable/DonationsTable';

import styles from './Donations.module.scss';

const Donations = observer(() => {
  useEffect(() => {
    DonationsStore.fetchItemsList();
  }, [])

  return (
    <div className="screenWrapper">
      <div className="content">
        <div className="contentWrapper">
          <div className={styles.headerWrapper}>
            <div className={styles.pageTitleWrapper}>
              <span className={styles.title}>{strings.donations.title}</span>
            </div>

            <Button type='primary' startIcon={<DownloadIcon fill="white"/>} onClick={DonationsStore.exportDonations}>
              {strings.donations.download_csv}
            </Button>
          </div>
        </div>

        {DonationsStore.items.length ? <DonationsTable /> : <></>}
      </div>
    </div>
  )
})

export default Donations;
