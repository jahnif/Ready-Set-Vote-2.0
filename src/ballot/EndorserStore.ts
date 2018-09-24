import { action, observable } from "mobx";

export class EndorserStore {
  @observable
  public description: string;
  @observable
  public endorserId: string;
  @observable
  public endorserImg: string;
  @observable
  public endorserUrl: string;
  @observable
  public endorserUrlText: string;
  @observable
  public selected: boolean = true;

  constructor(
    description: string = "",
    endorserId: string = "",
    endorserImg: string = "",
    endorserUrl: string = "",
    endorserUrlText: string = ""
  ) {
    this.description = description;
    this.endorserId = endorserId;
    this.endorserImg = endorserImg;
    this.endorserUrl = endorserUrl;
    this.endorserUrlText = endorserUrlText;
  }

  @action
  public selectEndorser = () => {
    this.selected = !this.selected;
  };

  @action
  public setSelected = (select: boolean) => {
    this.selected = select;
  }
}

export const endorserStore = new EndorserStore();
