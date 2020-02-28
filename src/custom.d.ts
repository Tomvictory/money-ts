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

}