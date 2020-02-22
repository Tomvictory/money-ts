<template>
  <Layout class-prefix="layout">{{recordList}}
    <NumberPad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/model.ts';


  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行', '彩票'];
    recordList= model.fetch();
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateNumberPad(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      const record2=model.clone(this.record);
      record2.createTime = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange() {
      model.save(this.recordList);
    }
  }

</script>
<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

</style>