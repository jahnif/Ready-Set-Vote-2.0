import { action, computed, observable } from "mobx";
import { EndorserStore } from "./EndorserStore";

export class BallotStore {
  @observable
  public endorsers: EndorserStore[] = [];

  @computed
  get endorsersSelectedString() {
    const selected = this.selectedEndorsers.length;
    const total = this.endorsers.length;
    if (selected === total) {
      return "All";
    }
    return `${selected} out of ${total}`;
  }

  @computed
  get selectedEndorsers() {
    return this.endorsers.filter(e => e.selected);
  }

  @action
  public addEndorser(endorser: EndorserStore) {
    this.endorsers.push(endorser);
  }
}

export const ballotStore = new BallotStore();
