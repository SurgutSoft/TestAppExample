import React from 'react';
import {observer} from 'mobx-react-lite';
import strings from '../../../i18n/strings';
import {Button, InfoCard, Progress} from '../../components/common';
import OverviewStore from '../../store/OverviewStore';
import {ReactComponent as ArrowRightIcon} from '../../../images/icons/arrows/arrow-right.svg';
import {ReactComponent as InfoIcon} from '../../../images/icons/info.svg';

import styles from './Overview.module.scss';
import {ReportChart} from './ReportChart/ReportChart';
import EventStore from '../../store/EventStore';
import TeamMembersStore from '../../store/TeamMembersStore';

const Overview = observer(() => {
  const renderProgressValue = (value: number, size: number) => (
    <div>
      <span >{value}</span>
      <span>&nbsp; / {size}</span>
    </div>
  )

  return (
    <div className="screenWrapper">
      <div className="content">
        <div className="contentWithShadowWrapper">
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              {strings.overview.fundraiser_report}
            </span>

            <Button type="primary" endIcon={<ArrowRightIcon />}>
              {strings.overview.donation_list}
            </Button>
          </div>

          <div className={styles.widgetsWrapper}>

            <div className={styles.progressWrapper}>
              <Progress value={OverviewStore.getRaisedPercent()} width="90px" />

              <InfoCard
                title={
                  <span className={styles.raisedFrom}>
                    {`$${(EventStore.items?.raisedSum || 0).toLocaleString()}`}
                  </span>
                }
                description={strings.formatString(strings.overview.raised_from, (EventStore.items?.fundraising || 0).toLocaleString())}
                tooltip={strings.formatString(strings.overview.raised_from, (EventStore.items?.fundraising || 0).toLocaleString())}
              />
            </div>

            <InfoCard
              title={`$${((EventStore.items?.raisedSum!) / (EventStore.items?.donationsCount!)).toFixed(2).toLocaleString()}`}
              description={strings.overview.avg_donations_size}
            />

            <InfoCard
              title={`$${((EventStore.items?.raisedSum || 0) / TeamMembersStore.getStudentCount()).toFixed(2).toLocaleString()}`}
              description={strings.overview.avg_per_student}
            />

            <InfoCard
              title={`${TeamMembersStore.getPercentDonationStudents().toFixed(0)}%`}
              description={
                <span className={styles.receivedDonation}>
                  {strings.overview.received_a_donation}
                  <InfoIcon />
                </span>
              }
            />
          </div>

          <div className={styles.chartWrapper}>
            {OverviewStore.getPaymentChartData().length > 3 ?
              <ReportChart
                data={OverviewStore.getPaymentChartData().splice(2, 31).reverse()}
                barColor={styles.blue}
              />
              : <></>
            }
          </div>
        </div>
      </div>

      <div className={styles.middleContentWrapper}>
        <div className="content">
          <div className="contentWrapper">
            <InfoCard
              className={styles.widget}
              title={renderProgressValue(52, 100)}
              description={strings.overview.students_registred_total}
            />
          </div>
        </div>

        <div className="content">
          <div className="contentWrapper">
            <InfoCard
              className={styles.widget}
              title={renderProgressValue(52, 100)}
              description={strings.overview.minutes_read_goal}
            />
          </div>
        </div>

        <div className="content">
          <div className="contentWrapper">
            <InfoCard
              className={styles.widget}
              title={renderProgressValue(52, 100)}
              description={strings.overview.books_read_goal}
            />
          </div>
        </div>
      </div>

      <div className="content">
        <div className="contentWithShadowWrapper">
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              {strings.overview.reading_report}
            </span>

            <div className={styles.buttonsWrapper}>
              <Button endIcon={<ArrowRightIcon />}>
                {strings.overview.sessions}
              </Button>

              <Button endIcon={<ArrowRightIcon />}>
                {strings.overview.minutes}
              </Button>

              <Button endIcon={<ArrowRightIcon />}>
                {strings.overview.books}
              </Button>
            </div>
          </div>

          <div className={styles.chartWrapper}>
            <ReportChart
              data={OverviewStore.getPaymentChartData().splice(2, 31).reverse()}
              barColor={styles.purple}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Overview;
