import { observable } from "mobx";

export class CandidateStore {
  @observable
  public candidateId: string;
  @observable
  public imgSrc: string;
  @observable
  public party: string;
  @observable
  public candidateName: string;
  @observable
  public candidateUrl: string;
  @observable
  public candidateUrlText: string;
  @observable
  public userNames: string;
  @observable
  public municipalLeagueRating: string;
}

export const candidateStore = new CandidateStore();
