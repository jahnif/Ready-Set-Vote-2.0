import { action, observable } from "mobx";

export class EndorserStore {
    @observable public description: string;
    @observable public endorserId: string;
    @observable public endorserImg: string;
    @observable public endorserUrl: string;
    @observable public endorserUrlText: string;
    @observable public selected: boolean;

    @action public selectEndorser = () => {
      this.selected = !this.selected;
    }
}

export const endorserStore = new EndorserStore();
