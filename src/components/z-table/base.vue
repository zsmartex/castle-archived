<template>
  <div
    class="z-table"
    :class="{
      'z-table-no-scroll': !scroll,
      'z-table-hoverable': hover,
      'z-table-empty': !data.length
    }"
  >
    <div class="z-table-head">
      <span
        v-for="column of columns"
        v-text="column.title"
        :key="column.key"
        :class="[`${column.key} text-${column.algin}`]"
      />
    </div>
    <div class="z-table-content">
      <a-spin v-if="loading" class="z-table-loading">
        <a-icon slot="indicator" type="loading" spin />
      </a-spin>
      <a-empty v-else-if="!data.length" />
      <p
        v-for="(item, index) of data"
        class="z-table-row"
        :key="index"
        @click="$emit('click', item)"
      >
        <template v-for="column of columns">
          <slot
            v-if="column.scopedSlots"
            :name="column.key"
            :item="item"
            :column="column"
          />
          <span
            v-else
            :key="column.key"
            :class="[column.key, `text-${column.algin}`]"
            v-text="value_by_key(item, column.key)"
          />
        </template>
      </p>
    </div>
    <a-pagination
      v-if="pagination && !loading"
      showSizeChanger
      class="z-table-pagination"
      :current="page"
      :total="total"
      :page-size="pageSize"
      :pageSizeOptions="['10', '25', '50', '100']"
      @change="onChange"
      @showSizeChange="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface Column {
  title: string;
  key: string;
  algin: "left" | "center" | "right";
  sort?: boolean; //TODO Add support sort table in this components
  scopedSlots: boolean;
}

@Component({})
export default class ZTable extends Vue {
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop() readonly columns!: Column[];
  @Prop() readonly data!: any[];
  @Prop({ default: false }) readonly hover!: boolean;
  @Prop({ default: true }) readonly scroll!: boolean;
  @Prop() readonly pagination!: boolean;
  @Prop() readonly total!: number;
  @Prop() readonly page!: number;
  @Prop() readonly pageSize!: number;

  onChange(page: number, pageSize: number) {
    this.$emit("change-pagination", { page, limit: pageSize });
  }

  value_by_key(item: any, key: string) {
    return item[key];
  }
}
</script>
