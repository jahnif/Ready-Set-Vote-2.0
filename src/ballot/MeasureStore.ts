import { observable } from "mobx";

export class MeasureStore {
  @observable
  public measureDescription: string;
  @observable
  public measureName: string;
  @observable
  public measureTitle: string;
  @observable
  public yesChoiceLink: string;
  @observable
  public measureChoiceEndorsement: string;
  @observable
  public yesChoiceText: string;
  @observable
  public yesMeasureEndorser: string;
  @observable
  public municipalLeaugeRecommendation: string;
}

export const measureStore = new MeasureStore();
