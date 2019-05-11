import { observable } from "mobx";
import { IMeasureChoices } from "./MeasureChoice";

export class MeasureStore {
  @observable
  public id: string;
  @observable
  public description: string;
  @observable
  public name: string;
  @observable
  public title: string;
  @observable
  public choices: IMeasureChoices;
  // @observable
  // public municipalLeaugeRecommendation: string;
}

export const measureStore = new MeasureStore();
