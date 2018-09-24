import { action, computed, observable } from "mobx";
import { EndorserStore } from "./EndorserStore";
import { MeasureStore } from "./MeasureStore";

export class BallotStore {
  @computed
  get endorsersSelectedString() {
    const selected = this.selectedEndorsers.length;
    const total = this.endorsers.length;
    if (selected === 0) {
      return "None";
    }
    if (selected === total) {
      return "All";
    }
    return `${selected} out of ${total}`;
  }

  @computed
  get selectedEndorsers() {
    return this.endorsers.filter(e => e.selected);
  }
  @observable
  public endorsers: EndorserStore[] = [];
  @observable
  public percentComplete: number = 0;
  @observable
  public measures: MeasureStore[] = [];

  @action
  public addMeasure(measure: MeasureStore) {
    this.measures.push(measure);
  }

  @action
  public setPercentComplete(percentComplete: number) {
    this.percentComplete = percentComplete;
  }

  @action
  public addEndorser(endorser: EndorserStore) {
    this.endorsers.push(endorser);
  }

  @action
  public selectAll = () => {
    this.endorsers.map(e => e.setSelected(true));
  };

  @action
  public selectNone = () => {
    this.endorsers.map(e => e.setSelected(false));
  };
}

export const ballotStore = new BallotStore();
