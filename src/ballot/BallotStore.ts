import { action, computed, observable } from "mobx";
import { IEndorser } from "./Endorser";

export class BallotStore {
  @observable public endorsers: IEndorser[] = [];
  private endorsersPicked: number = 0;
  @computed
  get endorsersSelectedString() {
    return `${this.endorsersPicked} out of ${this.endorsers.length}`;
  }

  @action
  public addEndorser(endorser: IEndorser) {
    this.endorsers.push(endorser);
  }
}

export const ballotStore = new BallotStore();
