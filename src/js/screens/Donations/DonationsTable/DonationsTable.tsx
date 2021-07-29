import {observer} from "mobx-react-lite";
import moment from "moment";
import React from 'react';
import strings from "../../../../i18n/strings";
import DonationsStore from "../../../store/DonationsStore";
import {ReactComponent as PreviewIcon} from '../../../../images/icons/redirect.svg';

import styles from "./DonationsTable.module.scss";

const DonationsTable = observer(() => {

  return (
    <table className="table">
      <thead>
        <tr>
          <th className={styles.dateColumn}>{strings.donations.table_columns.date}</th>
          <th className={styles.donationsColumn}>{strings.donations.table_columns.donation}</th>
          <th>{strings.donations.table_columns.netAmount}</th>
          <th>{strings.donations.table_columns.fee}</th>
          <th>{strings.donations.table_columns.donor}</th>
          <th className={styles.commentColumn}>{strings.donations.table_columns.comment}</th>
          <th hidden>{strings.donations.table_columns.corp_matvhing}</th>
          <th className={styles.beneficiaryColumn}>{strings.donations.table_columns.beneficiary}</th>
          <th>{strings.donations.table_columns.stripe}</th>
        </tr>
      </thead>

      <tbody>
        {DonationsStore.items.map(item =>
          <tr key={item.id}>
            <td className={styles.dateCell}>{moment(item.created).format('MM/DD/YYYY')}</td>

            <td className={styles.amountCell}>{`$${item.amount}`}</td>

            <td>{`$${item.netAmount}`}</td>

            <td>{`$${item.feeAmount}`}</td>

            <td>
              <div className={styles.nameWrapper}>
                <span className={styles.name}>
                  {item.donorName}
                </span>

                <span className={styles.description}>
                  {item.donorEmail}
                </span>
              </div>
            </td>

            <td>{item.donorMessage}</td>

            <td hidden>{item.matchCorp ? strings.donations.yes : strings.donations.no}</td>

            <td>
              <div className={styles.beneficiaryWrapper}>
                <span className={styles.name}>
                  {item.beneficiary?.displayName || ''}
                </span>

                <span className={styles.description}>
                  {item.team?.name || ''}
                </span>
              </div>
            </td>

            <td className={styles.redirectCell}>
              <a href={`https://dashboard.stripe.com/payments/${item.chargeId}`}>
                {strings.donations.view}
                <PreviewIcon fill={styles.redirectSvgColor} />
              </a>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
})


export default DonationsTable;
