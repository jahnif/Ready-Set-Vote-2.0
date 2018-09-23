import { action, observable } from 'mobx'

class AddressStore {
  @observable public address: string;

  @action
  public setAddress(address: string) {
    this.address = address;
  }
}

export const addressStore = new AddressStore()