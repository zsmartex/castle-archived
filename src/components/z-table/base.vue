<template>
  <div class="z-table" :class="{ 'no-scroll': !scroll }">
    <dt>
      <span
        v-for="column of columns"
        :key="column.key"
        :class="[`text-${column.algin}`]"
        v-text="column.title"
      />
    </dt>
    <dd>
      <p v-for="(item, index) of data" :key="index">
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
    </dd>
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
  @Prop() readonly columns!: Column[];
  @Prop() readonly data!: any[];
  @Prop({ default: true }) readonly scroll!: boolean;
  @Prop() readonly pagination!: boolean;
  @Prop() readonly total!: number;
  @Prop() readonly page!: number;

  value_by_key(item: any, key: string) {
    return item[key];
  }
}
</script>
