<template>
  <div class="tags">
    <div class="new-add">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{tag.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  const map: { [key: string]: string } = {
    'tag name dupliceted': '标签名重复了'
  };

  @Component
  export default class Tags extends Vue {
    get tagList() {
      return this.$store.state.tagList;
    }

    selectedTags: Tag[] = [];

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: Tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    create() {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        return window.alert('标签名不能为空');
      } else if (!name) {return;}
      this.$store.commit('createTag', name);
      if (this.$store.state.createTagError) {
        return window.alert(map[this.$store.state.createTagError.message] || '未知错误');
      }
      window.alert('添加成功');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        background: #666;
        color: white;
        $labels-height: 24px;
        height: $labels-height;
        border-radius: $labels-height;
        padding: 1px 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: $color-highlight;
          color: #333;
        }
      }
    }

    > .new-add {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>