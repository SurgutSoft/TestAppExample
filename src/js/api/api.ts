import axios from 'axios';
import qs from 'qs';
import {ACCESS_TOKEN} from '../consts/localStorage';

export default function api(conf: any): Promise<any> {
  const config = conf;
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  config.headers = {Authorization: `Bearer ${accessToken}`};
  config.paramsSerializer = (params: object) => qs.stringify(
    params,
    {
      allowDots: true,
      arrayFormat: 'repeat',
    },
  );
  return axios(config)
    .then((response) => {
      if (response.status === 200 || response.status === 201 || response.status === 202) return response.data;
      return Promise.reject(response.data);
    });
}

class ApiClient {
  getUser = () => api({url: '/api/v1/users/me'});

  getEventData = (idEvent: number) => api({url: `/api/v1/events/${idEvent}`});

  uploadEventPhoto = (idEvent: number, file: FormData) => api(
    {
      method: 'POST',
      url: `/api/v1/events/${idEvent}/details/photo`,
      data: file,
    }
  );

  updateEventDetailsData = (idEvent: number, body: FormData) => api(
    {
      method: 'PUT',
      url: `/api/v1/events/${idEvent}/details`,
      data: body,
    });

  updateEventData = (idEvent: number, body: FormData) => api(
    {
      method: 'PUT',
      url: `/api/v1/events/${idEvent}`,
      data: body,
    });

  updateFundraiserLocation = (idLoation: number, body: FormData) => api(
    {
      method: 'PUT',
      url: `/api/v1/locations/${idLoation}`,
      data: body,
    });

  updateFundraiserOptions = (idEvent: number, body: FormData) => api(
    {
      method: 'PUT',
      url: `/api/v1/events/${idEvent}/options`,
      data: body,
    }
  );

  updateFundraiserGoals = (idEvent: number, body: FormData) => api(
    {
      method: 'PUT',
      url: `/api/v1/events/${idEvent}/goals`,
      data: body,
    }
  );

  // overview

  getPaymentsByDate = (idEvent: number) => api({url: `/api/v1/events/${idEvent}/payments/bydate`});

  //team members (students)

  getTeamMembers = (idEvent: number) => api({url: `/api/v1/events/${idEvent}/members`});
  
  //TODO: need to add api
  deleteTeamMember = (idUser: number) => api({url: `delete user api by ${idUser}`});

  getEventTeamMembersCsv = (idEvent: number) => api({
    url: `api/v1/events/${idEvent}/members.csv?accessToken=${localStorage.getItem(ACCESS_TOKEN)}`
  });


  // teams 
  getTeams = (idEvent: number) => api({url: `/api/v1/events/${idEvent}/teams`});


  // donation

  getDonations = (idEvent: number) => api({url: `/api/v1/events/${idEvent}/payments`});

  getDonationsCsv = (idEvent: number) => api({
    url: `api/v1/events/${idEvent}/payments?output=csv&accessToken=${localStorage.getItem(ACCESS_TOKEN)}`
  });
}

export const apiClient = new ApiClient();
