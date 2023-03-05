
const layout = {
  ['type']: {},
  ['style_object']: {},
  ['children']: {},
  ['tag']: {},
  ['foldable']: {},
  ['fold_mode']: {},
  ['label']: {},
  ['gutter']: {},
  ['mode']: {},
  ['justify']: {},
  ['align']: {},
  ['grid']: {},
  ['offset']: {},
  ['push']: {},
  ['pull']: {},
  ['xs']: {},
  ['sm']: {},
  ['md']: {},
  ['lg']: {},
  ['xl']: {},
  ['*']: {}
};

const input = {
  ['component_id']: {},
  ['type']: {},
  ['label']: {},
  ['grid']: {},
  ['key_name']: {},
  ['default_value']: {},
  ['show_condition']: {},
  ['read_only']: {},
  ['clearable']: {},
  ['options_id']: {},
  ['uri']: {},
  ['mode']: {},
  ['*']: {}
};

const container = {
  ['component_id']: {},
  ['type']: {},
  ['key_name']: {},
  ['show_condition']: {},
  ['children']: {},
  ['columns']: {
    $childSchema: {
      ['__index']: {
        $childSchema: {
          ['label']: {},
          ['tips']: {},
          ['children']: {},
          ['disable_overflow_tooltip']: {},
          ['field']: {
            $childSchema: {
              ['component_id']: {},
              ['type']: {},
              ['key_name']: {},
              ['sortable']: {},
              ['options_id']: {},
              ['format']: {},
              ['text']: {},
              ['label']: {},
              ['logic']: {},
              ['authority_code']: {},
              ['show_condition']: {},
              ['*']: {}
            }
          },
          ['fields']: {
            $childSchema: {
              ['__index']: {
                $childSchema: {
                  ['component_id']: {},
                  ['type']: {},
                  ['key_name']: {},
                  ['sortable']: {},
                  ['options_id']: {},
                  ['format']: {},
                  ['text']: {},
                  ['label']: {},
                  ['logic']: {},
                  ['authority_code']: {},
                  ['show_condition']: {},
                  ['*']: {}
                }
              }
            }
          },
          ['*']: {}
        }
      }
    }
  },
  ['page_index']: {},
  ['page_size']: {},
  ['total_count']: {},
  ['order_by']: {},
  ['order']: {},
  ['selection']: {},
  ['*']: {}
};

const interaction = {
  ['component_id']: {},
  ['type']: {},
  ['trigger']: {},
  ['label']: {},
  ['main']: {},
  ['logic']: {},
  ['authority_code']: {},
  ['show_condition']: {},
  ['*']: {}
};

const logic = {
  ['component_id']: {},
  ['type']: {},
  ['uri']: {},
  ['method']: {},
  ['target']: {},
  ['script']: {},
  ['next']: {},
  ['validate_components']: {},
  ['*']: {}
};

export default {
  layout,
  input,
  container,
  interaction,
  logic
};
