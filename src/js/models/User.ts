import {IEvents, IManaged, IUserResponse} from "../api/apiResponseTypes";

export class User {
  activeAt: number;
  avatar: string;
  created: number;
  createdBy: number;
  displayName: string;
  email: string;
  emailVerified: boolean;
  events: IEvents[];
  firstName: string;
  id: number;
  lastName: string;
  managed: IManaged[];
  password: boolean;
  personalMessage: string;
  role: string;


  constructor(response: IUserResponse) {
    this.activeAt = response.activeAt;
    this.avatar = response.avatar;
    this.created = response.created;
    this.createdBy = response.createdBy;
    this.displayName = response.displayName;
    this.email = response.email;
    this.emailVerified = response.emailVerified;
    this.events = response.events;
    this.firstName = response.firstName;
    this.id = response.id;
    this.lastName = response.lastName;
    this.managed = response.managed;
    this.password = response.password;
    this.personalMessage = response.personalMessage;
    this.role = response.role;
  }

  public static toRequestBody(user?: User): IUserResponse {
    return {
      activeAt: user?.activeAt,
      avatar: user?.avatar,
      created: user?.created,
      createdBy: user?.createdBy,
      displayName: user?.displayName,
      email: user?.email,
      emailVerified: user?.emailVerified,
      events: user?.events,
      firstName: user?.firstName,
      id: user?.id,
      lastName: user?.lastName,
      managed: user?.managed,
      password: user?.password,
      personalMessage: user?.personalMessage,
      role: user?.role,
    } as IUserResponse;
  }
}