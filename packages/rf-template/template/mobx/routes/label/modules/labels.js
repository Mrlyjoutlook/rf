import { observable, action } from 'mobx';

class LabelsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable labels = [];

  @action
  addLabel(name) {
    this.labels.push({
      time: new Date().getTime(),
      name,
    });
  }
}

export default LabelsStore;
