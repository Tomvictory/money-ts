type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createTime?: Date;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'dupliceted';
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'dupliceted';
  remove: (id: string) => boolean;
}

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: (id: string,name: string) => 'success' | 'not found' | 'dupliceted';
  findTag: (id: string) => Tag | undefined;
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;
}