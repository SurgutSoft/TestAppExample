import React from 'react';
import {observer} from "mobx-react-lite";
import FundraiserDetailsView from './FundraiserDetails/FundraiserDetailsView';
import FundraiserDetailsEdit from './FundraiserDetails/FundraiserDetailsEdit';
import {FundraiserOptions} from './FundraiserOptions/FundraiserOptions';
import EventStore from '../../store/EventStore';
import {FundraserGoalsView} from './FundraiserGoals/FundraiserGoalsView';
import {FundraserGoalsEdit} from './FundraiserGoals/FundraiserGoalsEdit';
import FundraiserDetailsStore from '../../store/FundraiserDetailsStore';
import FundraiserGoalsStore from '../../store/FundraiserGoalsStore';
import FundraiserOptionsStore from '../../store/FundraiserOptionsStore';

const Fundraiser = observer(() => {
  return (
    <div className="screenWrapper">
      {EventStore.items &&
        <>
          <div className="content">
            <div className="contentWithShadowWrapper">
              {FundraiserDetailsStore.isEditMode
                ? <FundraiserDetailsEdit
                  onChangeViewMode={FundraiserDetailsStore.onSwitchDeteilsEditMode}
                  eventData={EventStore.items}
                  isLoading={FundraiserDetailsStore.isLoading}
                  onUploadPhoto={EventStore.uploadPhoto}
                  onSave={FundraiserDetailsStore.updateEventData}
                />
                : <FundraiserDetailsView
                  onChangeViewMode={FundraiserDetailsStore.onSwitchDeteilsEditMode}
                  eventData={EventStore.items}
                />
              }
            </div>
          </div>

          <div className="content">
            <div className="contentWrapper">
              {FundraiserGoalsStore.isEditMode
                ? <FundraserGoalsEdit
                  data={EventStore.items}
                  onChangeViewMode={FundraiserGoalsStore.onSwitchGoalsEditMode}
                  onSave={FundraiserGoalsStore.updateGoals}
                  isLoading={FundraiserGoalsStore.isLoading}
                />
                : <FundraserGoalsView
                  data={EventStore.items}
                  onChangeViewMode={FundraiserGoalsStore.onSwitchGoalsEditMode}
                />
              }
            </div>
          </div>

          <div className="content">
            <div className="contentWrapper">
              <FundraiserOptions eventData={EventStore.items} onChange={FundraiserOptionsStore.updateOptions} />
            </div>
          </div>
        </>
      }
    </div>
  )
})

export default Fundraiser;
